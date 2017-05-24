import datetime
import pytz
import config

days_closed = config.days_closed
days_open = config.days_open
days = config.days
times = config.times
timezone = config.timezone

def getAppointmentDates(add_days):
    dateday = datetime.datetime.now(pytz.timezone(timezone)).date() + datetime.timedelta(days=add_days)
    closed = True
    match = add_days
    count = 0
    found = False
    while count < match:
        dateday = datetime.datetime.now(pytz.timezone(timezone)).date() + datetime.timedelta(days=add_days)
        day = dateday.weekday()
        if days[day] in days_open:
            count += 1
        else:
            add_days += 1
    date = str(dateday.day) + "/" + str(dateday.month)
    crmdate = str(dateday.day) + "." + str(dateday.month) + "." + str(dateday.year)
    return [days[day], date,crmdate]

def getAppointmentTimesForDay(day):
    day = day.upper()
    app_times = times[day]
    return app_times

def getAppointmentDateAsDate(day):
    day = day.upper()
    number_day = 0
    for i in days:
        if day == i:
            break
        else:
            number_day += 1
    add_days = 0
    date = datetime.datetime.now(pytz.timezone("Australia/Perth")).date() + datetime.timedelta(days=add_days)
    while (datetime.datetime.now(pytz.timezone("Australia/Perth")).date() + datetime.timedelta(days=add_days)).weekday() != number_day:
        add_days += 1
        date = datetime.datetime.now(pytz.timezone("Australia/Perth")).date() + datetime.timedelta(days=add_days)
    return date