


const productoDOM = document.querySelector(".productos__centro")
const carritoDOM = document.querySelector(".carritocompra")
const carritoCenter = document.querySelector(".carrito__center")
const openCarrito = document.querySelector(".carrito_icon")
const closeCarrito = document.querySelector(".closecarrito")
const overlay = document.querySelector(".carrito_overlay")
const carritoTotal = document.querySelector(".carrito__total")
const clearBTN = document.querySelector(".clear__carrito")
const itemTotales = document.querySelector(".item_total")
// const paginationDOM = document.getElementById('pagination');
const paginationContainer = document.getElementById("pagination");
const isProductoPage = window.location.pathname.includes('productos.html');
const selectElement = document.getElementById('category');




if (isProductoPage) {
  const scrollToTopButton = document.getElementById("scrollToTop");
  const scrollToBottomButton = document.getElementById("scrollToBottom");

  scrollToTopButton.disabled = true;
  scrollToBottomButton.disabled = true;

  scrollToTopButton.addEventListener("click", scrollToTop);
  scrollToBottomButton.addEventListener("click", scrollToBottom);
  window.addEventListener("scroll", handleScroll);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  }

  function handleScroll() {
    if (window.scrollY > 200) {
      scrollToTopButton.style.opacity = "1";
      scrollToTopButton.disabled = false;
    } else {
      scrollToTopButton.style.opacity = "0";
      scrollToTopButton.disabled = true;
    }

    if (window.scrollY < document.body.scrollHeight - window.innerHeight) {
      scrollToBottomButton.style.opacity = "1";
      scrollToBottomButton.disabled = false;
    } else {
      scrollToBottomButton.style.opacity = "0";
      scrollToBottomButton.disabled = true;
    }
  }
}



// const detalles = document.getElementById("")
let pagina = 1;
const productosPorPagina = 5;
// const productosPorPagina2 = 8;

let carrito = [];
let buttonDOM = [];


class UI {
    renderProductos(productos){
        let result = ""

        if(window.location.pathname=== "/index.html" || window.location.pathname==="/"){
            productos = productos.slice(0, productosPorPagina);
        }

    

        productos.forEach((producto)=>{
            result += `
            <div class="producto">
            <!-- INICIO CONTENIDO DE IMAGEN -->
            <div class="image_container">
            <img class="imagenProd" src="${producto.image}" alt="">
            </div>
      
            <!-- INICIO DE DESCRIPCION DEL PRODUCTO -->
            <div class="producto__footer">
              <!-- titulo -->
              <h1>${producto.title}</h1>
              <!-- precio producto -->
              <div class="precio__producto"><h2 class="preciotitle">LPS. ${producto.price}.00</h2></div>
            </div>
      
            <div class="botonAniadir">
              <div class="boton">
                <a href="#" class="btn addToCart fa-solid fa-circle-plus" style="color: #4F1964;" data-id=${producto.id} ></a>
              </div>
            </div>
            <!-- ----------------------- -->
            <!-- FINAL DE DESCRIPCION DEL PRODUCTO -->
          </div>
            `  
        });

        productoDOM.innerHTML = result
//  // Verifica si estás en la página de "productos" antes de llamar a la lógica de paginación
//  if (window.location.pathname.includes("productos.html")) {
//     this.renderPagination(productos);
// }

          // Llama a la función de paginación después de renderizar los productos
        
    }




    // limitarProductosenIndex(){
    //     const productosLimitados = productos.slice(0, productosPorPagina);
    //     this.renderProductos(productosLimitados)
    // }
    

  

