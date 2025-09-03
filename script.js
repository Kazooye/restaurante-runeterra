let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adicionar item ao carrinho
function adicionarCarrinho(produto, preco) {
    carrinho.push({ produto, preco });
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(produto + " foi adicionado ao carrinho!");
    atualizarCarrinho(); // Atualiza a lista com animação
}

// Atualizar carrinho na página de compra
if (document.getElementById("carrinho-lista")) {
    const lista = document.getElementById("carrinho-lista");
    const totalSpan = document.getElementById("total");

    function atualizarCarrinho() {
        lista.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.produto} - R$ ${item.preco.toFixed(2)}`;

            // Botão de remover
            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.style.marginLeft = "10px";
            btnRemover.onclick = () => {
                // Animação de fade out antes de remover
                li.style.opacity = "0";
                setTimeout(() => {
                    carrinho.splice(index, 1);
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));
                    atualizarCarrinho();
                }, 300); // tempo da animação
            };

            li.appendChild(btnRemover);

            // Adiciona efeito de fade-in
            li.style.opacity = "0";
            lista.appendChild(li);
            setTimeout(() => {
                li.style.transition = "opacity 0.3s ease";
                li.style.opacity = "1";
            }, 10);

            total += item.preco;
        });

        totalSpan.textContent = total.toFixed(2);
    }

    atualizarCarrinho();

    // Formulário de pagamento
    document.getElementById("pagamento-form").addEventListener("submit", function(e) {
        e.preventDefault();
        if (carrinho.length === 0) {
            alert("O carrinho está vazio!");
            return;
        }
        document.getElementById("mensagem").textContent = "✅ Pagamento realizado com sucesso!";
        carrinho = [];
        localStorage.removeItem("carrinho");
        atualizarCarrinho();
    });
}
