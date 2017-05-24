import re
import database
language_model = [
            {
                "type" : "end",
                "words" : ["goodbye","bye","talk soon"],
                "template" : [
                        {
                            "type" : "message",
                            "text" : "talk to you soon"
                        }
                    ]
            },
            {
                "type" : "timetable",
                "words" : ["qwerty"],
                "template" : [
                        {
                            "type" : "message",
                            "text" : "Sure here's our lesson time table.."
                        },
                        {
                            "type" : "file",
                            "url"  : "http://thetransformationcentre.com.au/img/timetable.pdf"
                        }
                    ]
            }
        ]
triggers = [ "interested", "joining", "info", "information", "challenge", "join", "details","know more","participate"]
non_trigger = ["job", "personal trainer","position"]

def isTrigger(message):
    message = message.lower()
    for i in triggers:
        if message.find(i) >= 0:
            for j in non_trigger:
                if message.find(j) >= 0:
                    return False
            return True
    return False

def process(message):
    message = message.lower()
    for i in language_model:
            for j in i['words']:
                if message.find(j) >= 0:
                    return i['template']
    return False

def findDetails(message,userid):
    details_found = False
    userdata = database.getUserData(userid)
    message = message.decode('unicode-escape')
    reg = re.compile("[a-zA-Z0-9._-]*@[a-zA-Z0-9._-]*")
    emails = reg.findall(message)
    for email in emails:
        print(email)
        if userdata.get("email",False) == False:
            details_found = True
            database.updateUser(userid,{"email" : email})
            print(email)
    reg = re.compile("([0-9]{4} [0-9]{3} [0-9]{3})")
    phones = reg.findall(message)
    if len(phones) == 0:
        reg = re.compile("([0-9]{10})")
        phones = reg.findall(message)
    for phone in phones:
        phone = phone.replace(" ", "")
        if userdata.get("phone", False) == False:
            details_found = True
            database.updateUser(userid,{"phone" : phone})
    return details_found
