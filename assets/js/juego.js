let deck = [];

const tipos = ['C','D','H','S']

const especiales = ['A','J','Q','K'];

let puntosJugador=0,
    puntosComputadora=0;

const puntosHtml= document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputador = document.querySelector('#computadora-cartas');

//reference html
const btnPedir= document.querySelector('#btnPedir');

const crearDeck = () => {
    
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipos){
            deck.push(i + tipo)
      }  
    }
    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp+ tipo)
        }
    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();

const tomarCarta = () => {
    if (deck.length === 0) {
        console.error('no hay cartas');
        
    }
    const carta = deck.pop();

    // console.log(deck)
     //console.log(carta)
    return carta;
}

//tomarCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
        
}

//turno pc
const turnoComputadora= (puntosMinimos)=>{

    do{
        const carta=tomarCarta();
        puntosComputadora = puntosComputadora+valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;
 
        //apeend 
        //<img class="carta" src="assets/cartas/2C.png" alt="">
        const imgCarta=document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputador.append(imgCarta);

        if(puntosMinimos > 21){
            break
        }
    } 
    while(( puntosComputadora<puntosMinimos) && (puntosMinimos <=21 )  );
}



// const valor = valorCarta(tomarCarta());
// console.log({valor})

//Eventos
btnPedir.addEventListener('click',() =>{
       const carta=tomarCarta();
       puntosJugador = puntosJugador+valorCarta(carta);
       puntosHtml[0].innerText = puntosJugador;

       //apeend 
       //<img class="carta" src="assets/cartas/2C.png" alt="">
       const imgCarta=document.createElement('img');
       imgCarta.src=`assets/cartas/${carta}.png`;
       imgCarta.classList.add('carta');
       divCartasJugador.append(imgCarta);
       
       if(puntosJugador > 21){
           console.log('Perdiste')
           btnPedir.disabled=true;
           turnoComputadora(puntosJugador);    
       }
       else if(puntosJugador ===21){
        console.log('21,genial ganaste!');
        btnPedir.disabled=true;
        turnoComputadora(puntosJugador); 
       }    
    });

 