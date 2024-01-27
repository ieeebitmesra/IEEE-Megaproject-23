from django.urls import path
from . import views
from .views import PostListView, PostDetailView, PostCreateView,PostUpdateView,PostDeleteView, chat_view, graph
urlpatterns = [
    path('', chat_view, name='blog-home'),
    path('graph/', graph, name='graph'),
    path('post/<int:pk>/', PostDetailView.as_view(),name='post-detail'),
    path('post/<int:pk>/update/', PostUpdateView.as_view(),name='post-update'),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(),name='post-delete'),
    path('post/new/', PostCreateView.as_view(),name='post-create'),
    path('glucosegraph/', views.graph, name='glucose-graph'),
    path('about/', views.about, name='blog-about')
]