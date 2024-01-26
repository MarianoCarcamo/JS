const LIMITE_DIAS_SIN_COMER = 3;
const PROBABILIDAD_COMEN_TODOS = 5;

// El max es excluyente y el min es inclusive
const PROBABILIDAD_MAX_COMIDA = 3;
const PROBABILIDAD_MIN_COMIDA = 1;

// Probabilidad de que un animal muerto mate a uno vivo 
const PROBABILIDAD_MORDER = 10;

//Probabilidad de que un animal se muera ahogado
const PROBABILIDAD_AHOGARSE = 3;

//Defino clase animal
class animal{

    constructor(especie, nombre) {
        this.especie = especie;
        this.nombre = document.querySelector(`#${especie}`).value;
        this.dias_sin_comer = 0;
        this.vive = true;
        this.comio = false;
        this.dom_card;
    }

    morir() {
        this.vive = false;
        this.dias_sin_comer = 0;
        this.indicador()
    }

    comer() {
        if(!this.comio) {
            this.comio = true;
            this.dias_sin_comer = 0;
            this.dom_card.querySelector(".card-text").innerText = this.vive? `Dias sin comer: ${this.dias_sin_comer}` : this.dom_card.querySelector(".card-text").innerText
            this.indicador();

            if(probabilidad(PROBABILIDAD_AHOGARSE) && this.vive){
                swal("Las desgracias suceden... ",`Lamentablemente ${this.nombre} se ahogo con la comida y murio`,{
                    closeOnClickOutside: false
                })
                this.morir()
                this.dom_card.querySelector(".card-text").innerText = "Murio ahogado con la comida"
            }

            return true // La comida fue aceptada
        } else {
            swal("No debes tener favoritos",`${this.nombre} ya comio el dia de hoy, ve de alimentar a alguien más`,{
                closeOnClickOutside: false
            })

            return false // La comida no fue aceptada
        }
    }

    despertar() {
        this.comio = false;
    }

    dormir() {
        if(this.vive) {
            if(!this.comio) {
                this.dias_sin_comer++;
                this.dom_card.querySelector(".card-text").innerText = `Dias sin comer: ${this.dias_sin_comer}`
                this.indicador();
            }
            if(this.dias_sin_comer == LIMITE_DIAS_SIN_COMER) { 
                this.morir();
                this.dom_card.querySelector(".card-text").innerText = "Murio de hambre"
            }
        } else {
            this.dias_sin_comer++
        }
    }

    //Metodo para indicar el estado de hambre del animal
    indicador() { 
        if(this.dias_sin_comer == 0 && this.vive) {
            this.dom_card.classList.add("border-success");
            this.dom_card.classList.remove("border-danger");
            this.dom_card.classList.remove("border-warning");
        } else if(this.dias_sin_comer == 1 && this.vive) {
            this.dom_card.classList.remove("border-success");
            this.dom_card.classList.remove("border-danger");
            this.dom_card.classList.add("border-warning");
        } else if(this.dias_sin_comer == 2 && this.vive) {
            this.dom_card.classList.remove("border-success");
            this.dom_card.classList.add("border-danger");
            this.dom_card.classList.remove("border-warning");
        } else {
            this.dom_card.classList.remove("border-success");
            this.dom_card.classList.remove("border-danger");
            this.dom_card.classList.remove("border-warning");
        }
    }
}

// Declaro variables globales
let nombre;
let animales = [];
let dias = 0;
let todos_muertos = false;
let comida;

// Cambio de modo claro a modo oscuro usando bootstrap
let boton_modo = document.querySelector('button')

localStorage.getItem('modo') ?? localStorage.setItem('modo','light')

document.body.setAttribute('data-bs-theme',localStorage.getItem('modo'))
boton_modo.innerText = localStorage.getItem('modo') == "light"? 'Modo oscuro' : 'Modo claro'

boton_modo.addEventListener('click',()=>{
    if (document.body.getAttribute('data-bs-theme') == 'light') {
        document.body.removeAttribute('data-bs-theme')
        document.body.setAttribute('data-bs-theme','dark')
    } else {
        document.body.removeAttribute('data-bs-theme')
        document.body.setAttribute('data-bs-theme','light')
    }

    localStorage.setItem('modo',document.body.getAttribute('data-bs-theme'))
    boton_modo.innerText = localStorage.getItem('modo') == "light"? 'Modo oscuro' : 'Modo claro'
})

