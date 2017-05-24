#!/usr/bin/python
import tornado.web
import tornado.ioloop
import os
import ukjp.config
import ukjp.fbactions
import ukjp.database
import thread
import json
import hashlib

class UkJPRequestHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.add_header("Server","UKJP-Server")

class ApiHandler(UkJPRequestHandler):
    actions = {
        "300" : "SET",
        "200" : "GET",
        "100" : "INIT"
    }
    def handleApi(self):
        try:
            postType = self.get_argument("type")
            atype = self.actions[postType]
            #TYPE IS SET
            if atype == "SET":
                action = self.get_argument("action")
                #SET ACCESS TOKEN
                if action == "accessToken":
                    details = json.JSONDecoder().decode(self.get_argument("details"))
                    accessToken = self.get_argument("accessToken")
                    self.set_secure_cookie("UKJP_FB_COOKIE",accessToken)
                    db = ukjp.database.Database(accessToken=accessToken)
                    userId = db.getUserId()
                    session_id = hashlib.md5(userId).hexdigest()
                    self.set_secure_cookie("UKJP_SESSION",session_id)
                    details['session'] = session_id
                    try:
                        db.addUser(details)
                        self.write("200")
                    except ukjp.database.DBException as e:
                        self.write(e.message)
                #SET PAGEID
                if action == "pageid":
                    pageid = self.get_argument("pageid")
                    accessToken = self.get_secure_cookie("UKJP_FB_COOKIE")
                    db = ukjp.database.Database(accessToken=accessToken)
                    try:
                        db.selectPage(pageid)
                        self.write("200")
                    except ukjp.database.DBException as e:
                        self.write(e.message)
            #TYPE IS GET
            if atype == "GET":
                action = self.get_argument("action")
                #GET USER PAGE DETAILS
                if action == "userPage":
                    accessToken = self.get_secure_cookie("UKJP_FB_COOKIE")
                    session_id =  self.get_secure_cookie("UKJP_SESSION")
                    print(accessToken)
                    db = ukjp.database.Database(accessToken=accessToken)
                    pageDetails = db.getPageDetails(session_id)
                    self.set_header("Content-Type","application/json")
                    self.write(pageDetails)
        except Exception as e:
            print(e)
        self.finish()
    def get(self):
        self.handleApi()
    def post(self):
        self.handleApi()

class IndexHandler(UkJPRequestHandler):
    def get(self):
        try:
            cookie = self.get_secure_cookie("UKJP_FB_COOKIE") 
            if cookie != None:
                print(cookie)
                self.redirect("/app")
            else:
                self.render("./pages/index.html")
        except:
            self.render("./pages/index.html")

class ApplicationHandler(UkJPRequestHandler):
    def get(self):
        try:
            cookie = self.get_secure_cookie("UKJP_FB_COOKIE")
            if cookie == None:
                self.redirect("/")
            else:
                self.render("./pages/app.html")
        except:
            self.redirect("/")

class App(tornado.web.Application):
    def set_default_headers(self):
        self.h
    def __init__(self):
        handlers = [
            tornado.web.url(r"/",IndexHandler),
            tornado.web.url(r"/app",ApplicationHandler),
            tornado.web.url(r"/api",ApiHandler),
        ]
        settings = {
            "static_path" : os.path.join(os.path.dirname(__file__),"static"),
            "cookie_secret" : "Ve41Cp4#1sf^fjqpDasg%$sdff",
            "debug" : True,
            "autoreload" : True,
            "compress_response" : True
        }
        tornado.web.Application.__init__(self, handlers, **settings)

facebook_updater = thread.start_new_thread(ukjp.fbactions.updater_process,())
server = App()
server.listen(8989)
tornado.ioloop.IOLoop.current().start()
