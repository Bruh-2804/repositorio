// Variáveis globais
let secretNumber, totalExpenses = 0, timerInterval, seconds = 0, progressContext, progressCanvas;
let selectedWord, guessedLetters, attempts;
const words = ["javascript", "programacao", "desenvolvimento", "forca"];

// Jogo de Adivinhação
function checkGuess() {
    const guess = Number(document.getElementById('guess').value);
    const message = document.getElementById('message');
    const hint = document.getElementById('hint');

    if (guess === secretNumber) {
        message.textContent = "Parabéns! Você adivinhou!";
        hint.textContent = "";
    } else {
        message.textContent = guess < secretNumber ? "Muito baixo!" : "Muito alto!";
        hint.textContent = Math.abs(secretNumber - guess) <= 10 ? "Está muito perto!" : "";
    }
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('hint').textContent = '';
}

// Cronômetro
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
            updateProgress();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
    updateProgress();
}

function updateDisplay() {
    const display = document.getElementById('display');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateProgress() {
    const progress = document.getElementById('progress');
    progressContext = progress.getContext('2d');
    progressContext.clearRect(0, 0, progress.width, progress.height);
    
    const radius = progress.width / 2 - 10;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (seconds % 60) / 60);
    
    progressContext.beginPath();
    progressContext.arc(progress.width / 2, progress.height / 2, radius, startAngle, endAngle);
    progressContext.lineWidth = 10;
    progressContext.strokeStyle = '#007bff';
    progressContext.stroke();
}

// Calculadora de Gastos
function addExpense() {
    const salary = Number(document.getElementById('salary').value);
    const expense = Number(document.getElementById('expense').value);

    if (salary <= 0) {
        alert("Por favor, insira um salário válido.");
        return;
    }

    totalExpenses += expense;
    const remaining = salary - totalExpenses;

    document.getElementById('total').textContent = totalExpenses.toFixed(2);
    document.getElementById('remaining').textContent = remaining.toFixed(2);
    
    displayTips(remaining);
}

function displayTips(remaining) {
    const tipsElement = document.getElementById('tips');
    tipsElement.innerHTML = ''; // Limpar dicas anteriores

    if (remaining < 0) {
        tipsElement.textContent = "Você excedeu seu orçamento!";
    } else if (remaining < 100) {
        tipsElement.textContent = "Dica: Tente economizar nas despesas essenciais!";
    } else if (remaining < 500) {
        tipsElement.textContent = "Dica: Considere investir esse valor em uma conta de poupança.";
    } else {
        tipsElement.textContent = "Dica: Você pode usar esse dinheiro para investir em um curso ou hobby!";
    }
}



// Função para voltar
function goBack() {
    window.history.back();
}

// Iniciar o jogo de adivinhação ao carregar a página
resetGame();
startHangman();
