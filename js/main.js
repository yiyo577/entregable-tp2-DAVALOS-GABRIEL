let productos = JSON.parse(localStorage.getItem("productos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const btnAgregar = document.getElementById("agregar");
const listaProductos = document.getElementById("lista-productos");
const carritoDiv = document.getElementById("carrito");
const totalSpan = document.getElementById("total");

btnAgregar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);

  if (nombre === "" || isNaN(precio)) return;

  const producto = { id: Date.now(), nombre, precio };
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));

  nombreInput.value = "";
  precioInput.value = "";

  mostrarProductos();
});

function mostrarProductos() {
  listaProductos.innerHTML = "";
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      ${producto.nombre} - $${producto.precio.toFixed(2)}
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    listaProductos.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  carritoDiv.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    total += item.precio;
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${i})">Eliminar</button>
    `;
    carritoDiv.appendChild(div);
  });
  totalSpan.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Mostrar productos y carrito al cargar
mostrarProductos();
mostrarCarrito();
