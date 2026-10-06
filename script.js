/**
 * Cada capítulo reúne fotografias e seu texto narrativo.
 * Os caminhos são relativos à raiz do projeto para funcionarem no GitHub Pages.
 */
const storyChapters = [
  {
    chapter: "Primeiros sorrisos",
    caption: "Antes de tudo, um sorriso. E uma vida inteira pela frente.",
    images: ["assets/images/infancia-01.jpg", "assets/images/infancia-02.jpg", "assets/images/infancia-03.jpg"],
    alts: ["Tales bebê em uma piscina infantil", "Retrato de Tales criança, sorrindo com a mão sob o queixo", "Tales criança com colete e gravata borboleta"],
    layout: "album",
    positions: ["50% 48%", "50% 50%", "50% 50%"]
  },
  {
    chapter: "Pequenos mundos",
    caption: "A curiosidade já estava ali. O jeito de ser, também.",
    images: ["assets/images/infancia-04.jpg", "assets/images/infancia-05.jpg", "assets/images/infancia-06.jpg"],
    alts: ["Tales criança brincando junto a um móvel de madeira", "Tales criança ao lado de uma mulher em uma foto de família", "Tales criança usando um cocar de penas e colar"],
    layout: "album",
    positions: ["50% 50%", "50% 50%", "50% 50%"]
  },
  {
    chapter: "Um jeito de ser",
    caption: "Entre brincadeiras e descobertas, a história ganhava novas cores.",
    images: ["assets/images/infancia-07.jpg", "assets/images/infancia-08.jpg", "assets/images/infancia-09.jpg"],
    alts: ["Tales criança com jaqueta preta e óculos sobre a cabeça", "Tales subindo uma corda em um ginásio", "Tales adolescente pintando em um cavalete"],
    layout: "album",
    positions: ["50% 50%", "50% 50%", "50% 50%"]
  },
  {
    chapter: "Novos caminhos",
    caption: "O menino cresceu. E o mundo ficou maior.",
    images: ["assets/images/tales-01.jpg", "assets/images/tales-02.jpg"],
    layout: "cinematic",
    positions: ["50% 28%", "50% 34%"]
  },
  {
    chapter: "Caminhos",
    caption: "O tempo passa. A essência permanece.",
    images: ["assets/images/tales-03.jpg", "assets/images/tales-04.jpg"],
    layout: "duo",
    positions: ["50% 30%", "50% 28%"]
  },
  {
    chapter: "Descobertas",
    caption: "Lugares que viraram lembranças. Lembranças que viraram histórias.",
    images: ["assets/images/tales-05.jpg", "assets/images/tales-06.jpg"],
    layout: "overlap",
    positions: ["50% 32%", "50% 28%"]
  },
  {
    chapter: "Encontros",
    caption: "A melhor parte da jornada sempre foram os encontros.",
    images: ["assets/images/tales-07.jpg", "assets/images/tales-08.jpg"],
    layout: "duo-reverse",
    positions: ["50% 30%", "50% 30%"]
  },
  {
    chapter: "Memórias",
    caption: "Feito de momentos que merecem ser celebrados.",
    images: ["assets/images/tales-09.jpg", "assets/images/tales-10.jpg"],
    layout: "final-frame",
    positions: ["50% 28%", "50% 30%"]
  }
];

const gallery = document.querySelector("#storyGallery");
const enterButton = document.querySelector("#enterButton");
const storyStart = document.querySelector("#historia");
const progressBar = document.querySelector("#progressBar");

storyChapters.forEach((moment, index) => {
  const article = document.createElement("article");
  article.className = `story-card story-card--${moment.layout} reveal`;
  const images = moment.images.map((source, imageIndex) => `
    <figure class="story-card__frame story-card__frame--${imageIndex + 1}">
      <img src="${source}"
        alt="${moment.alts?.[imageIndex] || `Tales em um momento do capítulo ${moment.chapter}`}"
        style="object-position: ${moment.positions[imageIndex]}"
        ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
    </figure>`).join("");

  article.innerHTML = `
    <div class="story-card__media">${images}</div>
    <div class="story-card__content">
      <span class="story-card__count">${String(index + 1).padStart(2, "0")} / ${String(storyChapters.length).padStart(2, "0")} — ${moment.chapter}</span>
      <h3>${moment.caption}</h3>
    </div>`;
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

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const storyImages = [...document.querySelectorAll(".story-card:not(.story-card--album) img")];
let animationFrame;

const updateViewportEffects = () => {
  updateProgress();

  if (!reducedMotion.matches) {
    storyImages.forEach((image) => {
      const card = image.closest(".story-card");
      const bounds = card.getBoundingClientRect();
      const distanceFromCenter = bounds.top + bounds.height / 2 - innerHeight / 2;
      const shift = Math.max(-8, Math.min(8, distanceFromCenter * -0.012));
      image.style.setProperty("--image-shift", `${shift}px`);
    });
  }

  animationFrame = undefined;
};

const requestViewportUpdate = () => {
  if (!animationFrame) animationFrame = requestAnimationFrame(updateViewportEffects);
};

addEventListener("scroll", requestViewportUpdate, { passive: true });
addEventListener("resize", requestViewportUpdate);
updateViewportEffects();
