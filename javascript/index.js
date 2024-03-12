 // Elementos del DOM y otras variables globales
 const cantidadZapatillas = document.getElementById('cantidad-zapatillas');
 const searchBar = document.getElementById('search-bar');
 const filterLowBtn = document.getElementById('filter-low');
 const filterHighBtn = document.getElementById('filter-high');
 const filterGenderDropdown = document.getElementById('filter-gender');
 const filterShippingCheckbox = document.getElementById('filter-shipping');
 const machoAlfa = document.getElementById('hombre');


machoAlfa.addEventListener('click', () =>{
    const valor = 'Masculino';
    renderJordan(valor);
    
})

 searchBar.addEventListener('keyup', ()=>{
    const value= searchBar.value.toLowerCase();
    console.log(value)
 })
 
 let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
 let jordansData = [];
 
 
 // Variable para evitar el bucle
 let initialDataLoaded = false;
 
      
 
 // Función para actualizar las tarjetas de Jordans con filtros aplicados
//  function updateJordanCards() {
//      jordansList.innerHTML = '';
 
//      const filteredJordans = applyFilters(jordansData);
     
//      filteredJordans.forEach(jordan => {
//          const card = createJordanCard(jordan);
//          jordansList.appendChild(card);
//      });
//  }
 
 
 
 function applyFilters(data) {
    const searchQuery = searchBar.value ? searchBar.value.toLowerCase() : '';
    const filterLow = filterLowBtn.classList.contains('active');
    const filterHigh = filterHighBtn.classList.contains('active');
    const selectedGender = filterGenderDropdown.value ? filterGenderDropdown.value.toString().toLowerCase() : '';
    const filterShipping = filterShippingCheckbox.checked;

    const lowerCaseSearchQuery = searchQuery.toLowerCase();


    return data.filter(jordan => {
        const meetsSearchCriteria = jordan.nombre.toLowerCase().includes(lowerCaseSearchQuery);
    
        const meetsPriceCriteria = (filterLow && jordan.precio <= 300000) || (filterHigh && jordan.precio > 300000);
    
        const meetsGenderCriteria = selectedGender === 'Todos' || jordan.sexo.toLowerCase() === selectedGender.toLowerCase();
    
        const meetsShippingCriteria = !filterShipping || (filterShipping && jordan.enviosPais);

        // Muestra la zapatilla si cumple al menos una condición
        return meetsSearchCriteria || meetsPriceCriteria || meetsGenderCriteria || meetsShippingCriteria;
        
    });
}
 
 function precios(){

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
} 
 
 /// Función para cargar datos desde JSON
//  function loadJsonData() {
//      fetch('jordans_data.json')
//          .then(response => response.json())
//          .then(data => {
//              jordansData = data;
//              updateJordanCards();
//              showNotification('¡Datos cargados!', 'Se han cargado nuevos datos de Jordans.', 'success');
//          })
//          .catch(error => {
             
//         });
//  }

const cargarJsonData = async () => {
    try {
        const res = await fetch('jordans_data.json');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        showNotification('Error', 'Hubo un error al cargar los datos JSON.', 'error');
    }
};

// Función para crear una tarjeta de Jordan
const renderJordan = async (filter="") => {
    // Guardar info json
    const dataFetch = await cargarJsonData();
    const jordansList = document.getElementById('jordans-list');

    jordansList.innerHTML = '';

    dataFetch.forEach((item) => {
        if(item.nombre.toLowerCase().includes(filter)){
            jordansList.innerHTML += 
            `
                <h2>${item.nombre}</h2>
                <img class="img-jordans" src="./images/${item.imagen}" alt="${item.nombre}">
                <div class="jordans-info">
                    <p>Precio: $${item.precio}</p>
                </div>
                <button class="btnCompra">
                    <p>Comprar</p>
                </button>
            `
        }
        else if(item.sexo.toLowerCase()===filter){
            jordansList.innerHTML += 
            `
                <h2>${item.nombre}</h2>
                <img class="img-jordans" src="./images/${item.imagen}" alt="${item.nombre}">
                <div class="jordans-info">
                    <p>Precio: $${item.precio}</p>
                </div>
                <button class="btnCompra">
                    <p>Comprar</p>
                </button>
            `
        }
        ;
    });
};

searchBar.addEventListener('keyup', (event)=>{
    if(event.key === 'Enter'){
        const valor = searchBar.value.toLowerCase().trim();
        renderJordan(valor)
    }
    
})

renderJordan();
 
 

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
 
 function obtenerJordanPorNombre(nombre) {
     console.log("Función obtenerJordanPorNombre activada.");
     return jordans_data.find(jordan => jordan.nombre.toLowerCase() === nombre.toLowerCase());
 }
 
 function mostrarCarrito() {
     // Lógica para mostrar el carrito
     console.table('Mostrando el carrito...');
 }

 mostrarCarrito()