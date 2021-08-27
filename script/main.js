'use strict';

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]"); //selecionando todo id que contém "tecla"
const operadores = document.querySelectorAll("[id*=operador]"); //selecionando todo id que contém "operador"

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`); //o eval substitui todo o comando de switch case abaixo nesse caso
        atualizarDisplay(resultado);
/*        switch(operador) {
           case "+" : atualizarDisplay(numeroAnterior + numeroAtual); break;
           case "-" : atualizarDisplay(numeroAnterior - numeroAtual); break;
           case "/" : atualizarDisplay(numeroAnterior / numeroAtual); break;
           case "*" : atualizarDisplay(numeroAnterior * numeroAtual); break;
       }
 */

    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent= texto.toLocaleString('BR'); //limpar a tela e adicionar novo número
        novoNumero = false;
    } else {
        display.textContent += texto; //concatenando os números no display
    } 
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent); //inserindo os números no display
numeros.forEach(numero => numero.addEventListener("click", inserirNumero));

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
};
operadores.forEach(operador => operador.addEventListener("click", selecionarOperador));

const ativarigual = () => { //faz com que chame a func calcular sem que dê divergencias de cálculos, colocando o operador como undefined
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarigual);

const limparDisplay = () => display.textContent = ""; //a arrow function não precisa de chaves se tiver somente uma ação 
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);//vai limpar somente o display, a conta continua (CE)

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo); //vai zerar o cálculo inteiro (C)

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1); //slice é um método de array
document.getElementById('backspace').addEventListener('click', removerUltimoNumero); //remove o ultimo número

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal); //faz o positivo virar negativo e vice versa

const existeDecimal = () => display.textContent.indexOf(',') != -1; //indexof procura uma string que declaramos, nesse caso procura a virgula quando for diferente de -1
const existeValor = () => display.textContent.length > 0; // verifica se existe um valor maior que 0 
const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal); //vai fazer o número virar decimal

const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '.'         : 'decimal',
    ','         : 'decimal',
    '+'         : 'operadorAdicionar',
    '-'         : 'operadorSubtrair',
    '*'         : 'operadorMultiplicar',
    '/'         : 'operadorDividir',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo', //Esc

}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1;

    if(teclaPermitida()){
        document.getElementById(mapaTeclado[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);