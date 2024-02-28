 // Elementos del DOM y otras variables globales
 const loadJsonBtn = document.getElementById('load-json-btn');
 const jordansList = document.getElementById('jordans-list');
 const cantidadZapatillas = document.getElementById('cantidad-zapatillas');
 const searchBar = document.getElementById('search-bar');
 const filterLowBtn = document.getElementById('filter-low');
 const filterHighBtn = document.getElementById('filter-high');
 const filterGenderDropdown = document.getElementById('filter-gender');
 const filterShippingCheckbox = document.getElementById('filter-shipping');
 
 let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
 let jordansData = [];
 
 
 // Variable para evitar el bucle
 let initialDataLoaded = false;
 
 // Evento para cargar datos desde JSON
 document.getElementById('load-json-btn').addEventListener('click', () => {
     loadJsonData();3
 });
 
 // Evento para el menú desplegable de categorías
 document.getElementById('filter-gender').addEventListener('click', (event) => {
     const selectedCategory = event.target.id;
        console.log(selectedCategory);
     switch (selectedCategory) {
         case 'filter-men':
             filterByCategory('hombre');
             break;
         case 'filter-women':
             filterByCategory('mujer');
             break;
         case 'filter-unisex':
             filterByCategory('unisex');
             break;
 
         default:
             break;
     }
 });
 
 // Evento para cargar datos desde JSON
 loadJsonBtn.addEventListener('click', () => {
     loadJsonData();
 });
 
 // Función para actualizar las tarjetas de Jordans con filtros aplicados
 function updateJordanCards() {
    console.log('Updating Jordan cards');


     jordansList.innerHTML = '';
 
     const filteredJordans = applyFilters(jordansData);
     
     filteredJordans.forEach(jordan => {
         const card = createJordanCard(jordan);
         jordansList.appendChild(card);
     });
 }
 
 
 
 function applyFilters(data) {
    const searchQuery = searchBar.value.toLowerCase();
    const filterLow = filterLowBtn.classList.contains('active');
    const filterHigh = filterHighBtn.classList.contains('active');
    const selectedGender = filterGenderDropdown.value;
    const filterShipping = filterShippingCheckbox.checked;

    const lowerCaseSearchQuery = searchQuery.toLowerCase();


    return data.filter(jordan => {
        const meetsSearchCriteria = jordan.nombre.toLowerCase().includes(lowerCaseSearchQuery);
    
        const meetsPriceCriteria = (filterLow && jordan.precio <= 300000) || (filterHigh && jordan.precio > 300000);
    
        const meetsGenderCriteria = selectedGender === 'Todos' || jordan.sexo.toLowerCase() === selectedGender.toLowerCase();
    
        const meetsShippingCriteria = !filterShipping || (filterShipping && jordan.enviosPais);

        console.log(data); // Verifica que los datos estén presentes
        console.log(searchQuery, filterLow, filterHigh, selectedGender, filterShipping); // Verifica los valores de los filtros
        console.log(meetsSearchCriteria, meetsPriceCriteria, meetsGenderCriteria, meetsShippingCriteria); // Verifica los resultados de las condiciones


        // Muestra la zapatilla si cumple al menos una condición
        return meetsSearchCriteria || meetsPriceCriteria || meetsGenderCriteria || meetsShippingCriteria;
        
    });
}
 
 
 // Agrega eventos a los elementos de filtro
 if (filterLowBtn) {
    console.log('Filter Low button clicked');

    filterLowBtn.addEventListener('click', () => {
        filterLowBtn.classList.toggle('active');
        updateJordanCards();
    });
}

if (filterHighBtn) {
    console.log('Filter High button clicked');

    filterHighBtn.addEventListener('click', () => {
        filterHighBtn.classList.toggle('active');
        updateJordanCards();
    });
}

if (filterGenderDropdown) {
    filterGenderDropdown.addEventListener('change', () => {
        updateJordanCards();
    });
}

if (filterShippingCheckbox) {
    filterShippingCheckbox.addEventListener('change', () => {
        updateJordanCards();
    });
}
 


 // Función para cargar datos iniciales
 function loadInitialData() {
     // Verificar si los datos iniciales ya se cargaron
     if (!initialDataLoaded) {
         updateJordanCards();
         actualizarCantidadZapatillas();
         initialDataLoaded = true;
     }
 }
 
 /// Función para cargar datos desde JSON
 function loadJsonData() {
     fetch('jordans_data.json')
         .then(response => response.json())
         .then(data => {
             jordansData = data;
             updateJordanCards();
             showNotification('¡Datos cargados!', 'Se han cargado nuevos datos de Jordans.', 'success');
         })
         .catch(error => {
             console.error('Error fetching JSON data:', error);
             showNotification('Error', 'Hubo un error al cargar los datos JSON.', 'error');
         });
 }
 

 
 // Función para crear una tarjeta de Jordan
 
 function createJordanCard(jordan) {
     const card = document.createElement('div');
     card.classList.add('jordans-cards');
     card.innerHTML = `
         <h2>${jordan.nombre}</h2>
         <img class="img-jordans" src="./images/${jordan.imagen}" alt="${jordan.nombre}">
         <div class="jordans-info">
             <p>Precio: $${jordan.precio}</p>
         </div>
         <button class="btnCompra">
             <p>Comprar</p>
         </button>
     `;
     const btnCompra = card.querySelector('.btnCompra');
     btnCompra.addEventListener('click', () => {
         addToCart(jordan);
     });
 
     return card;
 }
 // Función para agregar un producto al carrito
 function addToCart(jordan) {
     carrito.push(jordan);
     localStorage.setItem('carrito', JSON.stringify(carrito));
     showNotification('¡Agregado al carrito!', 'El producto ha sido agregado al carrito exitosamente.', 'success');
     actualizarCantidadZapatillas();
     mostrarCarrito();
 }
 
 // Función para mostrar notificaciones
 function showNotification(title, text, icon) {
     Swal.fire({
         title: title,
         text: text,
         icon: icon,
     });
 }
 
 // Función para actualizar la cantidad de zapatillas en el carrito
 function actualizarCantidadZapatillas() {
     cantidadZapatillas.textContent = carrito.length.toString();
 }
 
 actualizarCantidadZapatillas();
 
 console.log('Valor de jordan:', jordan);

 updateJordanCards(jordan);
 
 console.log("Cantidad de Zapatillas en el array:", data.length);
 
 function obtenerJordanPorNombre(nombre) {
     console.log("Función obtenerJordanPorNombre activada.");
     return jordans_data.find(jordan => jordan.nombre.toLowerCase() === nombre.toLowerCase());
 }
 
 function mostrarCarrito() {
     // Lógica para mostrar el carrito
     console.table('Mostrando el carrito...');
 }
  
 jordanFakeTrue([]);
 mostrarCarrito();
 loadInitialData();