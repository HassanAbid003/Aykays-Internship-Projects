
document.querySelectorAll('.card').forEach(card => {
const overlay = card.querySelector('.card-overlay');

card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const open = card.classList.toggle('active');
    card.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
    }
    if (e.key === 'Escape') {
    card.classList.remove('active');
    card.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    }
});

card.addEventListener('touchend', e => {
    if (e.target.closest('.swipe-btn')) return;
    e.preventDefault();
    const open = card.classList.toggle('active');
    card.setAttribute('aria-expanded', open);
    overlay.setAttribute('aria-hidden', !open);
}, { passive: false });
});

document.querySelectorAll('.swipe-btn').forEach(btn => {
  const pill = btn.querySelector('.swipe-pill');
  const name = btn.dataset.name;
  let currentX = 0;

  function getMax() { return btn.offsetWidth - pill.offsetWidth - 8; }

  function setX(x) {
    x = Math.max(0, Math.min(x, getMax()));
    pill.style.transform = 'translateX(' + x + 'px)';
    currentX = x;
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (btn.classList.contains('confirmed')) return;

    pill.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    setX(getMax());
    btn.classList.add('confirmed');
    pill.style.opacity = '0';

  setTimeout(() => {
    btn.classList.remove('confirmed');
    pill.style.opacity = '1';
    pill.style.transform = 'translateX(0)';
    btn.querySelector('.swipe-track-label').textContent = 'Add to cart';
    currentX = 0;
    setTimeout(() => pill.style.transition = '', 500);
  }, 2400);
  });
});

// Mondal

const modal = document.getElementById('modal');
const modalImg = modal.querySelector('.modal-img');
const modalTag = modal.querySelector('.modal-tag');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const swipePrice = modal.querySelector('.swipe-pill');


function openModal(card) {
  modalImg.src   = card.querySelector('.card-img-wrap img').src;
  modalImg.alt   = card.querySelector('.card-img-wrap img').alt;
  modalTag.textContent   = card.querySelector('.overlay-tag').textContent;
  modalTitle.textContent = card.querySelector('.overlay-title').textContent;
  modalDesc.textContent  = card.querySelector('.overlay-desc').textContent;

  const priceEl = card.querySelector('.card-price span');
  modal.querySelector('.swipe-pill').textContent = priceEl ? priceEl.textContent : '';
  modal.querySelector('.swipe-btn').dataset.name = card.querySelector('.overlay-title').textContent;
  modal.classList.add('open');
  qty = 1;
  qtyValue.textContent = 1;
}

function closeModal() {
  modal.classList.remove('open');
}

document.querySelectorAll('.btn-see-more').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    openModal(btn.closest('.card'));
  });
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const qtyValue = document.getElementById('qty-value');
let qty = 1;

qtyMinus.addEventListener('click', () => {
  if (qty > 1) qty--;
  qtyValue.textContent = qty;
});

qtyPlus.addEventListener('click', () => {
  if (qty < 10) qty++;
  qtyValue.textContent = qty;
});