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
            'autoplay': 1,
            'mute': 1,
            'loop': 1,
            'playlist': 'WMzpO9i3nlc', // Necessário para fazer o loop de vídeo único
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
    event.target.playVideo();
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
    timer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplay();
        } else {
            clearInterval(timer);
            rodando = false;
            alert("Sessão terminada! Dê um pouco de atenção ao seu pet.");
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

// Inicializar o visor
atualizarDisplay();
