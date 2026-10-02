# Tales 40 — convite digital

Convite estático, responsivo e sem dependências para a comemoração dos 40 anos do Tales.

## Fotos e legendas

1. Coloque as fotos otimizadas em `assets/images/` (WebP ou JPEG, idealmente com até 1600 px no maior lado).
2. Em `script.js`, edite a lista `storyMoments`. **Cada objeto reúne `image`, `alt` e `caption`**, garantindo que a legenda sempre acompanhe a foto correta. `chapter` define o capítulo e `layout` aceita `fullscreen`, `portrait` ou `detail`.
3. Para adicionar ou reordenar momentos, adicione ou mova o objeto completo — nunca apenas a legenda. Os SVGs atuais são placeholders identificados e podem ser removidos quando nenhuma entrada os utilizar.

Exemplo:

```js
{
  image: "assets/images/tales-infancia.webp",
  alt: "Tales sorrindo durante uma festa na infância",
  caption: "Onde tudo começou.",
  chapter: "Começos",
  layout: "fullscreen"
}
```

## Prévia do WhatsApp

Adicione futuramente `assets/images/whatsapp-preview.jpg` como uma imagem de **1200 × 630 px com uma foto real do Tales**. O arquivo não está incluído nesta versão. Antes de publicar, troque `SEU-USUARIO` nas tags `og:image`, `og:url` e `twitter:image` de `index.html` pelo usuário ou domínio definitivo. O WhatsApp exige uma URL pública absoluta para gerar a prévia.

## Testar localmente

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Não abra apenas o arquivo HTML, pois um servidor local reproduz melhor o comportamento da publicação.

## Publicar no GitHub Pages

No GitHub, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch principal e a pasta `/ (root)`. Todos os caminhos do site são relativos e funcionam quando publicado no subdiretório `/Tales40/`.
