$(document).ready(function () {
    const $inputElement = $(".input");
    const $outputElement = $(".output");

    // Display initial message
    const initialMessage = $("<div>").html(
        'Welcome to the Linux Terminal Simulation!<br>Type "help" for additional info.'
    );
    $outputElement.append(initialMessage);

    $inputElement.on("keydown", function (event) {
        if (event.key === "Enter") {
            const command = $inputElement.val().trim();
            executeCommand(command);
            $inputElement.val("");
        }
    });

    const executeCommand = (command) => {
        if (command === "clear") {
            $outputElement.empty();
            return;
        }

        const commandElement = $("<div>")
            .text(`$ ${command}`)
            .addClass("command");
        $outputElement.append(commandElement);

        // Send the command to the server
        $.ajax({
            url: "/api/execute/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ command }),
            success: function (data) {
                const responseElement = $("<div>")
                    .html((data.output || "").replace(/\n/g, "<br>"))
                    .addClass("response");
                $outputElement.append(responseElement);
                $outputElement.scrollTop($outputElement[0].scrollHeight);
            },
            error: function (xhr, status, error) {
                console.error(`Error: ${error}`); // Log the error to the console
                const responseElement = $("<div>")
                    .html("An error occurred while processing your request.")
                    .addClass("response");
                $outputElement.append(responseElement);
                $outputElement.scrollTop($outputElement[0].scrollHeight);
            },
        });
    };
});
