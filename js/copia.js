


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

// const detalles = document.getElementById("")
let pagina = 1;
const productosPorPagina = 4;
const productosPorPagina2 = 8;

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
              <div class="precio__producto"><h2 class="preciotitle">${producto.price}</h2></div>
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
         <h3>${title}</h3>
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
            pagina * productosPorPagina
        );



    const ui = new UI();
    ui.renderProductos(productosPagina);

    pagina++;

    if(pagina > Math.ceil(productos.length/productosPorPagina)){
        verMasBtn.style.display = 'none';
    }
  
}

const ui = new UI();

const inicio = (pagina - 1) * productosPorPagina2;
const fin = pagina * productosPorPagina2;
const productosPagina = productos.slice(inicio, fin);

ui.renderProductos(productosPagina);
ui.getButtons();

pagina++;

if (pagina > Math.ceil(productos.length / productosPorPagina2)) {
    paginationContainer.style.display = 'none';
}

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
    category = document.getElementById("category").value
    if(category.length > 0){
		const producto = productos.filter(regx => regx.category === category)
		ui.renderProductos(producto)
		ui.getButtons();
	}else{
		ui.renderProductos(productos)
		ui.getButtons();
	
	}
}

function searchValue() {
    const searchTerm = document.getElementById("buscar").value.toLowerCase();
    const ui = new UI();

    if (searchTerm.length > 0) {
        const filteredProductos = productos.filter(producto => producto.title.toLowerCase().includes(searchTerm));
        ui.renderProductos(filteredProductos);
        ui.getButtons();
    } else {
        ui.renderProductos(productos);
        ui.getButtons();
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


function generarBotonesPaginacion(totalPaginas) {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");

        // Agregar el evento click para cargar la página correspondiente
        button.addEventListener("click", () => {
            pagina = i; // Actualizar la página actual
            verMasClick(); // Llamar a la función para cargar los productos de la nueva página
        });

        paginationContainer.appendChild(button);
    }
}



document.addEventListener("DOMContentLoaded", async ()=>{
  
    const productoLista = new Productos();
    const ui = new UI();

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


    if (window.location.pathname === "/productos.html") {
        const productoLista = new Productos();
        
        // Obtén la página actual desde los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        pagina = parseInt(urlParams.get("page")) || 1;
    
        // Obtener productos y renderizarlos en la página de productos
        productos = await productoLista.getProductos();
        const totalPaginas = Math.ceil(productos.length / productosPorPagina2);
        ui.renderProductos(productos.slice(0, productosPorPagina2));
        generarBotonesPaginacion(totalPaginas);
    
        // Configurar lógica del carrito y botones
        // ui.setAPP();
        ui.getButtons();
        // ui.cartLogic();
    }

    
    
    
    



    
  


}


) 



/*
 ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       } ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                         ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                        ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                         ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                        ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                         ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                        ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                         ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       } ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
                         ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }  ,
                    {
               "id": ,
               "title": "",
               "price": ,
               "image": "./imagenes/",
               "category": "gift card (iTunes, roblox, steam)"
                       }
          



*/