// Creo elemento form mediante el cual pido los datos al usuario
let form = document.createElement("form")
form.innerHTML = `
    <div class="mb-3">
        <input type="text" class="form-control" id="vaca" placeholder="Ingrese el nombre de la Vaca">
    </div>
    <div class="mb-3">
        <input type="text" class="form-control" id="chancho" placeholder="Ingrese el nombre del Chancho">
    </div>
    <div class="mb-3">
        <input type="text" class="form-control" id="caballo" placeholder="Ingrese el nombre del Caballo">
    </div>
    <div class="mb-3">
        <input type="text" class="form-control" id="gallina" placeholder="Ingrese el nombre de la Gallina">
    </div>
    <div class="mb-3">
        <input type="text" class="form-control" id="perro" placeholder="Ingrese el nombre del Perro">
    </div>
`
//Uso de libreria SweetAlert para pedir datos al usuario
swal({
    title: "Te ganaste una granja",
    text: "Te la ganaste en una partida de truco medio turbia con unos colegas de tu amigo Rulo19",
    button: "Siguiente",
    closeOnClickOutside: false
  })
  .then( () => {
    return swal({
      title: "En fin...",
      text: "Cual es tu nombre??",
      content: {
        element: "input",
        attributes:{
            style: "color: rgb(0,0,0,.64)",
        },
      },
      button: "Siguiente",
      closeOnClickOutside: false,
      });
  })
  .then( (name) => {
    nombre = name
    return swal({
        text: "Los vecinos decidimos regalarte uno de nuestros animales como gesto de bienvenida... Como los vas a llamar??",
        content: form,
        button: "Siguiente",
        closeOnClickOutside: false
        });
  })
  // COMIENZO: Renderizo app en el DOM + setup de aplicacion
  .then( () => {
    animales.push(new animal("vaca"));
    animales.push(new animal("chancho"));
    animales.push(new animal("caballo"));
    animales.push(new animal("gallina"));
    animales.push(new animal("perro"));

    document.querySelector("h1").innerText = `Granja de ${nombre}`

    for ( const animal of animales) {
        let clon = document.querySelector("template").content.cloneNode(true)
        animal.dom_card = clon.querySelector(".card")
        clon.querySelector(".card-title").innerText = `${animal.nombre}`
        clon.querySelector("img").src = `./img/${animal.especie}.png`
        clon.querySelector("h5").innerText = `${animal.nombre}`
        clon.querySelector("button").addEventListener(`click` , () => {
            secuencia(animal);
        })
        document.querySelector("#contenedor").append(clon)
    }

    let boton = document.createElement("button")
    boton.innerText = "Siguiente Día"
    boton.addEventListener("click",()=>{
        secuencia()
    })
    boton.classList.add("btn","btn-primary","position-absolute","bottom-0","end-0")
    boton.toggleAttribute("disabled")
    document.body.append(boton)

    
    if(localStorage.getItem('puntaje_max')) {
        let mejor_puntaje = document.createElement("h4")
        mejor_puntaje.innerText = `Mejor puntaje por ${localStorage.getItem("jugador")}: ${localStorage.getItem("puntaje_max")}`
        mejor_puntaje.classList.add("position-absolute","bottom-0")
        document.body.append(mejor_puntaje)
    }

    return swal({
        title: "Ahora presta atencion",
        text: "Tu granja corre peligro...",
        button: "Siguiente",
        icon:"warning",
        closeOnClickOutside: false
    })
// FIN : Renderizo app en el DOM
  })
  .then( () => {
    return swal({
        title: "No tienes suficiente comida",
        text: `Debes alimentar a tus animales. No pueden pasar mas de ${LIMITE_DIAS_SIN_COMER} dias sin comer y cuando no comen pasan cosas extrañas... `,
        button: "Comenzar",
        closeOnClickOutside: false
    })
    .then( () => {
        comida = enteroAleatorio(PROBABILIDAD_MIN_COMIDA,PROBABILIDAD_MAX_COMIDA);
        document.querySelector(".ms-3").innerText = `Dia Nº ${dias}`
        document.querySelector(".me-3").innerText = `Cantidad de comida: ${comida}`

        for (const animal of animales) {
            animal.despertar();
            animal.indicador();
            animal.dom_card.querySelector(".card-text").innerText = `Dias sin comer: ${animal.dias_sin_comer}`
        }
    })
  })
  .catch( (error) => {
    swal("Se produjo un error, refresca la pagina e intenta nuevamente",{
        closeOnClickOutside: false
    })
  })

