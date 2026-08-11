// =====  Services page rendering =====
// Builds the services grid from shared data with feature lists and pricing.

$(document).ready(function () {
  var icons = {
    'laptop': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
    'smartphone': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
    'hard-drive': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
    'circuit-board': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M11 9h4a2 2 0 0 0 2-2V3"/><circle cx="9" cy="9" r="2"/><path d="M7 21v-4a2 2 0 0 1 2-2h4"/><circle cx="15" cy="15" r="2"/></svg>',
    'shield': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'building': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>'
  };

  var checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top: 2px; flex-shrink: 0;"><polyline points="20 6 9 17 4 12"/></svg>';

  var $grid = $('#service-grid');
  if ($grid.length) {
    $grid.addClass('stagger');

    var html = SERVICES.map(function (s) {
      var featuresHtml = s.features.map(function (f) {
        return '<li class="d-flex align-items-start gap-2 small" style="color: var(--slate-700);">' + checkIcon + ' ' + f + '</li>';
      }).join('');

      return '' +
        '<div class="col-md-6 col-lg-4">' +
        '<div class="service-card glass overflow-hidden" data-service-id="' + s.id + '" data-bs-toggle="modal" data-bs-target="#serviceModal" role="button" tabindex="0" aria-label="View details for ' + s.name + '">' +
          '<div class="position-relative service-card-img-wrap" style="height: 200px; overflow: hidden;">' +
            '<img src="' + s.image + '" alt="' + s.name + '" class="w-100 h-100 service-card-img" style="object-fit: cover;" loading="lazy">' +
            '<div class="position-absolute inset-0" style="background: linear-gradient(to top, rgba(15,23,42,0.6), transparent); inset: 0;"></div>' +
            '<div class="position-absolute bottom-0 start-0 p-3 d-flex align-items-center gap-2">' +
              '<div class="d-flex align-items-center justify-content-center rounded-3 text-white service-card-icon" style="width: 48px; height: 48px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); color: var(--primary-600);">' + (icons[s.icon] || icons['laptop']) + '</div>' +
              '<div class="text-white">' +
                '<h3 class="fs-5 fw-bold mb-0">' + s.name + '</h3>' +
                '<p class="small mb-0 d-flex align-items-center gap-1" style="color: rgba(255,255,255,0.8);">' +
                  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' +
                  s.turnaround +
                '</p>' +
              '</div>' +
            '</div>' +
            '<span class="service-card-expand"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg></span>' +
          '</div>' +
          '<div class="p-4">' +
            '<p style="color: var(--slate-600); line-height: 1.6;" class="mb-3">' + s.description + '</p>' +
            '<ul class="list-unstyled d-flex flex-column gap-2 mb-3">' + featuresHtml + '</ul>' +
            '<div class="d-flex align-items-center justify-content-between pt-3" style="border-top: 1px solid var(--slate-100);">' +
              '<span class="fs-4 fw-bold" style="color: var(--slate-900);">' + s.price + '</span>' +
              '<a href="contact.html?service=' + s.id + '" class="btn-primary-custom service-card-book" style="font-size: 0.875rem; padding: 0.5rem 1.25rem;">Book this service</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '</div>';
    }).join('');
    $grid.html(html);

    // Keep the "Book this service" link from also popping the modal open,
    // and stop it re-triggering the card's own click animation.
    $grid.on('click', '.service-card-book', function (e) {
      e.stopPropagation();
    });

    // Let Enter/Space activate a focused card exactly like a click,
    // since it's a div acting as a button.
    $grid.on('keydown', '.service-card', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  }

  // Populate the detail modal each time it's about to open, based on
  // whichever card triggered it.
  var $modal = $('#serviceModal');
  if ($modal.length) {
    $modal.on('show.bs.modal', function (e) {
      var $trigger = $(e.relatedTarget);
      var id = $trigger.data('service-id');
      var s = SERVICES.find(function (item) { return item.id === id; });
      if (!s) return;

      var featuresHtml = s.features.map(function (f) {
        return '<li class="d-flex align-items-start gap-2 small" style="color: var(--slate-700);">' + checkIcon + ' ' + f + '</li>';
      }).join('');

      $modal.find('.service-modal-img').attr('src', s.image).attr('alt', s.name);
      $modal.find('.service-modal-icon').html(icons[s.icon] || icons['laptop']);
      $modal.find('.service-modal-title').text(s.name);
      $modal.find('.service-modal-turnaround').text(s.turnaround);
      $modal.find('.service-modal-desc').text(s.description);
      $modal.find('.service-modal-features').html(featuresHtml);
      $modal.find('.service-modal-price').text(s.price);
      $modal.find('.service-modal-book').attr('href', 'contact.html?service=' + s.id);
    });
  }
});
