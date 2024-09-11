    (()=>{
        'use strict';
        let deck = [];

        const tipos = ['C','D','H','S'],
              especiales = ['A','J','Q','K'];

        let puntosJugadores = [];

        const divCartasJugadores = document.querySelectorAll('.divCartas'), 
              puntosHtml= document.querySelectorAll('small');
    
        const btnDetener =document.querySelector('#btnDetener'),
              btnNuevo =document.querySelector('#btnNuevo'),
              btnPedir= document.querySelector('#btnPedir');
             
        const inciaLizarJuego=(numJugadores=2)=>{
            
                    deck=crearDeck();
                    puntosJugadores=[];
                    for(let i=0; i<numJugadores; i++){
                        puntosJugadores.push(0);
                    }
                  puntosHtml.forEach(elem=>elem.innerText=0);
                  divCartasJugadores.forEach(elem=>elem.innerHTML='');
                  btnPedir.disabled = false;
                  btnDetener.disabled = false;

                }

        const crearDeck = () => {
                    deck =[];
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
                    return _.shuffle(deck);
                }
                
        const tomarCarta = () => {
                    if (deck.length === 0) {
                        console.error('no hay cartas');   
                    }
                    return deck.pop();
                }
                
         const valorCarta = (carta) => {
                
        const valor = carta.substring(0, carta.length - 1);
                    return (isNaN(valor)) ?
                        (valor === 'A') ? 11 : 10
                        : valor * 1;
            }
            //turno 0= jugador ultimo =pc
            const acumularPuntos = (carta,turno)=>{
                puntosJugadores[turno] =  puntosJugadores[turno] +valorCarta(carta);
                puntosHtml[turno].innerText = puntosJugadores[turno];
                return puntosJugadores[turno];
            }

            const crearCarta= (carta,turno)=>{
                const imgCarta=document.createElement('img');
                imgCarta.src=`assets/cartas/${carta}.png`;
                imgCarta.classList.add('carta');
                divCartasJugadores[turno].append(imgCarta);
            }

            const determinarGanador= ()=>{
                const [puntosMinimos ,puntosComputadora] = puntosJugadores;
                setTimeout(() =>{
                    if(puntosComputadora ===puntosMinimos){
                        alert('nadie gana(');
                    }else if(puntosMinimos>21){
                    alert('computadora gana');    
                    }else if(puntosComputadora>21){
                        alert('jugador gana');
                    }else{
                        alert('computadora gana');
                    }
                },100);
            }

        //turno pc
        const turnoComputadora= (puntosMinimos)=>{
            let puntosComputadora=0;
            do{
                const carta=tomarCarta();
                acumularPuntos(carta, puntosJugadores.length-1);
                crearCarta(carta,puntosJugadores.length-1);
                //apeend 
            } 
            while(( puntosComputadora<puntosMinimos) && (puntosMinimos <=21 ));
            determinarGanador();
           
        }

        //Eventos
        btnPedir.addEventListener('click',() =>{
            const carta=tomarCarta();
            const puntosJugador= acumularPuntos(carta, 0);
            crearCarta(carta,0);
                    //apeend 
                    if(puntosJugador > 21){
                        console.log('Perdiste')
                        btnPedir.disabled=true;
                        btnDetener.disabled = true;
                        turnoComputadora(puntosJugador);    
                    }
                    else if(puntosJugador ===21){
                    
                        alert('21,genial ganaste!');
                        btnPedir.disabled=true;
                        btnDetener.disabled = true;
                        turnoComputadora(puntosJugador); 
                    }    
                    });
                
            btnDetener.addEventListener('click',() =>{
                        btnPedir.disabled = true;
                        btnDetener.disabled = true;
                        turnoComputadora(puntosJugadores);
            });
        
            btnNuevo.addEventListener('click',() =>{
               
                inciaLizarJuego();
               
            });
    })();