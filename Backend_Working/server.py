import tornado.web
import tornado.httpserver
import tornado.websocket
import tornado.escape
import os
import tornado.ioloop
import ssl
import json
import tornado.httpclient
import pymongo
import ukjp.language
import ukjp.database
import ukjp.facebook
import ukjp.templates
import time
import thread
import random


class Processing():
    
    def parseMessage(self,message,userdata):
        i = message.replace("{{first_name}}",userdata['first_name'])
        i = i.replace("{{last_name}}", userdata['last_name'])
        return i

    def getUserData(self,sender):
        if ukjp.database.checkIfNewUser(sender):
            userdata = ukjp.facebook.getUserInfo(sender)
            ukjp.database.addToDb(sender,userdata)
        else:
            userdata = ukjp.database.getUserData(sender)
        return userdata

    def process_message_type(self,message,sender,userdata):
        if message['type'] == "message":
                text = self.parseMessage(message["text"],userdata)
                ukjp.facebook.send_reply(sender,text)
                time.sleep(2)
        if message['type'] == "json":
            ukjp.facebook.sendStructuredJSON(sender,userdata,message['template'])
        if message['type'] == "quick_reply":
            text = self.parseMessage(message["text"],userdata)
            ukjp.facebook.sendQuickReplys(sender,text,message["buttons"])
        if message['type'] == "file":
            ukjp.facebook.sendFile(sender,message['url'])

    def process_callback(self,callback,sender,convo_id):
        userdata = self.getUserData(sender)
        if callback.find("BOOK_CONSULT_") < 0:
            ukjp.database.updateStage(sender,ukjp.templates.STAGE_CHALLENGE_INIT)
            for message in ukjp.templates.callbacks[callback]:
                self.process_message_type(message,sender,userdata)
        else:
            day = callback.split("_DAY_")[1].split("_TIME")[0]
            time = callback.split("_TIME_")[1]
            challenge = callback.split("BOOK_CONSULT_")[1].split("_DATE_")
            date = callback.split("_DATE_")[1].split("_DAY_")[0]
            day = day.title()
            ukjp.database.updateUserAsAttending(sender,userdata,date,time,challenge)
            ukjp.database.updateStage(sender,ukjp.templates.STAGE_BOOKED)
            ukjp.facebook.send_reply(sender,"Thanks %s, I've scheduled you in for %s on %s" % (userdata['first_name'],time,day))
            ukjp.facebook.send_reply(sender,"We are located at 1/35 Biscayne Way, Jandakot.\nWhen you arrive at the facility just ask for Lance")
            ukjp.facebook.send_reply(sender,"Looking forward to speaking with then\nRegards TTC")
            ukjp.facebook.send_reply(sender,"P.S Please reply with your email and mobile so we can send you a friendly reminder")
            print("**** Got a booking for %s ****" % (day))

    def process_message(self,message,sender):
        userdata = self.getUserData(sender)
        print(userdata['first_name'] + " " + userdata['last_name'] + ": " + message)
        ukjp.database.addMessage(sender,message)
        details = ukjp.language.findDetails(message,sender)
        # Disable the bot..... remove to re-enable..
        if 1==2:
            if details:
                print("--- [ GOT USER DETAILS ] ---")
                date = "Sat 29th April"
                ukjp.facebook.send_reply(sender,"Thank you %s see you on %s\nP.s check out our latest successful challenger Sarah and her transformation in just 8 weeks" % (userdata['firstname'],date))
                ukjp.facebook.sendImage(sender,"http://thetransformationcentre.com.au/img/spinner/1.png")
            if ukjp.language.isTrigger(message):
                ukjp.database.updateStage(sender,ukjp.templates.STAGE_INIT)
                #time.sleep(1 * random.randrange(10,30))
                for i in ukjp.templates.messages:
                    msg = self.parseMessage(i,userdata)
                    ukjp.facebook.send_reply(sender,msg)
                ukjp.facebook.sendStructuredJSON(sender,userdata,'init')
                ukjp.database.updateHasInteracted(sender)
            rdata = ukjp.language.process(message)
            if rdata != False:
                for message in rdata:
                    self.process_message_type(message,sender,userdata)

class CRMStatusHandler(tornado.web.RequestHandler):
    def get(self):
        req_type = self.get_argument("type")
        auth = self.get_argument("auth_token")
        if auth == ukjp.config.BOT_AUTH_TOKEN:
            if req_type == "status":
                self.write("Healthy")
        else:
            self.write("NOT AUTHENTICATED")

class WebHookHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            print("got post request")
            is_postback = False
            body = self.request.body
            body = body.encode('unicode-escape')
            message = json.JSONDecoder().decode(body)
            entry = message['entry']
            convo_id = entry[0]['id']
            messaging = entry[0]['messaging'][0]
            sender = messaging['sender']
            sender_id = sender['id']
            processor = Processing()
            for i in messaging:
                if i == "postback":
                    is_postback = True
                    break
            if is_postback == False:
                message = messaging['message']
                reply = thread.start_new_thread(processor.process_message, (message['text'],sender_id))
            else:
                #Process a callback
                print("Got a callback")
                postback = messaging["postback"]
                payload = postback["payload"]
                reply = thread.start_new_thread(processor.process_callback, (payload,sender_id,convo_id))
        except Exception as e:
            print(e)

    def get(self):
        hub_mode = self.get_argument("hub.mode")
        hub_challenge = self.get_argument("hub.challenge")
        hub_verify = self.get_argument("hub.verify_token")
        self.write(hub_challenge)

class MainServer(tornado.web.Application):
    def __init__(self):
        handlers = [
            tornado.web.url(r"/",WebHookHandler),
            tornado.web.url(r"/crm", CRMStatusHandler)
                ]
        settings = {
            "static_path" : os.path.join(os.path.dirname(__file__),"static"),
            "cookie_secret" : "Ve41Cp46&*aodfjqpDF55s%$sdff",
            "debug" : True,
            "autoreload" : True,
            "compress_response" : True
        }
        tornado.web.Application.__init__(self, handlers, **settings)
        
server = MainServer()
# Real Certs removed.. Dont really want to give out certs for my domains ;)
ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_ctx.load_cert_chain( "certs/ssl-cert-snakeoil.pem","certs/ssl-cert-snakeoil.key")
ssl_server = tornado.httpserver.HTTPServer(server, ssl_options=ssl_ctx)
ssl_server.listen(4040)
print("Server Started localhost:4040")
tornado.ioloop.IOLoop.current().start()