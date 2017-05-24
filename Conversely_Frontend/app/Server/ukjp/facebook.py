import json
import tornado.httpclient
import time
import templates
import config

FACEBOOK_ACCESS_TOKEN = config.FACEBOOK_ACCESS_TOKEN
GRAPH_URL = "https://graph.facebook.com/v2.8/me/messages?access_token=" + FACEBOOK_ACCESS_TOKEN



def send_reply(sender,message):
    start_reply(sender)
    messageLength = len(message)
    timeToSleep = 0.03 * messageLength
    time.sleep(timeToSleep)
    end_reply(sender)
    cli =  tornado.httpclient.HTTPClient()
    body = {
        "recipient" : {
                "id": sender
        },
        "message": {
            "text": message
        }
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type":"application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e: 
        print(e)

def start_reply(sender):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
  	        "id":sender
        },
        "sender_action":"typing_on"
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type" : "application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e:
        print(e)
def mark_seen(sender):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
  	        "id":sender
        },
        "sender_action":"mark_seen"
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type" : "application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e:
        print(e)

def end_reply(sender):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
  	        "id":sender
        },
        "sender_action":"typing_off"
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type" : "application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e:
        print(e)

def getUserInfo(sender):
    try:
        cli = tornado.httpclient.HTTPClient()
        url = "https://graph.facebook.com/v2.8/" + sender + "?access_token=" + FACEBOOK_ACCESS_TOKEN
        data = cli.fetch(url, method="GET", headers={"Content-Type":"application/json"})
        userinfo = json.JSONDecoder().decode(data.body)
        return userinfo
    except Exception as e:
        print(e)
        return False

def createStructuredJsonTemplate(sender,userdetails,options):
    """ Returns a JSON object for the given options
        options :   template_type
                    elements [
                        title
                        subtitle
                        buttons [
                            type
                            payload | url
                            title
                        ]
                    ]
      """
    jdata = {}
    jdata['recipient'] = {"id" : sender}
    jdata['message'] = {}
    jdata['message']['attachment'] = {}
    jdata['message']['attachment']['type'] = 'template'
    jdata['message']['attachment']['payload'] = {}
    jdata['message']['attachment']['payload']['template_type'] = options['template_type']
    jdata['message']['attachment']['payload']['elements'] = []
    for element in options['elements']:
        toadd = {}
        for i in element:
            toadd[i] = element[i]
        jdata['message']['attachment']['payload']['elements'].append(toadd)
    return json.JSONEncoder().encode(jdata)


def sendStructuredJSON(sender,userdetails,template):
    """ Sends the structured JSON created from the given template """
    JSON_TEMPLATES = templates.build_json_templates()
    cli =  tornado.httpclient.HTTPClient()
    start_reply(sender)
    time.sleep(2)
    end_reply(sender)
    template_options = JSON_TEMPLATES[template]
    json_body = createStructuredJsonTemplate(sender, userdetails, template_options)
    headers = {"Content-Type":"application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e: 
        print(e)

def sendQuickReplys(sender,message,buttons):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
            "id":sender
        }
    }
    body["message"] = {"text" : message}
    body["message"]["quick_replies"] = []
    for button in buttons:
        body["message"]["quick_replies"].append(button)
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type":"application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e: 
        print(e)

def sendFile(sender,fileurl):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
            "id":sender
        },
        "message":{
            "attachment":{
                "type":"file",
                "payload":{
                    "url":fileurl
                }
            }
        }
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type":"application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e: 
        print(e)

def sendImage(sender,imageurl):
    cli = tornado.httpclient.HTTPClient()
    body = {
        "recipient":{
            "id":sender
        },
        "message":{
            "attachment":{
                "type":"image",
                "payload":{
                    "url":imageurl
                }
            }
        }
    }
    json_body = json.JSONEncoder().encode(body)
    headers = {"Content-Type":"application/json"}
    try:
        data = cli.fetch(GRAPH_URL, method="POST", headers=headers, body=json_body)
    except Exception as e: 
        print(e)
