# WOVA.DEV | Site de Welder Oliveira

## Estrutura
```
wova-dev/
├── index.html          estrutura e textos do site
├── css/estilo.css      cores, fontes e layout
├── js/carrossel.js     carrossel de projetos
└── img/foto-welder.jpg sua foto (fundo da seção Sobre)
```

## Onde mudar cada coisa
- **Textos, links e contatos:** `index.html`
- **Adicionar um projeto:** copie um bloco `<li class="card">` no `index.html`
- **Serviços:** cada serviço é um bloco `<li class="service">` no `index.html`. O link "Pedir orçamento" abre o WhatsApp com mensagem pronta (texto depois de `?text=`)
- **Cores:** variáveis no começo do `css/estilo.css` (seção 1)
- **Fontes:** link do Google Fonts no `index.html` e variáveis `--display` e `--body`
- **Foto:** substitua `img/foto-welder.jpg` mantendo o nome
- **Velocidade do carrossel:** `INTERVALO` no `js/carrossel.js`

## Como abrir
Dê dois cliques no `index.html`. Para publicar, envie a pasta inteira para a hospedagem.
