const sectionSeleccionarAtac = document.getElementById('seleccionar-atac')
const sectionReiniciar = document.getElementById('reiniciar')
const botonAnimalJugador = document.getElementById('boto-animal')
const botoTerra = document.getElementById('boto-terra')
sectionReiniciar.style.display = 'none'
const botoAigua = document.getElementById('boto-aigua')
const botoFoc = document.getElementById('boto-foc')
const botoReiniciar = document.getElementById('boto-reiniciar')

const sectionSeleccionarAnimal = document.getElementById('seleccionar-animal')

const spanAnimalJugador = document.getElementById('animal-jugador')
const spanAnimalEnemic = document.getElementById('animal-enemic')

const spanVidesJugador = document.getElementById('vides-jugador')
const spanVidesEnemic = document.getElementById('vides-enemic')

const sectionMissatges = document.getElementById('resultat')
const atacsDJugador = document.getElementById('atacs-d-jugador')
const atacsDEnemic = document.getElementById('atacs-d-enemic')
const contenidorTargetes = document.getElementById('contenidorTargetes')

let animals = []
let atacJugador
let atacEnemic
let opcioAnimals
let inputGat
let inputGos
let inputAlpaca
let inputHamster
let inputPollet
let inputPorc
let videsJugador = 3
let videsEnemic = 3

class Animal {
    constructor(nom, foto, vida) {
        this.nom = nom
        this.foto = foto
        this.vida = vida
        this.atacs = []
    }
}

let gat = new Animal ('Gat','./assets/gat.png',5)

let gos = new Animal ('Gos','./assets/gos.png',5)

let alpaca = new Animal ('Alpaca','./assets/alpaca.png',5)

let hamster = new Animal ('Hàmter','./assets/hamster.png',5)

let pollet = new Animal ('Pollet','./assets/pollet.png',5)

let porc = new Animal ('Porc','./assets/porc.png',5)

gat.atacs.push(
    {nom: '💦',id: 'boto-aigua'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '☄️',id: 'boto-foc'},
)
gos.atacs.push(
    {nom: '🪹',id: 'boto-terra'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '☄️',id: 'boto-foc'},
)
alpaca.atacs.push(
    {nom: '☄️',id: 'boto-foc'},
    {nom: '☄️',id: 'boto-foc'},
    {nom: '☄️',id: 'boto-foc'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '🪹',id: 'boto-terra'},
)
hamster.atacs.push(
    {nom: '💦',id: 'boto-aigua'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '☄️',id: 'boto-foc'},
)
pollet.atacs.push(
    {nom: '💦',id: 'boto-aigua'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '☄️',id: 'boto-foc'},
    {nom: '☄️',id: 'boto-foc'},
)
porc.atacs.push(
    {nom: '💦',id: 'boto-aigua'},
    {nom: '💦',id: 'boto-aigua'},
    {nom: '🪹',id: 'boto-terra'},
    {nom: '☄️',id: 'boto-foc'},
    {nom: '☄️',id: 'boto-foc'},
)

animals.push(gat,gos,alpaca,hamster,pollet,porc)

