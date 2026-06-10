// =============================================
//  PoliJardín — main.js
// =============================================

// ---- MENÚ HAMBURGUESA ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Cerrar menú al hacer clic en un link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- CONTADOR ANIMADO (stats) ----
function animarContadores() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 40);
  });
}

// Observador para activar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContadores();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) statsObserver.observe(statsBanner);

// ---- BÚSQUEDA EN CATÁLOGO ----
const searchInput = document.getElementById('searchPlanta');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.plant-card').forEach(card => {
      const nombre = card.dataset.nombre || '';
      card.style.display = nombre.includes(query) ? 'block' : 'none';
    });
  });
}

// ---- DATOS DE PLANTAS (para el modal) ----
const datosPlantas = {
  girasol: {
    emoji: '🌻',
    nombre: 'Girasol',
    cientifico: 'Helianthus annuus',
    tipo: 'Anual',
    polinizador: 'Abejas y mariposas',
    luz: 'Sol pleno (6-8 hrs)',
    riego: 'Moderado, 2-3 veces/semana',
    descripcion: 'El girasol es una planta emblemática para jardines polinizadores. Sus grandes flores amarillas son verdaderos imanes para abejas y mariposas. Crece rápido y produce semillas nutritivas.',
  },
  lavanda: {
    emoji: '💜',
    nombre: 'Lavanda',
    cientifico: 'Lavandula angustifolia',
    tipo: 'Perenne',
    polinizador: 'Mariposas y abejas',
    luz: 'Sol pleno',
    riego: 'Bajo, resistente a sequía',
    descripcion: 'La lavanda es una planta aromática muy valorada por su fragancia y su capacidad de atraer polinizadores. Requiere poco mantenimiento y florece durante meses.',
  },
  calendula: {
    emoji: '🌼',
    nombre: 'Caléndula',
    cientifico: 'Calendula officinalis',
    tipo: 'Anual',
    polinizador: 'Abejas melíferas',
    luz: 'Semi-sombra a sol',
    riego: 'Moderado',
    descripcion: 'La caléndula es fácil de cultivar y produce flores naranja y amarilla durante casi todo el año. También tiene propiedades medicinales y sirve como repelente natural de plagas.',
  },
  salvia: {
    emoji: '🌺',
    nombre: 'Salvia',
    cientifico: 'Salvia officinalis',
    tipo: 'Perenne',
    polinizador: 'Colibríes y mariposas',
    luz: 'Sol pleno',
    riego: 'Bajo a moderado',
    descripcion: 'La salvia es una planta aromática y medicinal que atrae principalmente a colibríes con sus flores tubulares. Es resistente y muy ornamental en cualquier jardín.',
  },
  cilantro: {
    emoji: '🌿',
    nombre: 'Cilantro',
    cientifico: 'Coriandrum sativum',
    tipo: 'Anual',
    polinizador: 'Abejas pequeñas y avispas',
    luz: 'Semi-sombra',
    riego: 'Moderado',
    descripcion: 'Cuando el cilantro florece, produce pequeñas flores blancas que son muy atractivas para abejas pequeñas. Es fácil de cultivar en macetas y también es útil en la cocina.',
  },
  romero: {
    emoji: '🌱',
    nombre: 'Romero',
    cientifico: 'Salvia rosmarinus',
    tipo: 'Perenne',
    polinizador: 'Abejas y mariposas',
    luz: 'Sol pleno',
    riego: 'Bajo, muy resistente',
    descripcion: 'El romero es un arbusto aromático perenne que florece en invierno y primavera. Sus pequeñas flores azul-violeta son muy visitadas por abejas. Ideal para jardines de bajo mantenimiento.',
  },
};

// ---- MODAL DETALLE PLANTA ----
function abrirDetalle(nombre) {
  const planta = datosPlantas[nombre];
  if (!planta) return;

  document.getElementById('modalContent').innerHTML = `
    <div style="text-align:center; margin-bottom:16px;">
      <span style="font-size:3rem;">${planta.emoji}</span>
      <h2 style="font-family:'Playfair Display',serif; color:#1a5c2a; margin:6px 0 2px;">${planta.nombre}</h2>
      <p style="font-style:italic; color:#888; font-size:0.85rem;">${planta.cientifico}</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
      <div style="background:#f9f6ef; border-radius:10px; padding:10px 14px;">
        <strong style="color:#1a5c2a;">🏷️ Tipo:</strong> ${planta.tipo}
      </div>
      <div style="background:#f9f6ef; border-radius:10px; padding:10px 14px;">
        <strong style="color:#1a5c2a;">🐝 Polinizadores:</strong> ${planta.polinizador}
      </div>
      <div style="background:#f9f6ef; border-radius:10px; padding:10px 14px;">
        <strong style="color:#1a5c2a;">☀️ Luz:</strong> ${planta.luz}
      </div>
      <div style="background:#f9f6ef; border-radius:10px; padding:10px 14px;">
        <strong style="color:#1a5c2a;">💧 Riego:</strong> ${planta.riego}
      </div>
    </div>
    <p style="font-size:0.9rem; color:#555; line-height:1.6;">${planta.descripcion}</p>
  `;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});

// ---- REGISTRO DE PLANTAS ----
let registros = JSON.parse(localStorage.getItem('polijardin_registros') || '[]');

function registrarPlanta() {
  const jardin   = document.getElementById('reg_jardin').value.trim();
  const planta   = document.getElementById('reg_planta').value;
  const fecha    = document.getElementById('reg_fecha').value;
  const cantidad = document.getElementById('reg_cantidad').value;
  const estado   = document.getElementById('reg_estado').value;
  const obs      = document.getElementById('reg_obs').value.trim();

  if (!jardin || !planta || !fecha) {
    mostrarToast('⚠️ Completa jardín, planta y fecha', 'error');
    return;
  }

  const registro = { id: Date.now(), jardin, planta, fecha, cantidad, estado, obs };
  registros.unshift(registro);
  localStorage.setItem('polijardin_registros', JSON.stringify(registros));

  // Limpiar form
  document.getElementById('reg_jardin').value = '';
  document.getElementById('reg_planta').value = '';
  document.getElementById('reg_fecha').value  = '';
  document.getElementById('reg_cantidad').value = '1';
  document.getElementById('reg_obs').value = '';

  renderRegistros();
  mostrarToast('🌱 Planta registrada exitosamente');
}

function renderRegistros() {
  const lista = document.getElementById('registrosLista');
  if (!lista) return;

  if (registros.length === 0) {
    lista.innerHTML = '<p style="text-align:center;color:#999;font-size:0.9rem;padding:16px;">Sin registros aún. ¡Agrega tu primera planta!</p>';
    return;
  }

  lista.innerHTML = registros.map(r => `
    <div class="registro-card">
      <div class="registro-info">
        <h4>🌿 ${r.planta} — ${r.jardin}</h4>
        <p>📅 ${r.fecha} · Cantidad: ${r.cantidad}</p>
        ${r.obs ? `<p style="font-size:0.78rem;color:#888;margin-top:2px;">📝 ${r.obs}</p>` : ''}
      </div>
      <span class="registro-badge">${r.estado}</span>
    </div>
  `).join('');
}

// Cargar registros al iniciar
renderRegistros();

// ---- TOAST NOTIFICATION ----
function mostrarToast(msg, tipo = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: ${tipo === 'error' ? '#e74c3c' : '#1a5c2a'};
    color: white; padding: 13px 24px; border-radius: 50px;
    font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.92rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25); z-index: 999;
    animation: fadeInUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---- HIGHLIGHT NAV AL SCROLL ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#f5c518' : '';
  });
}, { passive: true });

