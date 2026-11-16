const WHATSAPP_NUMBER = "5519989477569";

const produtos = {
    "suco-500ml": {
        nome: "Suco laranja 500ml",
        preco: 5.00,
        imagem: "assets/img/Produtos/suco500ml.png"
    },
    "suco-2litros": {
        nome: "Suco laranja 2 litros",
        preco: 10.00,
        imagem: "assets/img/Produtos/suco2litros.png"
    },
     "suco-5litros": {
        nome: "Suco laranja 5 litros",
        preco: 30.00,
        imagem: "assets/img/Produtos/suco5litros.png"
    }
};


let carrinho = [];
carrinho = carrinho.map(item => ({
    ...item,
    imagem: item.imagem || produtos[item.id]?.imagem || ""
}));

localStorage.setItem("carrinho", JSON.stringify(carrinho));

try {
    const salvo = localStorage.getItem("carrinho");
    carrinho = salvo ? JSON.parse(salvo) : [];

    if (!Array.isArray(carrinho)) {
        carrinho = [];
    }
} catch {
    carrinho = [];
}

const botaoAbrir = document.getElementById("abrir-carrinho");
const botaoFechar = document.getElementById("fechar-carrinho");
const painel = document.getElementById("painel-carrinho");
const fundoCarrinho = document.getElementById("fundo-carrinho");

botaoAbrir.addEventListener("click", () => {
    painel.classList.add("aberto");
    fundoCarrinho.classList.add("ativo");
});

function fecharCarrinho() {
    painel.classList.remove("aberto");
    fundoCarrinho.classList.remove("ativo");
}

botaoFechar.addEventListener("click", fecharCarrinho);
fundoCarrinho.addEventListener("click", fecharCarrinho);
function adicionarProduto(id) {
    const produto = produtos[id];

    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

document.querySelectorAll("[data-adicionar-carrinho]").forEach(botao => {
    botao.addEventListener("click", () => {
        const id = botao.dataset.id;
        adicionarProduto(id);
    });
});
function atualizarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const totalElemento = document.getElementById("total-carrinho");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;

        total += subtotal;
        quantidadeTotal += item.quantidade;

        const elemento = document.createElement("div");

        elemento.innerHTML = `
        <div class="item-carrinho-imagem">
            <img src="${item.imagem}" alt="${item.nome}">
        </div>
    
        <div class="item-carrinho-info">
            <strong>${item.nome}</strong>
            <span>R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
    
            <div class="item-carrinho-acoes">
                <button data-diminuir="${item.id}">−</button>
                <span>${item.quantidade}</span>
                <button data-aumentar="${item.id}">+</button>
                <button class="remover-item" data-remover="${item.id}">
                    Remover
                </button>
            </div>
        </div>
    `;

        lista.appendChild(elemento);
    });

    contador.textContent = quantidadeTotal;
    totalElemento.textContent = total.toFixed(2).replace(".", ",");
}
document.getElementById("itens-carrinho").addEventListener("click", (evento) => {
    const botao = evento.target;

    const id = botao.dataset.aumentar ||
               botao.dataset.diminuir ||
               botao.dataset.remover;

    if (!id) return;

    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    if (botao.dataset.aumentar) {
        item.quantidade++;
    }

    if (botao.dataset.diminuir) {
        item.quantidade--;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(produto => produto.id !== id);
        }
    }

    if (botao.dataset.remover) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarCarrinho();
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    elemento.className = "item-carrinho";
});
document.getElementById("finalizar-pedido").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        mensagem += `${item.nome}\n`;
        mensagem += `Quantidade: ${item.quantidade}\n`;
        mensagem += `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}\n\n`;
    });

    mensagem += `Total do pedido: R$ ${total.toFixed(2).replace(".", ",")}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});

document.getElementById("continuar-comprando").addEventListener("click", () => {
    fecharCarrinho();
});

























const header = document.querySelector(".masthead");
const elementos = document.querySelectorAll(".texto-cabecalho");

function verificarSobreposicao() {
    const headerBottom = header.getBoundingClientRect().bottom;

    elementos.forEach(elemento => {
        const rect = elemento.getBoundingClientRect();

        const estaAtras =
            rect.top < headerBottom &&
            rect.bottom > 0 &&
            rect.top < headerBottom;

        elemento.classList.toggle("oculto", estaAtras);
    });
}

window.addEventListener("scroll", verificarSobreposicao);
window.addEventListener("resize", verificarSobreposicao);

verificarSobreposicao();
