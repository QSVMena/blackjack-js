  
  
  export const pedirCarta = (deckCartas) => {

    let deck = deckCartas

      if( deck.length ===0 ){ // es una funcion que me permite evaluar que si no hay cartas no se ejecute la siguiente funcion

          throw 'No hay cartas en el lenght';
      }

      return deck.pop();

  }