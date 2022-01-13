class Fraccion { // Retorna un Objeto con propiedades numerador y denominador, con su minima expresión
  constructor(numerador,denominador = 1) {
    this.numerador = numerador;
    this.denominador = denominador;
    this.reducir();
  }

  sumar(fraccion){//El argumento debe ser otra objeto Fracción, Retorna una nueva Fracción
    let resultado;
    if(this.denominador == fraccion.denominador){
      resultado = new Fraccion((this.numerador + fraccion.numerador),this.denominador);
    }else {
      resultado = new Fraccion(((this.numerador * fraccion.denominador) + (fraccion.numerador * this.denominador) ),(this.denominador*fraccion.denominador));
      //Representa: 3/4 + 2/5 = (3*5 + 4*2) / (4*5) obviamente los numeros son de ejemplo
    }
    resultado.reducir();//ACCIÓN NECESARIA PARA FORZAR A LA Nueva Fraccion QUE SE REDUZCA
    return resultado;
  }

  restar(fraccion){//El argumento debe ser otra objeto Fracción, Retorna una nueva Fracción
    let resultado;
    if(this.denominador == fraccion.denominador){
      resultado = new Fraccion((this.numerador - fraccion.numerador),this.denominador);
    }else {
      resultado = new Fraccion(((this.numerador * fraccion.denominador) - (fraccion.numerador * this.denominador)),(this.denominador*fraccion.denominador));
      //Representa: 3/4 - 2/5 = (3*5 - 4*2) / (4*5) obviamente los numeros son de ejemplo
    }
    resultado.reducir();//ACCIÓN NECESARIA PARA FORZAR A LA Nueva Fraccion QUE SE REDUZCA
    return resultado;
  }

  multiplicar(fraccion){//El argumento debe ser otra objeto Fracción, Retorna una nueva Fracción
    //Representa: 3/4 / 2/5 = 3*5/4*2 obviamente los numeros son de ejemplo
    let resultado = new Fraccion((this.numerador * fraccion.numerador), (this.denominador * fraccion.denominador));
    resultado.reducir(); //ACCIÓN NECESARIA PARA FORZAR A LA Nueva Fraccion QUE SE REDUZCA
    return resultado;
  }

  dividir(fraccion){//El argumento debe ser otra objeto Fracción, Retorna una nueva Fracción
    //Representa: 3/4 / 2/5 = 3*5/4*2 obviamente los numeros son de ejemplo
    let resultado = new Fraccion((this.numerador * fraccion.denominador), (this.denominador * fraccion.numerador));
    resultado.reducir(); //ACCIÓN NECESARIA PARA FORZAR A LA Nueva Fraccion QUE SE REDUZCA
    return resultado;
  }

  reducir(){// Modifica los valores de la fracción, Retorna Nada
    let rangoMax = (this.numerador > this.denominador) ? this.numerador : this.denominador;
    for(let i = 2; i<= rangoMax; i++){
      if((this.numerador % i == 0) && (this.denominador % i == 0)){
        this.numerador/=i;
        this.denominador/=i;
      }
    }
  }

  toDecimal(){
    return (this.numerador/this.denominador);
  }

  toString(){ // Regresa texto para uso en HTML
    if (this.denominador == 1) {
      return this.numerador.toString();
    }else {
      return `<sup>${this.numerador}</sup>&frasl;<sub>${this.denominador}</sub>`;
    }
  }

  static toFraccion(numTexto){// Regresa un objeto Fraccion
    /* Analiza el texto
    y si es de la forma x/y número fraccionario devuelve new Fraccion(x,y)
    o si es de la forma x número normal devuelve new Fraccion(x);
    */
    if(/\//.test(numTexto)){//Analiza a elemento y si tiene un "/" quiere decir que es una fracción y lo separa.
      numTexto = numTexto.split("/");
      return new Fraccion(Number(numTexto[0]),Number(numTexto[1]));
    }else {//Si no, se agrega normal como un número entero
      return new Fraccion(Number(numTexto));
    }
  }

}

