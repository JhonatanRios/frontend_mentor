const how = document.getElementById('cardHow');
const thanks = document.getElementById('cardThanks');
const rating = document.getElementById('ratings');

function califica(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const selectOption = rating.elements.rating.value; // Obtiene el valor seleccionado
  how.style.display = "none";
  thanks.style.display = "grid";
  console.log(selectOption); // Muestra el valor seleccionado en la consola
}

rating.addEventListener('submit', califica);

// You selected <!-- Add rating here --> out of 5