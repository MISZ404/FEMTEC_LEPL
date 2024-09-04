let currentCase = 1;  // Inicia com o primeiro estudo de caso
let totalScore = 0;   // Armazena a pontuação total do candidato
let penalties = 0;    // Armazena as penalidades aplicadas por estourar o tempo
let timer;            // Armazena o identificador do temporizador

function startTimer() {
    let timeLeft = 30;  // Define 30 segundos para responder
    console.log(`Iniciando timer para Estudo de Caso ${currentCase}`);
    
    const currentElement = document.getElementById(`case${currentCase}`);
    if (currentElement) {
        currentElement.style.display = 'block';  // Exibe o estudo de caso atual
    } else {
        console.error(`Elemento case${currentCase} não encontrado!`);
        return;
    }

    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            penalties += 3;
            alert(`Tempo esgotado no Estudo de Caso ${currentCase}! 3 pontos serão deduzidos.`);
            moveToNextCase();
        }
    }, 1000);
}

function moveToNextCase() {
    const currentElement = document.getElementById(`case${currentCase}`);
    if (currentElement) {
        currentElement.style.display = 'none';  // Esconde o estudo de caso atual
    } else {
        console.error(`Elemento case${currentCase} não encontrado ao tentar esconder!`);
        return;
    }

    currentCase++;
    if (currentCase <= 10) {  // Se ainda houver estudos de caso, continua
        startTimer();
    } else {
        calculateResults();  // Se terminou todos os estudos de caso, calcula os resultados
    }
}

function calculateResults() {
    const formData = new FormData(document.getElementById('interviewForm'));

    for (let value of formData.values()) {
        totalScore += parseInt(value);
    }

    totalScore -= penalties;

    let resultMessage = '';
    if (totalScore >= 40) {
        resultMessage = 'Parabéns! Você foi aceito.';
    } else {
        resultMessage = 'Infelizmente, você não foi aceito desta vez.';
    }

    document.getElementById('result').innerText = resultMessage;

    const email = "amanda.araujo1@prof.ce.gov.br";
    const subject = "Respostas da Entrevista Remota";
    const body = `Pontuação total: ${totalScore}\nPenalidades: ${penalties}\n\nRespostas:\n${Array.from(formData.entries()).map(([key, value]) => key + ': ' + value).join('\n')}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.getElementById('interviewForm').onsubmit = function () {
    clearInterval(timer);  // Para o temporizador ao submeter
    moveToNextCase();      // Move para a próxima questão ou finaliza se for a última
    return false;          // Evita o envio do formulário tradicional
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById(`case${currentCase}`).style.display = 'block';  // Exibe o primeiro estudo de caso ao carregar a página
    startTimer();  // Inicia o temporizador
});
