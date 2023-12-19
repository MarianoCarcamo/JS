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
    }

    morir() {
        this.vive = false;
    }

    comer() {
        if(probabilidad(20)) {
            this.comio = true;
            this.dias_sin_comer = 0;

            if(this.vive){
                console.log(this.nombre + " comio riquisimo!!")
            } else {
                console.log(this.nombre + " comio riquisimo aunque este muerto. Los zombies tambien comen 🧠")
            }

            if(probabilidad(3) && this.vive){
                this.morir()
                console.log(this.nombre + " se ahogo con la comida y murio.")
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
            if(!this.comio) {
                this.dias_sin_comer++;
            }
            if(this.dias_sin_comer == LIMITE_DIAS_SIN_COMER) { 
                this.morir();
                console.log(this.nombre + " murio de hambre.")
            }
        }
    }
}

let duenio = prompt("Ingrese su nombre:");

alert(duenio + ", bienvenido a tu nueva granja!! \n Cada uno de los vecinos decidimos regalarte uno de nuestros animales como gesto de bienvenida... Como los vas a llamar??")

let animales = [];

animales.push(new animal("vaca",""));
animales.push(new animal("chancha",""));
animales.push(new animal("pollo",""));
animales.push(new animal("oveja",""));
animales.push(new animal("perro",""));

for (const animal of animales) {
    animal.nombre = prompt("Como llamaras a tu nuevo/a " + animal.especie);
}


//Creo variables globales de utilidad
let dias = 0;
let todos_muertos = false;

alert(duenio + " se fue de vacaciones a las bahamas junto a su mejor amigo Rulo19 y se olvido de sus animales.\n Sus amables vecinos intentaron mantener con vida a sus animales pero no lo lograron.\n Dejaron escrito lo sucedido en estos ultimos dias en un diario para repotar a " + duenio + " a las autoridades.")

console.log("Bienvenidos a la granja de " + duenio + "\nA continuación leerás el diario de un granjero descuidado!")

while(!todos_muertos) {
    let comida = 2;

    console.log("\nDía " + dias)

    for (const animal of animales) {
        animal.despertar();
    }

    while(comida > 0) {
        animales.forEach(animal => {
            if(!animal.comio && comida > 0) {
                if(animal.comer()){
                    comida--;
                }
            }
        });
    }

    for (const animal of animales) {
        animal.dormir();
    }

    dias++;
    
    todos_muertos = true;

    for (const animal of animales) {
        if(animal.vive) {
            todos_muertos = false;
        }
    }
}

console.log("\nLos animales murieron a los " + dias + " dias (Si, el cero cuenta como día)\n");

for (const animal of animales) {
    console.log("El/La " + animal.especie + " " + animal.nombre + " murio a los " + animal.edad + " dias.");
}

// Se crean funciones de utilidad

function probabilidad(probabilidad) { // Como parametro se debe pasar un numero --> ej: "3", indica una probabilidad del 3% 
    let numero = Math.random();
    
    probabilidad = Number(probabilidad);

    if(numero > probabilidad/100) { 
        return false;
    } else {
        return true;
    }
}