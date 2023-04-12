const filtroLevels = document.getElementById('filtros');

// Create the items div only once
if (!document.getElementById('items')) {
  const div = document.createElement('div');
  div.id = 'items';
  filtroLevels.insertBefore(div, filtroLevels.firstChild);
}

function generarInputsRadioLevels() {
  fetch('./js/filtros.json')
  .then(response => response.json())
  .then(data => {
    // Clear any existing content from the items div before adding new inputs
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = data[i].id;
      input.name = 'levels';
      input.value = data[i].id;
      
      const label = document.createElement('label');
      label.htmlFor = data[i].id;
      label.textContent = data[i].nombre;
      
      // Check the first input element created
      if (i === 0) {
        input.checked = true;
      }
      
      itemsDiv.appendChild(input);
      itemsDiv.appendChild(label);
    }
  })
  .catch(error => {
    // Display an error message to the user if the fetch request fails
    const itemsDiv = document.getElementById('items');
    itemsDiv.innerHTML = '<p>Los filtros no se pueden cargar debido a un error.</p>';
    console.error('Error:', error);
  });
}

generarInputsRadioLevels();