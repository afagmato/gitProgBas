const sectionSeleccionarAtac = document.getElementById('seleccionar-atac')
const sectionReiniciar = document.getElementById('reiniciar')
const botonAnimalJugador = document.getElementById('boto-animal')
const botoReiniciar = document.getElementById('boto-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarAnimal = document.getElementById('seleccionar-animal')
const spanAnimalJugador = document.getElementById('animal-jugador')

const spanAnimalEnemic = document.getElementById('animal-enemic')

const spanVidesJugador = document.getElementById('vides-jugador')
const spanVidesEnemic = document.getElementById('vides-enemic')

const sectionMissatges = document.getElementById('resultat')
const atacsDJugador = document.getElementById('atacs-d-jugador')
const atacsDEnemic = document.getElementById('atacs-d-enemic')
const contTargetes = document.getElementById('contTargetes')
const contAtacs = document.getElementById('contAtacs')

const sectionVeureMapa = document.getElementById('veure-mapa')
const mapa = document.getElementById('mapa')

let animals = []
let atacJugador = []
let atacEnemic = []
let opcioDAnimals
let inputGat
let inputGos
let inputAlpaca
let inputHamster
let inputPollet
let inputPorc
let animalJugador
let atacsAnimal
let atacsAnimalEnemic
let botoTerra
let botoAigua
let botoFoc
let botons = []
let indexAtacJugador 
let indexAtacEnemic
let victoriesJugador = 0
let victoriesEnemic = 0
let videsJugador = 3
let videsEnemic = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackgroud = new Image()
mapaBackgroud.src = './assets/mapaestelar.jpeg'

class Bestia {
    constructor(nom, foto, vida, tipus) {
        this.nom = nom
        this.foto = foto
        this.vida = vida
        this.tipus = tipus
        this.atacs = []
        this.x = 40
        this.y = 60
        this.ancho = 120
        this.alto = 120
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadx = 0
        this.velocidady = 0
    }
}

let gat = new Bestia ('Gat', './assets/gat.png', 5, 'foc')

let gos = new Bestia ('Gos', './assets/gos.png', 5, 'terra')

let alpaca = new Bestia ('Alpaca', './assets/alpaca.png', 5, 'aigua')

let hamster = new Bestia ('Hàmster', './assets/hamster.png', 5, 'aigua-terra')

let pollet = new Bestia ('Pollet', './assets/pollet.png', 5, 'terra-foc')

let porc = new Bestia ('Porc', './assets/porc.png', 5, 'foc-aigua')


gat.atacs.push(
    {nom: '☄️', id: 'boto-foc'},
    {nom: '☄️', id: 'boto-foc'},
    {nom: '☄️', id: 'boto-foc'},
    {nom: '💦', id: 'boto-aigua'},
    {nom: '🧱', id: 'boto-terra'},
)

gos.atacs.push(
    {nom: '🧱', id: 'boto-terra'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '💦', id: 'boto-aigua'},
    {nom: '☄️', id: 'boto-foc'},        
)

alpaca.atacs.push(
    {nom: '💦', id: 'boto-aigua' },
    {nom: '💦', id: 'boto-aigua' },
    {nom: '💦', id: 'boto-aigua' },
    {nom: '🧱', id: 'boto-terra' },
    {nom: '☄️', id: 'boto-foc' },
)

hamster.atacs.push(
    {nom: '💦', id: 'boto-aigua'},
    {nom: '💦', id: 'boto-aigua'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '☄️', id: 'boto-foc'},
)

pollet.atacs.push(
    {nom: '💦', id: 'boto-aigua'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '☄️', id: 'boto-foc'},
    {nom: '☄️', id: 'boto-foc'},
)

porc.atacs.push(
    {nom: '💦', id: 'boto-aigua'},
    {nom: '💦', id: 'boto-aigua'},
    {nom: '🧱', id: 'boto-terra'},
    {nom: '☄️', id: 'boto-foc'},
    {nom: '☄️', id: 'boto-foc'},
)

animals.push(gat,gos,alpaca,hamster,pollet,porc)

function iniciarJoc() {

    sectionSeleccionarAtac.style.display = 'none'
    sectionVeureMapa.style.display = 'none'
    
    animals.forEach((bestia) => { //Això envia la informació a HTML forEach per cada Array (arreglo) de la categoria 
        opcioDAnimals = `
        <input type="radio" name="animal" id=${bestia.nom} /> 
        <label class="targeta-animal" for=${bestia.nom}>
            <p>${bestia.nom}</p>
            <img src=${bestia.foto} alt=${bestia.nom}> 
        </label>
        ` //Aquí vaig tenir el problema de no separar amb un espai nom} de />
    contTargetes.innerHTML += opcioDAnimals

        inputGat = document.getElementById('Gat')
        inputGos = document.getElementById('Gos')
        inputAlpaca = document.getElementById('Alpaca')
        inputHamster = document.getElementById('Hàmster')
        inputPollet = document.getElementById('Pollet')
        inputPorc = document.getElementById('Porc')

    })    
    
    botonAnimalJugador.addEventListener('click', seleccionarAnimalJugador)
    




    botoReiniciar.addEventListener('click', reiniciarJoc)
}

function seleccionarAnimalJugador() { // Selecció animal jugador
    
    sectionSeleccionarAnimal.style.display = 'none'
    

    //sectionSeleccionarAtac.style.display = 'flex'
    sectionVeureMapa.style.display = 'flex'
    iniciarMapa()
    
    if (inputGat.checked) {
        spanAnimalJugador.innerHTML = inputGat.id
        animalJugador = inputGat.id
    }   else if (inputGos.checked) {
        spanAnimalJugador.innerHTML = inputGos.id
        animalJugador = inputGos.id
    }   else if (inputAlpaca.checked) {
        spanAnimalJugador.innerHTML = inputAlpaca.id
        animalJugador = inputAlpaca.id
    }   else if (inputHamster.checked) {
        spanAnimalJugador.innerHTML = inputHamster.id
        animalJugador = inputHamster.id
    }   else if (inputPollet.checked) {
        spanAnimalJugador.innerHTML = inputPollet.id
        animalJugador = inputPollet.id
    }   else if (inputPorc.checked) {
        spanAnimalJugador.innerHTML = inputPorc.id
        animalJugador = inputPorc.id
    }   else { 
        alert("No has escollit cap animal, has d'escollir-ne un!")
    }

    extraureAtacs(animalJugador)
    seleccionarAnimalEnemic()
    
}

function extraureAtacs() {
    let atacs
    for ( let i = 0 ; i < animals.length ; i++ ) {
        if (animalJugador === animals[i].nom) {
            atacs = animals[i].atacs
        }
        
    }
    mostrarAtacs(atacs)
    console.log(animalJugador)
    
    
}

function mostrarAtacs(atacs) {
    atacs.forEach((atac) => {
        atacsAnimal = ` 
        <button id=${atac.id} class="boto-atac BAtac">${atac.nom}</button>
        `
        contAtacs.innerHTML += atacsAnimal
    })

    botoTerra = document.getElementById('boto-terra')
    botoAigua = document.getElementById('boto-aigua')
    botoFoc = document.getElementById('boto-foc')
    botons = document.querySelectorAll('.BAtac')
} 

function sequenciaAtac() {
    botons.forEach((boto) => {
        boto.addEventListener('click', (e) => {
            if (e.target.textContent === '🧱') {
                atacJugador.push('TERRA')
                console.log(atacJugador)
                boto.style.background = '#a52a2a'
                boto.disabled = true                
            }   else if (e.target.textContent === '☄️') {
                atacJugador.push('FOC')
                console.log(atacJugador)
                boto.style.background = '#a52a2a'
                boto.disabled = true                
            }   else {
                atacJugador.push('AIGUA')
                console.log(atacJugador)
                boto.style.background = '#a52a2a'
                boto.disabled = true                
            }
            atacAleatoriEnemic()
        })
    })


}

function seleccionarAnimalEnemic() { // Selecció animal enemic
    let animalAleatori = aleatori(0, animals.length -1)    
    
    spanAnimalEnemic.innerHTML = animals[animalAleatori].nom
    atacsAnimalEnemic = animals[animalAleatori].atacs
    sequenciaAtac()
    console.log(animals[animalAleatori].nom)
}


function atacAleatoriEnemic() { // Atac aleatori de l'animal enemic
    let atacAleatori = aleatori(0, atacsAnimalEnemic.length -1)

    if (atacsAnimalEnemic[atacAleatori].nom === '🧱') {
        atacEnemic.push('TERRA')
    }   else if (atacsAnimalEnemic[atacAleatori].nom === '💦') {
        atacEnemic.push('AIGUA')
    }   else {
        atacEnemic.push('FOC')
    }

    atacsAnimalEnemic.splice(atacAleatori, 1)
    
    console.log(atacEnemic)

    iniciarBatalla()
}

function iniciarBatalla() {
    if (atacJugador.length === 5) {
        combat()
    }
}

function indexAmbdosOponents(jugador, enemic) {
    indexAtacJugador = atacJugador[jugador] 
    indexAtacEnemic = atacEnemic[enemic]
}
      
function combat() { // Combinacions d'atacs i resultat del combat 
    // Terra guanya Aigua 
    // Aigua guanya Foc
    // Foc guanya Terra

    for (let index = 0; index < atacJugador.length; index++) {
        if(atacJugador[index] === atacEnemic[index]) {
            indexAmbdosOponents(index, index)
            crearMissatge("EMPAT")

        }   else if (atacJugador[index] === 'TERRA' && atacEnemic[index] === 'AIGUA') {
            indexAmbdosOponents(index, index)
            crearMissatge("HAS GUANYAT")
            victoriesJugador++
            spanVidesJugador.innerHTML = victoriesJugador
        }   else if (atacJugador[index] === 'AIGUA' && atacEnemic[index] === 'FOC') {
            indexAmbdosOponents(index, index)
            crearMissatge("HAS GUANYAT")
            victoriesJugador++
            spanVidesJugador.innerHTML = victoriesJugador
        }   else if (atacJugador[index] === 'FOC' && atacEnemic[index] === 'TERRA') {
            indexAmbdosOponents(index, index)
            crearMissatge("HAS GUANYAT")
            victoriesJugador++
            spanVidesJugador.innerHTML = victoriesJugador
        }else {
            indexAmbdosOponents(index, index)
            crearMissatge("HAS PERDUT")
            victoriesEnemic++
            spanVidesEnemic.innerHTML = victoriesEnemic
        }
        console.log(atacJugador[index])
        console.log(atacEnemic[index])
    }

    
    revisarVides() 
} 

function revisarVides() {
        if (victoriesJugador === victoriesEnemic) {
            crearMissatgeFinal("Heu empatat")
        } else if (victoriesJugador > victoriesEnemic) {
            crearMissatgeFinal("FELICITATS! Has guanyat : 😃 👏👏👏")
        } else {
            crearMissatgeFinal("OH! El teu animal ha mort: 😭")
        }
}

function crearMissatge(resultat) { //Inserim a HTML el resultat del combat


    let nouAtacJugador = document.createElement('p') 
    let nouAtacEnemic = document.createElement('p')

    sectionMissatges.innerHTML = resultat
    nouAtacJugador.innerHTML = indexAtacJugador
    nouAtacEnemic.innerHTML = indexAtacEnemic

    atacsDJugador.appendChild(nouAtacJugador)
    atacsDEnemic.appendChild(nouAtacEnemic)
}

function crearMissatgeFinal(resultatFinal) {
    
    
    sectionMissatges.innerHTML = resultatFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJoc(){
    location.reload()
}

function aleatori(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    alpaca.x = alpaca.x + alpaca.velocidadx
    alpaca.y = alpaca.y + alpaca.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackgroud,
        0,
        0,
        800,
        600
        )
    lienzo.drawImage(
        alpaca.mapaFoto,
        alpaca.x,
        alpaca.y,
        alpaca.ancho,
        alpaca.alto
    )
    
}

function moureDreta() {
    alpaca.velocidadx = 5
}

function moureEsquerra() {
    alpaca.velocidadx = -5
}

function moureAvall() {
    alpaca.velocidady = 5
}

function moureAmunt() {
    alpaca.velocidady = -5
}

function detenerMovimiento() {
    alpaca.velocidadx = 0
    alpaca.velocidady = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moureAmunt()
            break
        case 'ArrowDown':
            moureAvall()
            break
        case 'ArrowLeft':
            moureEsquerra()
            break
        case 'ArrowRight':
            moureDreta()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 600
    mapa.height = 450

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

window.addEventListener('load', iniciarJoc)
