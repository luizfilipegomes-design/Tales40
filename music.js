// Defina o caminho relativo somente depois de adicionar a trilha e sua licença.
// Exemplo: "assets/audio/trilha.mp3". Vazio mantém o convite sem áudio.
const soundtrackSource = "";

(() => {
  const button = document.querySelector("#musicButton");
  const status = document.querySelector("#musicStatus");
  const entry = document.querySelector("#enterButton");
  let entered = false;
  let desiredPlaying = false;
  let attempt = 0;
  const audio = soundtrackSource ? new Audio(soundtrackSource) : null;

  const render = (playing, message = "") => {
    button.textContent = audio ? `♫ Música ${playing ? "ON" : "OFF"}` : "♫ Música indisponível";
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", audio
      ? (playing ? "Pausar música" : "Ativar música")
      : "Música indisponível");
    status.textContent = message;
  };

  render(false);
  button.disabled = !audio;
  if (audio) {
    audio.preload = "none";
    audio.loop = true;
    audio.volume = 0.2;
    audio.addEventListener("playing", () => {
      if (!desiredPlaying) audio.pause();
      else render(true);
    });
    audio.addEventListener("pause", () => render(false));
    audio.addEventListener("error", () => {
      desiredPlaying = false;
      attempt++;
      render(false, "Trilha indisponível. Você pode continuar o convite sem música.");
    });
  }

  const play = () => {
    desiredPlaying = true;
    const currentAttempt = ++attempt;
    // Chamado diretamente no clique: não aguardar downloads ou animações.
    audio.play().then(() => {
      if (!desiredPlaying) audio.pause();
    }).catch((error) => {
      if (currentAttempt !== attempt) return;
      desiredPlaying = false;
      render(false, error.name === "NotAllowedError"
        ? "Toque em Música OFF para ativar a trilha."
        : "Não foi possível tocar a trilha. Toque em Música OFF para tentar novamente.");
    });
  };

  entry.addEventListener("click", () => {
    if (entered) return;
    entered = true;
    button.hidden = false;
    if (audio) play();
  });

  button.addEventListener("click", () => {
    if (!audio || !entered) return;
    if (desiredPlaying) {
      desiredPlaying = false;
      attempt++;
      audio.pause();
      render(false);
    } else play();
  });
})();
