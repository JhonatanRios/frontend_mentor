const cardFAQ = document.getElementById('faq');
const faqCheck = cardFAQ.querySelectorAll('input[type="checkbox"]');
const box = document.getElementById('box')

// Agrega un eventListener a cada checkbox
faqCheck.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    // Verifica si el checkbox está marcado
    if (checkbox.checked) {
      box.style.left= '-80px';
      box.style.bottom= '110px';
      // Desmarca todos los demás checkboxes
      faqCheck.forEach(otroCheckbox => {
        if (otroCheckbox !== checkbox && otroCheckbox.checked) {
          otroCheckbox.checked = false;
        }
      });
    } else {
      box.style.left= '-60px';
      box.style.bottom= '80px';
    }
  });
});

