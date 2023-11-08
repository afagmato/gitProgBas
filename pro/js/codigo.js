function aleatorio(min, max) {
    return Math.floor(Math.random() * ( max - min + 1)+ min)
}

function eleccion(jugada) {
    let resultado = ""
    if(jugada == 1) { 
    resultado = "👊🏼"
    }
    else if(jugada == 2) { 
    resultado = "✋"
    }
    else if(jugada == 3) { 
    resultado = "✌️"
    }
    else { 
    resultado = "No has escollit cap opció possible"
    }
    return resultado 
}

// 1 és pedra, 2 és paper i 3 és estisores
let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0

while (triunfos < 3 && perdidas < 3) {
pc = aleatorio(1,3)
    jugador = prompt("Escull: 1 per pedra, 2 per parer i 3 per estisores")
    //alert("Has escollit " + jugador)

    alert("Has escollit " + eleccion(jugador))
    alert("El PC ha escollit " + eleccion(pc))

    // COMBAT
    if(pc == jugador) {
        alert("Empat")
    } else if ((jugador == 1 && pc == 3) 
        || (jugador == 2 && pc == 1) 
        || (jugador == 3 && pc == 2)){
        alert("Has guanyat")
        triunfos = triunfos + 1
    } else { 
        alert("Has perdut")
        perdidas = perdidas + 1
    }
}
alert("Has guanyat " + triunfos + " cops. Has perdut " + perdidas + " cops.")