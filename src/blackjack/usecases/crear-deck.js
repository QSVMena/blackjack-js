  import _ from 'underscore';
  
  
  //Funcion que crea un nuevo deck

  /**
   * 
   * @param {Array <string>} tiposDeCarta 
   * @param {Array <string>} tiposEspeciales 
   * @returns {Array} regresa un nuevio arreglo de cartas
   */

  export const crearDeck = (tiposDeCarta, tiposEspeciales) => {


    //   if(!tiposDeCarta) throw new Error('TiposDeCarta es Obligatorio');
    //   if(!tiposDeCarta.length > 0) throw new Error('Tiene que ser un arreglo de string');
      if (!tiposDeCarta || tiposDeCarta === 0) throw new Error ('TiposDeCarta es obligatorio como un arreglo de String')
      
     let deck=[];

      for ( let i =2; i <= 10 ; i++ ) {

          for( let tipo of tiposDeCarta ){  

          deck.push(i + tipo)
          }  
      }

      // se hace otro ciclo for porque las cartas de especieles se combinan con las de tipos

      for (let tipo of tiposDeCarta){

          for ( let esp of tiposEspeciales ){

              deck.push( esp + tipo )

          }

      }
      
      return _.shuffle( deck );
  }
