/* ==========================================================
   WOVA.DEV | Carrossel de projetos
   - Botões "Anterior" e "Próximo"
   - Passa sozinho a cada 4,5 segundos
   - Pausa quando o mouse ou o foco está sobre o carrossel
   - Não passa sozinho para quem prefere menos movimento
   ========================================================== */
(function () {
  // Elementos da página (os ids estão no index.html)
  var trilho = document.getElementById('track');
  var botaoProximo = document.getElementById('next');
  var botaoAnterior = document.getElementById('prev');
  var carrossel = trilho.parentNode;

  var INTERVALO = 4500; // tempo entre trocas automáticas, em milissegundos
  var ESPACO = 20;      // espaço entre os cards em pixels (igual ao gap de 1.25rem no CSS)

  // Quanto o trilho anda a cada clique: largura de um card + espaço
  function passo() {
    return trilho.querySelector('.card').offsetWidth + ESPACO;
  }

  // Vai para o próximo card; no final, volta ao início
  function proximo() {
    var chegouNoFim = trilho.scrollLeft + trilho.clientWidth >= trilho.scrollWidth - 4;
    trilho.scrollTo({ left: chegouNoFim ? 0 : trilho.scrollLeft + passo(), behavior: 'smooth' });
  }

  // Volta ao card anterior; no começo, vai para o último
  function anterior() {
    var estaNoInicio = trilho.scrollLeft <= 4;
    trilho.scrollTo({ left: estaNoInicio ? trilho.scrollWidth : trilho.scrollLeft - passo(), behavior: 'smooth' });
  }

  botaoProximo.addEventListener('click', proximo);
  botaoAnterior.addEventListener('click', anterior);

  // Se a pessoa prefere menos movimento, não liga a troca automática
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var temporizador;
  var pausado = false;

  // Pausa enquanto o mouse, o dedo ou o foco estiverem no carrossel
  ['mouseenter', 'focusin', 'touchstart'].forEach(function (evento) {
    carrossel.addEventListener(evento, function () { pausado = true; });
  });
  ['mouseleave', 'focusout'].forEach(function (evento) {
    carrossel.addEventListener(evento, function () { pausado = false; });
  });

  // Liga a troca automática
  temporizador = setInterval(function () {
    if (!pausado) proximo();
  }, INTERVALO);
})();
