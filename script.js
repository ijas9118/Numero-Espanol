let randomNumber;
function updateRange() {
    const rangeValue = document.getElementById('numberRange').value;
    document.getElementById('selectedRange').textContent = `Selected Range: ${rangeValue}`;
    updateDisplayedNumber();
}
function updateDisplayedNumber() {
    var rangeValue = document.getElementById("numberRange").value;
    randomNumber = Math.floor(Math.random() * (parseInt(rangeValue) + 1));
    document.querySelector(".number-text").innerText = randomNumber;
    document.getElementById("userInput").value = "";
}

function handleSubmit() {
    var userInput = document.getElementById("userInput").value.trim();
    var correctSpanishName = getCorrectSpanishName(randomNumber);

    if (userInput === "")
        document.getElementById("warningMessage").innerText = "Please enter a value before submitting.";
    else {
        document.getElementById("warningMessage").innerText = "";
        updateResultSection(randomNumber, correctSpanishName, userInput);
        document.getElementById("resultContainer").scrollIntoView({ behavior: "smooth" });
    }
}

function updateResultSection(number, correctName, userInput) {
    var resultContainer = document.getElementById("resultContainer");
    if (userInput.toLowerCase() === correctName.toLowerCase()) {
        resultContainer.innerHTML = `
            <p><span>Number:</span> ${number}</p>
            <p><span>Correct Name:</span> ${correctName}</p>
            <p><span>Your Answer:</span> ${userInput}</p>
            <p class="correct"><span>Correct!</span></p>
        `;
    }
    else {
        resultContainer.innerHTML = `
            <p><span>Number:</span> ${number}</p>
            <p><span>Correct Name:</span> ${correctName}</p>
            <p><span>Your Answer:</span> ${userInput}</p>
            <p class="wrong"><span>Wrong!</span></p>
        `;
    }
}

function getCorrectSpanishName(number) {
    if (number === 0) {
        return "cero";
    } else {
        const units = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
        const tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
        let onceDigit, tensDigit, hundredsDigit, remainder;

        if (number < 20) 
            return units[number];
        if (number === 100)
            return 'Cien';
        
        if (number < 100) {
            onceDigit = number % 10;
            tensDigit = Math.floor(number/10);
            if (tensDigit === 2)
                return "Veinti" + units[onceDigit];
            else 
                return tens[tensDigit] + (onceDigit !== 0 ? " y " + units[onceDigit] : "");
        } else if (number < 1000) {
            hundredsDigit = Math.floor(number/100);
            remainder = number % 100;
            if (remainder >= 1 && remainder <= 99) {
                if (hundredsDigit != 1) {
                    if (hundredsDigit == 5)
                        return 'Quinientos ' + getCorrectSpanishName(remainder);
                    if (hundredsDigit == 7)
                        return 'Setecientos ' + getCorrectSpanishName(remainder);
                    if (hundredsDigit == 9)
                        return 'Novecientos ' + getCorrectSpanishName(remainder);
                    return units[hundredsDigit] + "cientos " + getCorrectSpanishName(remainder);
                }
                return "Ciento " + getCorrectSpanishName(remainder);
            }
            if (remainder == 0) {
                if (hundredsDigit == 5)
                    return 'Quinientos';
                if (hundredsDigit == 7)
                    return 'Setecientos';
                if (hundredsDigit == 9)
                    return 'Novecientos';
                return units[hundredsDigit] + "cientos";
            }
        }
        else
            return "mil";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("numberRange").addEventListener("input", updateRange);
    document.getElementById("submitBtn").addEventListener("click", handleSubmit);
    window.addEventListener("load", updateDisplayedNumber);
    document.getElementById("userInput").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    });
});