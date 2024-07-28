from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CommandSerializer
from .commands import COMMANDS


class ExecuteCommandView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CommandSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        command = serializer.validated_data["command"].strip()
        if command == "clear":
            return Response({"output": ""})

        response = COMMANDS.get(command, f"{command}: command not found")
        return Response({"output": response})


def index(request):
    return render(request, "index.html")
