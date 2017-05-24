import pymongo
import facebook
import config

class DBException(Exception):
    def __init__(self,message):
        self.message = message

class Database:
    """ Pass the access Token on init otherwise
     accessToken is set to False
     """
    def __init__(self,accessToken=False):
        self.accessToken = accessToken
        self.database = "conversely"
    """ Add a user to the database
        pass users details in a dict for them to be stored
    """
    def addUser(self,details={}):
        if self.accessToken == False:
            raise DBException("No Access Token Passed on init")
        mongoCli = pymongo.MongoClient()
        db = mongoCli[self.database]
        userdb = db.users
        res = userdb.find_one({"id" : details["id"]})
        if res == None:
            details['accessToken'] = self.accessToken
            details['isNew'] = True
            res = userdb.insert_one(details)
            mongoCli.close()
            return True
        else:
            userdb.update_one({"id":details['id']}, {"$set" : {"accessToken" : self.accessToken}})

    """ Update a user with their chosen page
        to manage with the bot, pass pageid
    """
    def selectPage(self,pageid):
        if self.accessToken == False:
            raise DBException("No Access Token Passed on init")
        mongoCli = pymongo.MongoClient()
        db = mongoCli[self.database]
        userdb = db.users
        pagedb = db.pages
        res = pagedb.find_one({"pageid":pageid})
        api = facebook.GraphAPI(access_token=self.accessToken)
        req = pageid + "?fields=picture,name,about,link"
        resp = api.get_object(req)
        pageDetails = {
            "image" : resp["picture"]["data"]["url"],
            "name"  : resp["name"],
            "about" : resp["about"],
            "link"  : resp["link"],
            "pageid": resp["id"],
            }
        if res == None:
            pageDetails['accessTokens'] = [self.accessToken]
            pagedb.insert_one(pageDetails)
        else :
            pagedb.update_one({"pageid":pageid},{"$push": {"accessTokens":self.accessToken}})
        res = userdb.update_one({"accessToken" : self.accessToken},{"$set": {"pageid": pageid}})
        mongoCli.close()

    """
    Gets the details for the current users page
    pass the session from the UKJP_SESSION cookie
    """
    def getPageDetails(self,session):
        if self.accessToken == False:
            raise DBException("No Access Token Passed on init")
        mongoCli = pymongo.MongoClient()
        db = mongoCli[self.database]
        userdb = db.users
        res = userdb.find_one({"session" : session})
        pagedb = db.pages
        ret = pagedb.find_one({"pageid" : res["pageid"]},{"_id": 0})
        return ret

    """
    Updater Function, go through both databases and extend
    the validity time of all access tokens
    """
    def updateTokens(self):
        dbCon = pymongo.MongoClient()
        db = dbCon[self.database]
        userdb = db.users
        pagedb = db.pages
        userret = userdb.find({})
        for i in userret:    
            token = facebook.GraphAPI(i['accessToken']).extend_access_token(config.FB_APPID,config.FB_SECRET)["access_token"]
            userdb.update_one({"accessToken":i['accessToken']},{"$set":{"accessToken":token}})
        pageret = pagedb.find({})
        for i in pageret:
            newtokens = []
            pageid = i['pageid']
            for j in i['accessTokens']:
                token = facebook.GraphAPI(j).extend_access_token(config.FB_APPID,config.FB_SECRET)["access_token"]
                newtokens.append(token)
                pagedb.update_one({"pageid" : pageid},{"$pop" : {"accessTokens" : -1}})
            pagedb.update_one({"pageid" : pageid},{"$set":{"accessTokens":newtokens}})
        dbCon.close()

    """ Gets the users id from the backend so it cannot be spoofed to edit someone elses
    account for future requests """
    def getUserId(self):
        if self.accessToken == False:
            raise DBException("No access token was set")
        api = facebook.GraphAPI(access_token=self.accessToken)
        res = api.get_object("/me?fields=id")
        uid = res["id"]
        return uid