    getButtons(){
        const buttons = [...document.querySelectorAll(".addToCart")];
		buttonDOM = buttons;
		buttons.forEach((button)=> {
			const id = button.dataset.id;
			const inCart = carrito.find(item => item.id === parseInt(id, 10));

			if(inCart){
                // button.classList.add("custom");
				button.innerHTML = " En el carrito";
				button.disabled = true;
              
                
			}
			button.addEventListener("click", e =>{
				e.preventDefault();
                const clickedButton = e.target; // Obtener el botón que fue clicado
                const clickedId = clickedButton.dataset.id; // Obtener el ID del producto
                const inCart = carrito.find(item => item.id === parseInt(clickedId, 10));

                if (!inCart) {
                    
                    // cuando la pagina esta limpia se agrega un nuevo producto
                    // clickedButton.classList.add("custom");
                    clickedButton.innerHTML = " En el carrito";
                    clickedButton.disabled = true; // Desactivar el botón
                    alertify.success('Se agregó el artículo al carrito de compra!');
    
                    // GET productos al carrito
                    const carritoItem = {...Storage.getProductos(id), cantidad: 1}

    
                    // Agregamos el producto al carrito
                    carrito = [...carrito, carritoItem]
    
                    // Guardamos el carrito al localstorage
                    Storage.saveCart(carrito)
    
                    // Set cart values
                    this.setItemValues(carrito)
                    this.addCarritoItem(carritoItem)
                    // Show al carrito
                }
			})
		})
    }
    

    setItemValues(carrito){
        let tempTotal = 0;
        let itemTotal = 0;
        carrito.map(item=>{
            tempTotal += item.price * item.cantidad;
            itemTotal += item.cantidad;  
        });
        carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
        itemTotales.innerText = itemTotal
    }

addCarritoItem({image, price, title, id}){
    const div = document.createElement("div");
    div.classList.add("carrito__item");
//     const div2 = document.createElement("div");
//     div2.classList.add("carritocontenido");
// div2.innerHTML = 

  // Buscar el producto en el carrito para obtener su cantidad
  const carritoItem = carrito.find(item => item.id === id);
  const cantidad = carritoItem ? carritoItem.cantidad : 0;
    div.innerHTML = `
  
 
    <img src="${image}" alt="${title}">

        <!-- inicio div -->
        <div>
         <h4 style="margin-left:15px">${title}</h4>
         <p class="price">
          ${price}
         </p>
           <!-- div cantidad de articulos -->
           <div> 
            <span class="minus" data-id=${id}>
              <i class="fa-solid fa-circle-minus" "></i>
            </span>
                <p class="item__cantidad">${cantidad}</p>
            <span class="plus" data-id=${id}>
              <i class="fa-solid fa-circle-plus" "></i>
            </span>
           </div>
           <!-- final cantidad de articulos -->
        </div>
      

        <!-- FINAL DIV -->       
         <!--  remover articulo -->
         <div>
          <span class="remove__item" data-id=${id}>
            <i class="fa-solid fa-trash"></i>
          </span>
         </div>

         
         <!-- final remover articulo -->

    `

    carritoCenter.appendChild(div)


     // Actualizar el estado del botón
     const button = this.singleButton(id);
     if (button) {
        //  button.classList.add("custom");
         button.innerHTML = " En el carrito";
         button.disabled = true; // Desactivar el botón
      
      
       
     }
     
  
}



    show(){
        carritoDOM.classList.add("show");
        overlay.classList.add("show");

    }
    hide(){
        carritoDOM.classList.remove("show");
        overlay.classList.remove("show");
    }
    setAPP(){
        carrito= Storage.getCart();
        this.setItemValues(carrito);
        this.populate(carrito);

        openCarrito.addEventListener("click",this.show)

        closeCarrito.addEventListener("click",this.hide)
    }

    populate(carrito){
        carrito.forEach(item=> this.addCarritoItem(item))
    }

