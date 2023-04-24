//inputs
const inputName = document.getElementById('cardName');
const inputNumber = document.getElementById('cardNumber');
const inputExpiryMonth = document.getElementById('expiryDateMonth');
const inputExpiryYear = document.getElementById('expiryDateYear');

//info
const txtName = document.getElementById('nameFront');
const txtNumber = document.getElementById('numberFront');
const txtExpiryDate = document.getElementById('dateFront');

inputName.addEventListener('input', ({ target }) => {
  txtName.textContent = target.value;
});

inputNumber.addEventListener('input', ({ target }) => {
  txtNumber.textContent = target.value;
});

inputExpiryMonth.addEventListener('input', ({ target }) => {
  txtExpiryDate.textContent = `${target.value}/${inputExpiryYear.value}`;
});

inputExpiryYear.addEventListener('input', ({ target }) => {
  txtExpiryDate.textContent = `${inputExpiryMonth.value}/${target.value}`;
});