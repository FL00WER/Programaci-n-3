function Actividad(nombre, lugar, dia, horario, cupo, estado) {
    this.nombre = nombre;
    this.lugar = lugar;
    this.dia = dia;
    this.horario = horario;
    this.cupo = cupo;
    this.estado = estado;
}

class SistemaDeportes {
    constructor() {
        this.actividades = [];
    }

    agregarActividad(actividad) {
        this.actividades.push(actividad);
    }

    listarActividades() {
        return this.actividades;
    }
}

const sistema = new SistemaDeportes();
sistema.agregarActividad(new Actividad("Fútbol", "Cancha Universitaria", "Lunes", "18:00-20:00", 20, "Disponible"));
sistema.agregarActividad(new Actividad("Básquet", "Cancha Techada", "Martes", "17:00-19:00", 15, "Disponible"));
sistema.agregarActividad(new Actividad("Vóley", "Cancha Techada", "Miércoles", "18:00-20:00", 12, "Completo"));
sistema.agregarActividad(new Actividad("Atletismo", "Pista de Atletismo", "Jueves", "16:00-18:00", 25, "Disponible"));


function cargarTablaActividades() {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    
    if (!cuerpoTabla) return; 

    const lista = sistema.listarActividades();

    lista.forEach(act => {
        const fila = document.createElement('tr');

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = act.nombre;
        fila.appendChild(celdaNombre);

        const celdaLugar = document.createElement('td');
        celdaLugar.textContent = act.lugar;
        fila.appendChild(celdaLugar);

        const celdaDia = document.createElement('td');
        celdaDia.textContent = act.dia;
        fila.appendChild(celdaDia);

        const celdaHorario = document.createElement('td');
        celdaHorario.textContent = act.horario;
        fila.appendChild(celdaHorario);

        const celdaCupos = document.createElement('td');
        celdaCupos.textContent = act.cupo;
        fila.appendChild(celdaCupos);

        const celdaEstado = document.createElement('td');
        celdaEstado.textContent = act.estado;
        fila.appendChild(celdaEstado);

        cuerpoTabla.appendChild(fila);
    });
}

document.addEventListener('DOMContentLoaded', cargarTablaActividades);

function generarParticipantes() {
    const cantidad = document.getElementById('cantidadParticipantes').value;
    const contenedor = document.getElementById('contenedorParticipantes');
    
    contenedor.innerHTML = ''; 

    for (let i = 1; i <= cantidad; i++) {
        const div = document.createElement('div');
        div.className = 'tarjeta-formulario mb-4 p-3 border'; 
        
        const titulo = document.createElement('h3');
        titulo.textContent = `Participante ${i}`;
        div.appendChild(titulo);

        const divNombre = document.createElement('div');
        divNombre.className = 'mb-3';
        divNombre.innerHTML = `<label class="form-label">Apellido y Nombre:</label>
                               <input type="text" name="nombre_${i}" class="form-control" required>`;
        div.appendChild(divNombre);

        const divDni = document.createElement('div');
        divDni.className = 'mb-3';
        divDni.innerHTML = `<label class="form-label">DNI:</label>
                            <input type="number" name="dni_${i}" class="form-control input-dni" required>`;
        div.appendChild(divDni);

        const divFecha = document.createElement('div');
        divFecha.className = 'mb-3';
        divFecha.innerHTML = `<label class="form-label">Fecha de nacimiento:</label>
                              <input type="date" name="fecha_${i}" class="form-control input-fecha" required>`;
        div.appendChild(divFecha);

        const divSexo = document.createElement('div');
        divSexo.className = 'mb-3';
        divSexo.innerHTML = `<label class="form-label">Sexo:</label>
                             <select name="sexo_${i}" class="form-select">
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="No binario">No binario</option>
                             </select>`;
        div.appendChild(divSexo);

        const divNivel = document.createElement('div');
        divNivel.className = 'mb-3';
        divNivel.innerHTML = `<label class="form-label">Nivel:</label>
                              <select name="nivel_${i}" class="form-select">
                                <option value="Inicial">Inicial</option>
                                <option value="Intermedio">Intermedio</option>
                                <option value="Avanzado">Avanzado</option>
                              </select>`;
        div.appendChild(divNivel);

        contenedor.appendChild(div);
    }
}

function validarFormulario(event) {
    // Validar DNI (Ejercicio 2)
    const dnis = document.querySelectorAll('.input-dni');
    for (let input of dnis) {
        if (input.value.length !== 8) {
            alert("El DNI debe contener 8 dígitos");
            event.preventDefault(); 
            return false;
        }
    }

    const fechas = document.querySelectorAll('.input-fecha');
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    for (let input of fechas) {
        if (input.value) {
            const fechaIngresada = new Date(input.value + "T00:00:00"); 
            if (fechaIngresada > fechaActual) {
                alert("La fecha de nacimiento no puede ser posterior a la fecha actual");
                event.preventDefault();
                return false;
            }
        }
    }

    return true;
}