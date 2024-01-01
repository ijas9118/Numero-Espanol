let randomNumber;
function updateRange() {
    const rangeValue = document.getElementById('numberRange').value;
    document.getElementById('selectedRange').textContent = `Selected Range: ${rangeValue}`;
}
function updateDisplayedNumber() {
    var rangeValue = document.getElementById("numberRange").value;
    // randomNumber = Math.floor(Math.random() * (parseInt(rangeValue) + 1));
    randomNumber = 703;
    document.querySelector(".number-text").innerText = randomNumber;
    document.getElementById("userInput").value = "";
}

function handleSubmit() {
    var userInput = document.getElementById("userInput").value;
    var correctSpanishName = getCorrectSpanishName(randomNumber);
    
    updateResultSection(randomNumber, correctSpanishName, userInput);
    document.getElementById("resultContainer").scrollIntoView({ behavior: "smooth" });
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

        if (number >= 20 && number <= 99 && number % 10 === 0) {
            return tens[number / 10];
        } else {
            let thousandDigit, remainder;
            if (number < 20) {
                return units[number];
            }
            else if (number < 100) {
                thousandDigit = number % 10;
                remainder = Math.floor(number / 10);
        
                // Handle the case for 21-29
                if (remainder === 2) {
                    return "veinti" + units[thousandDigit];
                } else {
                    return tens[remainder] + (thousandDigit !== 0 ? " y " + units[thousandDigit] : "");
                }
            } else if (number < 1000) {
                thousandDigit = Math.floor(number / 100);
                remainder = number % 100;
        
                if (remainder >= 21 && remainder <= 29) {
                    return units[thousandDigit] + "cientos veinti" + units[remainder % 10];
                } else if (remainder >= 1 && remainder <= 99) {
                    return "ciento " + getCorrectSpanishName(remainder % 100);
                } else {
                    if (number === 100)
                        return 'Cien';
                    if (remainder === 0)
                        return units[thousandDigit] + "cientos";
                    return units[thousandDigit] + "cientos " + getCorrectSpanishName(remainder);
                }
            } else {
                return "mil";
            }
        }
        
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("numberRange").addEventListener("input", updateRange);
    document.getElementById("submitBtn").addEventListener("click", handleSubmit);
    window.addEventListener("load", updateDisplayedNumber);
});