    cartLogic(){
        clearBTN.addEventListener("click", () =>{
        this.clearCarrito(),
        alertify.success('Se limpió los articulos del carrito.');
        this.hide()
    });


    
    carritoCenter.addEventListener("click", error =>{
        const target = error.target.closest("span");
         if(!target) return;
        const targetElement = target.classList.contains("remove__item");
        console.log(target)
        console.log(targetElement)

       
        if(targetElement){
            const id = parseInt(target.dataset.id);
            this.removeItem(id);
           
            const addButton = this.singleButton(id);
            if (addButton) {
                addButton.innerHTML = '';
                addButton.disabled = false;
                
            }


            carritoCenter.removeChild(target.parentElement.parentElement)
            
        }
        else if(target.classList.contains("plus"))
        {
            const id = parseInt(target.dataset.id, 10);
            let tempItem = carrito.find(item => item.id === id);
            tempItem.cantidad++;
            Storage.saveCart(carrito)
            this.setItemValues(carrito)
            const cantidadElement = target.parentElement.querySelector("p");
            //target.nextElementSibling.innerText = tempItem.cantidad
            cantidadElement.innerText = tempItem.cantidad;
        }
        else if(target.classList.contains("minus")){
            const id = parseInt(target.dataset.id, 10);
            let tempItem = carrito.find(item => item.id === id);
           

            if(tempItem.cantidad > 1){
                tempItem.cantidad--;
                Storage.saveCart(carrito);
                this.setItemValues(carrito);
                const cantidadElement = target.parentElement.querySelector("p");
                //target.nextElementSibling.innerText = tempItem.cantidad
                cantidadElement.innerText = tempItem.cantidad;
            }else{
                // this.removeItem(id);
                // carritoCenter.removeChild(target.parentElement.parentElement)
                 alertify.error('No se permite reducir más.');
            }
        }
    });

 

    }

    clearCarrito(){
        const cartItems = carrito.map(item => item.id)
        cartItems.forEach(id => this.removeItem(id));

        while(carritoCenter.children.length > 0){
            carritoCenter.removeChild(carritoCenter.children[0]);
        }

        //  // Restablecer botones "Añadir al Carrito"
        //  const addToCartButtons = document.querySelectorAll(".addToCart");
        //  addToCartButtons.forEach(button => {
        //     //  button.innerHTML = '<i class="fa-solid fa-circle-plus" style="color: #4F1964;"></i>';
        //      button.disabled = false;
        //  });

          // Restablecer botones "Añadir al Carrito"
         // Restablecer botones "Añadir al Carrito"
    buttonDOM.forEach(button => {
        const id = button.dataset.id;
        const inCart = carrito.find(item => item.id === parseInt(id, 10));

        button.disabled = false;

        if (!inCart) {
            button.innerHTML = '';
        }

        // Eliminar oyentes de eventos existentes y restablecer el oyente
        button.removeEventListener("click", this.addToCartButtonClick);
        button.addEventListener("click", this.addToCartButtonClick);
    });
    }

    removeItem(id){
        carrito = carrito.filter(item => item.id !== id);
        this.setItemValues(carrito);
        Storage.saveCart(carrito);

        const button = this.singleButton(id);
        if(button){
        
            button.disabled = false;
            // button.innerHTML = '<i class="fa-solid fa-circle-plus" style="color: #4F1964;"></i>';
        }

       
    }

    singleButton(id){
       return buttonDOM.find(button => parseInt(button.dataset.id) === id)
	}


}






function verMasClick(){

    if(window.location.pathname === "/index.html"||window.location.pathname === "/" ){
            const productosPagina = productos.slice(
            (pagina - 1) * productosPorPagina,
            pagina * productosPorPagina,
           
        );



    const ui = new UI();
    ui.renderProductos(productosPagina);

    pagina++;

    if(pagina > Math.ceil(productos.length/productosPorPagina)){
        verMasBtn.style.display = 'none';
    }
  
}

// const ui = new UI();

// const inicio = (pagina - 1) * productosPorPagina2;
// const fin = pagina * productosPorPagina2;
// const productosPagina = productos.slice(inicio, fin);

// ui.renderProductos(productosPagina);
// ui.getButtons();

// pagina++;

// if (pagina > Math.ceil(productos.length / productosPorPagina2)) {
//     paginationContainer.style.display = 'none';
// }

}






class Storage {
    static saveProduct(obj){
        localStorage.setItem('productos', JSON.stringify(obj))
    }
    static saveCart(carrito){
        localStorage.setItem('carritocompra', JSON.stringify(carrito))
    }
    static getProductos(id){
        const producto = JSON.parse(localStorage.getItem('productos'))
        return producto.find(product => product.id === parseFloat(id, 10))
    }
    static getCart(){
        return localStorage.getItem('carritocompra') ? JSON.parse(localStorage.getItem('carritocompra')) : [];
    }

}

