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

