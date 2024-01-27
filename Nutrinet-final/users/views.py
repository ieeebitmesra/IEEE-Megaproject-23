from django.shortcuts import render, redirect
from django.contrib.auth import logout,login,authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from .models import Profile
from plotly.offline import plot
from plotly.graph_objs import Scatter


def register(request):
    if request.method == 'POST':
        form=UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request,f'Your account has been created successfully!')
            return redirect('login')
    else:
        form = UserRegisterForm()

    return render(request,'users/register.html',{'form':form})

@login_required
def logout_user(request):
    logout(request)
    messages.success(request,"You have been logged out..")
    return redirect('login')

@login_required
def profile(request):
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST,
                                   request.FILES,
                                   instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Your account has been updated successfully!')
            return redirect('profile')
        else:
            u_form = UserUpdateForm(instance=request.user)
            p_form = ProfileUpdateForm(instance=request.user.profile)

        profile_instance = Profile.objects.get(user = request.user)
        context = {
            'u_form': u_form,
            'p_form': p_form,
            'height': profile_instance.height,
            'weight': profile_instance.weight,
            'age': profile_instance.age,
        }
        return render(request, 'users/profile.html', context)


def homepage(request):
    return render(request, 'users/homepage.html')

