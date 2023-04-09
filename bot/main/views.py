from django.shortcuts import render
from datetime import datetime
import calendar

# Create your views here.
def home(request):
    now = datetime.now()
    month = now.strftime("%B")
    year = now.strftime("%Y")
    month_days = []
    for i in range(1, calendar.monthrange(int(year), int(now.month))[1] + 1):
        month_days.append(i)
    context ={
        "this_month": month,
        "this_year": year,
        "days_list": month_days,
    }
    return render(request, "main.html", context)

def get_date_info(request):
    chosen_month = request.GET.get("month")
    chosen_day = request.GET.get("day")
    chosen_date_string = f"{chosen_month} {chosen_day} {2023}"
    chosen_date = datetime.strptime(chosen_date_string, "%B %d %Y")
    now = datetime.now()
    month = chosen_date.strftime("%B")
    year = now.strftime("%Y")
    month_days = []
    for i in range(1, calendar.monthrange(int(year), int(now.month))[1] + 1):
        month_days.append(i)
    context = {
        "day": chosen_day,
        "this_month": month,
        "this_year": year,
        "days_list": month_days,
        "note": "This is a note",
    }
    return render(request, "date_info.html", context)

def add_new_note(request):
    now = datetime.now()
    note = request.POST.get("note")