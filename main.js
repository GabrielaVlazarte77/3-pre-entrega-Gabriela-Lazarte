// Declaro variables
const listaProductos = document.getElementById("lista-productos");
const totalidad = document.getElementById("total");
const comprarBtn = document.getElementById("comprar-btn");
const agregarProductoBtn = document.getElementById("agregar-producto-btn");
const productoNombreInput = document.getElementById("producto-nombre");
const productoPrecioInput = document.getElementById("producto-precio");

let carrito_compras = [];

// Función para actualizar el carrito_compras de compras
function actualizarCarrito_compras() {
    listaProductos.innerHTML = "";
    let total = 0;

    carrito_compras.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `Nombre: ${producto.nombre}  | Precio: $${producto.precio}`;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => eliminarProducto(producto));
        li.appendChild(eliminarBtn);
        listaProductos.appendChild(li);
        total += producto.precio;
    });

    totalidad.textContent = total;
}

// Función para eliminar un producto del carrito_compras 
function eliminarProducto(producto) {
    carrito_compras = carrito_compras.filter((p) => p !== producto);
    actualizarCarrito_compras();
    guardarCarrito_comprasEnStorage();
}

// Función para guardar el carrito_compras en el localStorage
function guardarCarrito_comprasEnStorage() {
    localStorage.setItem("carrito_compras", JSON.stringify(carrito_compras));
}

// Evento con el botón Comprar
comprarBtn.addEventListener("click", () => {
    alert("Compra realizada. Total: $" + totalidad.textContent);
    carrito_compras = [];
    actualizarCarrito_compras();
    guardarCarrito_comprasEnStorage();
});

// Evento para agregar un producto personalizado
agregarProductoBtn.addEventListener("click", () => {
    const nombre = productoNombreInput.value;
    const precio = parseFloat(productoPrecioInput.value);

    if (nombre && !isNaN(precio)) {
        const nuevoProducto = { nombre, precio };
        carrito_compras.push(nuevoProducto);
        actualizarCarrito_compras();
        guardarCarrito_comprasEnStorage();

        productoNombreInput.value = "";
        productoPrecioInput.value = "";
    }
});

// Cargar carrito_compras almacenado en el localStorage al cargar la página
window.addEventListener("load", () => {
    const carrito_comprasJSON = localStorage.getItem("carrito_compras");
    if (carrito_comprasJSON) {
        carrito_compras = JSON.parse(carrito_comprasJSON);
        actualizarCarrito_compras();
    }
});
