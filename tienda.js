// ===== Configurá tu número de WhatsApp (solo dígitos, con código de país/área) =====
const PHONE = "5491112345678"; // <-- reemplazá por tu número (ej: 54911XXXXXXXX)

// Genera el link wa.me con el nombre del producto
function makeWaLink(productName) {
  const message = `Hola 👋, quiero comprar: ${productName}. ¿Está disponible?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

// Setea href en todos los botones "Comprar"
(function(){
  // Enlaza cada botón con su mensaje
  document.querySelectorAll(".buy-btn").forEach(btn => {
    // Prioriza el data-product; si no está, toma el texto del nombre
    const card = btn.closest(".product");
    const fromData = btn.getAttribute("data-product");
    const nameEl = card ? card.querySelector(".product__name") : null;
    const productName = (fromData || (nameEl ? nameEl.textContent.trim() : "Producto")).trim();

    const link = makeWaLink(productName);
    btn.setAttribute("href", link);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");

    // Por si querés navegación directa en la misma pestaña:
    // btn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   window.location.href = link;
    // });
  });

  // ===== Lógica de carrusel: scroll por “página” visible =====
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const prev = carousel.querySelector('.carousel__btn--prev');
    const next = carousel.querySelector('.carousel__btn--next');
    const viewport = carousel.querySelector('.carousel__viewport');

    function pageWidth(){
      const firstCard = track.querySelector('.product');
      if(!firstCard) return viewport.clientWidth;
      const style = window.getComputedStyle(firstCard);
      const cardWidth = firstCard.getBoundingClientRect().width + parseFloat(style.marginRight || 0);
      const cols = Math.max(1, Math.round(viewport.clientWidth / cardWidth));
      return cols * cardWidth;
    }

    function scrollByDir(dir){
      viewport.scrollBy({ left: dir * pageWidth(), behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollByDir(-1));
    next.addEventListener('click', () => scrollByDir(1));

    // Arrastre táctil/mouse
    let isDown=false, startX=0, scrollStart=0;
    viewport.addEventListener('pointerdown', (e)=>{ isDown=true; startX=e.clientX; scrollStart=viewport.scrollLeft; viewport.setPointerCapture(e.pointerId); });
    viewport.addEventListener('pointermove', (e)=>{ if(!isDown) return; const dx=e.clientX-startX; viewport.scrollLeft = scrollStart - dx; });
    viewport.addEventListener('pointerup', ()=>{ isDown=false; });
    viewport.addEventListener('pointercancel', ()=>{ isDown=false; });
  });
})();
