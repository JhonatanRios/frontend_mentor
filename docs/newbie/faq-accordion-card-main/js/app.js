const cardFAQ = document.getElementById('faq');
const faqCheck = cardFAQ.querySelectorAll('input[type="checkbox"]');
const box = document.getElementById('box');

function boxMoved() {
  box.style.left= '-80px';
  box.style.bottom= '110px';
}

function boxReset() {
  box.style.left= '-60px';
  box.style.bottom= '80px';
}

// Agrega un eventListener a cada checkbox
faqCheck.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    // Verifica si el checkbox está marcado
    if (checkbox.checked) {
      // Mueve el box y desmarca los demás checkboxes
      boxMoved();
      faqCheck.forEach(otroCheckbox => {
        if (otroCheckbox !== checkbox && otroCheckbox.checked) {
          otroCheckbox.checked = false;
        }
      });
    } else {
      // Devuelve el box
      boxReset();
    }
  });
});