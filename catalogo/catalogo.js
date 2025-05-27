const itens = [
  { nome: "Kit Bottom", preco: 20, imagem: "img/Kit Bottom.png" },
  { nome: "Chinelo", preco: 35, imagem: "img/Chinelo.png" },
  { nome: "Boné", preco: 10, imagem: "img/Boné.png" }
];

const catalogoLista = document.getElementById('catalogo-lista');
const carrinho = [];

itens.forEach(item => {
  const div = document.createElement('div');
  div.className = 'item';
  div.innerHTML = `
    <img src="${item.imagem}" alt="${item.nome}">
    <br>${item.nome}
    <div class="preco">R$ ${item.preco},00</div>
    Quantidade: <input type="number" id="qtd-${item.nome}" value="1" min="1" style="width:60px; font-size: 1em;">
    <br><br>
    <button onclick="adicionarCarrinho('${item.nome}', ${item.preco})">Adicionar ao carrinho</button>
  `;
  catalogoLista.appendChild(div);
});

function adicionarCarrinho(nome, preco) {
  const qtd = parseInt(document.getElementById(`qtd-${nome}`).value);
  carrinho.push({ nome, qtd, preco });
  atualizarCarrinho();

  // Vibrar o botão do carrinho
  const carrinhoBtn = document.querySelector('.carrinho-btn');
  carrinhoBtn.classList.add('shake');
  setTimeout(() => {
    carrinhoBtn.classList.remove('shake');
  }, 400);

  // Destacar botão "Adicionar"
  const botao = event.target;
  botao.classList.add('adicionado');
  setTimeout(() => {
    botao.classList.remove('adicionado');
  }, 1000);
}



function atualizarCarrinho() {
  const container = document.getElementById('carrinho-itens');
  container.innerHTML = '';
  let total = 0;
  carrinho.forEach(prod => {
    total += prod.qtd * prod.preco;
    const p = document.createElement('p');
    p.textContent = `${prod.qtd}x ${prod.nome} - R$ ${(prod.qtd * prod.preco).toFixed(2)}`;
    container.appendChild(p);
  });

  const totalP = document.createElement('p');
  totalP.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  container.appendChild(totalP);

  const pagar = document.createElement('button');
  pagar.className = 'pagar';
  pagar.textContent = 'PAGAR';
  pagar.onclick = () => {
    localStorage.setItem("valorTotalCarrinho", total.toFixed(2));
    window.location.href = "pagamento/pagamento.html";
  };
  container.appendChild(pagar);
}

document.getElementById('abrir-carrinho').addEventListener('click', function (e) {
  if (e.target.closest('#carrinho-itens')) return;
  const carrinho = document.getElementById('carrinho-itens');
  carrinho.style.display = carrinho.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (e) {
  const btnCarrinho = document.getElementById('abrir-carrinho');
  const carrinho = document.getElementById('carrinho-itens');
  if (!btnCarrinho.contains(e.target)) {
    carrinho.style.display = 'none';
  }
});

function toggleMenu() {
  const menu = document.getElementById("menu-items");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
