# Tales 40 — convite digital

Convite estático, responsivo e sem dependências para a comemoração dos 40 anos do Tales.

## Fotos e legendas

1. As dez fotos da narrativa ficam em `assets/images/`, nomeadas de `tales-01.jpg` a `tales-10.jpg`.
2. Em `script.js`, edite a lista `storyChapters`. **Cada objeto reúne duas imagens, texto e enquadramentos**, garantindo que a composição sempre acompanhe o capítulo correto. `layout` define a composição editorial do capítulo.
3. Para adicionar ou reordenar capítulos, adicione ou mova o objeto completo — nunca apenas uma imagem ou legenda.

Exemplo:

```js
{
  images: ["assets/images/tales-01.jpg", "assets/images/tales-02.jpg"],
  caption: "Onde tudo começou.",
  chapter: "Começos",
  layout: "cinematic",
  positions: ["50% 28%", "50% 34%"]
}
```

## Prévia do WhatsApp

A prévia social usa `assets/images/tales-10.jpg`. Depois de definir o domínio público, use URLs absolutas nas tags `og:image`, `og:url` e `twitter:image` de `index.html` para maximizar a compatibilidade com aplicativos de mensagem.

## Trilha sonora

A trilha incluída é **cirrus coalescence**, de **gonpulvo**, publicada pelo autor sob **CC0 1.0 (dedicação ao domínio público)**.

- Arquivo: `assets/audio/cirrus-coalescence.mp3` (original, sem alterações; aproximadamente 2min48s, 6,74 MB).
- Origem e licença: [página do autor no WeeklyBeats](https://weeklybeats.com/gonpulvo/music/cirrus-coalescence).
- Registro da licença e integridade: `assets/audio/LICENSE.md`.
- Configuração: `soundtrackSource` em `music.js`, com caminho relativo compatível com `/Tales40/` no GitHub Pages.

Para substituir a trilha, adicione um MP3 autorizado, atualize `soundtrackSource` e registre a licença correspondente. Defina o caminho como `""` para desativar o áudio.

A trilha começa apenas no primeiro clique em **Entrar na história**, repete em loop e usa volume solicitado de 20%. O controle fixo **♫ Música ON/OFF** pausa e retoma do mesmo ponto, aceita teclado e tem área de toque de pelo menos 44px. Em alguns dispositivos, como iOS, o volume pode seguir o controle físico do aparelho em vez do valor definido pelo site.

Sem arquivo configurado, não há requisição de áudio e o controle mostra **Música indisponível** após a entrada. Bloqueios de reprodução ou falhas no arquivo mantêm a história acessível e permitem tentar novamente no controle. Voltar ao início e clicar novamente não altera a escolha de pausa do convidado.

Validação automatizada: `node --test tests/music.test.cjs`.

Antes de publicar, teste em Chrome/Firefox/Safari desktop e Safari iOS/Chrome Android: silêncio antes da entrada, início no clique, ON/OFF, retomada, loop, volume do aparelho, navegação completa e URL no GitHub Pages. Teste também arquivo ausente e bloqueio de reprodução. O volume e as restrições de reprodução devem ser conferidos em aparelhos reais.

## Prévia local

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Não abra apenas o arquivo HTML, pois um servidor local reproduz melhor o comportamento da publicação.

## Publicar no GitHub Pages

No GitHub, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch principal e a pasta `/ (root)`. Todos os caminhos do site são relativos e funcionam quando publicado no subdiretório `/Tales40/`.
