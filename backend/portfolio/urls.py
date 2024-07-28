from django.contrib import admin
from django.urls import path, include

from terminal.views import index, ExecuteCommandView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/execute/", ExecuteCommandView.as_view(), name="execute_command"),
    path("", index, name="index"),
]
