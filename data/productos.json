let productos = [];

const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const btnAgregar = document.getElementById("agregar");
const listaProductos = document.getElementById("lista-productos");

btnAgregar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);

  if (nombre === "" || isNaN(precio)) {
    Swal.fire({
      icon: "error",
      title: "Campos inválidos",
      text: "Ingresá un nombre y precio válido."
    });
    return;
  }

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

// Simulamos fetch desde productos.json
async function cargarProductos() {
  try {
    const res = await fetch("../data/productos.json");
    if (!res.ok) throw new Error("Error al cargar productos");
    const data = await res.json();

    const almacenados = JSON.parse(localStorage.getItem("productos"));
    productos = almacenados?.length ? almacenados : data;

    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  } finally {
    console.log("Carga de productos finalizada");
  }
}

cargarProductos();
