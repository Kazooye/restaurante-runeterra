// ========== ANIMAÇÃO FADE ==========
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));


// ========== LOGIN / CADASTRO ==========
function cadastrarUsuario() {
    const nome = document.getElementById("cadNome").value;
    const email = document.getElementById("cadEmail").value;
    const senha = document.getElementById("cadSenha").value;

    if (!nome || !email || !senha) {
        document.getElementById("cadMensagem").innerText = "Preencha tudo, guerreiro.";
        return;
    }

    const usuario = { nome, email, senha };
    localStorage.setItem("usuario", JSON.stringify(usuario));

    document.getElementById("cadMensagem").style.color = "lime";
    document.getElementById("cadMensagem").innerText = "Conta criada com sucesso!";
}

function loginUsuario() {
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        document.getElementById("loginMensagem").innerText = "Nenhum usuário cadastrado.";
        return;
    }

    if (usuario.email === email && usuario.senha === senha) {
        localStorage.setItem("logado", "sim");
        window.location.href = "index.html";
    } else {
        document.getElementById("loginMensagem").innerText = "Email ou senha incorretos.";
    }
}

// Mostrar nome no menu
window.onload = () => {
    const loginMenu = document.getElementById("loginMenu");

    if (localStorage.getItem("logado") === "sim") {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        loginMenu.innerText = "Olá, " + usuario.nome.split(" ")[0];
        loginMenu.href = "#";
    }
};


// ========== CARRINHO ==========
let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
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

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html"; // ou index.html
    });
}

const user = localStorage.getItem("loggedUser");

if (user) {
    document.getElementById("menuLogin").style.display = "none";
    document.getElementById("menuCadastro").style.display = "none";
    document.getElementById("menuPerfil").style.display = "block";
    document.getElementById("menuSair").style.display = "block";
} else {
    document.getElementById("menuLogin").style.display = "block";
    document.getElementById("menuCadastro").style.display = "block";
    document.getElementById("menuPerfil").style.display = "none";
    document.getElementById("menuSair").style.display = "none";
}
