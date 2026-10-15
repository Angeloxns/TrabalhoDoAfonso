// Teste rápido da lógica de desconto (executado com Node.js)
const FAIXA_5 = 100;
const FAIXA_10 = 200;

function calcularPercentualDesconto(valor) {
  if (valor >= FAIXA_10) return 10;
  if (valor >= FAIXA_5) return 5;
  return 0;
}

function calcular(valor) {
  const percentual = calcularPercentualDesconto(valor);
  const desconto = (valor * percentual) / 100;
  const total = valor - desconto;
  return { percentual, desconto, total };
}

const casos = [50, 99.99, 100, 150, 199.99, 200, 500];
let passou = true;

for (const valor of casos) {
  const r = calcular(valor);
  console.log(
    `Compra R$ ${valor.toFixed(2)} -> ${r.percentual}% | desconto R$ ${r.desconto.toFixed(2)} | total R$ ${r.total.toFixed(2)}`
  );
}

// Asserções
const assert = (cond, msg) => {
  if (!cond) {
    passou = false;
    console.error("FALHOU: " + msg);
  }
};

assert(calcular(50).percentual === 0, "50 deve ter 0%");
assert(calcular(99.99).percentual === 0, "99.99 deve ter 0%");
assert(calcular(100).percentual === 5, "100 deve ter 5%");
assert(calcular(150).percentual === 5, "150 deve ter 5%");
assert(calcular(199.99).percentual === 5, "199.99 deve ter 5%");
assert(calcular(200).percentual === 10, "200 deve ter 10%");
assert(calcular(500).percentual === 10, "500 deve ter 10%");
assert(Math.abs(calcular(150).desconto - 7.5) < 0.001, "desconto de 150 deve ser 7.50");
assert(Math.abs(calcular(200).total - 180) < 0.001, "total de 200 deve ser 180");

console.log(passou ? "\nTODOS OS TESTES PASSARAM" : "\nALGUM TESTE FALHOU");