class Productos{
    async getProductos(){
        try{
          const result = await fetch("productos.json");
          const data   = await result.json();
          const productos = data.items
          return productos;
        }
        catch(e){
            console.error(e);
        }
    }
}


let category = "";
let productos = [];




function categoryValue(){
    const ui = new UI();
    category = document.getElementById("category").value;

  // Restablecer el campo de búsqueda a una cadena vacía
 // Restablecer el campo de búsqueda a una cadena vacía
 document.getElementById("buscar").value = "";

 // Ocultar el mensaje de "No se encontraron productos"
 const noResultsMessage = document.getElementById("noResultsMessage");
 noResultsMessage.style.display = "none";

    // Guardar la categoría seleccionada en el localStorage
    localStorage.setItem("selectedCategory", category);

    if (category === "" || category === "TODAS LAS PLATAFORMAS") {
        document.getElementById("platformTitle").textContent = "TODAS LAS PLATAFORMAS"; // Título predeterminado
        ui.renderProductos(productos);
       
      
    } else {
      
        const platformTitle = category.toUpperCase(); // Cambiar título a mayúsculas
        document.getElementById("platformTitle").textContent = platformTitle; // Actualizar título
        const filteredProductos = productos.filter(producto => producto.category === category);
        ui.renderProductos(filteredProductos);
        ui.getButtons();
    }
}





function searchValue() {
    const searchTerm = document.getElementById("buscar").value.toLowerCase();
    const ui = new UI();
    const noResultsMessage = document.getElementById("noResultsMessage");
    const selectedCategory = document.getElementById("category").value;

    if (searchTerm.length > 0) {
        let filteredProductos = productos.filter(producto =>
            producto.title.toLowerCase().includes(searchTerm) &&
            (selectedCategory === "" || producto.category === selectedCategory)
        );

        if (filteredProductos.length > 0) {
            ui.renderProductos(filteredProductos);
            ui.getButtons();
            noResultsMessage.style.display = "none";
        } else {
            ui.renderProductos([]);
            noResultsMessage.style.display = "block";
        }
    } else {
        if (selectedCategory === "" || selectedCategory === "TODAS LAS PLATAFORMAS") {
            categoryValue(); // Llamar a categoryValue() para actualizar el título y los productos
        } else {
            const platformTitle = selectedCategory.toUpperCase();
            document.getElementById("platformTitle").textContent = platformTitle;
            const filteredProductos = productos.filter(producto => producto.category === selectedCategory);
            ui.renderProductos(filteredProductos);
            ui.getButtons();
        }
        noResultsMessage.style.display = "none";
    }
}



// Verificar si un producto está en el carrito
function updateProductInCart(producto) {
    const inCart = carrito.find(item => item.id === producto.id);

    if (inCart) {
        const addButton = document.querySelector(`.addToCart[data-id="${id}"]`);
        if (addButton) {
            addButton.innerHTML = " En el carrito";
            addButton.disabled = true;
        }
    }
}




const query = new URLSearchParams(window.location.search)
let id = query.get('id')



