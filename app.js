// ===== sessionStorage helpers (Client-side data storage) =====

var STORAGE_KEY = 'circuit_co_bookings';

function getBookings() {
  try {
    var raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveBooking(booking) {
  var bookings = getBookings();
  bookings.unshift(booking);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function deleteBooking(id) {
  var bookings = getBookings().filter(function (b) { return b.id !== id; });
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function updateBookingStatus(id, status) {
  var bookings = getBookings().map(function (b) {
    return b.id === id ? Object.assign({}, b, { status: status }) : b;
  });
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function generateId() {
  return 'BK-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// ===== Validation (regex validation for phone/email) =====

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phoneRegex = /^[0-9+\s()\-]{7,20}$/;

function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Please enter your name';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (value.trim().length > 60) return 'Name must be under 60 characters';
      return null;
    case 'email':
      if (!value.trim()) return 'Please enter your email address';
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
      return null;
    case 'phone':
      if (!value.trim()) return 'Please enter your phone number';
      if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number';
      return null;
    case 'deviceType':
      if (!value.trim()) return 'Please tell us what device you have';
      if (value.trim().length < 2) return 'Please enter a valid device name';
      return null;
    case 'service':
      if (!value) return 'Please select a service';
      return null;
    case 'date':
      if (!value) return 'Please choose a preferred date';
      var selected = new Date(value);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) return 'Please choose a future date';
      return null;
    case 'time':
      if (!value) return 'Please choose a preferred time';
      return null;
    case 'message':
      if (value.length > 500) return 'Message must be under 500 characters';
      return null;
    default:
      return null;
  }
}

function validateAll(data) {
  var errors = {};
  var fields = ['name', 'email', 'phone', 'deviceType', 'service', 'date', 'time', 'message'];
  fields.forEach(function (field) {
    var err = validateField(field, data[field]);
    if (err) errors[field] = err;
  });
  return errors;
}

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

// ===== Dark/Light theme engine =====

function initTheme() {
  var saved = localStorage.getItem('circuit_co_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme') || 'light';
  var next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('circuit_co_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// ===== Back to top =====

// ===== Back-to-top button =====
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  function onScroll() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Navbar scroll state + active link highlighting =====

function initNavbar() {
  var navbar = document.getElementById('mainNav');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  var path = window.location.pathname.split('/').pop() || 'index.html';
  var links = navbar.querySelectorAll('.nav-link');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== Run on DOM ready =====
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initNavbar();
  initBackToTop();

  var toggleBtn = document.getElementById('themeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
});
