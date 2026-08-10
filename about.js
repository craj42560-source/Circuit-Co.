// ===== About page JS =====
//  Interactive timeline with jQuery slideToggle/fadeIn transitions

$(document).ready(function () {
  // Render team grid
  var $team = $('#team-grid');
  if ($team.length) {
    var html = TEAM.map(function (m) {
      return '' +
        '<div class="service-card glass overflow-hidden text-center">' +
          '<div class="position-relative" style="height: 280px; overflow: hidden;">' +
            '<img src="' + m.image + '" alt="' + m.name + '" class="w-100 h-100" style="object-fit: cover; transition: transform 0.5s ease;" loading="lazy" width="400" height="280">' +
            '<div class="position-absolute" style="inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.5), transparent);"></div>' +
          '</div>' +
          '<div class="p-4">' +
            '<h3 class="fw-bold mb-1" style="color: var(--slate-900);">' + m.name + '</h3>' +
            '<p class="text-primary-600 fw-medium small mb-2">' + m.role + '</p>' +
            '<p class="small" style="color: var(--slate-600); line-height: 1.6;">' + m.bio + '</p>' +
          '</div>' +
        '</div>';
    }).join('');
    $team.html(html);
  }

  //  Interactive timeline with jQuery slide/fade transitions
  var $timeline = $('#timeline-container');
  if ($timeline.length) {
    var tHtml = TIMELINE.map(function (item, i) {
      return '' +
        '<div class="timeline-item" data-index="' + i + '">' +
          '<div class="timeline-dot" role="button" tabindex="0" aria-label="View timeline entry for ' + item.year + '"></div>' +
          '<div class="timeline-content glass p-3">' +
            '<div class="timeline-year">' + item.year + '</div>' +
            '<div class="timeline-title">' + item.title + '</div>' +
            '<div class="timeline-text">' + item.text + '</div>' +
          '</div>' +
        '</div>';
    }).join('');
    $timeline.html(tHtml);

    // Show first item by default with fadeIn
    $timeline.find('.timeline-content').first().addClass('show').css('opacity', 0).animate({ opacity: 1 }, 400);

    // jQuery slideToggle + fadeIn on dot click
    $timeline.find('.timeline-dot').on('click', function () {
      var $content = $(this).siblings('.timeline-content');
      var $item = $(this).parent('.timeline-item');

      // Close other open items with slideUp
      $timeline.find('.timeline-content.show').not($content).slideUp(200, function () {
        $(this).removeClass('show').css('display', '');
      });

      if ($content.hasClass('show')) {
        $content.slideUp(200, function () {
          $(this).removeClass('show').css('display', '');
        });
      } else {
        $content.addClass('show').hide().slideDown(300).css('opacity', 0).animate({ opacity: 1 }, 400);
      }
    });

    // Keyboard accessibility for timeline dots
    $timeline.find('.timeline-dot').on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  }
});