class Matriz{
  constructor(renglones,columnas,manual = true){//Manual quiere decir que el constructor te pedira los valores
    this._renglones = renglones;
    this._columnas = columnas;
    this.matriz = [];

    if(manual){//Crea la matriz de forma manual preguntando el valor de cada elemento.
      for(let renglon = 0; renglon < renglones; renglon++){
        let vectorRenglon = [];
        // Almacena el valor de cada elemento de un renglon
        for (let columna = 0; columna < columnas; columna++) {
          let elemento = prompt("Ingresa el valor del elemento en el renglon:" + (renglon+1) + " columna:" + (columna+1));
          vectorRenglon.push(Fraccion.toFraccion(elemento));
        }
        // Guarda el renglon en la matriz
        this.matriz.push(vectorRenglon);
      }
    }else {//Crea la matriz de forma automática con elemetos ceros.
      for(let renglon = 0; renglon < renglones; renglon++){
        let vectorRenglon = [];
        // Almacena el valor de cada elemento de un renglon
        for (let columna = 0; columna < columnas; columna++) {
          vectorRenglon.push(new Fraccion(1));
        }
        // Guarda el renglon en la matriz
        this.matriz.push(vectorRenglon);
      }
    }

  }

  porEscalar(escalar){ //Retorna una nueva Matriz escalada.
    // escalar debe ser Number o Fraccion.
    let matrizEscalada = new Matriz(this._renglones,this._columnas,false);
    if(typeof escalar == "number"){escalar = new Fraccion(escalar)};

    matrizEscalada.matriz = this.matriz.map((renglon) => {
      let newRenglon = renglon.map((elemento) => elemento.multiplicar(escalar));
      return newRenglon;
    });

    return matrizEscalada;
  }

  mas(matriz){//Retorna una nueva Matriz sumada con el argumento que debe ser también un objeto Matriz
    let matrizSumada = new Matriz(this._renglones,this._columnas,false);

    for (let renglon = 0; renglon < matrizSumada._renglones; renglon++){
      for (let columna = 0; columna < matrizSumada._columnas; columna++) {
        matrizSumada.matriz[renglon][columna] = this.matriz[renglon][columna].sumar(matriz.matriz[renglon][columna]);
      }
    }

    return matrizSumada;
  }

  menos(matriz){//Retorna una nueva Matriz restada con el argumento que debe ser también un objeto Matriz
    let matrizRestada = new Matriz(this._renglones,this._columnas,false);

    for (let renglon = 0; renglon < matrizRestada._renglones; renglon++){
      for (let columna = 0; columna < matrizRestada._columnas; columna++) {
        matrizRestada.matriz[renglon][columna] = this.matriz[renglon][columna].restar(matriz.matriz[renglon][columna]);
      }
    }
    return matrizRestada;
  }

  sumaRenglones(sustituirR,primerR,segundoR,escalar1erR = 1,escalar2doR = 1){//Retorna una nueva Matriz.
    //!!Los escalares deben ser Number o Fraccion!!
    /*El primer parametro es el renglon a cambiar,
      el segundo parámetro es el primer renglon implicado,
      el tercer parámetro es el segundo renglon implicado,
      el cuarto y quinto parámetro son los escalares de los renglones si es que los hay
        para replicar operaciones como R2 -> 2R3 + 2R; el escalar sería 2
                    u operaciones como R2 -> R3 + 2R2; el escalar seria 2
    */
    let matrizModificada = this.porEscalar(1); // Copia la Matriz Original
    if(typeof escalar1erR == "number"){escalar1erR = new Fraccion(escalar1erR)};
    if(typeof escalar2doR == "number"){escalar2doR = new Fraccion(escalar2doR)};

    for(let columna = 0; columna < matrizModificada._columnas; columna++){
      matrizModificada.matriz[sustituirR-1][columna] = ((matrizModificada.matriz[primerR-1][columna]).multiplicar(escalar1erR)).sumar((matrizModificada.matriz[segundoR-1][columna]).multiplicar(escalar2doR));
    }

    return matrizModificada;
  }

  restaRenglones(sustituirEnR,primerR,segundoR,escalar1erR = 1,escalar2doR = 1){//Retorna una nueva Matriz.
    //!!Los escalares deben ser Number o Fraccion!!
    /*El primer parametro es el renglon a cambiar,
      el segundo parámetro es el primer renglon implicado,
      el tercer parámetro es el segundo renglon implicado,
      el cuarto y quinto parámetro son los escalares de los renglones si es que los hay
        para replicar operaciones como R2 -> 2R3 - 2R; el escalar sería 2
                    u operaciones como R2 -> R3 - 2R2; el escalar seria 2 o ambas
    */
    let matrizModificada = this.porEscalar(1); // Copia la Matriz Original
    if(typeof escalar1erR == "number"){escalar1erR = new Fraccion(escalar1erR)};
    if(typeof escalar2doR == "number"){escalar2doR = new Fraccion(escalar2doR)};

    for(let columna = 0; columna < matrizModificada._columnas; columna++){
      matrizModificada.matriz[sustituirEnR-1][columna] = ((matrizModificada.matriz[primerR-1][columna].multiplicar(escalar1erR)).restar(matrizModificada.matriz[segundoR-1][columna].multiplicar(escalar2doR)));
    }

    return matrizModificada;

  }

