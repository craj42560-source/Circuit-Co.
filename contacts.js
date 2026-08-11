// ===== Contact page JS =====
// Dynamic pricing formula, promo code engine, sessionStorage, map pin popups

$(document).ready(function () {
  var form = document.getElementById('bookingForm');
  if (!form) return;

  var todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('date').setAttribute('min', todayStr);

  var timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];
  var $timeSelect = $('#time');
  timeSlots.forEach(function (slot) {
    $timeSelect.append('<option value="' + slot + '">' + slot + '</option>');
  });

  // Populate service dropdown
  var $serviceSelect = $('#service');
  if (typeof SERVICES !== 'undefined') {
    SERVICES.forEach(function (s) {
      $serviceSelect.append('<option value="' + s.id + '">' + s.name + ' — ' + s.price + '</option>');
    });
  }

  // Populate urgency dropdown
  var $urgencySelect = $('#urgency');
  if (typeof URGENCY_OPTIONS !== 'undefined') {
    URGENCY_OPTIONS.forEach(function (u) {
      $urgencySelect.append('<option value="' + u.id + '">' + u.label + '</option>');
    });
  }

  // jQuery: character counter for message field
  $('#message').on('input', function () {
    var len = $(this).val().length;
    var remaining = 500 - len;
    $('#char-count').text(remaining + ' characters remaining');
    if (remaining < 50) {
      $('#char-count').css('color', '#dc2626');
    } else {
      $('#char-count').css('color', '#64748b');
    }
  });

  // jQuery: focus highlight on form groups
  $('.form-group-custom').on('focusin', function () {
    $(this).find('.field-icon').addClass('text-primary-600');
  });
  $('.form-group-custom').on('focusout', function () {
    $(this).find('.field-icon').removeClass('text-primary-600');
  });

  // jQuery: animate service select change
  $('#service').on('change', function () {
    var val = $(this).val();
    if (val) {
      $('#service-hint').slideDown(200).text('Great choice — we will confirm availability for this service.');
    } else {
      $('#service-hint').slideUp(200);
    }
    updatePricing();
  });

  // Update pricing when urgency changes
  $('#urgency').on('change', function () {
    updatePricing();
  });

  // ===== Dynamic pricing formula =====
  var currentPromo = null;

  function updatePricing() {
    var serviceId = $('#service').val();
    var urgencyId = $('#urgency').val() || 'standard';

    var basePrice = (typeof SERVICE_PRICES !== 'undefined' && SERVICE_PRICES[serviceId]) ? SERVICE_PRICES[serviceId] : 0;
    var urgencyOption = typeof URGENCY_OPTIONS !== 'undefined' ? URGENCY_OPTIONS.find(function (u) { return u.id === urgencyId; }) : null;
    var multiplier = urgencyOption ? urgencyOption.multiplier : 1.0;

    var subtotal = basePrice * multiplier;
    var discount = 0;
    var total = subtotal;

    if (currentPromo) {
      if (currentPromo.type === 'percent') {
        discount = subtotal * (currentPromo.value / 100);
      } else if (currentPromo.type === 'fixed') {
        discount = Math.min(currentPromo.value, subtotal);
      }
      total = subtotal - discount;
    }

    // DOM updates
    $('#price-base').text('£' + basePrice.toFixed(2));
    $('#price-urgency').text('×' + multiplier.toFixed(1));
    $('#price-subtotal').text('£' + subtotal.toFixed(2));

    if (discount > 0) {
      $('#price-discount-row').show();
      $('#price-discount').text('-£' + discount.toFixed(2));
    } else {
      $('#price-discount-row').hide();
    }

    $('#price-total').text('£' + total.toFixed(2));

    if (basePrice === 0) {
      $('#pricing-summary').slideUp(200);
    } else {
      $('#pricing-summary').slideDown(200);
    }
  }

  // ===== Promo code engine =====
  $('#promo-apply').on('click', function () {
    var code = $('#promo-code').val().trim().toUpperCase();
    var $msg = $('#promo-message');

    if (!code) {
      $msg.removeClass('success').addClass('error').text('Please enter a promo code.');
      return;
    }

    if (typeof PROMO_CODES !== 'undefined' && PROMO_CODES[code]) {
      currentPromo = PROMO_CODES[code];
      $msg.removeClass('error').addClass('success').text('Promo applied: ' + currentPromo.label + '!');
      $('#promo-code').prop('disabled', true);
      $('#promo-apply').prop('disabled', true).text('Applied');
      updatePricing();
    } else {
      $msg.removeClass('success').addClass('error').text('Invalid promo code. Try REPAIR10, STUDENT15, WELCOME, or SUMMER25.');
      currentPromo = null;
      updatePricing();
    }
  });

  // Validation functions
  function validateField(field, value) {
    var error = '';
    value = value ? value.trim() : '';

    switch (field) {
      case 'name':
        if (!value) error = 'Please enter your full name';
        break;
      case 'email':
        if (!value) {
          error = 'Please enter your email address';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Please enter your phone number';
        } else {
          // Removes spaces/dashes to validate standard UK formats (07xxx, 01xxx, 02xxx, 03xxx, or +44 equivalents)
          var cleanPhone = value.replace(/[\s\-]/g, '');
          var isValidUk = /^(?:(?:\+44|0)7\d{9}|(?:\+44|0)[123]\d{8,9})$/.test(cleanPhone);
          if (!isValidUk) {
            error = 'Please enter a valid UK phone number (e.g. 07123 456789 or +44 7123 456789)';
          }
        }
        break;
      case 'deviceType':
        if (!value) error = 'Please specify your device type';
        break;
      case 'service':
        if (!value) error = 'Please select a service';
        break;
      case 'date':
        if (!value) error = 'Please select a preferred date';
        break;
      case 'time':
        if (!value) error = 'Please select a preferred time';
        break;
    }
    return error;
  }

  function validateAll(data) {
    var errors = {};
    for (var key in data) {
      var err = validateField(key, data[key]);
      if (err) errors[key] = err;
    }
    return errors;
  }

  // Live validation on blur & input
  var fields = ['name', 'email', 'phone', 'deviceType', 'service', 'date', 'time', 'message'];
  fields.forEach(function (field) {
    $('#' + field).on('blur', function () {
      var value = $(this).val();
      var error = validateField(field, value);
      var $errorEl = $('#error-' + field);
      var $input = $('#' + field);
      if (error) {
        $errorEl.text(error).addClass('show');
        $input.addClass('is-invalid');
      } else {
        $errorEl.removeClass('show').text('');
        $input.removeClass('is-invalid');
      }
    });

    $('#' + field).on('input change', function () {
      var $errorEl = $('#error-' + field);
      var $input = $('#' + field);
      if ($errorEl.hasClass('show')) {
        var value = $(this).val();
        var error = validateField(field, value);
        if (!error) {
          $errorEl.removeClass('show').text('');
          $input.removeClass('is-invalid');
        }
      }
    });
  });

  // Form submit
  $('#bookingForm').on('submit', function (e) {
    e.preventDefault();

    var data = {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      deviceType: $('#deviceType').val(),
      service: $('#service').val(),
      urgency: $('#urgency').val(),
      date: $('#date').val(),
      time: $('#time').val(),
      message: $('#message').val(),
      promoCode: currentPromo ? $('#promo-code').val().trim().toUpperCase() : '',
      totalPrice: $('#price-total').text()
    };

    var errors = validateAll(data);
    var hasAny = false;

    fields.forEach(function (field) {
      var $errorEl = $('#error-' + field);
      var $input = $('#' + field);
      if (errors[field]) {
        $errorEl.text(errors[field]).addClass('show');
        $input.addClass('is-invalid');
        hasAny = true;
      } else {
        $errorEl.removeClass('show').text('');
        $input.removeClass('is-invalid');
      }
    });

    if (hasAny) {
      var firstError = fields.find(function (f) { return errors[f]; });
      if (firstError) {
        var el = document.getElementById('field-' + firstError);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Save booking logic
    var id = typeof generateId === 'function' ? generateId() : 'BK' + Math.floor(100000 + Math.random() * 900000);
    var booking = Object.assign({}, data, {
      id: id,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    var $btn = $('#submitBtn');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status"></span> Saving...');

    setTimeout(function () {
      if (typeof saveBooking === 'function') {
        saveBooking(booking);
      }

      var serviceName = (typeof SERVICES !== 'undefined') ? SERVICES.find(function (s) { return s.id === data.service; }) : null;
      serviceName = serviceName ? serviceName.name : data.service;

      var promoRow = data.promoCode ? '<dt class="col-5" style="color: var(--slate-500);">Promo code:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.promoCode + '</dd>' : '';
      var priceRow = '<dt class="col-5" style="color: var(--slate-500);">Estimated total:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.totalPrice + '</dd>';

      var successHtml = '' +
        '<div class="text-center animate-scale-in">' +
          '<div class="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle" style="width: 80px; height: 80px; border-radius: 50%; background: var(--success-100); color: var(--success-600);">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</div>' +
          '<h1 class="fs-2 fw-bold mb-2" style="color: var(--slate-900);">Booking confirmed!</h1>' +
          '<p class="fs-5 mb-1" style="color: var(--slate-600);">Thank you, ' + data.name.split(' ')[0] + '. Your repair booking has been saved.</p>' +
          '<p class="small mb-4" style="color: var(--slate-500);">Booking reference: <span class="font-monospace fw-semibold" style="color: var(--slate-700);">' + id + '</span></p>' +
          '<div class="glass p-4 mb-4 text-start mx-auto" style="max-width: 500px;">' +
            '<dl class="row mb-0 small">' +
              '<dt class="col-5" style="color: var(--slate-500);">Service:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + serviceName + '</dd>' +
              '<dt class="col-5" style="color: var(--slate-500);">Device:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.deviceType + '</dd>' +
              '<dt class="col-5" style="color: var(--slate-500);">Date:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.date + '</dd>' +
              '<dt class="col-5" style="color: var(--slate-500);">Time:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.time + '</dd>' +
              '<dt class="col-5" style="color: var(--slate-500);">Email:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.email + '</dd>' +
              '<dt class="col-5" style="color: var(--slate-500);">Phone:</dt><dd class="col-7 fw-semibold" style="color: var(--slate-800);">' + data.phone + '</dd>' +
              promoRow + priceRow +
            '</dl>' +
          '</div>' +
          '<p class="small mb-4" style="color: var(--slate-500);">We have saved your booking for this session. You can review it anytime under "My Bookings" while this browser tab stays open.</p>' +
          '<div class="d-flex flex-wrap gap-3 justify-content-center">' +
            '<a href="bookings.html" class="btn-primary-custom">View My Bookings</a>' +
            '<button onclick="resetForm()" class="btn-secondary-custom">Book another repair</button>' +
          '</div>' +
        '</div>';

      $('#contact-content').html(successHtml);
      document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  });

  // Map pin popups
  $('.map-pin').on('click', function () {
    var $pin = $(this);
    if ($pin.hasClass('active')) {
      $pin.removeClass('active');
    } else {
      $('.map-pin').removeClass('active');
      $pin.addClass('active');
    }
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.map-pin').length) {
      $('.map-pin').removeClass('active');
    }
  });

  var preselectId = new URLSearchParams(window.location.search).get('service');
  if (preselectId && typeof SERVICES !== 'undefined' && SERVICES.some(function (s) { return s.id === preselectId; })) {
    $serviceSelect.val(preselectId).trigger('change');
  }
});

function resetForm() {
  window.location.href = 'contact.html';
}
