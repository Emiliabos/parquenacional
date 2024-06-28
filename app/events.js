document.getElementById('btnArg').addEventListener('click', async function() {
    try {
      showCart("Argentinos");
      await addItemsArg(); 
      btnsQuantity();  
    } catch (error) {  
      //console.error('Error al añadir ítems:', error.message);  
     //console.error('Detalles del error:', error);  
      Swal.fire({
        title: "Ooops!",
        text: "Hubo un problema al añadir los ítems. Por favor, inténtelo de nuevo más tarde.",
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
  });
document.getElementById('btnExt').addEventListener('click', async function() {
try {
    showCart("Extranjeros");
    await addItemsExt();  
    btnsQuantity();  
} catch (error) {  
    //console.error('Error al añadir ítems:', error.message);  
    //console.error('Detalles del error:', error);
    Swal.fire({
        title: "Ooops!",
        text: "Hubo un problema al añadir los ítems. Por favor, inténtelo de nuevo más tarde.",
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
});
document.getElementById('confirm').addEventListener('click', function() {
    addTickets();
    addInfoPanel();
    hideCart();
    showForm();
});
document.getElementById('payment').addEventListener('click', function() {
    confirmPurchase();
});
document.getElementById('edit').addEventListener('click', function() {
    let nacionalidad = JSON.parse(localStorage.getItem('nacionalidad'));
    showCart(nacionalidad);
    showButtons();
    hideForm();
});
document.getElementById('close').addEventListener('click', function() {
    hideModal();
});
document.getElementById('endOrder').addEventListener('click', function() {
    clearStorage();
    reloadSite();
});
document.getElementById('cart-icon').addEventListener('click', function() {
    showPanel();
});
document.getElementById('close-cart').addEventListener('click', function() {
    hidePanel();
});
document.getElementById('logo').addEventListener('click', function() {
    reloadSite();
});
