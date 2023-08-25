       // Darle efecto al boton menu para desplegar
       const toggleBtn = document.querySelector('.toggle_btn');
       const toggleBtnIcon = document.querySelector('.toggle_btn i');
       const dropDownMenu = document.querySelector('.dropdown_menu');
   
       toggleBtn.onclick = function(){
           dropDownMenu.classList.toggle('open');
           const isOpen = dropDownMenu.classList.contains('open');

           //validacion del boton icono si esta desplegado el menu, se mostrara la x
           //si no, se mostrara el icono barra
           toggleBtnIcon.classList = isOpen
           ? 'fa-solid fa-xmark'
           : 'fa-solid fa-bars'
       }