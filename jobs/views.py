from django.shortcuts import render
from django.db.models import Q

from .models import Job


def home(request):

    jobs = Job.objects.filter(
        is_active=True
    ).order_by('-posted_at')

    # Search values
    keyword = request.GET.get('keyword', '').strip()
    location = request.GET.get('location', '').strip()

    # Keyword search
    if keyword:
        jobs = jobs.filter(
            Q(title__icontains=keyword) |
            Q(skills__icontains=keyword) |
            Q(description__icontains=keyword) |
            Q(company__name__icontains=keyword)
        )

    # Location search
    if location:
        jobs = jobs.filter(
            location__icontains=location
        )

    context = {
        'jobs': jobs,
        'keyword': keyword,
        'location': location,
    }

    return render(request, 'jobs/home.html', context)