const LIMITE_DIAS_SIN_COMER = 3;
// Se crea la clase "anmimal"

class animal{

    constructor(especie, nombre) {
        this.especie = especie;
        this.nombre = nombre;
        this.edad = 0; // Medido en dias
        this.dias_sin_comer = 0;
        this.vive = true;
        this.comio = false;
        this.dom = document.querySelector(`#${especie}`)
    }

    morir() {
        this.vive = false;
    }

    comer() {
        if(probabilidad(20)) {
            this.comio = true;
            this.dias_sin_comer = 0;

            this.vive ? 
                diario.innerText += this.nombre + " comio riquisimo!!\n" 
                : diario.innerText += this.nombre + " comio riquisimo aunque este muerto. Los zombies tambien comen 🧠\n"

            if(probabilidad(3) && this.vive){
                this.morir()
                diario.innerText += this.nombre + " se ahogo con la comida y murio.\n"
            }
        }
        return this.comio
    }

    despertar() {
        this.comio = false;
    }

    dormir() {
        if(this.vive) {
            this.edad++

            !this.comio ? this.dias_sin_comer++ : null

            if(this.dias_sin_comer == LIMITE_DIAS_SIN_COMER) { 
                this.morir();
                diario.innerText += this.nombre + " murio de hambre.\n"
            }
        }
    }
}

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

// Comienzo de la aplicacion 

let diario = document.createElement('p')
document.body.append(diario)

let animales = [];

animales.push(new animal("vaca",""));
animales.push(new animal("chancho",""));
animales.push(new animal("caballo",""));
animales.push(new animal("gallina",""));
animales.push(new animal("perro",""));

let form = document.querySelector('form')

form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    duenio = document.querySelector('#nombre').value

    for (const animal of animales) {
        animal.nombre = animal.dom.value
    }

    agregarParrafo(document.body,"Te fuiste de vacaciones a las bahamas junto a tu mejor amigo Rulo19 y te olvidaste de tus animales.\n Tus amables vecinos intentaron mantenerlos con vida pero no lo lograron.\n Dejaron escrito lo sucedido en estos ultimos dias en un diario para repotarte a las autoridades.")

    let h3 = document.createElement('h3')
    h3.innerText = `Granja de ${duenio}:\nA continuación leerás el diario de un granjero descuidado!`
    document.body.append(h3)


    let dias = 0;
    let todos_muertos = false;

    while(!todos_muertos) {
        let comida = 2;

        diario.innerText += `Día ${dias}\n`

        for (const animal of animales) {
            animal.despertar();
        }

        while(comida > 0) {
            animales.forEach(animal => {
                if(!animal.comio && comida > 0) {
                    animal.comer() ? comida-- : null
                }
            });
        }

        for (const animal of animales) {
            animal.dormir();
        }

        dias++;
        
        todos_muertos = true;

        for (const animal of animales) {
            animal.vive ? todos_muertos = false : null
        }
    }

    document.body.append(diario)

    let parrafo_final = agregarParrafo(document.body,`\nLos animales murieron a los ${dias} dias (Si, el cero cuenta como día)`)

    for (const animal of animales) {
        parrafo_final.innerText += `\nEl/La ${animal.especie} ${animal.nombre} murio a los ${animal.edad} dias.`
    }

}, {once : true}) // Permite ejecutar una unica vez, si se vuele a presionar el boton se refresca la pagina




// Se crean funciones de utilidad
function probabilidad(probabilidad) { // Como parametro se debe pasar un numero --> ej: "3", indica una probabilidad del 3% 
    let numero = Math.random();

    probabilidad = Number(probabilidad);

    let retorno = numero > probabilidad/100 ? false : true

    return retorno
}

function agregarParrafo(nodo,texto) {
    let p = document.createElement('p')
    p.innerText = texto
    nodo.append(p)
    return p
}