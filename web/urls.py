from django.urls import path
from django.conf.urls import url
from django.contrib.auth import views as auth_views

from .dl import reiwaydl
from .dl import ydl



#https://docs.djangoproject.com/en/2.2/topics/http/urls/

urlpatterns = [
    
    #"path('', views_index.index, name='index'),
    
   # url(r'show_progress', ydl.show_progress),
    path('',reiwaydl.homepage,name='homepage'),


]
