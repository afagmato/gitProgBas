const sectionSeleccionarAtac = document.getElementById('seleccionar-atac')
const sectionReiniciar = document.getElementById('reiniciar')
const botonAnimalJugador = document.getElementById('boto-animal')
const botoTerra = document.getElementById('boto-terra')
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
const contTargetes = document.getElementById('contTargetes')

let animals = []
let atacJugador
let atacEnemic
let opcioDAnimals
let inputGat
let inputGos
let inputAlpaca
let videsJugador = 3
let videsEnemic = 3

class Bestia {
    constructor(nom, foto, vida) {
        this.nom = nom
        this.foto = foto
        this.vida = vida
        this.atacs = []
    }
}

let gat = new Bestia ('Gat', './assets/gat.png', 5)

let gos = new Bestia ('Gos', './assets/gos.png', 5)

let alpaca = new Bestia ('Alpaca', './assets/alpaca.png', 5)

gat.atacs.push(
    {nom: '💦', id: 'boto-aigua' },
    {nom: '💦', id: 'boto-aigua' },
    {nom: '💦', id: 'boto-aigua' },
    {nom: '🪹', id: 'boto-terra' },
    {nom: '☄️', id: 'boto-foc' },
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

animals.push(gat,gos,alpaca)

function iniciarJuego() {
    sectionSeleccionarAtac.style.display = 'none'
    animals.forEach((bestia) => { //Això envia la informació a HTML forEach per cada Array (arreglo) de la categoria 
        opcioDAnimals = `
        <input type="radio" name="animal" id=${bestia.nom} 
        /> 
        <label class="targeta-animal" for=${bestia.nom}>
            <p>${bestia.nom}</p>
            <img src=${bestia.foto} alt=${bestia.nom}> 
        </label>
        ` //Aquí vaig tenir el problema de no separar amb un espai nom} de />
    contTargetes.innerHTML += opcioDAnimals

    inputGat = document.getElementById('Gat')
    inputGos = document.getElementById('Gos')
    inputAlpaca = document.getElementById('Alpaca')

    })    
    sectionReiniciar.style.display = 'none'
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
        spanAnimalJugador.innerHTML = inputGat.id
    } else if (inputGos.checked) {
        spanAnimalJugador.innerHTML = inputGos.id
    } else if (inputAlpaca.checked) {
        spanAnimalJugador.innerHTML = inputAlpaca.id
    }  else { 
        alert("No has escollit cap animal, has d'escollir-ne un!")
    }

    seleccionarAnimalEnemic()
}
function seleccionarAnimalEnemic() { // Selecció animal enemic
    let animalAleatori = aleatori(0,animals.length -1)    
    if (animalAleatori == 1) { 
        spanAnimalEnemic.innerHTML = 'Gat enrrabiat'
    } else if (animalAleatori == 2) { 
        spanAnimalEnemic.innerHTML = 'Gos feroç'
    } else if (animalAleatori == 3) { 
        spanAnimalEnemic.innerHTML = 'Alpaca sanguinària'
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
window.addEventListener('load', iniciarJuego)