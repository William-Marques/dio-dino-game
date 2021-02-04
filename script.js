const dino = document.querySelector('.dino');
const segundoPlano = document.querySelector('.segundoPlano');
let estaPulando = false;
let posicao = 0;

function lidarPressionamento(event){
    if (event.keyCode === 32){
        if (!estaPulando){
        pular();
        }
    }
}

function pular(){


    estaPulando = true;

    let intervaloSubida = setInterval(() =>{
        if (posicao >= 150){
            clearInterval(intervaloSubida);

            //Descendo
            let intervaloDescida = setInterval(() => {
                if (posicao <= 0){
                    clearInterval(intervaloDescida);
                    estaPulando = false;
                } else {
                posicao -= 20;
                dino.style.bottom = posicao + 'px';
                }
            }, 20);
        } else {
        //Subindo
        posicao += 20;
        dino.style.bottom = posicao + 'px';
    }
    }, 20);
}

function criarCactus(){
    const cactus = document.createElement('div');
    let posicaoCactus = 1000;
    let tempoAleatorio = Math.random() * 6000; //tempo para recriaçao dos cactus
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    segundoPlano.appendChild(cactus);

    let intervaloEsquerda = setInterval(() => {
        if (posicaoCactus < -60) {
            clearInterval(intervaloEsquerda);
            segundoPlano.removeChild(cactus);
        } else if (posicaoCactus > 0 && posicaoCactus < 60 && posicao < 60) {
            // Game Over            
            clearInterval(intervaloEsquerda);
            document.body.innerHTML = '<h1 class="fim-de-jogo">Fim de jogo</h1>';
        } else {
            posicaoCactus -= 10; //velocidade do jogo, numero maior mas dificil
            cactus.style.left = posicaoCactus + 'px';
        }
    }, 20);

    setTimeout(criarCactus, tempoAleatorio);
}

criarCactus();
document.addEventListener('keyup', lidarPressionamento);