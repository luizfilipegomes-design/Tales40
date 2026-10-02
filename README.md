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

## Testar localmente

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Não abra apenas o arquivo HTML, pois um servidor local reproduz melhor o comportamento da publicação.

## Publicar no GitHub Pages

No GitHub, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch principal e a pasta `/ (root)`. Todos os caminhos do site são relativos e funcionam quando publicado no subdiretório `/Tales40/`.
