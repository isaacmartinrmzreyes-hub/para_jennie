// 1. Lista completa de canciones en la carpeta songs/
const canciones = [
  { titulo: "Flawless", artista: "The Neighbourhood", archivo: "songs/Flawless [hsA0ju6OSig].mp4" },
  { titulo: "Reflections", artista: "The Neighbourhood", archivo: "songs/Reflections [nhys3nF4ZDU].mp4" },
  { titulo: "Stargazing", artista: "The Neighbourhood", archivo: "songs/Stargazing [NhO5-OUecvY].mp4" },
  { titulo: "Sweater Weather", artista: "The Neighbourhood", archivo: "songs/Sweater Weather [cULQhvuq1Zc].mp4" },
  { titulo: "Mad Sounds", artista: "Arctic Monkeys", archivo: "songs/Mad Sounds [up5DEICL_Q0].mp4" },
  { titulo: "Baby I'm Yours", artista: "Arctic Monkeys", archivo: "songs/Baby I'm Yours [atYNqvZcQ3M].mp4" },
  { titulo: "I Wanna Be Yours", artista: "Arctic Monkeys", archivo: "songs/I Wanna Be Yours [nyuo9-OjNNg].mp4" },
  { titulo: "BIRDS OF A FEATHER", artista: "Billie Eilish", archivo: "songs/BIRDS OF A FEATHER [WKZO-CWeOVA].mp4" },
  { titulo: "CORALINE", artista: "Måneskin", archivo: "songs/CORALINE [QTIkudYT3mg].mp4" },
  { titulo: "BABY SAID", artista: "Måneskin", archivo: "songs/BABY SAID [_z2pK2oJ0ns].mp4" },
  { titulo: "FOR YOUR LOVE", artista: "Måneskin", archivo: "songs/FOR YOUR LOVE [1ivT0iXje5s].mp4" },
  { titulo: "VENT'ANNI", artista: "Måneskin", archivo: "songs/VENT'ANNI [ljxOevm3rWU].mp4" },
  { titulo: "TIMEZONE", artista: "Måneskin", archivo: "songs/TIMEZONE [qSMhvQDeFJk].mp4" },
  { titulo: "IF NOT FOR YOU", artista: "Måneskin", archivo: "songs/IF NOT FOR YOU [mfRDufCGclI].mp4" },
  { titulo: "THE LONELIEST", artista: "Måneskin", archivo: "songs/loneliest.mp4" },
  { titulo: "Eres tú", artista: "Peint", archivo: "songs/Eres tú [W7z886y7Ro0].mp4" }
];
6
// 2. Función para elegir una canción al azar sin repetir la actual
function obtenerIndiceAleatorio(indiceActual) {
  if (canciones.length <= 1) return 0;
  let nuevoIndice;
  do {
    nuevoIndice = Math.floor(Math.random() * canciones.length);
  } while (nuevoIndice === indiceActual);
  return nuevoIndice;
}

// Inicia en una canción aleatoria al cargar la página
let cancionActual = Math.floor(Math.random() * canciones.length);

// 3. Referencias a los elementos del HTML
const audio = document.getElementById("audio");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const progreso = document.getElementById("progreso");
const tiempoActualEl = document.getElementById("tiempo-actual");
const tiempoTotalEl = document.getElementById("tiempo-total");
const tituloEl = document.getElementById("titulo-cancion");
const artistaEl = document.getElementById("artista-cancion");

function cargarCancion(indice) {
  const cancion = canciones[indice];
  tituloEl.textContent = cancion.titulo;
  artistaEl.textContent = cancion.artista;
  audio.src = cancion.archivo;
}

function formatearTiempo(segundos) {
  if (isNaN(segundos)) return "0:00";
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" : ""}${seg}`;
}

// 4. Controles del reproductor
btnPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnPlay.textContent = "⏸";
  } else {
    audio.pause();
    btnPlay.textContent = "▶";
  }
});

btnPrev.addEventListener("click", () => {
  cancionActual = obtenerIndiceAleatorio(cancionActual);
  cargarCancion(cancionActual);
  audio.play();
  btnPlay.textContent = "⏸";
});

btnNext.addEventListener("click", () => {
  cancionActual = obtenerIndiceAleatorio(cancionActual);
  cargarCancion(cancionActual);
  audio.play();
  btnPlay.textContent = "⏸";
});

// Actualizar barra de progreso y tiempos
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progreso.value = (audio.currentTime / audio.duration) * 100;
    tiempoActualEl.textContent = formatearTiempo(audio.currentTime);
    tiempoTotalEl.textContent = formatearTiempo(audio.duration);
  }
});

// Adelantar o atrasar moviendo la barra
progreso.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progreso.value / 100) * audio.duration;
  }
});

// Pasar automáticamente a otra canción aleatoria al terminar
audio.addEventListener("ended", () => {
  btnNext.click();
});

// 5. Cargar primera canción e intentar reproducción automática
cargarCancion(cancionActual);

audio.play()
  .then(() => {
    btnPlay.textContent = "⏸";
  })
  .catch(() => {
    const limpiarListeners = () => {
      document.removeEventListener("click", iniciarConToque);
      document.removeEventListener("touchstart", iniciarConToque);
    };

    const iniciarConToque = (e) => {
      if (e.target === btnPlay || btnPlay.contains(e.target)) {
        limpiarListeners();
        return;
      }
      if (audio.paused) {
        audio.play().then(() => {
          btnPlay.textContent = "⏸";
        });
      }
      limpiarListeners();
    };

    document.addEventListener("click", iniciarConToque);
    document.addEventListener("touchstart", iniciarConToque);
  });

// 6. Mover el reproductor al cuadrito flotante de la derecha al hacer scroll
const wrapper = document.getElementById("player-wrapper");
const reproductor = document.getElementById("reproductor");

window.addEventListener("scroll", () => {
  const posicion = wrapper.getBoundingClientRect().top;
  if (posicion < 20) {
    reproductor.classList.add("flotante");
  } else {
    reproductor.classList.remove("flotante");
  }
});

