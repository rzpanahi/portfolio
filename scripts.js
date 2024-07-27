document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.querySelector(".input");
    const outputElement = document.querySelector(".output");

    // Display initial message
    const initialMessage = document.createElement("div");
    initialMessage.innerHTML =
        'Welcome to the Linux Terminal Simulation!<br>Type "help" for additional info.';
    outputElement.appendChild(initialMessage);

    let isInitialMessageCleared = false;

    inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = inputElement.value;
            executeCommand(command);
            inputElement.value = "";
        }
    });

    const executeCommand = (command) => {
        const commandElement = document.createElement("div");
        commandElement.textContent = `$ ${command}`;
        commandElement.classList.add("command");
        outputElement.appendChild(commandElement);

        let response = "";

        switch (command) {
            case "clear":
                outputElement.innerHTML = "";
                break;
            case "skills":
                response =
                    "Python\nDjango & Django Rest Framework\nGit & Github\nLinux";
                break;
            case "about":
                response =
                    "Hi, my name is Reza Panahi, I am a self-thought back-end developer skilled in python and django.";
                break;
            case "help":
                response =
                    "Supported commands: \nskills: show Reza Panahi's thechnical skills\nabout: show Reza Panahi's work bio";
                break;
            default:
                response = `command not found: ${command}`;
        }

        // Replace new line characters with <br> elements for HTML rendering
        response = response.replace(/\n/g, "<br>");

        const responseElement = document.createElement("div");
        responseElement.innerHTML = response;
        responseElement.classList.add("response");
        outputElement.appendChild(responseElement);
        outputElement.scrollTop = outputElement.scrollHeight;
    };
});
