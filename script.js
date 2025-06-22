// Clase Producto con Encapsulamiento
class Producto {
    #id;

    constructor(id, nombre, precio, imagen) {
        this.#id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }

    getId() {
        return this.#id;
    }

    descripcion() {
        return `${this.nombre} - S/ ${this.precio}`;
    }
}

// Agregamos un método al prototipo de Producto
Producto.prototype.aplicarDescuento = function(descuento) {
    this.precio = this.precio - descuento;
};

// Lista de productos (Uso de objetos y arrays)
let productos = [
    new Producto(1, "Camisa", 50, "camisa.jpg"),
    new Producto(2, "Pantalón", 80, "pantalon.jpg"),
    new Producto(3, "Zapatos", 120, "zapatos.jpg")
];

// Mapa de stock de productos
let stockProductos = new Map();
productos.forEach(producto => {
    stockProductos.set(producto.getId(), 10); // asignamos 10 unidades de stock por producto
});

// Mostrar stock en consola
console.log('Stock inicial de productos:');
stockProductos.forEach((valor, clave) => {
    console.log(`Producto ID ${clave}: ${valor} unidades`);
});

let carrito = []; // Array para almacenar productos agregados

// Mostrar productos en la página
function mostrarProductos() {
    let listaProductos = document.getElementById('lista-productos');
    productos.forEach(producto => {
        let div = document.createElement('div');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:150px; height:150px; object-fit:cover; border-radius:10px;">
            <p>${producto.descripcion()}</p>
            <button onclick="agregarAlCarrito(${producto.getId()})">Agregar al carrito</button>
        `;
        listaProductos.appendChild(div);
    });
}

// Contador de clicks (función creciente)
let contadorClicks = 0;

const aumentarContador = () => {
    contadorClicks++;
    console.log(`Número de clicks: ${contadorClicks}`);
}

// Función recursiva para contar productos
function contarProductos(index = 0) {
    if (index >= carrito.length) {
        return 0;
    } else {
        return 1 + contarProductos(index + 1);
    }
}

// Agregar producto al carrito
const agregarAlCarrito = (id) => {
    let producto = productos.find(p => p.getId() === id);
    carrito.push(producto);
    mostrarCarrito();
    aumentarContador();

    let cantidad = contarProductos();
    console.log(`Cantidad total de productos en el carrito: ${cantidad}`);
}

// Mostrar carrito actualizado
function mostrarCarrito() {
    let carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.nombre} - S/ ${item.precio}`;
        carritoItems.appendChild(li);
    });

    calcularTotal();
}

// Calcular total del carrito
function calcularTotal() {
    let total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('total').textContent = total;
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
});

// Evento de carga
window.addEventListener('load', () => {
    mostrarProductos();
    console.log('Página cargada correctamente');
});

// Evento de teclado: presionar Enter para finalizar compra
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let nombreUsuario = document.getElementById('nombre-usuario').value.trim();
        if (nombreUsuario === '') {
            alert('Por favor, ingrese su nombre antes de finalizar la compra.');
            return;
        }

        if (carrito.length > 0) {
            alert(`¡Gracias por tu compra, ${nombreUsuario}!`);
        } else {
            alert('El carrito está vacío.');
        }
    }
});

// Temporizador para mostrar mensaje
setTimeout(() => {
    alert('Bienvenido a nuestra tienda. ¡Aprovecha nuestras ofertas!');
}, 3000);
// Evento de scroll
window.addEventListener('scroll', () => {
    console.log('Estás desplazándote por la página.');
});
// Evento de foco
document.getElementById('nombre-usuario').addEventListener('focus', () => {
    console.log('El campo de nombre tiene el foco.');
});
