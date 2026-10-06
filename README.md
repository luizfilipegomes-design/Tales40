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

## Trilha sonora

A implementação está pronta, mas **nenhuma música foi incluída**: o repositório ainda não contém um arquivo de áudio com licença de uso.

1. Adicione uma trilha autorizada em `assets/audio/trilha.mp3` (MP3 para ampla compatibilidade). Não use uma música comercial sem autorização para publicá-la no site.
2. Registre em `assets/audio/LICENSE.md` o título, autor, origem, licença/autorização e a atribuição exigida. Se a licença exigir crédito visível, inclua esse crédito no convite antes de publicar.
3. Em `music.js`, altere `const soundtrackSource = "";` para `const soundtrackSource = "assets/audio/trilha.mp3";`. O caminho relativo funciona no GitHub Pages em `/Tales40/`.

A trilha começa apenas no primeiro clique em **Entrar na história**, repete em loop e usa volume solicitado de 20%. O controle fixo **♫ Música ON/OFF** pausa e retoma do mesmo ponto, aceita teclado e tem área de toque de pelo menos 44px. Em alguns dispositivos, como iOS, o volume pode seguir o controle físico do aparelho em vez do valor definido pelo site.

Sem arquivo configurado, não há requisição de áudio e o controle mostra **Música indisponível** após a entrada. Bloqueios de reprodução ou falhas no arquivo mantêm a história acessível e permitem tentar novamente no controle. Voltar ao início e clicar novamente não altera a escolha de pausa do convidado.

Validação automatizada: `node --test tests/music.test.cjs`.

Após adicionar o arquivo real, teste em Chrome/Firefox/Safari desktop e Safari iOS/Chrome Android: silêncio antes da entrada, início no clique, ON/OFF, retomada, loop, volume do aparelho, navegação completa e URL no GitHub Pages. Teste também arquivo ausente e bloqueio de reprodução. A reprodução real e o volume precisam dessa validação com a trilha licenciada.

## Prévia local

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Não abra apenas o arquivo HTML, pois um servidor local reproduz melhor o comportamento da publicação.

## Publicar no GitHub Pages

No GitHub, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch principal e a pasta `/ (root)`. Todos os caminhos do site são relativos e funcionam quando publicado no subdiretório `/Tales40/`.
