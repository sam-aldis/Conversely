import days

STAGE_INIT = 0
STAGE_CHALLENGE_INIT = 1
STAGE_BOOKED = 2

def createJSONTemplate(data):
    pass

messages = [
            "Hey {{first_name}}, thankyou for your enquiry to be one of our Transformation Challengers",
            "We have 2 Challenges available for you:\n\nThe 8 Week Bikini Challenge which helps you shed 3-9kg of unwanted body fat, flattens your tummy and tones your arms, abs, legs and butt.\n\nOr our 9in6 Challenge which helps you drop 9+kgs of pure fat in just 6 Weeks.",
            "Please choose which challenge information you would like below..."
    ]

callbacks = {
    "INIT_8WBC" : [
        {
            "type": "message",
            "text" : "Thank you {{first_name}},\n\
The FREE 8 Week Bikini Challenge is a done for you - step by step PROVEN program that helps you lose the  3-7kg of unwanted body fat, flatten your tummy and tone your arms, legs and butt.\n\
            \n\
This is your chance to transform your body in just 8 weeks for FREE"
        },
        {
            "type" : "message",
            "text" : "In exchange for the program being FREE....we ask that you allow us to share your transformation story on our Facebook fan page for marketing purposes to help motivate and inspire the ladies of Perth. \n\
(Please note, a small refundable deposit applies to keep you motivated throughout the 8 weeks)"
        },
        {  
            "type": "message",  
            "text": "The challenge is starting Monday 12th of June and to start your 8 Week Bikini Challenge, we just require you to attend the upcoming information meeting at the facility to quickly go over the program in person. \n\
\n\
There is absolutely no high pressure sales or obligation to join. Simply a meet and chat.\n\
\n\
To RSVP to the meeting click a suitable date below"
        },
        {
            "type" : "json",
            "template" : "init_8wbc"
        }
    ],
    "INIT_9IN6" : [
        {
            "type" : "message",
            "text" : "Thank you {{first_name}},\n\
The 9in6 Transformation Challenge is a done for you - step by step PROVEN program that helps you lose 9kg kilos of unwanted body fat, flatten your tummy and tone your arms, legs and butt in just 6 weeks.\n\
            \
\nThis is your chance to transform your body in just 6 weeks for FREE!"
        },
        {
            "type" : "message",
            "text" : "In exchange for the program, we ask that you allow us to showcase your transformation story on our Facebook fan page for marketing purposes to help motivate and inspire the ladies of Perth. When you complete the program its FREE. \n\
Please note, a small refundable \"incentive deposit\" applies to keep you motivated throughout the 6 weeks."
        },
        {
            "type" : "message",
            "text" : "The challenge is starting Monday 12th of June and to start your 9kg 6-week challenge, we require you to attend the upcoming information meeting where we explain the program in person. \n\
            \n\
There is absolutely no high pressure sales or obligation to join at the end, just an opportunity for you learn about the program and how you can lose 9kg in 6 weeks for FREE\n\
            \n\
To RSVP to the meeting click a suitable date below"
        },
        {
            "type" : "json",
            "template" : "init_9in6"
        }
    ],
    "TIME_TABLE_8WBC" : [
        {
            "type" : "message",
            "text" : "Sure here's our lesson time table.."
        },
        {
            "type" : "file",
            "url"  : "http://thetransformationcentre.com.au/img/timetable.pdf"
        },
        {
            "type" : "json",
            "template" : "init_8wbc"
        }
    ]
}

def build_json_templates():
    JSON_TEMPLATES = {
        "init" :{
            "template_type" : "generic",
            "elements" : [
                {
                    "title" : "The Transformation Centre",
                    "image_url" : "http://thetransformationcentre.com.au/img/spinner/1.png",
                    "subtitle":"Choose one of our Challenges below",
                    "buttons":[
                        {
                        "type":"postback",
                            "payload":"INIT_8WBC",
                            "title":"8 Week Bikini Challenge"
                        },{
                            "type":"postback",
                            "title":"9kg 6 Week Challenge",
                            "payload":"INIT_9IN6"
                        }
                    ]
                }
            ]
        },
        "init_8wbc" : {
            "template_type" : "generic",
            "elements" : [
                {
                    "title" : "8 Week Bikini Challenge Meeting",
                    "subtitle":"RSVP by clicking a suitable data below",
                    "buttons":[
                        # {
                        # "type":"postback",
                        #     "payload":"BOOK_CONSULT_8WBC_DATE_" + days.getAppointmentDates(1)[2] + "_DAY_" + days.getAppointmentDates(1)[0] + "_TIME_" + days.getAppointmentTimesForDay(days.getAppointmentDates(1)[0])[1],
                        #     "title":days.getAppointmentDates(1)[0].title() + " " + days.getAppointmentTimesForDay(days.getAppointmentDates(1)[0])[0] + " " + days.getAppointmentDates(1)[1]
                        # }
                        # },
                        {
                            "type":"postback",
                            "title": "Sat 10th June 09.45",
                            "payload":"BOOK_CONSULT_8WBC_DATE_10.05.2017_DAY_SATURDAY_TIME_0945"
                        }
                    ]
                }
            ]
        },
        "init_9in6" : {
            "template_type" : "generic",
            "elements" : [
                {
                    "title" : "9kg 6 Week Challenge Info Meeting",
                    "subtitle":"RSVP by clicking a suitable date below",
                    "buttons":[
                        # {
                        # "type":"postback",
                        #     "payload":"BOOK_CONSULT_9KG6WK_DATE_" + days.getAppointmentDates(1)[2] + "_DAY_" + days.getAppointmentDates(1)[0] + "_TIME_" + days.getAppointmentTimesForDay(days.getAppointmentDates(1)[0])[1],
                        #     "title":days.getAppointmentDates(1)[0].title() + " " + days.getAppointmentTimesForDay(days.getAppointmentDates(1)[0])[0] + " " + days.getAppointmentDates(1)[1]
                        # }
                        {
                            "type":"postback",
                            "title": "Sat 10th June 09.45",
                            "payload":"BOOK_CONSULT_8WBC_DATE_10.05.2017_DAY_SATURDAY_TIME_0945"
                        }
                        # ,{
                        #     "type":"postback",
                        #     "title": days.getAppointmentDates(2)[0].title() + " " + days.getAppointmentTimesForDay(days.getAppointmentDates(2)[0])[0] + " " + days.getAppointmentDates(2)[1],
                        #     "payload":"BOOK_CONSULT_9KG6WK_DATE_" + days.getAppointmentDates(2)[2] + "_DAY_" + days.getAppointmentDates(2)[0] + "_TIME_" + days.getAppointmentTimesForDay(days.getAppointmentDates(2)[0])[1]
                        # }
                    ]
                }
            ]
        }
    }
    return JSON_TEMPLATES