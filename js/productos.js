// Crear un arreglo de productos con detalles de cada producto
const productos = [
  {
    nombre: 'FIFA 23',
    imagenSrc: '../imagenes/imagenesProducto/fifa23.jpg',
    precio: 'LPS. 400.00'
  },
  {
    nombre: 'FIFA 23',
    imagenSrc: '../imagenes/imagenesProducto/fifa23.jpg',
    precio: 'LPS. 400.00'
  },
  {
    nombre: 'FIFA 23',
    imagenSrc: '../imagenes/imagenesProducto/fifa23.jpg',
    precio: 'LPS. 400.00'
  },
  {
    nombre: 'FIFA 23',
    imagenSrc: '../imagenes/imagenesProducto/fifa23.jpg',
    precio: 'LPS. 400.00'
  },
 
  // Agrega más productos aquí en el mismo formato
];

// Obtener el elemento HTML con el ID "productosCentro"
const productosCentro = document.getElementById('productosCentro');

// Iterar sobre cada producto en el arreglo "productos"
productos.forEach(producto => {
  // Crear un nuevo elemento <div> para representar un producto
  const productoDiv = document.createElement('div');
  productoDiv.className = 'producto';

  // Crear un contenedor para la imagen del producto
  const imagenContainer = document.createElement('div');
  imagenContainer.className = 'image_container';
  const imagen = document.createElement('img');
  imagen.src = producto.imagenSrc;
  imagen.alt = '';
  imagenContainer.appendChild(imagen);

  // Crear un contenedor para la información del producto
  const productoFooter = document.createElement('div');
  productoFooter.className = 'producto__footer';
  const titulo = document.createElement('h1');
  titulo.textContent = producto.nombre;
  const precio = document.createElement('div');
  precio.className = 'precio__producto';
  precio.innerHTML = `<h2 class="preciotitle">${producto.precio}</h2>`;
  productoFooter.appendChild(titulo);
  productoFooter.appendChild(precio);

  // Crear un contenedor para el botón de añadir al carrito
  const botonAniadir = document.createElement('div');
  botonAniadir.className = 'botonAniadir';
  const boton = document.createElement('div');
  boton.className = 'boton';
  const enlace = document.createElement('a');
  enlace.href = '#';
  enlace.className = 'btn addToCart fa-solid fa-circle-plus';
  enlace.style.color = '#4F1964';
  boton.appendChild(enlace);
  botonAniadir.appendChild(boton);

  // Agregar los elementos de imagen, información y botón al elemento del producto
  productoDiv.appendChild(imagenContainer);
  productoDiv.appendChild(productoFooter);
  productoDiv.appendChild(botonAniadir);

  // Agregar el elemento del producto al contenedor principal de productos
  productosCentro.appendChild(productoDiv);
});
