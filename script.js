/* ============================================================
   Cecília Flores — configuração fácil de editar
   Para trocar fotos: coloque o arquivo em img/<pasta>/ e ajuste as listas abaixo.
   ============================================================ */
const WHATSAPP = "5562999537782";

// Fotos que aparecem deslizando no topo
const FAIXA = ["buques-12", "buques-28", "cestas-01", "buques-01", "buques-27", "casamentos-04",
               "plantas-05", "buques-18", "pousadas-06", "buques-32", "arranjos-23", "buques-20"];

// Galeria "Buquês e arranjos" — as 12 primeiras aparecem logo; o resto em "Ver mais fotos"
const BUQUES = ["buques-12", "buques-28", "buques-18", "buques-27", "arranjos-02", "buques-32",
                "buques-01", "buques-24", "arranjos-23", "buques-20", "buques-33", "buques-23",
                "buques-03", "buques-34", "arranjos-18", "buques-29", "buques-13", "buques-22",
                "arranjos-24", "buques-07", "buques-30", "arranjos-13", "buques-21", "buques-10",
                "buques-31", "buques-15", "arranjos-25", "buques-25", "buques-26",
                "buques-02", "buques-04", "buques-05", "buques-06", "buques-08", "buques-09",
                "buques-11", "buques-14", "buques-16", "buques-17", "buques-19",
                "arranjos-01", "arranjos-05", "arranjos-06", "arranjos-10", "arranjos-14", "arranjos-17"];
const BUQUES_VISIVEIS = 12;

// Cestas de presente (fotos reais)
const CESTAS = ["cestas-01", "cestas-02", "cestas-03"];

// Plantas reais do viveiro (alternam sozinhas no cartão "Ornamentais")
const ORNAMENTAIS = ["plantas-05", "plantas-01", "arranjos-08", "plantas-06", "plantas-03", "arranjos-07",
                     "plantas-02", "plantas-04", "arranjos-11", "plantas-07", "arranjos-21", "arranjos-15",
                     "arranjos-09", "arranjos-22", "arranjos-19", "arranjos-04", "arranjos-12"];

// Casamentos e pousadas (rolagem lateral)
const EVENTOS = ["casamentos-04", "pousadas-06", "casamentos-11", "pousadas-11", "casamentos-03",
                 "pousadas-02", "casamentos-12", "pousadas-10", "casamentos-09", "pousadas-07",
                 "casamentos-02", "pousadas-01", "casamentos-10", "pousadas-04", "casamentos-06",
                 "pousadas-03", "casamentos-07", "pousadas-08", "casamentos-01", "pousadas-05",
                 "pousadas-09", "casamentos-08"];

/* ============================================================ */

// Formato das fotos (o padrão é em pé, 3:4). Ao adicionar uma foto fora do padrão, inclua o nome aqui.
const ALTAS = new Set([
  "arranjos-01", "arranjos-03", "arranjos-04", "arranjos-06", "arranjos-08", "arranjos-11",
  "arranjos-13", "arranjos-14", "arranjos-15", "arranjos-16", "arranjos-17", "arranjos-20",
  "arranjos-22", "arranjos-25", "buques-02", "buques-03", "buques-04", "buques-05", "buques-06",
  "buques-09", "buques-11", "buques-14", "buques-16", "buques-17", "buques-20", "buques-24",
  "casamentos-01", "casamentos-02", "casamentos-06", "casamentos-09", "casamentos-10", "cestas-03",
  "plantas-02", "plantas-07", "pousadas-05"
]);
const DEITADAS = new Set(["casamentos-12"]);

const pasta = (nome) => nome.split("-")[0];
const mini = (nome) => `img/${pasta(nome)}/${nome}-p.webp`;
const grande = (nome) => `img/${pasta(nome)}/${nome}.webp`;
const tamanho = (nome) => ALTAS.has(nome) ? [270, 480] : DEITADAS.has(nome) ? [480, 360] : [360, 480];
const linkWa = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const DESCRICAO = { buques: "Buquê", arranjos: "Arranjo", cestas: "Cesta de presente", plantas: "Planta",
                    casamentos: "Decoração de casamento", pousadas: "Decoração em pousada" };

function criarImg(nome, alt, carregarDepois = true) {
  const img = document.createElement("img");
  const [w, h] = tamanho(nome);
  img.src = mini(nome);
  img.alt = alt;
  img.width = w; img.height = h;
  if (carregarDepois) img.loading = "lazy";
  img.decoding = "async";
  return img;
}

