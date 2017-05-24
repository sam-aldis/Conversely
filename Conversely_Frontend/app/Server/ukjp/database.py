import pymongo
import config
import datetime
DB_LOCATION = config.DB_LOCATION

def checkIfNewUser(userid):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    if cur.find_one({"userid": str(userid)}):
        return False
    return True


def getUserData(userid):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    return cur.find_one({"userid":str(userid)})

def addToDb(userid,userdata):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    if userdata != False:
        cur.insert({"profile_pic" : userdata['profile_pic'], "timezone" : userdata['timezone'], "userid" : str(userid), "first_name" : userdata['first_name'], "last_name" : userdata['last_name'], "gender" : userdata['gender'] })
    else:
        cur.insert({"userid" : str(userid)})

def updateHasInteracted(userid):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    try:
        cur.update_one({"userid":userid}, {"$set": {"has_interacted":1}})
    except:
        pass

def addMessage(userid,message):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    dbmessage = {"text" : message, "origin" : "facebook"}
    cur.update_one({"userid": userid}, {"$push": {"messages" : dbmessage}})

def updateStage(userid,stage):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    try:
        cur.update_one({"userid":userid}, {"$set" : {"user_stage" : stage}})
    except:
        pass

def getHasInteracted(userid):
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    try:
        res = cur.find_one({"userid":userid})
        if res["gender"] == "male":
            return False
        if int(res["has_interacted"]) == 1:
            return True
        else:
            return False
    except:
        return False

def updateUserAsAttending(userid,userdata,date,time,challenge):
    """ Will update the database with the clients appointment date for the CRM """
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    date = datetime.datetime.strptime(date,"%d.%m.%Y")
    format_date = str(date.day) + "/" + str(date.month) + "/" + str(date.year)
    res = cur.update_one({"userid": str(userid)}, {"$set":{"appointment_date" : format_date,"appointment_time":time,"date_ordinal":date.toordinal(),"challenge" : challenge}})
    return res

def updateUser(userid, data):
    """ Pass a dictionary and it will be applied to the userid """
    dbcon = pymongo.MongoClient()
    db = dbcon[DB_LOCATION]
    cur = db.facebookbot
    res = cur.update_one({"userid": str(userid)}, {"$set":data})
    return res