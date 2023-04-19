const how = document.getElementById('cardHow');
const thanks = document.getElementById('cardThanks');
const rating = document.getElementById('ratings');
const answer = document.getElementById('answer');
const textAnswer = document.createElement('p');
const submit = document.getElementById('submit');



function califica(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const selectOption = rating.elements.rating.value; // Obtiene el valor seleccionado

  how.style.display = "none";
  thanks.style.display = "grid";

  textAnswer.textContent = `You selected ${selectOption} out of 5`;
  answer.appendChild(textAnswer);
  //console.log(answer); // Muestra el valor seleccionado en la consola
}
  
  
  
rating.addEventListener('click', () => {
  submit.disabled = false;
  submit.style.opacity = '1';
})



rating.addEventListener('submit', califica);