/* ---------- Links de WhatsApp ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = linkWa(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- Faixa do topo (duplicada para girar sem emenda) ---------- */
const faixa = document.getElementById("faixa");
[...FAIXA, ...FAIXA].forEach((nome, i) => faixa.appendChild(criarImg(nome, "", i > 5)));

/* ---------- Foto ampliada ---------- */
const dialogo = document.getElementById("ampliar");
const imgGrande = document.getElementById("ampliar-img");
const codigo = document.getElementById("ampliar-codigo");
const botaoWa = document.getElementById("ampliar-wa");
let listaAtual = [], posicao = 0;

function mostrar(i) {
  posicao = (i + listaAtual.length) % listaAtual.length;
  const nome = listaAtual[posicao];
  const tipo = DESCRICAO[pasta(nome)];
  const ref = nome.replace("-", " ").toUpperCase(); // ex.: "BUQUES 12" — ajuda a Wilma a saber qual foto é
  imgGrande.src = grande(nome);
  imgGrande.alt = `${tipo} feito pela Cecília Flores`;
  codigo.textContent = `${tipo} · ref. ${ref}`;
  const ehEvento = ["casamentos", "pousadas"].includes(pasta(nome));
  botaoWa.textContent = ehEvento ? "Pedir orçamento" : pasta(nome) === "cestas" ? "Quero uma assim" : "Quero um assim";
  botaoWa.href = linkWa(`Olá, Wilma! Vi no site a foto ${ref} (${tipo.toLowerCase()}) e gostaria de algo parecido.`);
}
function abrir(lista, i) {
  listaAtual = lista;
  mostrar(i);
  dialogo.showModal();
}
document.getElementById("fechar").onclick = () => dialogo.close();
document.getElementById("anterior").onclick = () => mostrar(posicao - 1);
document.getElementById("proxima").onclick = () => mostrar(posicao + 1);
dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
dialogo.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") mostrar(posicao - 1);
  if (e.key === "ArrowRight") mostrar(posicao + 1);
});
// deslizar o dedo para trocar de foto no celular
let toqueX = null;
dialogo.addEventListener("touchstart", (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
dialogo.addEventListener("touchend", (e) => {
  if (toqueX === null) return;
  const dx = e.changedTouches[0].clientX - toqueX;
  if (Math.abs(dx) > 50) mostrar(posicao + (dx < 0 ? 1 : -1));
  toqueX = null;
});

function montarGaleria(alvo, lista, visiveis = Infinity) {
  lista.forEach((nome, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Ampliar foto: ${DESCRICAO[pasta(nome)]}`);
    b.appendChild(criarImg(nome, `${DESCRICAO[pasta(nome)]} da Cecília Flores`));
    if (i >= visiveis) b.classList.add("oculta");
    b.onclick = () => abrir(lista, i);
    alvo.appendChild(b);
  });
}

/* ---------- Galerias ---------- */
const galeria = document.getElementById("galeria-buques");
montarGaleria(galeria, BUQUES, BUQUES_VISIVEIS);
const verMais = document.getElementById("ver-mais-buques");
verMais.onclick = () => {
  galeria.querySelectorAll(".oculta").forEach((b) => b.classList.remove("oculta"));
  verMais.remove();
};
montarGaleria(document.getElementById("galeria-eventos"), EVENTOS);
montarGaleria(document.getElementById("galeria-cestas"), CESTAS);

/* ---------- Ornamentais: fotos alternando suavemente ---------- */
const orn = document.getElementById("fotos-ornamentais");
const ornImgs = ORNAMENTAIS.map((nome, i) => {
  const img = criarImg(nome, i === 0 ? "Plantas ornamentais do viveiro da Cecília Flores" : "");
  orn.appendChild(img);
  return img;
});
let ornAtual = 0;
ornImgs[0].classList.add("visivel");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    ornImgs[ornAtual].classList.remove("visivel");
    ornAtual = (ornAtual + 1) % ornImgs.length;
    ornImgs[ornAtual].classList.add("visivel");
  }, 3500);
}

/* ---------- Menu no celular ---------- */
const menuBotao = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");
menuBotao.onclick = () => {
  const aberto = menu.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", aberto);
  menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
};
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  menu.classList.remove("aberto");
  menuBotao.setAttribute("aria-expanded", "false");
}));

/* ---------- Sombra no topo ao rolar ---------- */
const topo = document.getElementById("topo");
addEventListener("scroll", () => topo.classList.toggle("rolou", scrollY > 10), { passive: true });

/* ---------- Modo revisão: abra o site com ?revisao para ver quais fotos são provisórias ---------- */
if (location.search.includes("revisao")) document.body.classList.add("revisao");
