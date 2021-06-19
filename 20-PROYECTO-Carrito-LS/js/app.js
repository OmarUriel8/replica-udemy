// variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
	// cuando agregas un curso presionando "agregar al carrito"
	listaCursos.addEventListener('click', agregarCurso);
	// elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso);
	// Muestra el carrito de Local Storage
	document.addEventListener('DOMContentLoaded', () => {
		articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
		carritoHTML();
	});
	// vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = [];
		limpiarHTML();
	});
}

function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatosCurso(cursoSeleccionado);
	}
}
// elimina un curso del carrito
function eliminarCurso(e) {
	// console.log(e.target.classList);
	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');
		// elimina del arreglo de articulosCarrito por el data-id
		articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
		// console.log(articulosCarrito);
		carritoHTML();
	}
}

// lee el contenido del html al que le dimos click y extraer el contenido
function leerDatosCurso(curso) {
	// console.log(curso);
	// crear un objeto con el contenido del curso actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	// revisa si un elemento ya existe en el carrito
	const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
	if (existe) {
		// actualizar cantidad
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso; // retorna los objetos actualizados
			} else {
				return curso;
			}
		});
		articulosCarrito = [ ...cursos ];
	} else {
		// agregamos al carrito
		articulosCarrito = [ ...articulosCarrito, infoCurso ];
		console.log(articulosCarrito);
	}

	carritoHTML();
}

// muestra el carrito de compras en el html
function carritoHTML() {
	// limpiar html
	limpiarHTML();
	// recorre el carrito y genera el html
	articulosCarrito.forEach((curso) => {
		const { imagen, titulo, precio, cantidad, id } = curso;
		const row = document.createElement('tr');
		row.innerHTML = `
    <td>
      <img src="${imagen}" width="100" alt="Img curso">
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
    </td>
    `;
		// agrega el html del carrito en el tbody
		contenedorCarrito.appendChild(row);
	});

	// Agregar carrito de compras al storage
	sincronizarStorage();
}
function sincronizarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// elimina los cursos del html
function limpiarHTML() {
	// forma lenta
	// contenedorCarrito.innerHTML = '';
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}
