
//let titulo= document.querySelector("h1");
//titulo.innerHTML = "Jodo de Advinhação";

//let paragrafo= document.querySelector("p");
//paragrafo.innerHTML= "Escolha um número de 1 até 20";

//Lista dos numeros que já foram sorteados.
let listaDeNumerosSorteados = [];
let numeroMaximo= 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas= 1;

//FUNÇÃO COM PARÂMETROS
function exibirTexto(tag, texto){
    let tela= document.querySelector(tag)
    tela.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}
exibirTexto("h1" , "Jogo de Advinhação");
exibirTexto("p" , "Escolha um número de 1 até 20");
//Uma boa prática mais resumida para a fazer a mesma coisa do texto acima.

function clicarNoChute(){
    let chute = document.querySelector("input"). value
    if(chute==numeroSecreto){
        let palavraTentativa = tentativas > 1 ? "tentativas": "tentativa";
        let mensagemTentativa = `Voçê descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto("h1", "Acertou");
        exibirTexto("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if(chute > numeroSecreto){
            exibirTexto("h1", "Errou");
            exibirTexto("p", "O número secreto é menor");
        }else{
            exibirTexto("h1", "Errou");
            exibirTexto("p", "O número secreto é maior");
        }
    }tentativas++ 
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * 20 + 1);
    let quantidadeDeNumerosNaLista= listaDeNumerosSorteados.length;
    if(quantidadeDeNumerosNaLista==numeroMaximo){
        listaDeNumerosSorteados=[];
    }
//A lista de numeros sorteados já possui algum número escolhido?
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
//Vamos pedir que um novo número seja gerado caso o número escolhido já esteja na lista.
        return gerarNumeroAleatorio();      
    }else{
//Se não o numero ainda não foi sorteado vamos retornar o numero escolhido.
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limpe(){
    chute= document.querySelector("input");
    chute= " ";
}

function exibirMensagemInicial(){
    exibirTexto("h1" , "Jogo de Advinhação");
    exibirTexto("p" , "Escolha um número de 1 até 20");
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limpe();
    tentativas= 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}