let numbersToRemember = [];
let timer;

function generateRandomNumbers() {
  numbersToRemember = []; // Resetto i numeri
  const numbersDiv = document.getElementById("numbers");
  numbersDiv.innerHTML = ""; // Svuoto i numeri precedenti

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 1; // Numeri da 1 a 100
    numbersToRemember.push(randomNum);
    const colDiv = document.createElement("div");
    colDiv.className = "col"; // Aggiungo la classe per colonna
    colDiv.innerText = randomNum; // Visualizza il numero
    numbersDiv.appendChild(colDiv); // Aggiungo il numero alla riga
  }
}

function startGame() {
  generateRandomNumbers();
  document.getElementById("numbers").classList.remove("d-none"); // Mostra i numeri

  // Inizia il timer di 10 secondi
  timer = setTimeout(() => {
    document.getElementById("numbers").classList.add("d-none"); // Nascondo i numeri
    document.getElementById("input-title").classList.remove("d-none"); // Mostro il titolo per l'input
    document.getElementById("inputs").classList.remove("d-none"); // Mostro gli input
    document.getElementById("confirm-button").classList.remove("d-none"); // Mostro il bottone di conferma

    // Svuoto i campi di input
    const inputElements = document.querySelectorAll(".form-control");
    for (let i = 0; i < inputElements.length; i++) {
      inputElements[i].value = "";
    }
  }, 10000); // 10 secondi
}

function checkAnswers() {
  const inputs = [];
  const inputElements = document.querySelectorAll(".form-control");

  // Raccoglie i valori degli input in un array
  for (let i = 0; i < inputElements.length; i++) {
    const value = parseInt(inputElements[i].value);
    if (!isNaN(value)) {
      inputs.push(value);
    }
  }

  const correctAnswers = [];

  // Controlla quali numeri sono corretti
  for (let i = 0; i < numbersToRemember.length; i++) {
    if (inputs.includes(numbersToRemember[i])) {
      correctAnswers.push(numbersToRemember[i]);
    }
  }

  alert(
    `Hai indovinato ${correctAnswers.length} numeri: ${correctAnswers.join(
      ", "
    )}`
  );

  // Svuoto i campi di input
  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].value = "";
  }

  clearTimeout(timer); // Fermo il timer se l'utente clicca su "Conferma"
}

// Inizializzo il gioco all'apertura della pagina
window.onload = startGame;

// Aggiungo l'event listener al bottone "Conferma"
document
  .getElementById("confirm-button")
  .addEventListener("click", checkAnswers);
