const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../music.js'), 'utf8');

function setup(configured = true) {
  const element = () => ({ hidden: true, listeners: {}, attrs: {},
    addEventListener(name, callback) { this.listeners[name] = callback; },
    setAttribute(name, value) { this.attrs[name] = value; },
    click() { this.listeners.click(); } });
  const button = element(), entry = element(), status = element();
  let audio;
  class FakeAudio {
    constructor(src) { audio = this; this.src = src; this.listeners = {}; this.calls = 0; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
    play() { this.calls++; return new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; }); }
    pause() { this.listeners.pause(); }
  }
  vm.runInNewContext(configured ? source : source.replace(/const soundtrackSource = "[^"]*";/, 'const soundtrackSource = "";'),
    { Audio: FakeAudio, document: { querySelector: selector => ({ '#musicButton': button, '#musicStatus': status, '#enterButton': entry })[selector] } });
  return { button, entry, status, audio };
}

test('sem trilha: sem Audio/requisição e entrada continua disponível', () => {
  const x = setup(false);
  assert.equal(x.audio, undefined);
  assert.equal(x.button.disabled, true);
  x.entry.click();
  assert.equal(x.button.hidden, false);
  assert.equal(x.button.textContent, '♫ Música indisponível');
});

test('só toca na entrada, pausa/retoma e preserva pausa em nova entrada', async () => {
  const x = setup();
  assert.equal(x.audio.calls, 0);
  assert.equal(x.audio.preload, 'none');
  assert.equal(x.audio.volume, .2);
  assert.equal(x.audio.loop, true);
  x.entry.click();
  assert.equal(x.audio.calls, 1);
  x.audio.listeners.playing(); x.audio.resolve(); await Promise.resolve();
  assert.equal(x.button.attrs['aria-pressed'], 'true');
  x.button.click();
  assert.equal(x.button.attrs['aria-pressed'], 'false');
  x.entry.click();
  assert.equal(x.audio.calls, 1);
  x.button.click();
  assert.equal(x.audio.calls, 2);
});

test('autoplay bloqueado pode ser tentado novamente e erro de arquivo informa OFF', async () => {
  const x = setup(); x.entry.click();
  x.audio.reject({ name: 'NotAllowedError' });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(x.button.attrs['aria-pressed'], 'false');
  assert.match(x.status.textContent, /Toque/);
  x.button.click(); x.audio.listeners.playing(); x.audio.resolve();
  await Promise.resolve();
  assert.equal(x.button.attrs['aria-pressed'], 'true');
  x.audio.listeners.error();
  assert.equal(x.button.attrs['aria-pressed'], 'false');
  assert.match(x.status.textContent, /indisponível/);
});

test('pausa durante carregamento não é desfeita por resposta tardia', async () => {
  const x = setup(); x.entry.click(); x.button.click();
  x.audio.listeners.playing(); x.audio.resolve();
  await Promise.resolve();
  assert.equal(x.button.attrs['aria-pressed'], 'false');
});
