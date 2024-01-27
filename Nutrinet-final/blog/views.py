from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .models import Post
from users.models import Profile
from django.views.generic import ListView,DetailView,CreateView,UpdateView,DeleteView
from django.contrib.auth.decorators import login_required
from plotly.offline import plot
from plotly.graph_objs import Scatter
from django.contrib import messages
import plotly.express as px
from users.forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
import openai
import plotly.graph_objects as go
import pandas as pd


openai.api_key = "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"


def graph(request):
    df = pd.read_csv('blog/Graph_plotter/bpm.csv')
    fig = go.Figure([go.Scatter(x=df['Time'], y=df['Value'])])
    fig.show()
    return redirect('blog-home')

def generate_response(data):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=f"You are a medical expert, who is professional in providing suggestions in mental health, diet and exercise. Give me a detailed advice, including analysis of data, diet improvements, exercise suggestions, and other additional deductions based on given information point vice  and also write in a tone like you are talking to a patient, happy gentle tone and max 300 words as well in paragraphs with pointers. - {data}",
        max_tokens=1000,
        temperature=0.7,
    )
    return response.choices[0].text.strip()

def chat_view(request):
    if request.method == 'POST':
        # Extract all form inputs
        avg = request.POST.get('avg', '')
        t_high = request.POST.get('t_high', '')
        height = request.POST.get('height', '')
        weight = request.POST.get('weight', '')
        age = request.POST.get('age', '')
        glv = request.POST.get('glv', '')
        spo = request.POST.get('spo', '')
        his = request.POST.get('his', '')

        # Combine all inputs into a single string, separated by space or any character you prefer
        data = f'{avg},{t_high},{height},{weight},{age},{glv},{spo},{his}'

        # Get chat history from the form or initialize if not present
        chat_history = request.POST.get('chat_history', '')

        # Generate the response based on the combined data
        response = generate_response(data)

        # Append the response to the chat history with the heading "NutriBot"
        chat_history += f'\n{response}\n' + '-'*48  # Dotted line separator

        return render(request, 'blog/home.html', {'chat_history': chat_history})

    return render(request, 'blog/home.html', {'chat_history': ''})

@login_required
def home(request):
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

    try:
        profile_instance = request.users.profile
    except Profile.DoesNotExist:
        profile_instance = None
    context = {
        'title': 'Home',
        'u_form': u_form,
        'p_form': p_form,
        'profile_instance': profile_instance,
    }
    return render(request, 'blog/home.html',context)


class PostListView(ListView):
    model = Post
    fields = '__all__'
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']


class PostDetailView(DetailView):
    model = Post
    fields = '__all__'


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)


class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content']

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin,DeleteView):
    model = Post
    success_url = "/blog"

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


@login_required
def about(request):
    return render(request, 'blog/about.html',{'title':'About'})