// Realizo una funcion para que el usuario controle el flujo del programa mediante clicks
function secuencia (animal) {
    // Compruebo si se acabo la comida para dar el paso del Día 
    if(comida == 0) {

        // Funcionalidad: Los vivos se comen a los muertos
        for (const animal_1 of animales) {
            if(!animal_1.vive && animal_1.dias_sin_comer >= 2 && probabilidad(PROBABILIDAD_MORDER)) {
                for (const animal_2 of animales) {
                    if(animal_2.vive) {
                        animal_2.morir()
                        animal_1.comer()
                        animal_2.dom_card.querySelector(".card-text").innerText = `${animal_1.nombre} mordio a ${animal_2.nombre} y lo mato`
                        swal("Te dije que pasan cosas raras","Aunque esten muertos debes alimentarlos sino morderan a los animales que tengas vivos y los mataran",{
                            closeOnClickOutside: false
                        })
                        .then(() => {
                            swal("Y mucho ojo!","Debes acordarte a cual de los muertos alimentaste para evitar que te coman a los vivos",{
                                closeOnClickOutside: false
                            })
                        })
                        break
                    }
                }
            }
            animal_1.dormir();
        }

        dias++; // Paso del día

        // Verifico si estan todos muertos para finalizar el juego y actualizo valores de localStorage
        todos_muertos = true;

        for (const animal of animales) {
            if(animal.vive) {
                todos_muertos = false;
            }
        }

        if (todos_muertos) {
            if(localStorage.getItem("puntaje_max")) {
                if(dias > localStorage.getItem("puntaje_max") ) {
                    localStorage.setItem('jugador',`${nombre}`)
                    localStorage.setItem('puntaje_max',`${dias}`)
                }
            } else {
                localStorage.setItem('jugador',`${nombre}`)
                localStorage.setItem('puntaje_max',`${dias}`)
            }
            swal("Se murieron todos tus animales",`Por el esfuerzo se te va a otorgar un puntaje de: ${dias}`,{
                closeOnClickOutside: false,
                closeOnEsc: false,
                button: false,
                timer: 5000
            })
            .then(() => {
                swal("Refresca la página para volver a jugar o cierra la ventana para salir",{
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                    button: false
                })
            })
        }

        // Se resetean los valores de comida y el dia actual
        comida = enteroAleatorio(PROBABILIDAD_MIN_COMIDA,PROBABILIDAD_MAX_COMIDA);
        document.querySelector(".ms-3").innerText = `Dia Nº ${dias}`
        document.querySelector(".me-3").innerText = `Cantidad de comida: ${comida}`

        for (const animal of animales) {
            animal.despertar();
            document.querySelector(".bottom-0").toggleAttribute("disabled")
            for(const animal of animales) {
                animal.dom_card.querySelector("button").toggleAttribute("disabled")
            }
        }

        // Funcionalidad: Probabilidad x de que comen todos
        if(probabilidad(PROBABILIDAD_COMEN_TODOS)) {
            swal("Hoy es tu dia de suerte!","Los vecinos se pusieron de acuerdo y te regalaron la comida suficiente para alimentar a toda tu granja.\n Y si, inclusive a tus muertos",{
                closeOnClickOutside: false
            })
            for (const animal of animales) {
                animal.comer()
            }
            comida = 0;
            document.querySelector(".me-3").innerText = `Cantidad de comida: ${comida}`
            if(comida == 0) {
                for(const animal of animales) {
                    animal.dom_card.querySelector("button").toggleAttribute("disabled")
                }
                document.querySelector(".bottom-0").toggleAttribute("disabled")
            }
        }

    } else {
        if(animal.comer()){
            comida--;
            document.querySelector(".me-3").innerText = `Cantidad de comida: ${comida}`
            if(comida == 0) {
                for(const animal of animales) {
                    animal.dom_card.querySelector("button").toggleAttribute("disabled")
                }
                document.querySelector(".bottom-0").toggleAttribute("disabled")
            }
        }
    }

    if (probabilidad(3)) { 
        // API de chistes aleatorios para levantar el animo
        swal("Tus vecinos vinieron a alivianar el día con un chiste",{
            icon: "info",
            closeOnClickOutside: false
        })
        .then(()=>{
            fetch('https://v2.jokeapi.dev/joke/Any?lang=es')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.type == "single"){
                    swal(data.joke,{
                        closeOnClickOutside: false
                    })
                } else if(data.type == "twopart") {
                    swal(data.setup,{
                        closeOnClickOutside: false
                    })
                    .then(()=>{
                        swal(data.delivery,{
                            closeOnClickOutside: false
                        })
                    })
                }
            })
        })
    }
}

// Funcion que retorna true con una probabilidad x de ocurrencia 
function probabilidad(probabilidad) { // Como parametro se debe pasar un numero entre 0 y 99--> ej: "3", indica una probabilidad del 3% 
    let numero = Math.random();
    
    probabilidad = Number(probabilidad);

    if(numero > probabilidad/100) { 
        return false;
    } else {
        return true;
    }
}

//Entrega un entero aleatorio entre el min y el max
function enteroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}