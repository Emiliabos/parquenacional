
/*Data*/
async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            const msg = `Error al obtener los datos: ${response.status} ${response.statusText}`;
            throw new Error(msg);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
/*Cart*/
function showCart(nacionalidad) {
    const cart = document.getElementById('cart');
    cart.style.display = 'block';
    let spanNacionalidad = document.querySelector('#nacionalidad');
    spanNacionalidad.textContent =  nacionalidad;
    localStorage.setItem('nacionalidad', JSON.stringify(nacionalidad));
}
function hideCart(){
    let totalValue = 0;
    const cartItems = document.querySelectorAll('.cart__item');
    cartItems.forEach(item => {
        const inputField = item.querySelector('input');
        let value = parseInt(inputField.value);
        if (value !== 0){
            totalValue++;
        }
    });
    if(totalValue !== 0) {
        const cart = document.getElementById('cart');
        const btnArg= document.getElementById('btnArg');
        const btnExt = document.getElementById('btnExt');
        cart.style.display = 'none';
        btnArg.style.display = 'none';
        btnExt.style.display = 'none';
    }
}
function showButtons() {
    const btnArg= document.getElementById('btnArg');
    const btnExt = document.getElementById('btnExt');
    btnArg.style.display = 'block';
    btnExt.style.display = 'block';
}
async function addItemsArg(){
    try {
        const data = await fetchData();       
        let htmlToAdd = '';
        for (let i = 0; i < data.length && i <= 2; i++) {
            const description = data[i].name;
            const price = data[i].precio;
            const type = data[i].dataType;
            htmlToAdd += `<div class="cart__item">
            <div class="cart__item-description">
            ${description}
            </div>
            <div class="cart__item-quantity">
                <button class="cart__quantity-btn btn-minus" type="button" name="button">
                    <i class="fa-solid fa-minus"></i>
                </button> 
                <input type="text" name="name" value="0" data-type="${type}" disabled>
                <button class="cart__quantity-btn btn-plus" type="button" name="button">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="cart__item-price">$${price}</div>
            <div class="cart__item-subtotal">$0</div>
        </div>`;
        }
        const cartItems = document.querySelector('.cart__items');
        cartItems.innerHTML = '';
        cartItems.innerHTML += htmlToAdd;
    } catch (error) {
        Swal.fire({
            title: "Ooops!",
            text: "Error al cargar información. Actualice el navegador e inténtelo de nuevo.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "¡Entendido!",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
              }
        });
    }
    updatePrice();
}
async function addItemsExt(){
    try {
        const data = await fetchData();
        let htmlToAdd = '';
        for (let i = 3; i < data.length; i++) { 
            const description = data[i].name;
            const price = data[i].precio;
            const type = data[i].dataType;
            htmlToAdd += `<div class="cart__item">
                <div class="cart__item-description">
                ${description}
                </div>
                <div class="cart__item-quantity">
                    <button class="cart__quantity-btn btn-minus" type="button" name="button">
                        <i class="fa-solid fa-minus"></i>
                    </button> 
                    <input type="text" name="name" value="0" data-type="${type}" disabled>
                    <button class="cart__quantity-btn btn-plus" type="button" name="button">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="cart__item-price">$${price}</div>
                <div class="cart__item-subtotal">$0</div>
            </div>`;
        }
        const cartItems = document.querySelector('.cart__items');
        cartItems.innerHTML = '';
        cartItems.innerHTML += htmlToAdd;
    } catch (error) {
        Swal.fire({
            title: "Ooops!",
            text: "Error al cargar información. Actualice el navegador e inténtelo de nuevo.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "¡Entendido!",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
              }
        });
    }
    updatePrice();    
}
function updatePrice() {
    let quantityInput = document.querySelectorAll('.cart__item-quantity input');
    let priceElement = document.querySelectorAll('.cart__item-price');
    let subtotalElements = document.querySelectorAll('.cart__item-subtotal');
    for (let i = 0; i < quantityInput.length; i++) {
        const quantity = parseInt(quantityInput[i].value);
        const priceUnit = parseInt(priceElement[i].textContent.replace('$', ''));
        const subtotal = priceUnit * quantity;
        subtotalElements[i].textContent = `$${subtotal}`;
    }
    let total = 0;
    subtotalElements.forEach(subtotalElement => {
        let subtotal = parseInt(subtotalElement.textContent.replace('$', ''));
        total += subtotal;
    });
    let totalElement = document.querySelector('.cart__price span');
    totalElement.textContent = `$${total}`;
    showPrice.textContent = `$${total}`;
}
function btnsQuantity() {
    const btnMinus = document.querySelectorAll('.btn-minus');
    const btnPlus = document.querySelectorAll('.btn-plus');
    btnMinus.forEach(btnMinus => {
        btnMinus.addEventListener('click', function() {
            const inputField = this.parentNode.querySelector('input');
            let value = parseInt(inputField.value);
            if (value > 0) {
                value--;
            }
            inputField.value = value;
            updatePrice();
        });
    });
    btnPlus.forEach(btnPlus => {
        btnPlus.addEventListener('click', function() {
            const inputField = this.parentNode.querySelector('input');
            let value = parseInt(inputField.value);
            value++;
            inputField.value = value;
            updatePrice();
        });
    });
}
function addTickets () {
    localStorage.removeItem('carrito'); 
    let type = document.querySelectorAll('.cart__item-description');
    let quantityType = document.querySelectorAll('.cart__item-quantity input');
    let priceType = document.querySelectorAll('.cart__item-subtotal');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let i = 0; i < type.length; i++) {
            let dataType = quantityType[i].getAttribute('data-type');
            carrito.push({ type: type[i].innerText, quantityType: quantityType[i].value, priceType: priceType[i].innerText, dataType: dataType });

        }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
