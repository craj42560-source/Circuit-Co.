// ===== Home page rendering =====
// Renders service preview cards, testimonials, and FAQ from shared data.

$(document).ready(function () {
  // Render service preview cards
  var $serviceGrid = $('#service-preview');
  if ($serviceGrid.length) {
    var icons = {
      'laptop': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/></svg>',
      'smartphone': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
      'hard-drive': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>',
      'circuit-board': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M11 9h4a2 2 0 0 0 2-2V3"/><circle cx="9" cy="9" r="2"/><path d="M7 21v-4a2 2 0 0 1 2-2h4"/><circle cx="15" cy="15" r="2"/></svg>',
      'shield': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'building': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>'
    };

    var html = SERVICES.map(function (s) {
      return '' +
        '<a href="services.html" class="service-card glass p-4">' +
          '<div class="service-icon-wrap">' + (icons[s.icon] || icons['laptop']) + '</div>' +
          '<h3 class="fs-5 fw-bold mb-2" style="color: var(--slate-900);">' + s.name + '</h3>' +
          '<p class="small mb-3" style="color: var(--slate-600); line-height: 1.5;">' + s.description + '</p>' +
          '<div class="d-flex align-items-center justify-content-between">' +
            '<span class="fw-semibold text-primary-600">' + s.price + '</span>' +
            '<span class="small d-flex align-items-center gap-1" style="color: var(--slate-500);">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' +
              s.turnaround +
            '</span>' +
          '</div>' +
        '</a>';
    }).join('');
    $serviceGrid.html(html);
  }

  // Render testimonials
  var $testimonials = $('#testimonial-grid');
  if ($testimonials.length) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
      stars += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }

    var tHtml = TESTIMONIALS.map(function (t) {
      return '' +
        '<div class="glass p-4">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 0 .25.25.25 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>' +
          '<p style="color: var(--slate-700); line-height: 1.6;" class="mb-3">' + t.text + '</p>' +
          '<div class="d-flex align-items-center justify-content-between">' +
            '<div>' +
              '<p class="fw-semibold mb-0" style="color: var(--slate-900);">' + t.name + '</p>' +
              '<p class="small mb-0" style="color: var(--slate-500);">' + t.role + '</p>' +
            '</div>' +
            '<div class="d-flex">' + stars + '</div>' +
          '</div>' +
        '</div>';
    }).join('');
    $testimonials.html(tHtml);
  }

  // Render FAQ
  var $faq = $('#faq-container');
  if ($faq.length) {
    var fHtml = FAQS.map(function (f) {
      return '' +
        '<details class="faq-item glass">' +
          '<summary>' +
            f.question +
            '<span class="faq-toggle">+</span>' +
          '</summary>' +
          '<div class="faq-answer">' + f.answer + '</div>' +
        '</details>';
    }).join('');
    $faq.html(fHtml);
  }
});
