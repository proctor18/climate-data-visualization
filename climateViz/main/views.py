from django.shortcuts import render, redirect
from django.views import generic



def index(request):
    """
    View function for homepage
    """
    context = {}


    return render(request, 'index.html', context=context)

