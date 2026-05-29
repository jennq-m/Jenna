document.addEventListener('DOMContentLoaded', () => {

  // ── Hamburger menu toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked and update active link
  const navLinks = document.querySelectorAll('.nl a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      navLinks.forEach(l => l.classList.remove('on'));
      link.classList.add('on');
    });
  });

  // ── Project tab switcher ──
  window.swTab = function(id, btn) {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('school').classList.toggle('hidden', id !== 'school');
    document.getElementById('personal').classList.toggle('hidden', id !== 'personal');
  };

  // ── Active nav link on scroll ──
  const ids = ['hero', 'education', 'experience', 'projects', 'gallery', 'hobbies', 'contact'];
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('on'));
        const match = Array.from(navLinks).find(l => l.getAttribute('href') === '#' + entry.target.id);
        if (match) match.classList.add('on');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  ids.forEach(i => { const el = document.getElementById(i); if (el) io.observe(el); });

  // ── Education entrance animation ──
  const eduEntries = document.querySelectorAll('.edu-entry');
  const eduObserver = new IntersectionObserver((observations) => {
    observations.forEach(obs => {
      const entry = obs.target;
      const index = Array.from(eduEntries).indexOf(entry);
      if (obs.isIntersecting) {
        setTimeout(() => entry.classList.add('visible'), index * 150);
      } else {
        entry.classList.remove('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  eduEntries.forEach(e => eduObserver.observe(e));

  // ── Cursor spotlight — edu cards ──
  document.querySelectorAll('.edu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });

  // ── Cursor spotlight — exp cards ──
  document.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });

// ── Experience card entrance animation ──
  const expCards = document.querySelectorAll('.exp-card');
  const expObserver = new IntersectionObserver((observations) => {
    observations.forEach(obs => {
      const card = obs.target;
      const index = Array.from(expCards).indexOf(card);
      if (obs.isIntersecting) {
        setTimeout(() => card.classList.add('visible'), index * 150);
      } else {
        card.classList.remove('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  expCards.forEach(c => expObserver.observe(c));

// ── Project card tap to reveal on mobile ──
if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', e => {
      // Let button/link clicks pass through
      if (e.target.closest('.proj-btn') || e.target.closest('.plink')) return;

      // Toggle this card — clicking again closes it
      const isActive = card.classList.contains('tapped');

      // Close all cards first
      document.querySelectorAll('.proj-card.tapped').forEach(c => c.classList.remove('tapped'));

      // If it wasn't active, open it; if it was, leave it closed
      if (!isActive) card.classList.add('tapped');
    });
  });

  // Tap outside to close all
  document.addEventListener('click', e => {
    if (!e.target.closest('.proj-card')) {
      document.querySelectorAll('.proj-card.tapped').forEach(c => c.classList.remove('tapped'));
    }
  });
}

// ── Lightbox ──
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxVid  = document.getElementById('lightboxVid');
const lightboxLbl  = document.getElementById('lightboxLabel');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, label, isVideo) {
  if (isVideo) {
    lightboxVid.src = src;
    lightboxVid.style.display = 'block';
    lightboxImg.style.display = 'none';
  } else {
    lightboxImg.src = src;
    lightboxImg.style.display = 'block';
    lightboxVid.style.display = 'none';
    lightboxVid.src = '';
  }
  lightboxLbl.textContent = label || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxVid.src = '';
}

// Attach click to all gallery items
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const video = item.querySelector('video');
    const img   = item.querySelector('img');
    const label = item.querySelector('.gal-item-label')?.textContent || '';

    if (video) {
      openLightbox(video.src, label, true);
    } else if (img) {
      openLightbox(img.src, label, false);
    }
  });
});

// Close on button, backdrop click, or Escape key
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

});