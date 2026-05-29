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

// Função para iniciar a playlist em uma posição de vídeo aleatória (ex: entre os 5 primeiros vídeos)
function inicializarPlaylistAleatoria() {
    if (iframe) {
        // Escolhe um número aleatório de 0 a 4 para alternar a música inicial da playlist
        const indiceAleatorio = Math.floor(Math.random() * 5);
        const srcAtual = iframe.src;
        iframe.src = srcAtual + "&index=" + indiceAleatorio;
    }
}

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

    // Dá play no vídeo e ativa o som (unMute) automaticamente
    controlarVideo("playVideo");
    controlarVideo("unMute");

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

// Inicializar a tela do contador e aplicar aleatoriedade à playlist
atualizarDisplay();
window.addEventListener('DOMContentLoaded', inicializarPlaylistAleatoria);


// ==========================================
// FUNÇÃO INTELIGENTE DE SALVAR NOS FAVORITOS
// ==========================================
const btnFavoritos = document.getElementById('btn-favoritos');
const alertaFavoritos = document.getElementById('alerta-favoritos');

btnFavoritos.addEventListener('click', (e) => {
    const url = window.location.href;
    const titulo = document.title;
    
    // Detecta o sistema operacional do usuário
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let mensagem = "";

    if (isMobile) {
        mensagem = "Toque nos 3 pontinhos (ou compartilhar) e selecione 'Adicionar aos favoritos' ou 'Tela inicial'.";
    } else if (isMac) {
        mensagem = "Pressione ⌘ + D no teclado para salvar nos favoritos.";
    } else {
        mensagem = "Pressione Ctrl + D no teclado para salvar nos favoritos.";
    }

    // Tenta invocar a janela nativa do navegador para salvar (padrão legados)
    try {
        if (window.sidebar && window.sidebar.addPanel) { 
            window.sidebar.addPanel(titulo, url, "");
        } else if (window.external && ('AddFavorite' in window.external)) { 
            window.external.AddFavorite(url, titulo);
        } else {
            throw new Error();
        }
        alertaFavoritos.textContent = "Adicionado com sucesso!";
    } catch (err) {
        // Se o navegador bloquear o script (comum hoje em dia), exibe a mensagem de atalho correta
        alertaFavoritos.textContent = mensagem;
    }

    // Mostra o alerta com transição suave e esconde após 6 segundos
    alertaFavoritos.style.opacity = "1";
    setTimeout(() => {
        alertaFavoritos.style.opacity = "0";
    }, 6000);
});
