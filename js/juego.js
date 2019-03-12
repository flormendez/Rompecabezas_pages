// Arreglo que contiene las intrucciones del juego.
var instrucciones = [
  "Utilizar las flechas para mover las piezas.",
  "Ordenar las piezas hasta alcanzar la imagen del objetivo."
];
// Arreglo para ir guardando los movimientos que se vayan realizando.
var movimientos = [];

// Representación de la grilla. Cada número representa a una pieza. El 9 es la posición vacía.
var grilla = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

//Estas dos variables son para guardar la posición de la pieza vacía. Esta posición comienza siendo la [2, 2].
var filaVacia = 2;
var columnaVacia = 2;

// Esta función recorrer el arreglo de instrucciones pasado por parámetro.
function mostrarInstrucciones(instrucciones) {
  for (var i = 0; i < instrucciones.length; i++) {
    mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
  }
}

//Función que agrega la última dirección al arreglo de movimientos y lo muestra en pantalla con actualizarUltimoMovimiento.
function agregarUltimoMovimiento(direccion) {
  actualizarUltimoMovimiento(direccion);
  movimientos.push(direccion);
}

//Función que intercambia dos posiciones en la grilla.
function intercambiarPosicionesGrilla(
  filaPos1,
  columnaPos1,
  filaPos2,
  columnaPos2
) {
  var intercambio1 = grilla[filaPos1][columnaPos1];
  var intercambio2 = grilla[filaPos2][columnaPos2];
  grilla[filaPos1][columnaPos1] = intercambio2;
  grilla[filaPos2][columnaPos2] = intercambio1;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}

//Chequea si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
  if (fila >= 0 && fila <= 2 && 0 <= columna && columna <= 2) {
    return true;
  } else {
    return false;
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia la abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }

  //Chequea si la nueva posición es válida, si lo es, se intercambia.

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(
      filaVacia,
      columnaVacia,
      nuevaFilaPiezaVacia,
      nuevaColumnaPiezaVacia
    );
    agregarUltimoMovimiento(direccion);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}

// Esta función chequea si el Rompecabezas esta en la posicion ganadora.
function chequearSiGano() {
  var resultado = true;
  grillaGanadora = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  for (var i = 0; i < grilla.length; i++) {
    for (var j = 0; j < grilla[i].length; j++) {
      if (grilla[i][j] != grillaGanadora[i][j]) {
        return false;
      }
    }
  }

  if (resultado) {
    return true;
  }
}

//Cartel que avisa si el objetivo está logrado y cuántos movimientos fueron necesarios para lograrlo.
function mostrarCartelGanador() {
  alert(
    "Felicitaciones, ¡Ganaste! Tardaste " + movimientos.length + " movimientos."
  );
}


// codigosDireccion es un objeto que reemplaza el uso de números confusos en el código. 
var codigosDireccion = {
  IZQUIERDA: 37,
  ARRIBA: 38,
  DERECHA: 39,
  ABAJO: 40
};

// Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza el intercambio en la pantalla (DOM)
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM("pieza" + pieza1, "pieza" + pieza2);
}

// Intercambio de posiciones de los elementos del DOM que representan las fichas en la pantalla 

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

// Actualiza la representación visual del último movimiento en la pantalla, representado con una flecha. 
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById("flecha");
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = "↑";
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = "↓";
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = "→";
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = "←";
      break;
  }
}

// Esta función permite agregar una instrucción a la lista con idLista. Se crea un elemento li dinámicamente con el texto pasado con el parámetro "instrucción". 
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

// Función que mezcla las piezas del tablero una cantidad de veces dada.

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [
    codigosDireccion.ABAJO,
    codigosDireccion.ARRIBA,
    codigosDireccion.DERECHA,
    codigosDireccion.IZQUIERDA
  ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
    mezclarPiezas(veces - 1);
  }, 100);
  movimientos = [];
}

// capturarTeclas: Esta función captura las teclas presionadas por el usuario. 
function capturarTeclas() {
  document.body.onkeydown = function(evento) {
    if (
      evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA
    ) {
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function() {
          mostrarCartelGanador();
        }, 500);
      }
      evento.preventDefault();
    }
  };
}

// Se inicia el rompecabezas mezclando las piezas 60 veces y ejecutando la función para que se capturen las teclas que presiona el usuario 
function iniciar() {
  mostrarInstrucciones(instrucciones);
  mezclarPiezas(60);
  capturarTeclas();
}

// Ejecutamos la función iniciar
iniciar();
