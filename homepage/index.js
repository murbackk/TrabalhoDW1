const slides = [
  {
    titulo: "Lojinha Distrital",
    descricao: "Confira os produtos oficiais e apoie o distrito!"
  },
  {
    titulo: "Comunicado Mensal",
    descricao: "Leia as novidades e informes importantes deste mês.",
    botao: {
      texto: "Ver Comunicado",
      link: "homepage/comunicado.pdf" // Corrija se o caminho estiver errado
    }
  },
  {
    titulo: "Nossos Projetos",
    descricao: "Em breve, conheça os projetos em andamento no nosso distrito."
  }
];

let current = 0;

function updateSlide() {
  const slide = slides[current];

  // Atualiza o título
  document.getElementById("slide-text").textContent = slide.titulo;

  // Atualiza ou cria a descrição
  let descricaoEl = document.getElementById("slide-descricao");
  if (!descricaoEl) {
    descricaoEl = document.createElement("div");
    descricaoEl.id = "slide-descricao";
    descricaoEl.style.fontSize = "24px";
    descricaoEl.style.marginTop = "10px";
    descricaoEl.style.color = "white";
    descricaoEl.style.maxWidth = "700px";
    descricaoEl.style.textAlign = "center";
    document.getElementById("slide-text").after(descricaoEl);
  }
  descricaoEl.textContent = slide.descricao;

  // Limpa e adiciona botões
  const catalogoBtnContainer = document.getElementById("catalogo-btn-container");
  catalogoBtnContainer.innerHTML = "";

  if (slide.titulo === "Lojinha Distrital") {
    const btn = document.createElement("button");
    btn.textContent = "Acessar Catálogo";
    btn.classList.add("catalogo-btn");
    btn.onclick = () => window.location.href = "catalogo.html";
    catalogoBtnContainer.appendChild(btn);
  }

  if (slide.botao) {
    const btn = document.createElement("button");
    btn.textContent = slide.botao.texto;
    btn.classList.add("catalogo-btn");
    btn.onclick = () => window.open(slide.botao.link, "_blank");
    catalogoBtnContainer.appendChild(btn);
  }

  updateDots();
}

function updateDots() {
  const dotsContainer = document.getElementById("dots-container");
  dotsContainer.innerHTML = "";

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (index === current ? " active" : "");
    dot.onclick = () => {
      current = index;
      updateSlide();
    };
    dotsContainer.appendChild(dot);
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlide();
}

function toggleMenu() {
  const menu = document.getElementById("menu-items");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Inicia o slide ao carregar a página
window.onload = updateSlide;