/*Info User*/
function showForm() {
    const cardInfo = document.getElementById('info');
    const quantityInputs = document.querySelectorAll('.cart__item-quantity input');
    let ticketsCart = false;
    quantityInputs.forEach(input => {
        if(parseInt(input.value) !== 0){
            ticketsCart = true;
            return;
        } 
    });
    if (ticketsCart) {
        cardInfo.style.display = 'block';
    } else {
        showInfoPanel();
        Swal.fire({
            title: "Ooops!",
            text: "No ha añadido ninguna entrada a su carrito.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "¡Entendido!",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
              }
        });
    }
}
function hideForm() {
    const cardInfo = document.getElementById('info');
    cardInfo.style.display = 'none';
}
function saveInfoUser() {
    const fullname = document.getElementById('fullname').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    if( fullname !== "" && dni !== "" && email !== "") {
        if(checkEmail()) {
            usuario.push({fullname:fullname, dni: dni, email: email });
            localStorage.setItem('usuario', JSON.stringify(usuario));
            showPrice();
            showModal();
        }
    }else {
        Swal.fire({
            title: "Ooops!",
            text: "Debes completar los datos de la compra antes de continuar.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "¡Entendido!",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
              }
        });
    }
}
function checkEmail() {
    const emailInput = document.getElementById("email");
    if (!emailInput.checkValidity()) {
        Swal.fire({
            title: "Ooops!",
            text: "Por favor, ingrese un formato de correo electrónico válido.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "Cambiar mi email",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
              }
        });
        return false; 
    } 
    return true;
}
/*Panel Mis Tickets*/
function showPanel() {
    const panel = document.getElementById('panel-cart');
    panel.style.display = 'block';    
}
function hidePanel() {
    const panel = document.getElementById('panel-cart');
    panel.style.display = 'none';    
}
function addInfoPanel() {
    let htmlToAdd = '';
    let tickets = JSON.parse(localStorage.getItem('carrito'));
    for (let i = 0; i < tickets.length; i++) {
        const type = tickets[i].type;
        const quantity = tickets[i].quantityType;
        const price = tickets[i].priceType;
        const dataType = tickets[i].dataType;
        if(quantity != 0) {
            htmlToAdd += `<div class="panel-cart__items">
            <div class="panel-cart__item">
                <p>${type}</p>
                <p>Cantidad: ${quantity}</p>
                <a class="delete-item" data-type="${dataType}"><i class="fa-regular fa-trash-can"></i> Eliminar</a>
            </div>
            <div><p>${price}</p></div>
        </div>`;
        } 
    }
    const panelItems = document.querySelector('.panel-cart__content');
    panelItems.innerHTML = '';
    panelItems.innerHTML += htmlToAdd;

    const deleteLinks = document.querySelectorAll('.delete-item');
    deleteLinks.forEach(link => {
        link.addEventListener('click', deleteItem);
    });
}
function showInfoPanel() {
    const panelItems = document.querySelector('.panel-cart__content');
    panelItems.innerHTML = '<div class="panel-cart__content--alert">¡Todavía no agregaste ninguna entrada a tu pedido!</div>';
}
/*Purchase*/
function confirmPurchase() {
    let tickets = JSON.parse(localStorage.getItem('carrito'));
    let totalTickets = 0;
    for (let i = 0; i < tickets.length; i++) {
        const quantity = tickets[i].quantityType;    
        if (quantity != 0) {
            totalTickets++;
        }
    }
    if (totalTickets === 0) {
        showInfoPanel();
        Swal.fire({
            title: "Ooops!",
            text: "No ha añadido ninguna entrada a su carrito.",
            icon: "warning",
            confirmButtonColor: "#2E8D02",
            width: 400,
            padding: "3rem 2rem",
            confirmButtonText: "¡Entendido!",
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal2-html-containe'
            }
        });
    } else {
        saveInfoUser();
    }
}
function deleteItem(event) {
    Swal.fire({
        title: "¡Atención!",
        text: "¿Está seguro que desea eliminar este ticket?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2E8D02",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar."
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Entendido!",
            text: "El ticket fue eliminado de su carrito.",
            icon: "success",
            confirmButtonColor: "#2E8D02",
          });
        
        const typeToDelete = event.target.getAttribute('data-type');
        let tickets = JSON.parse(localStorage.getItem('carrito')) || [];
        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].dataType === typeToDelete) {
                tickets[i].quantityType = 0;
                tickets[i].priceType = "$0";
                break; 
            }
        }
        localStorage.setItem('carrito', JSON.stringify(tickets));
    
        const cartItems = document.querySelectorAll('.cart__item');
        let subtotalElement = document.querySelectorAll('.cart__item-subtotal');
        cartItems.forEach(item => {
            const itemType = item.querySelector('input').getAttribute('data-type');
            if (itemType === typeToDelete) {
                item.querySelector('input').value = '0';
                subtotalElement.textContent = `$0`;
            }
        });
        addInfoPanel(); 
        updatePrice();
        }
      });    
}
/*End Order*/
function showPrice() {
    const showPrice = document.getElementById('price');
    let totalElement = document.querySelector('.cart__price span');
    let total = parseInt(totalElement.textContent.replace('$', ''));
    showPrice.textContent = ` $${total}`;
}
function showModal () {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}
function hideModal () {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
/*Reaload Site*/
function clearStorage() {
    carrito.splice(0, carrito.length);
    usuario.splice(0, usuario.length);
    localStorage.clear();
    document.getElementById('fullname').value = '';
    document.getElementById('dni').value = '';
    document.getElementById('email').value = '';
}
function reloadSite() {
    window.scrollTo(0, 0);
    location.reload();
}
/*Scroll*/
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const logo = document.getElementById('logo');
    if (window.scrollY > 0) {
        header.classList.add('fixed');
        logo.style.display = 'none';
    } else {
        header.classList.remove('fixed');
        logo.style.display = 'block';
    }
});
document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const sectionTop = section.offsetTop - headerHeight;
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    });
});