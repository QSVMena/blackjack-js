import _ from 'underscore';
import {crearDeck,pedirCarta,valorCarta} from './usecases/index'

//Patron Modulo : protege mi codigo  fuente


  let   deck       = [];
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J', 'Q', 'K'];

  let puntosJugadores = [];

  //referencias del HTML

  const btnPedir              = document.querySelector('#btnPedir'),
        btnDetener            = document.querySelector('#btnDetener'),
        btnNuevo              = document.querySelector('#btnNuevo'),
        cantidad              = document.querySelectorAll('small');

  const divCartasJugadores    = document.querySelectorAll('.divCartas');

//esta funcion inicializa el juego
  const inicializarJuego = ( numJugadores = 2 ) => {
      deck = crearDeck(tipos, especiales);

      puntosJugadores = [];
      for (let i = 0; i < numJugadores; i++){
          puntosJugadores.push(0);
      }

      cantidad.forEach(elem => elem.innerText = 0);
      divCartasJugadores.forEach (elem => elem.innerHTML = '');
     
      btnDetener.disabled = false;
      btnPedir.disabled   = false;
  }

  //esta funcion me permite tomar una carta

  //pedirCarta();

  // const valorCarta = ( carta ) => {
  
  //     const valor = carta.substring(0,carta.length - 1);
  //     let puntos = 0;
  
      // if ( isNaN ( valor ) ){

      //     console.log( 'No es un numero' );

      //     puntos = ( valor === 'A' ) ? 11 : 10;

      // } else {
      //     console.log( 'Es un numero' );
      //     puntos = valor * 1;
      // }

  //     console.log(puntos);

  // }

  const acumularPuntos = ( carta, turno ) => {

      puntosJugadores[ turno ] = puntosJugadores[turno] + valorCarta(carta);
      cantidad[ turno ].innerText = puntosJugadores[ turno ];
      return puntosJugadores[turno];

  }

  const crearCarta = (carta, turno) => {

      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      imgCarta.classList.add('carta'); //para ajustar el tamano se le agrego la clase cartas que es del css
      divCartasJugadores[turno].append( imgCarta );

  }

    const determinarGanador = () => {

      const [puntosMinimos, puntosComputadora] = puntosJugadores;

      setTimeout(() =>{

          if( puntosComputadora === puntosMinimos){

              alert('Nadie Gana');
          }else if( puntosMinimos >21 ){
              alert('PERDISTES!');
          }else if(puntosComputadora > 21){
              alert ('YOU WIN!!');
          } else {
              alert('computadora gana!');
          }

      }, 50);
  }
  
    const turnoComputadora = ( puntosMinimos)=>{

      let puntosComputadora = 0;
      
      do {

          const carta = pedirCarta(deck);
          puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1);
          crearCarta(carta, puntosJugadores.length - 1)
          
      }while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

      determinarGanador();
      
  }


  //Eventos

  btnPedir.addEventListener('click', () => {

      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos( carta, 0 );
      crearCarta(carta, 0);


      if( puntosJugador > 21 ){

          console.warn('You Lose');
          btnPedir.disabled   = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador, deck);

      }else if ( puntosJugador === 21 ){
          console.warn('YOU WIN!!');
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador, deck);
      }


  })

  btnDetener.addEventListener('click', () => {

  btnDetener.disabled = true;
  btnPedir.disabled   = true;

  turnoComputadora(puntosJugadores[0], deck);

  })

  btnNuevo.addEventListener('click',()=>{

      inicializarJuego();

  })

  // return {
  //     nuevoJuego: inicializarJuego
  // };







