let timer;
let tempoInicial = 25 * 60; // Fixo em 25 minutos
let tempoRestante = tempoInicial;
let rodando = false;

const display = document.getElementById('timer');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');

function atualizarDisplay() {
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;
    display.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

function iniciarTimer() {
    if (rodando) return;
    rodando = true;
    timer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(timer);
            rodando = false;
            alert("Sessão finalizada! Aproveite para dar atenção ao seu pet.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
    rodando = false;
}

function resetarTimer() {
    clearInterval(timer);
    rodando = false;
    tempoRestante = tempoInicial;
    atualizarDisplay();
}

btnStart.addEventListener('click', iniciarTimer);
btnPause.addEventListener('click', pausarTimer);
btnReset.addEventListener('click', resetarTimer);

// Inicialização
atualizarDisplay();
