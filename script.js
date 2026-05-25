// ==========================================
// LÓGICA DO CRONÔMETRO POMODORO (25 MIN)
// ==========================================
let timer;
let tempoInicial = 25 * 60; 
let tempoRestante = tempoInicial;
let rodando = false;

const display = document.getElementById('timer');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnReset = document.getElementById('reset');
const iframe = document.getElementById('video-player');

function atualizarDisplay() {
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;
    display.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

// Funções para controlar o vídeo do YouTube remotamente
function darPlayNoVideo() {
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
}

function pausarNoVideo() {
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
}

function pararNoVideo() {
    if (iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
}

function iniciarTimer() {
    if (rodando) return;
    rodando = true;

    // Dispara o vídeo do YouTube ao mesmo tempo que inicia o cronômetro
    darPlayNoVideo();

    timer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(timer);
            rodando = false;
            
            // Pausa o vídeo no fim dos 25 minutos
            pausarNoVideo();
            
            alert("Sessão terminada! Dê um pouco de atenção ao seu pet.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
    rodando = false;
    
    // Pausa o vídeo se o usuário pausar o foco
    pausarNoVideo();
}

function resetarTimer() {
    clearInterval(timer);
    rodando = false;
    tempoRestante = tempoInicial;
    atualizarDisplay();
    
    // Para o vídeo se o usuário resetar
    pararNoVideo();
}

btnStart.addEventListener('click', iniciarTimer);
btnPause.addEventListener('click', pausarTimer);
btnReset.addEventListener('click', resetarTimer);

// Inicializar o visor
atualizarDisplay();
