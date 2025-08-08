let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoDiv = document.getElementById("carrito");
const totalSpan = document.getElementById("total");

function agregarAlCarrito(id) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    Swal.fire({
      icon: "success",
      title: "Agregado",
      text: `${producto.nombre} fue agregado al carrito`
    });
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

mostrarCarrito();
