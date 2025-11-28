// ========== CARRINHO ==========

let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

function adicionarCarrinho(nome, preco) {
    // Verificar estoque antes de adicionar
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    
    if (estoque[nome] > 0) {
        // Se o item estiver disponível no estoque, adiciona ao carrinho
        carrinho.push({ nome, preco });
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Reduz o estoque
        usarEstoque(nome);

        alert(`${nome} adicionado ao carrinho!`);
    } else {
        // Se o item estiver fora de estoque, exibe uma mensagem de alerta
        alert("⚠ Estoque esgotado para: " + nome);
    }
}

function carregarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("total");

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco;
        const li = document.createElement("li");
        li.innerText = `${item.nome} - R$ ${item.preco}`;
        lista.appendChild(li);
    });

    totalEl.innerText = "Total: R$ " + total;
}

function finalizarCompra() {
    alert("Compra finalizada! Obrigado por escolher o Restaurante Runeterra!");
    localStorage.removeItem("carrinho");
    window.location.href = "index.html";
}

if (window.location.pathname.includes("compra.html")) {
    carregarCarrinho();
}

// =======================
// SISTEMA DE ESTOQUE
// =======================
const pratos = [
    "Picanha de Noxus",
    "Ensopado de Ionia",
    "Pizza Demaciana",
    "Suco de Bandopolis",
    "Suco de Sentila Zaunita",
    "Pescado de Sentina",
    "Sorvete de Freljord",
    "Burrito Shurimane",
    "Macarrão do Vazio",
    "Moqueca de Ixtal",
    "Hamburguer de Piltover",
    "Rum da Ilha das Sombras"
];

// Cria estoque se não existir
if (!localStorage.getItem("estoque")) {
    const estoqueInicial = {};
    pratos.forEach(p => estoqueInicial[p] = 10); // COMEÇA COM 10 DE CADA
    localStorage.setItem("estoque", JSON.stringify(estoqueInicial));
}

// Reduz estoque ao comprar
function usarEstoque(prato) {
    let estoque = JSON.parse(localStorage.getItem("estoque"));

    if (estoque[prato] > 0) {
        estoque[prato]--;
        localStorage.setItem("estoque", JSON.stringify(estoque));
        alert(prato + " retirado do estoque.");
    } else {
        alert("⚠ Estoque esgotado para: " + prato);
    }
}

// Exibir estoque na página estoque.html
function mostrarEstoque() {
    if (!document.getElementById("lista-estoque")) return;

    let estoque = JSON.parse(localStorage.getItem("estoque"));
    let container = document.getElementById("lista-estoque");

    container.innerHTML = "";

    for (let prato in estoque) {
        container.innerHTML += `
            <div class="estoque-item">
                <h3>${prato}</h3>
                <p>Quantidade: ${estoque[prato]}</p>
                <button onclick="alterarEstoque('${prato}', 1)">+</button>
                <button class="remove" onclick="alterarEstoque('${prato}', -1)">-</button>
            </div>
        `;
    }
}

function alterarEstoque(prato, valor) {
    let estoque = JSON.parse(localStorage.getItem("estoque"));
    estoque[prato] += valor;

    if (estoque[prato] < 0) estoque[prato] = 0;

    localStorage.setItem("estoque", JSON.stringify(estoque));
    mostrarEstoque();
}

document.addEventListener("DOMContentLoaded", mostrarEstoque);
