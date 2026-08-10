// ===== Bookings page — sessionStorage integration =====
// Reads, filters, and manages bookings saved to sessionStorage.

var currentFilter = 'all';

$(document).ready(function () {
  renderBookings();
});

function renderBookings() {
  var bookings = getBookings();
  var $container = $('#bookings-container');

  if (bookings.length === 0) {
    $container.html(
      '<div class="glass-strong p-5 text-center mx-auto animate-scale-in" style="max-width: 600px;">' +
        '<div class="d-flex align-items-center justify-content-center mx-auto mb-4" style="width: 80px; height: 80px; border-radius: 50%; background: var(--slate-100); color: var(--slate-400);">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>' +
        '</div>' +
        '<h2 class="fs-4 fw-bold mb-2" style="color: var(--slate-900);">No bookings yet</h2>' +
        '<p style="color: var(--slate-500);" class="mb-4">When you book a repair, it will appear here. Your bookings are saved for this browser session using sessionStorage.</p>' +
        '<a href="contact.html" class="btn-primary-custom">Book your first repair</a>' +
      '</div>'
    );
    $('#filter-tabs').hide();
    return;
  }

  $('#filter-tabs').show();

  // Update counts
  var counts = {
    all: bookings.length,
    pending: bookings.filter(function (b) { return b.status === 'pending'; }).length,
    confirmed: bookings.filter(function (b) { return b.status === 'confirmed'; }).length,
    completed: bookings.filter(function (b) { return b.status === 'completed'; }).length,
    cancelled: bookings.filter(function (b) { return b.status === 'cancelled'; }).length
  };

  $('.filter-tab .count').each(function () {
    var key = $(this).data('count');
    $(this).text(counts[key] || 0);
  });

  var filtered = currentFilter === 'all' ? bookings : bookings.filter(function (b) { return b.status === currentFilter; });

  if (filtered.length === 0) {
    $container.html('<p class="text-center py-5" style="color: var(--slate-500);">No bookings in this category.</p>');
    return;
  }

  var statusConfig = {
    pending: { label: 'Pending', bg: 'status-pending', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
    confirmed: { label: 'Confirmed', bg: 'status-confirmed', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>' },
    completed: { label: 'Completed', bg: 'status-completed', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' },
    cancelled: { label: 'Cancelled', bg: 'status-cancelled', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' }
  };

  var html = filtered.map(function (b) {
    var status = statusConfig[b.status] || statusConfig.pending;
    var serviceName = SERVICES.find(function (s) { return s.id === b.service; });
    serviceName = serviceName ? serviceName.name : b.service;

    var actions = '';
    if (b.status === 'pending') {
      actions += '<button onclick="changeStatus(\'' + b.id + '\', \'confirmed\')" class="btn-secondary-custom w-100 mb-2" style="font-size: 0.8125rem; padding: 0.5rem;">Mark confirmed</button>';
    }
    if (b.status === 'confirmed') {
      actions += '<button onclick="changeStatus(\'' + b.id + '\', \'completed\')" class="btn-secondary-custom w-100 mb-2" style="font-size: 0.8125rem; padding: 0.5rem;">Mark completed</button>';
    }
    if (b.status === 'pending' || b.status === 'confirmed') {
      actions += '<button onclick="changeStatus(\'' + b.id + '\', \'cancelled\')" class="btn-ghost-custom w-100 mb-2" style="font-size: 0.8125rem; padding: 0.5rem; color: var(--error-600);">Cancel booking</button>';
    }
    actions += '<button onclick="removeBooking(\'' + b.id + '\')" class="btn-ghost-custom w-100" style="font-size: 0.8125rem; padding: 0.5rem; color: var(--slate-400);">Delete</button>';

    var messageHtml = b.message ? '<p class="small fst-italic mt-2 mb-0 ps-3" style="color: var(--slate-500); border-left: 2px solid var(--slate-200);">"' + b.message + '"</p>' : '';
    var priceHtml = b.totalPrice ? '<span class="d-flex align-items-center gap-1" style="color: var(--primary-600); font-weight: 600;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> ' + b.totalPrice + '</span>' : '';
    var promoHtml = b.promoCode ? '<span class="badge bg-success-100" style="color: var(--success-600); font-size: 0.7rem;">Promo: ' + b.promoCode + '</span>' : '';

    var createdDate = new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return '' +
      '<div class="glass p-4 mb-3 animate-fade-in-up">' +
        '<div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">' +
          '<div class="flex-grow-1">' +
            '<div class="d-flex align-items-center gap-2 mb-2">' +
              '<span class="status-badge ' + status.bg + '">' + status.icon + ' ' + status.label + '</span>' +
              '<span class="small font-monospace" style="color: var(--slate-400);">' + b.id + '</span>' +
            '</div>' +
            '<h3 class="fw-bold fs-5 mb-2" style="color: var(--slate-900);">' + serviceName + '</h3>' +
            '<div class="d-flex flex-wrap gap-3 small" style="color: var(--slate-600);">' +
              '<span class="d-flex align-items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/></svg> ' + b.deviceType + '</span>' +
              '<span class="d-flex align-items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + b.date + '</span>' +
              '<span class="d-flex align-items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ' + b.time + '</span>' +
              '<span class="d-flex align-items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> ' + b.email + '</span>' +
            '</div>' +
            messageHtml +
            '<div class="d-flex flex-wrap gap-2 mt-2">' + priceHtml + promoHtml + '</div>' +
            '<p class="small mt-2 mb-0" style="color: var(--slate-400);">Booked on ' + createdDate + '</p>' +
          '</div>' +
          '<div class="d-flex flex-column gap-1" style="min-width: 180px;">' + actions + '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  $container.html(html);
}

function setFilter(filter) {
  currentFilter = filter;
  $('.filter-tab').removeClass('active');
  $('.filter-tab[data-filter="' + filter + '"]').addClass('active');
  renderBookings();
}

function changeStatus(id, status) {
  updateBookingStatus(id, status);
  renderBookings();
}

function removeBooking(id) {
  deleteBooking(id);
  renderBookings();
}
