# Site Cecília Flores – ceciliafloreseviveiro.com.br

Site de uma página só, em HTML, CSS e JavaScript puros, sem banco de dados e sem mensalidade.

## Arquivos

| Arquivo | O que tem |
|---|---|
| `index.html` | Todos os textos do site: endereço, horário, serviços e história |
| `style.css` | Cores e aparência. As cores ficam no topo, em `:root` |
| `script.js` | Número do WhatsApp e as **listas de fotos** de cada seção (no topo do arquivo) |
| `img/` | Fotos já comprimidas. `-p.webp` é a miniatura e `.webp` é a versão ampliada |
| `img/provisorias/` | Fotos gratuitas de banco de imagens, que devem ser **trocadas por fotos reais** |

## Tarefas comuns

- **Trocar o WhatsApp:** em `script.js`, altere a linha `const WHATSAPP = "5562999537782";` (55 + DDD + número).
- **Mudar endereço ou horário:** em `index.html`, procure por "Rua 12 de Dezembro" e "8h às 18h". Também atualize o bloco `application/ld+json` no topo, que é o que o Google lê.
- **Adicionar uma foto:** gere duas versões em WebP (miniatura com 480px no lado maior e ampliada com 1200px), por exemplo `buques-21-p.webp` e `buques-21.webp`. Coloque as duas em `img/buques/` e acrescente `"buques-21"` na lista `BUQUES` do `script.js`. Se a foto for **deitada** (3:4), acrescente o nome também em `LARGAS`.
- **Ver quais fotos são provisórias:** abra o site com `?revisao` no fim do endereço. Elas aparecem com uma borda amarela tracejada.

## Fotos provisórias (trocar quando a Cecília enviar as reais)

- `cesta-flores.webp` e `cesta-chocolates.webp`: Unsplash (licença livre)
- `frutiferas-limoeiro.webp`: Unsplash (licença livre)
- `cerrado-ipe.webp`: Wikimedia Commons, domínio público (autor: Sturm)

## Nunca colocar neste repositório

O repositório é **público**. Nada de certificado digital (.pfx), declarações, planilhas, senhas ou dados financeiros da cliente.

## Testar no computador

Abra o `index.html` direto no navegador. Para testar exatamente como fica online, use um servidor local na pasta, por exemplo `npx serve .`.