document.addEventListener("DOMContentLoaded", async ()=>{
  
    const productoLista = new Productos();
    const ui = new UI();
    const selectedCategory = localStorage.getItem("selectedCategory");
    const categorySelect = document.getElementById("category");

    ui.setAPP();

    // Obtener productos y renderizarlos en ambas páginas
    productos = await productoLista.getProductos();
    ui.renderProductos(productos);

    carrito = Storage.getCart();

      // Verificar y actualizar productos en el carrito
      productos.forEach(producto => {
        updateProductInCart(producto);
    });

    // Guardar productos en el almacenamiento local
    Storage.saveProduct(productos);

    // Configurar lógica del carrito y botones
    ui.getButtons();
    ui.cartLogic();

    // Verificar si el botón "Ver más" existe y agregar evento click
    const verMasBtn = document.getElementById('verMasButton');
    if (verMasBtn) {
        verMasBtn.addEventListener("click", () => {
            window.location.href = "productos.html";
    

        });
    }



    // Agregar evento de clic para dispositivos de escritorio en la selección de categoría
    categorySelect.addEventListener("change", () => {
        categoryValue();
    });

    if (selectedCategory) {
        categorySelect.value = selectedCategory;
        categoryValue(); // Aplicar la categoría al título y productos
    }
    
    

    // Función para validar el formato del número de teléfono
function validarTelefono(telefono) {
    const telefonoRegex = /^\+[0-9]{11}$/; // Formato de número de teléfono de ejemplo (8 dígitos)
    return telefonoRegex.test(telefono);
  }
  
  // Función para validar que el campo no esté vacío
  function validarCampoNoVacio(valor) {
    return valor.trim() !== '';
  }

  // Función para validar que el campo de nombre no tenga números
function validarNombreSinNumeros(nombre) {
    const nombreRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios permitidos
    return nombreRegex.test(nombre);
  }
  
  

    const finalizarPedidoButton = document.getElementById("whatsappLink");
    finalizarPedidoButton.addEventListener("click", event => {
      event.preventDefault(); // Evitar que el formulario se envíe por defecto
    // Obtener información del formulario y sanitizar los datos

     // Verificar si el carrito está vacío
  if (carrito.length === 0) {
    alertify.error("No puedes realizar un pedido sin productos en el carrito.");
    return;
  }
        // Obtener información del formulario
        const nombre = document.getElementById("nombre").value;
        // const telefono = document.getElementById("telefono").value;
     // Validar que los campos no estén vacíos
     if (!validarCampoNoVacio(nombre)) {
        alertify.warning("Por favor complete todos los campos.");
        return;
      }
    
        // Validar que el nombre no tenga números
    if (!validarNombreSinNumeros(nombre)) {
        alertify.error("El nombre no debe contener números ni simboolos.");
        return;
  }
      // Validar el formato del número de teléfono
    //   if (!validarTelefono(telefono)) {
    //     alertify.error('Número de teléfono no válido. Debe tener 12 dígitos.');
    //     return;
    //   }
    
      // Obtener lista de productos del carrito
      const carritoItems = carrito.map(item => `${item.title} Cantidad de articulo:  (${item.cantidad})`);
  

        // Función de encriptación básica
    function encryptPhoneNumber(phoneNumber) {
        // Realiza alguna operación de encriptación aquí
        // Por ejemplo, puedes cambiar los dígitos de lugar, aplicar XOR, etc.
        // Recuerda que este es solo un ejemplo básico, y no es seguro por sí mismo
        return encodeURIComponent(phoneNumber);
    }
    
    // Función de desencriptación básica
    function decryptPhoneNumber(encryptedPhoneNumber) {
        // Realiza la operación de desencriptación inversa
        return decodeURIComponent(encryptedPhoneNumber);
    }

    // Encriptar el número de teléfono antes de usarlo en el enlace de WhatsApp
    const encryptedPhoneNumber = encryptPhoneNumber("+50499209392");

    // Encriptar el mensaje 

      // Crear el mensaje con la información del formulario y la lista de productos
   
      const mensaje = `Hola. Pedido de ${nombre}%0A%0AProductos:%0A${carritoItems.join(
        "%0A"
      )}%0A%0ACantidad Total de Pedidos: ${itemTotales.innerText}%0A%0ATotal del Pedido: . . . . . . . . . LPS ${carritoTotal.innerText} `;
    //   const encryptedMensaje = encryptMessage(mensaje);
    
      // ...
  
      // Crear el enlace de WhatsApp con el número y mensaje predefinidos
      const whatsappURL = `https://api.whatsapp.com/send?phone=${encryptedPhoneNumber}&text=${mensaje}`;
  
      // Abrir enlace en una nueva ventana o pestaña
      window.open(whatsappURL, "_blank");
    });



    
  


}


) 

