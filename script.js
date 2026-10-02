/**
 * Cada item mantém imagem, texto alternativo e legenda juntos.
 * Assim, reordenar a galeria nunca separa uma foto de sua legenda.
 * Substitua os placeholders pelos arquivos reais e atualize `image` e `alt`.
 */
const storyMoments = [
  {
    image: "assets/images/placeholder-01.svg",
    alt: "Espaço reservado para uma foto da infância do Tales",
    caption: "Todo grande caminho começa com um primeiro passo.",
    chapter: "Começos",
    layout: "fullscreen"
  },
  {
    image: "assets/images/placeholder-02.svg",
    alt: "Espaço reservado para um retrato do Tales",
    caption: "O tempo passa. A essência permanece.",
    chapter: "Caminhos",
    layout: "portrait"
  },
  {
    image: "assets/images/placeholder-03.svg",
    alt: "Espaço reservado para uma foto de viagem do Tales",
    caption: "Lugares que viraram lembranças. Lembranças que viraram histórias.",
    chapter: "Descobertas",
    layout: "detail"
  },
  {
    image: "assets/images/placeholder-04.svg",
    alt: "Espaço reservado para uma foto do Tales com pessoas queridas",
    caption: "A melhor parte da jornada sempre foram os encontros.",
    chapter: "Encontros",
    layout: "fullscreen"
  },
  {
    image: "assets/images/placeholder-05.svg",
    alt: "Espaço reservado para uma foto de um momento marcante do Tales",
    caption: "Feito de momentos que merecem ser celebrados.",
    chapter: "Memórias",
    layout: "portrait"
  }
];

const gallery = document.querySelector("#storyGallery");
const enterButton = document.querySelector("#enterButton");
const storyStart = document.querySelector("#historia");
const progressBar = document.querySelector("#progressBar");

const fallbackImage = (label) => {
  const safeLabel = label.replace(/[<>&"']/g, "");
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><rect width="900" height="1200" fill="#21151a"/><circle cx="450" cy="510" r="260" fill="none" stroke="#8f7554" stroke-opacity=".45"/><text x="450" y="570" text-anchor="middle" fill="#c9aa73" font-family="serif" font-size="42">${safeLabel}</text></svg>`)}`;
};

storyMoments.forEach((moment, index) => {
  const article = document.createElement("article");
  article.className = `story-card story-card--${moment.layout} reveal`;
  article.innerHTML = `
    <div class="story-card__media">
      <img src="${moment.image}" alt="${moment.alt}" ${index === 0 ? "" : 'loading="lazy"'} decoding="async">
    </div>
    <div class="story-card__content">
      <span class="story-card__count">${String(index + 1).padStart(2, "0")} / ${String(storyMoments.length).padStart(2, "0")} — ${moment.chapter}</span>
      <h3>${moment.caption}</h3>
      <p class="story-card__caption">Foto a ser adicionada</p>
    </div>`;
  const image = article.querySelector("img");
  image.addEventListener("error", () => {
    image.src = fallbackImage(`FOTO ${String(index + 1).padStart(2, "0")}`);
    image.dataset.fallback = "true";
  }, { once: true });
  gallery.append(article);
});

enterButton.addEventListener("click", () => {
  document.body.classList.remove("is-locked");
  document.body.classList.add("has-entered");
  storyStart.focus({ preventScroll: true });
  storyStart.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.16 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${scrollable > 0 ? Math.min(100, (scrollY / scrollable) * 100) : 0}%`;
};
addEventListener("scroll", updateProgress, { passive: true });
addEventListener("resize", updateProgress);
updateProgress();
