// Script pour s'assurer que le logo s'affiche correctement
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('.logo');
  
  if (logo) {
    // Vérifie si le logo est chargé correctement
    if (logo.complete) {
      checkLogoVisibility();
    } else {
      logo.addEventListener('load', checkLogoVisibility);
      logo.addEventListener('error', fixLogoError);
    }
  }
  
  function checkLogoVisibility() {
    if (logo.naturalWidth === 0 || logo.naturalHeight === 0) {
      fixLogoError();
    }
  }
  
  function fixLogoError() {
    // Fallback vers le logo PNG si le SVG échoue
    logo.src = '/img/logo.png';
    
    // Si ça échoue toujours, créer un logo textuel
    logo.addEventListener('error', function() {
      const logoContainer = document.querySelector('.logo-container');
      if (logoContainer) {
        logo.style.display = 'none';
        const textLogo = document.createElement('div');
        textLogo.className = 'text-logo';
        textLogo.innerHTML = 'A';
        textLogo.style.width = '45px';
        textLogo.style.height = '45px';
        textLogo.style.backgroundColor = '#EA950B';
        textLogo.style.color = 'white';
        textLogo.style.borderRadius = '10px';
        textLogo.style.display = 'flex';
        textLogo.style.alignItems = 'center';
        textLogo.style.justifyContent = 'center';
        textLogo.style.fontSize = '24px';
        textLogo.style.fontWeight = 'bold';
        textLogo.style.margin = '0 12px 0 0';
        logoContainer.insertBefore(textLogo, logoContainer.firstChild);
      }
    });
  }
}); 