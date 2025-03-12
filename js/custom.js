$(document).ready(function() {

  // Fonctionnalité de retour en haut de page
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.back-to-top').fadeIn(300);
    } else {
      $('.back-to-top').fadeOut(300);
    }
  });
  
  $('.back-to-top a').click(function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 500);
  });

  // Animation des floating labels dans les formulaires
  $('.floating-label-form-group').on('input change', function() {
    var input = $(this).find('input, textarea');
    if (input.val()) {
      input.addClass('filled');
    } else {
      input.removeClass('filled');
    }
  });

  // Gestion du formulaire de contact
  $('#contactForm').submit(function(e) {
    e.preventDefault();
    
    // Récupération des valeurs
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var message = $('#message').val();
    
    // Validation basique
    if (name && email && message) {
      $('#success').html('<div class="alert alert-success">Votre message a été envoyé avec succès!</div>');
      $('#contactForm')[0].reset();
    } else {
      $('#success').html('<div class="alert alert-danger">Veuillez remplir tous les champs obligatoires!</div>');
    }
  });

  // Animation douce pour les liens de navigation
  $('a[href*="#"]:not([href="#"]):not([href="#searchModal"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000);
        return false;
      }
    }
  });

  // Fermeture automatique de la navbar en mobile
  $('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
  });

  // Recherche simplifiée (pour démonstration)
  $('#searchInput').on('keyup', function() {
    var searchValue = $(this).val().toLowerCase();
    
    if (searchValue.length > 2) {
      // Simulation d'une recherche
      var results = [
        { title: 'Post 1', url: '/post-1/', excerpt: 'Lorem ipsum dolor sit amet...' },
        { title: 'Post 2', url: '/post-2/', excerpt: 'Consectetur adipiscing elit...' },
        { title: 'Post 3', url: '/post-3/', excerpt: 'Sed do eiusmod tempor incididunt...' }
      ];
      
      var html = '<h5>Résultats de recherche:</h5><ul class="list-unstyled">';
      
      results.forEach(function(result) {
        html += '<li class="mb-3"><a href="' + result.url + '">' + result.title + '</a><p class="small text-muted">' + result.excerpt + '</p></li>';
      });
      
      html += '</ul>';
      
      $('#searchResults').html(html);
    } else {
      $('#searchResults').html('');
    }
  });

  // Support du mode sombre
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $('body').addClass('dark-mode');
  }
}); 