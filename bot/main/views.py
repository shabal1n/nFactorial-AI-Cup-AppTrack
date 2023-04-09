from django.http import HttpResponseRedirect
from django.shortcuts import render
from datetime import datetime
import calendar
from .models import Note, Image
from main.DiaryToImage import diary_to_images
from .models import save_images

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

    if Note.objects.filter(date=chosen_date):
        note = Note.objects.get(date=chosen_date)
        images = Image.objects.filter(note=note)
        context = {
            "day": chosen_day,
            "this_month": month,
            "this_year": year,
            "days_list": month_days,
            "note": note.note,
            "images": images,
        }
    else:
        context = {
            "day": chosen_day,
            "this_month": month,
            "this_year": year,
            "days_list": month_days,
        }
    return render(request, "date_info.html", context)

def add_new_note(request):
    return render(request, "add_note.html")

def add_note_to_db(request):
    if request.method == "POST":
        if Note.objects.filter(date=datetime.now().date()):
            new_note = Note.objects.get(date=datetime.now().date())
            new_note.note = request.POST.get('note')
            new_note.save()
        else:
            new_note = Note.objects.create(note=request.POST.get('note'), date=datetime.now())
            new_note.save()
        month_days = []
        for i in range(1, calendar.monthrange(int(2023), int(datetime.now().month))[1] + 1):
            month_days.append(i)
        context = {
            "day": datetime.now().day,
            "this_month": datetime.now().strftime("%B"),
            "this_year": 2023,
            "days_list": month_days,
            "note": new_note.note,
        }
        url_list = diary_to_images(new_note.note)
        save_images(url_list, new_note)
        return render(request, "date_info.html", context)