// ============================================================
//  Calculadora de Desconto
//  Lê o valor total de uma compra e retorna:
//    - o valor do desconto
//    - o total com desconto
//
//  Regras de desconto (faixas progressivas):
//    - Compra <  R$ 100,00        -> sem desconto (0%)
//    - Compra >= R$ 100,00        -> desconto de 5%
//    - Compra >= R$ 200,00        -> desconto de 10%
// ============================================================

// Constantes das faixas de desconto
const FAIXA_SEM_DESCONTO = 100; // abaixo deste valor: 0%
const FAIXA_5 = 100;            // a partir daqui: 5%
const FAIXA_10 = 200;           // a partir daqui: 10%

// Elementos do DOM
const form = document.getElementById("formCompra");
const inputValor = document.getElementById("valorCompra");
const resultado = document.getElementById("resultado");

const outValor = document.getElementById("outValor");
const outFaixa = document.getElementById("outFaixa");
const outPercentual = document.getElementById("outPercentual");
const outDesconto = document.getElementById("outDesconto");
const outTotal = document.getElementById("outTotal");

// Formata um número como moeda brasileira (R$)
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Calcula o percentual de desconto com base no valor da compra
function calcularPercentualDesconto(valor) {
  if (valor >= FAIXA_10) {
    return 10;
  }
  if (valor >= FAIXA_5) {
    return 5;
  }
  return 0;
}

// Retorna a descrição textual da faixa aplicada
function descreverFaixa(percentual) {
  if (percentual === 10) {
    return "Acima de R$ 200,00";
  }
  if (percentual === 5) {
    return "Entre R$ 100,00 e R$ 199,99";
  }
  return "Abaixo de R$ 100,00";
}

// Evento de envio do formulário
form.addEventListener("submit", function (evento) {
  // Evita o recarregamento da página
  evento.preventDefault();

  // Lê e converte o valor informado
  const valorCompra = parseFloat(inputValor.value);

  // Validação: valor precisa ser um número válido e positivo
  if (isNaN(valorCompra) || valorCompra <= 0) {
    alert("Por favor, informe um valor de compra válido (maior que zero).");
    inputValor.focus();
    return;
  }

  // Calcula desconto e total
  const percentual = calcularPercentualDesconto(valorCompra);
  const valorDesconto = (valorCompra * percentual) / 100;
  const totalComDesconto = valorCompra - valorDesconto;

  // Exibe os resultados na tela
  outValor.textContent = formatarMoeda(valorCompra);
  outFaixa.textContent = descreverFaixa(percentual);
  outPercentual.textContent = percentual + "%";
  outDesconto.textContent = formatarMoeda(valorDesconto);
  outTotal.textContent = formatarMoeda(totalComDesconto);

  // Mostra a seção de resultados
  resultado.classList.remove("oculto");
});