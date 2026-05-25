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

// Comandos diretos de controle de mídia para o Iframe
function controlarVideo(acao) {
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: acao
        }), "*");
    }
}

function iniciarTimer() {
    if (rodando) return;
    rodando = true;

    // Dá play no vídeo automaticamente eliminando o duplo clique do usuário
    controlarVideo("playVideo");

    timer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(timer);
            rodando = false;
            
            // Pausa o vídeo quando os 25 minutos chegam a zero
            controlarVideo("pauseVideo");
            
            alert("Sessão terminada! Dê um pouco de atenção ao seu pet.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
    rodando = false;
    
    // Pausa o vídeo se o usuário pausar o fluxo de trabalho
    controlarVideo("pauseVideo");
}

function resetarTimer() {
    clearInterval(timer);
    rodando = false;
    tempoRestante = tempoInicial;
    atualizarDisplay();
    
    // Para e reseta o vídeo de fundo
    controlarVideo("stopVideo");
}

btnStart.addEventListener('click', iniciarTimer);
btnPause.addEventListener('click', pausarTimer);
btnReset.addEventListener('click', resetarTimer);

// Inicializar a tela do contador
atualizarDisplay();