  escalarRenglon(sustituirEnR,escalar){//Retorna una nueva Matriz.
      //!! escalar deben ser Number o Fraccion!!
      // Para replicar operaciones como R2 -> 2R ó R2 -> (1/2)R; el escalar sería 2 ó 1/2 en este ejemplo
      let matrizModificada = this.porEscalar(1); // Copia la Matriz Original
      if(typeof escalar == "number"){escalar = new Fraccion(escalar)};

      let renglonASustituir = matrizModificada.matriz[sustituirEnR-1];

      for(let elemento = 0; elemento < renglonASustituir.length; elemento++){
        renglonASustituir[elemento] = renglonASustituir[elemento].multiplicar(escalar);
      }

      return matrizModificada;
  }

  intercambiarRenglon(primerR,segundoR){//Retorna una nueva Matriz.
    //Para replicar operaciones como R1 <-> R2
    let matrizModificada = this.porEscalar(1);//Copia la Matriz Original

    let renglonTemporal = matrizModificada.matriz[segundoR-1];

    matrizModificada.matriz[segundoR-1] = matrizModificada.matriz[primerR-1];
    matrizModificada.matriz[primerR-1] = renglonTemporal;

    return matrizModificada;
  }

}

function genera_matriz(manual = true, matriz = []) {//Manual quiere decir que la función te pedira los valores si es true, sino lo hará en automático con la matiz que se le pase como argumento
  let divMatrices = document.getElementsByTagName("div")[1];
  let matrizContenedor = document.createElement("table");
  let tbody = document.createElement("tbody");

  if(manual){
    matriz = new Matriz(Number(prompt("Ingresa el número de renglones")),Number(prompt("Ingresa el número de columas")),manual);
  }

  MatricesCreadas.push(matriz);//Para poder operar en ella despues con genera_operacion_Renglones;

  //Constructor del contenedor.
  for(let renglones = 0; renglones < matriz._renglones; renglones++){
    let renglon = document.createElement("tr");

    for(let partes = 0; partes < 2; partes++){ //Partes de la estructura de la matriz
      let llave = document.createElement("td");

      if (partes == 0) {
        llave.setAttribute("class","LlaveIzd");
        if(renglones == 0){
          llave.setAttribute("id","LlaveIzqSup");
        }else if (renglones == (matriz._renglones-1)) {
          llave.setAttribute("id", "LlaveIzqInf");
        }
        renglon.appendChild(llave);
        for(let columnas = 0; columnas < matriz._columnas; columnas++){ // Agrega los espacios para contener los valores de la matriz
          let contenedorElemento = document.createElement("td");
          if (columnas === ((matriz._columnas/2)-1)) {
            contenedorElemento.setAttribute("class","Separador");
          }
          renglon.appendChild(contenedorElemento);
        }
      } else {
        llave.setAttribute("class","LlaveDcha");

        if(renglones == 0){
          llave.setAttribute("id","LlaveDchaSup");
        }else if (renglones == (matriz._renglones-1)) {
          llave.setAttribute("id","LlaveDchaInf");
        }
        renglon.appendChild(llave);
      }

    }
    tbody.appendChild(renglon);
  }

  matrizContenedor.appendChild(tbody);
  let divMatriz = document.createElement("div");
  divMatriz.appendChild(matrizContenedor);
  divMatriz.setAttribute("class","Matriz");

  MatricesEstructuradas.push(divMatriz);

  divMatrices.appendChild(divMatriz);

  //Agregando los valores
  for(let renglones = 0; renglones < matriz._renglones; renglones++){
    for(let columnas = 1; columnas <= matriz._columnas; columnas++){
      MatricesEstructuradas[(MatricesEstructuradas.length-1)].children[0].children[0].children[renglones].children[columnas].innerHTML = (matriz.matriz[renglones][columnas-1].toString());
    }
  }

}


