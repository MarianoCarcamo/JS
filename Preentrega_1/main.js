// Declaro bandera de salida del ciclo infinito
let salir = false

// Declaro constantes de conversion 
const pulg_mm = 25.4        //Pulgada a milimetros
const pie_m = 0.3048        //Pies a metros
const pulg2_cm2 = 6.4516    //Pulgada cuadrada a centimetro cuadrados
const lb_kg = 0.453592      //Libras a Kilogramos




// Aplicacion - Ciclo infinito

while (!salir) {
    let aplicacion = prompt("Indica la opcion que necesites: \n 1. Calculadora \n 2. Conversor de unidades \n 3. Salir")

    switch (aplicacion) {

        case "1" :
            let resultado = Calculadora(prompt("Ingrese la expresion a calcular sin parentesis: \n Los operadores que se reconocen son + - * / \n Para diferenciar un numero negativo de una resta utilizar los espacios: \n--> 5 - 4 = 1 ; 5 - -4 = 5 - (-4) = 9", "ej: 4 + 9 / 3 - 5"))
            alert(resultado)
            break

        case "2" :
            let conversion = prompt("Indique tipo de conversion: \n 1. Longitud \n 2. Superficie \n 3. Peso \n 4. Temperatura")
            
            if (conversion == "1") { 
                conversion = prompt("De que a que: \n 1. pulg -> mm \n 2. mm -> pulg \n 3. pie -> m \n 4. m -> pie")
                let a = Number(prompt("Ingrese la cantidad a convertir:"))
                
                switch (conversion) {
                    case "1" :
                        a *= pulg_mm
                        alert(a + " [mm]")
                        break
                    case "2" :
                        a /= pulg_mm
                        alert(a + " [pulg]")
                        break
                    case "3" :
                        a *= pie_m
                        alert(a + " [m]")
                        break
                    case "4" :
                        a /= pie_m
                        alert(a + " [pie]")
                        break
                }
            } else if (conversion == "2") {
                conversion = prompt("De que a que: \n 1. pulg^2 -> cm^2 \n 2. cm^2 -> pulg^2")
                let a = Number(prompt("Ingrese la cantidad a convertir:"))
                
                if ( conversion == "1"){
                    a *= pulg2_cm2
                    alert(a + " [cm^2]")
                } else if (conversion == "2") {
                    a /= pulg2_cm2
                    alert(a + " [pulg^2]")
                }
            } else if (conversion == "3") {
                conversion = prompt("De que a que: \n 1. lb -> kg \n 2. kg -> lb")
                let a = Number(prompt("Ingrese la cantidad a convertir:"))
                
                if (conversion == "1"){
                    a *= lb_kg
                    alert(a + " [kg]")
                } else if (conversion == "2") {
                    a /= lb_kg
                    alert(a + " [lb]")
                }
            } else if (conversion == "4") {
                conversion = prompt("De que a que: \n 1. °F -> °C \n 2. °C -> °F")
                let a = Number(prompt("Ingrese la cantidad a convertir:"))
                
                if (conversion == "1"){
                    a = (5 / 9) * (a - 32)
                    alert(a + " [°C]")
                } else if (conversion == "2") {
                    a = a * (9 / 5) + 32
                    alert(a + " [°F]")
                }
            }

            break

        default:
            salir = true
            break
    }
}



function Calculadora (expresion) {
    let os_op
    let a, b
    let os_a,os_b

    while ((expresion.includes("*") || expresion.includes("/")) && isNaN(Number(expresion))) {
        a = undefined
        b = undefined
        for (let i = 0 ; i < expresion.length ; i++){
                
            if (expresion.charAt(i) == "*" || expresion.charAt(i) == "/"){
                os_op = i
                for (let j = 0 ; j < i ; j++) {
                    if(!isNaN(Number(expresion.substring(i,j))) && !a && !isNaN(parseFloat(expresion.substring(i,j)))) {
                        a = Number(expresion.substring(i,j))
                        os_a = j
                        break
                    }
                }
                for (let j = expresion.length ; j >= i ; j--) {
                    if(!isNaN(Number(expresion.substring(i + 1,j))) && !b && !isNaN(parseFloat(expresion.substring(i + 1,j)))) {
                        b = Number(expresion.substring(i + 1 , j))
                        os_b = j
                        break
                    }
                }
                if (isNaN(a)){
                    expresion = expresion[os_op] + b + expresion.substring(os_b)
                    i=0
                    a = undefined
                    b = undefined
                    continue
                }
                break
            }
            
        }
        expresion = expresion.substring(0,os_a + 1) + Operacion(a,b,expresion[os_op]) + expresion.substring(os_b)
    }
    
    while ((expresion.includes("+") || expresion.includes("-")) && isNaN(Number(expresion))) {
        a = undefined
        b = undefined
        for (let i = 0 ; i < expresion.length ; i++){
                
            if (expresion.charAt(i) == "+" || expresion.charAt(i) == "-"){
                os_op = i
                for (let j = 0 ; j < i ; j++) {
                    if(!isNaN(Number(expresion.substring(i,j))) && !a && !isNaN(parseFloat(expresion.substring(i,j)))) {
                        a = Number(expresion.substring(i,j))
                        os_a = j
                        break
                    }
                }
                for (let j = expresion.length ; j >= i ; j--) {
                    if(!isNaN(Number(expresion.substring(i + 1,j))) && !b && !isNaN(parseFloat(expresion.substring(i + 1,j)))) {
                        b = Number(expresion.substring(i + 1 , j))
                        os_b = j
                        break
                    }
                }
                if (isNaN(a)){
                    expresion = expresion[os_op] + b + expresion.substring(os_b)
                    i=0
                    a = undefined
                    b = undefined
                    continue
                }
                break
            }
            
        }
        expresion = Operacion(a,b,expresion[os_op]) + expresion.substring(os_b)
    }
    return Number(expresion)
}


function Operacion (a,b,operador) {
    let resultado

    switch (operador) {

        case "+":
            resultado = a + b
            break

        case "-":
            resultado = a - b
            break

        case "*":
            resultado = a * b
            break

        case "/":
            resultado = a / b
            break

        default:
            resultado = "syntax error"
            break
    }

    return resultado
}