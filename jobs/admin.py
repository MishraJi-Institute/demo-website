from django.contrib import admin
from .models import Company, Job, Profile


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'industry', 'location', 'created_at')
    search_fields = ('name', 'industry', 'location')


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'company',
        'job_type',
        'location',
        'is_active',
        'posted_at'
    )
    list_filter = ('job_type', 'is_active')
    search_fields = ('title', 'company__name', 'location', 'skills')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'location', 'experience')
    search_fields = ('full_name', 'location', 'skills')