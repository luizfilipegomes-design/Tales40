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

A trilha incluída é **High-End Hustle - Fashion Luxury Disco**, de **Rockot**, sob **Pixabay Content License**, escolhida pelo usuário. Não é domínio público/CC0.

- Arquivo: `assets/audio/high-end-hustle.mp3` (download original, sem alterações; aproximadamente 2min27s).
- Origem: [página oficial no Pixabay](https://pixabay.com/music/upbeat-high-end-hustle-fashion-luxury-disco-253184/).
- Crédito, procedência e restrições: `assets/audio/LICENSE.md`.

Para substituir a trilha, adicione um MP3 autorizado, atualize `soundtrackSource` e registre a licença correspondente. Defina o caminho como `""` para desativar o áudio.

A trilha começa apenas no primeiro clique em **Entrar na história**, repete em loop e usa volume solicitado de 20%. O controle fixo **♫ Música ON/OFF** pausa e retoma do mesmo ponto, aceita teclado e tem área de toque de pelo menos 44px. Em alguns dispositivos, como iOS, o volume pode seguir o controle físico do aparelho em vez do valor definido pelo site.

Sem arquivo configurado, não há requisição de áudio e o controle mostra **Música indisponível** após a entrada. Bloqueios de reprodução ou falhas no arquivo mantêm a história acessível e permitem tentar novamente no controle. Voltar ao início e clicar novamente não altera a escolha de pausa do convidado.

Validação automatizada: `node --test tests/music.test.cjs`.

Antes de publicar, teste em Chrome/Firefox/Safari desktop e Safari iOS/Chrome Android: silêncio antes da entrada, início no clique, ON/OFF, retomada, loop, volume do aparelho, navegação completa e URL no GitHub Pages. Teste também arquivo ausente e bloqueio de reprodução. O volume e as restrições de reprodução devem ser conferidos em aparelhos reais.

## Prévia local

Na raiz do projeto, execute `python3 -m http.server 8000` e abra `http://localhost:8000`. Não abra apenas o arquivo HTML, pois um servidor local reproduz melhor o comportamento da publicação.

## Publicar no GitHub Pages

No GitHub, acesse **Settings → Pages**, selecione **Deploy from a branch**, escolha a branch principal e a pasta `/ (root)`. Todos os caminhos do site são relativos e funcionam quando publicado no subdiretório `/Tales40/`.


## Álbum de infância

A narrativa começa com três capítulos de arquivo (nove fotos diferentes), seguidos por nove fotos da sequência adulta e duas novas fotos afetivas. A ordem é editorial e aproximada, sem atribuir datas ou parentescos não confirmados. Os dois pares duplicados dos anexos foram usados uma vez cada.

`assets/images/infancia-01.jpg` é a foto original da piscina, com enquadramento apenas por CSS: a restauração foi bloqueada pela ferramenta de imagens. `infancia-02.jpg` a `infancia-09.jpg` são versões tratadas com a ferramenta integrada de imagens: orientação, extração do impresso, cores, reflexos e desgaste. São restaurações assistidas por IA, não digitalizações documentais; compare especialmente a região dos olhos na foto da jaqueta com o original antes da publicação. Os arquivos originais fornecidos pelo usuário permanecem intactos fora do repositório.

O layout de álbum preserva a composição das fotos, sem parallax/zoom, e empilha os retratos em celulares. A sequência adulta e a trilha licenciada continuam funcionando como antes.

### Publicação

As alterações estão na branch `codex/trilha-sonora`, no PR #5. Para publicar no GitHub Pages, revisar as fotos e fazer merge do PR na `main`. Nenhum merge automático foi executado.


## Revisão afetiva final

A última foto anterior (`tales-10.jpg`) foi retirada da narrativa. A foto com a avó aparece no capítulo “Amor que permanece”, como homenagem; a foto com Chopin e Bisteca encerra a galeria em “Companheiros de vida”. Ambas são cópias dos JPEGs originais enviados, sem restauração ou alteração de conteúdo, e exibidas integralmente sem zoom/parallax. A narrativa contém 20 fotos em dez capítulos. Não foram atribuídos nomes individuais aos cães pela posição na imagem.