function iniciarJuego() {
    sectionSeleccionarAtac.style.display = 'none' 
    animals.forEach((Animal) =>  {
        opcioAnimals = `
            <input type="radio" name="animal" id=${Animal.nom}/>
            <label class="targeta-animal" for=${Animal.nom}>
                <p>${Animal.nom}</p>
                <img src=${Animal.foto} alt=${Animal.nom}> 
            </label>
            `
contenidorTargetes.innerHTML += opcioAnimals
    inputGat = document.getElementById('Gat')
    inputGos = document.getElementById('Gos')
    inputPeix = document.getElementById('Alpaca')
    inputHamster = document.getElementById('Hàmster')
    inputPollet = document.getElementById('Pollet')
    inputPorc = document.getElementById('Porc') 
})
    botonAnimalJugador.addEventListener('click', seleccionarAnimalJugador)
    botoTerra.addEventListener('click', atacTerra)
    botoAigua.addEventListener('click', atacAigua)
    botoFoc.addEventListener('click', atacFoc)
    botoReiniciar.addEventListener('click', reiniciarJoc)
}
function seleccionarAnimalJugador() { // Selecció animal jugador
    sectionSeleccionarAnimal.style.display = 'none'
    sectionSeleccionarAtac.style.display = 'flex'

    if (inputGat.checked) {
        spanAnimalJugador.innerHTML = 'Gat'
    } else if (inputGos.checked) {
        spanAnimalJugador.innerHTML = 'Gos'
    } else if (inputPeix.checked) {
        spanAnimalJugador.innerHTML = 'Alpaca'
    } else if (inputHamster.checked) {
        spanAnimalJugador.innerHTML = 'Hàmster'
    } else if (inputPollet.checked) {
        spanAnimalJugador.innerHTML = 'Pollet'
    } else if (inputPorc.checked) {
        spanAnimalJugador.innerHTML = 'Porc'
    } else { 
        alert("No has escollit cap animal, has d'escollir-ne un!")
    }

    seleccionarAnimalEnemic()
}
function seleccionarAnimalEnemic() { // Selecció animal enemic
    let animalAleatori = aleatori(1,6)
    
    if (animalAleatori == 1) { 
        spanAnimalEnemic.innerHTML = 'Gat enrrabiat'
    } else if (animalAleatori == 2) { 
        spanAnimalEnemic.innerHTML = 'Gos feroç'
    } else if (animalAleatori == 3) { 
        spanAnimalEnemic.innerHTML = 'Alpaca sanguinària'
    } else if (animalAleatori == 4) { 
        spanAnimalEnemic.innerHTML = 'Hàmster bàrbar' 
    } else if (animalAleatori == 5) { 
        spanAnimalEnemic.innerHTML = 'Pollet assassí'
    } else { 
        spanAnimalEnemic.innerHTML = 'Porc troglodita'
    }
}
function atacTerra() { // Ordre al click botó 
    atacJugador = 'TERRA'
    atacAleatoriEnemic()
}
function atacAigua() { // Ordre al click botó
    atacJugador = 'AIGUA'
    atacAleatoriEnemic()
}
function atacFoc() { // Ordre al click botó
    atacJugador = 'FOC'
    atacAleatoriEnemic()
}
function atacAleatoriEnemic() { // Atac aleatori de l'animal enemic
    let atacAleatori = aleatori(1,3)

    if (atacAleatori == 1) {
        atacEnemic = 'TERRA'
    } else if (atacAleatori == 2) {
        atacEnemic = 'AIGUA'
    } else {
        atacEnemic = 'FOC'
    }
    combat()
}
function combat() { // Combinacions d'atacs i resultat del combat

    if(atacEnemic == atacJugador) {
        crearMissatge("EMPAT")
    }   else if (atacJugador == 'TERRA' && atacEnemic == 'AIGUA'){
        crearMissatge("HAS GUANYAT")
        videsEnemic--
        spanVidesEnemic.innerHTML = videsEnemic
    }   else if(atacJugador == 'AIGUA' && atacEnemic == 'FOC') {
        crearMissatge("HAS GUANYAT")
        videsEnemic--
        spanVidesEnemic.innerHTML = videsEnemic
    }   else if(atacJugador == 'FOC' && atacEnemic == 'TERRA') {
        crearMissatge("HAS GUANYAT")
        videsEnemic--
        spanVidesEnemic.innerHTML = videsEnemic
    }   else { 
        crearMissatge("HAS PERDUT")
        videsJugador--
        spanVidesJugador.innerHTML = videsJugador 
    }
    revisarVides() // Revisar les vides

function revisarVides(){
        if (videsEnemic == 0){
            crearMissatgeFinal("FELICITATS! Has guanyat : 😃 👏👏👏" )
        }   else if (videsJugador == 0)
            crearMissatgeFinal("OH! El teu animal ha mort: 😭")
    }
}
function crearMissatge(resultat) { //Inserim a HTML el missatge del resultat del combat

    let nouAtacJugador = document.createElement('p')
    let nouAtacEnemic = document.createElement('p')

    sectionMissatges.innerHTML = resultat
    nouAtacJugador.innerHTML = atacJugador
    nouAtacEnemic.innerHTML = atacEnemic

    atacsDJugador.appendChild(nouAtacJugador)
    atacsDEnemic.appendChild(nouAtacEnemic)
}
function crearMissatgeFinal(resultatFinal) { //Inserim a HTML el missatge del resultat de la partida
    

    sectionMissatges.innerHTML = resultatFinal


    
    botoTerra.disabled = true
    
    botoAigua.disabled = true
    
    botoFoc.disabled = true

    
    sectionReiniciar.style.display = 'block'
}
function reiniciarJoc(){
    location.reload()
}
function aleatori(min, max) {
    return Math.floor(Math.random() * ( max - min + 1)+ min)
}
                // Gat -> Terra
                // Gos -> Foc
                // Peix -> Aigua
                // Ratolí -> Aigua i foc
                // Pollet -> Aigua i terra
                // Porc -> Terra i foc
window.addEventListener('load', iniciarJuego)