function genera_operacion_Renglones(){//Crea la operación y la nueva matriz.
  let matricesDiv = document.getElementById('Matrices');
  let operacion = prompt("¿Qué operacion desea realizar?\n1.Suma de renglones \n2.Resta de renglones \n3.Escalar por renglon \n4.Intercambiar renglones");
  let operacionDiv = document.createElement("div");
  operacionDiv.setAttribute("class","Operador");

  switch (operacion) {
    case "1":
      {
      let sustituirEnR = Number(prompt("Ingrese el renglon a sustituir"));
      let primerR = Number(prompt("Ingrese el primer renglon a sumar"));
      let escalar1erR = Fraccion.toFraccion(prompt("Ingrese su escalar"));
      let segundoR = Number(prompt("Ingrese el segundo renglon a sumar"));
      let escalar2doR = Fraccion.toFraccion(prompt("Ingrese su escalar"));

      let escalar1erR_Texto = `${(escalar1erR.toDecimal() == 1)? "" : escalar1erR }`;
      let escalar2doR_Texto = `${(escalar2doR.toDecimal() == 1)? "" : escalar2doR }`;

      let suma = document.createElement("p");
      suma.innerHTML = `R<sub>${sustituirEnR}</sub> &rarr; ${escalar1erR_Texto}R<sub>${primerR}</sub> + ${escalar2doR_Texto}R<sub>${segundoR}</sub>`;
      operacionDiv.appendChild(suma);
      matricesDiv.appendChild(operacionDiv);
      genera_matriz(false,MatricesCreadas[(MatricesCreadas.length-1)].sumaRenglones(sustituirEnR,primerR,segundoR,escalar1erR,escalar2doR));
      }
      break;
    case "2":
      {
      let sustituirEnR = Number(prompt("Ingrese el renglon a sustituir"));
      let primerR = Number(prompt("Ingrese el primer renglon a restar"));
      let escalar1erR = Fraccion.toFraccion(prompt("Ingrese su escalar"));
      let segundoR = Number(prompt("Ingrese el segundo renglon a restar"));
      let escalar2doR = Fraccion.toFraccion(prompt("Ingrese su escalar"));

      let escalar1erR_Texto = `${(escalar1erR.toDecimal() == 1)? "" : escalar1erR }`;
      let escalar2doR_Texto = `${(escalar2doR.toDecimal() == 1)? "" : escalar2doR }`

      let resta = document.createElement("p");
      resta.innerHTML = `R<sub>${sustituirEnR}</sub> &rarr; ${escalar1erR_Texto}R<sub>${primerR}</sub> - ${escalar2doR_Texto}R<sub>${segundoR}</sub>`;
      operacionDiv.appendChild(resta);
      matricesDiv.appendChild(operacionDiv);
      genera_matriz(false,MatricesCreadas[(MatricesCreadas.length-1)].restaRenglones(sustituirEnR,primerR,segundoR,escalar1erR,escalar2doR));
      }
      break;
    case "3":
      {
      let sustituirEnR = Number(prompt("Ingrese el renglon a escalar"));
      let escalar = Fraccion.toFraccion(prompt("Ingrese el escalar"));
      let escalado = document.createElement("p");

      let escalar_Texto = `${(escalar.toDecimal() == 1)?"":escalar}`;

      escalado.innerHTML = `R<sub>${sustituirEnR}</sub> &rarr; ${escalar_Texto}R<sub>${sustituirEnR}</sub>`;
      operacionDiv.appendChild(escalado);
      matricesDiv.appendChild(operacionDiv);
      genera_matriz(false,MatricesCreadas[(MatricesCreadas.length-1)].escalarRenglon(sustituirEnR,escalar));
      }
      break;
    case "4":
      {
      let primerR = Number(prompt("Ingrese el primer renglon a intercambiar"));
      let segundoR = Number(prompt("Ingrese el segundo renglon a intercambiar"));

      let intercambio = document.createElement("p");
      intercambio.innerHTML = `R<sub>${primerR}</sub> &harr; R<sub>${segundoR}</sub>`;
      operacionDiv.appendChild(intercambio);
      matricesDiv.appendChild(operacionDiv);
      genera_matriz(false,MatricesCreadas[(MatricesCreadas.length-1)].intercambiarRenglon(primerR,segundoR));
      }
      break;
    default:
      alert("Hubo un error");
      break;
  }
}

function genera_operacion_Matrices(){
  alert("EN CONSTRUCCIÓN");
}


const MatricesEstructuradas = [];
const MatricesCreadas = []; //Almacena las matrices creadas para poder operar en ellas despues con genera_operación;
