// ==========================================
// 1. LÓGICA DO PLAYER DO YOUTUBE (API OFICIAL)
// ==========================================

// Carrega o script da API de forma assíncrona
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'WMzpO9i3nlc', // ID do seu vídeo de 48 min
        playerVars: {
            'autoplay': 0, // Inicia pausado para esperar o clique do usuário
            'mute': 1,     // Mantém mudo inicialmente para garantir que o navegador permita o play via código
            'loop': 1,
            'playlist': 'WMzpO9i3nlc',
            'controls': 1,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player pronto e aguardando os comandos dos botões do Pomodoro
}

// ==========================================
// 2. LÓGICA DO CRONÔMETRO POMODORO (25 MIN)
// ==========================================
let timer;
let tempoInicial = 25 * 60; 
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

    // Dá o PLAY no vídeo automaticamente ao começar o foco
    if (player && typeof player.playVideo === 'function') {
        player.playVideo();
    }

    timer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(timer);
            rodando = false;
            
            // Pausa o vídeo quando o tempo acaba
            if (player && typeof player.pauseVideo === 'function') {
                player.pauseVideo();
            }
            
            alert("Sessão terminada! Dê um pouco de atenção ao seu pet.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
    rodando = false;

    // Pausa o vídeo automaticamente se o usuário pausar o Pomodoro
    if (player && typeof player.pauseVideo === 'function') {
        player.pauseVideo();
    }
}

function resetarTimer() {
    clearInterval(timer);
    rodando = false;
    tempoRestante = tempoInicial;
    atualizarDisplay();

    // Pausa e reinicia o vídeo se o usuário resetar o cronômetro
    if (player && typeof player.stopVideo === 'function') {
        player.stopVideo();
    }
}

btnStart.addEventListener('click', iniciarTimer);
btnPause.addEventListener('click', pausarTimer);
btnReset.addEventListener('click', resetarTimer);

// Inicializar o visor
atualizarDisplay();
