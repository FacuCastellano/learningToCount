//<script src="color-checker.js" charset="utf-8"></script> /*importo la API de validacion de contraste.*/
console.log("------------")
//console.log(checkColors("ffffff", "000000"));
console.log("------------")

/* creo las variables de opcione q van a ir variando cuando se clikee el valor correcto.*/
let option1; 
let option2;
let option3;
let option4;

/*calculo la primera vez del proximo numero*/ 
let ultimoNumeroStr = Number(document.body.firstElementChild.lastElementChild.textContent);
let proxNumero = ultimoNumeroStr + 1;
let arrOptions = [proxNumero];
/*creo una funcion para que me de un numero entre cierto rango(max and min, ambos estan incluidos), sin repetir los numeros que ya salieron */
function getNewRandonNumber(min,max,previousNumbers) {
  while (true) {  
    let num = Math.floor(Math.random()*(max-min+1) + min);
      if (!(previousNumbers.includes(num))) {
				return num
    }
  }
}
/*Creo los numeros opcionales a elegir, siempre queda el numero correcto primero, por lo que tengo que mezclar el array*/
function crearOpciones(){
	for (let i = 0; i <= 2; i++) {
		let optNum = getNewRandonNumber(ultimoNumeroStr-5,ultimoNumeroStr+5,arrOptions);
		arrOptions.push(optNum)
	}
}

/*creo una funcion para mezclar un arreglo, retorna un arreglo nuevo con los mismos valores q el arreglo original pero en orden aleatorio.*/ 
function mezclarArr(Arr){
  const indexNewArr = []
  const newArr = []
  for (let i = 0; i < Arr.length ; i++) {
    let index = getNewRandonNumber(0,Arr.length-1,indexNewArr);
	  indexNewArr.push(index)
    newArr.push(Arr[index])
  } return newArr
}
/*creo la funcion para crear un color random*/
function randomColor() {
	const HexRed = Math.floor(Math.random() * 256).toString(16);
	const HexGreen = Math.floor(Math.random() * 256).toString(16);
	const HexBlue = Math.floor(Math.random() * 256).toString(16);
	console.log('#'+HexRed+HexGreen+HexBlue)
	return '#'+HexRed+HexGreen+HexBlue
	
}

/*creo la funcion para cargar las opciones mezcladas*/
function cargarOpciones(){
	option1 = document.querySelector(".op1")
	option1.textContent = arrOptions[0]
	option1.style.background = randomColor()
	option1.style.color = randomColor()

	option2 = document.querySelector(".op2")
	option2.textContent = arrOptions[1]
	option2.style.background = randomColor()
	option2.style.color = randomColor()

	option3 = document.querySelector(".op3")
	option3.textContent = arrOptions[2]
	option3.style.background = randomColor()
	option3.style.color = randomColor()

	option4 = document.querySelector(".op4")
	option4.textContent = arrOptions[3]
	option4.style.background = randomColor()
	option4.style.color = randomColor()
}

	



/*creo las opciones la primera vez*/ 
crearOpciones()

/*mezclo el arreglo con las opciones de numeros, para que no se siempre el primer numero el correcto.*/ 
arrOptions = mezclarArr(arrOptions)

cargarOpciones()

/*Ahora tengo que agregar la ultimo numero a la lista.*/
/*primero defino la funcion y despues se la agrego a los elementos que corresponde.*/ 
const textMot = document.getElementById('text-container') /*cuando lo obtengo por ID si tengo el elemento, no un array, por eso lo uso directamente.*/

function elementoClikeado(event) {
	const numClicked=Number(event.target.textContent)
	if(numClicked === proxNumero){
		console.log("correcto")
		const numAgregar = event.target.cloneNode()
		numAgregar.setAttribute("class", "block")
		numAgregar.textContent = proxNumero.toString()
		const container = document.getElementsByClassName("container")[0] /*Muy importante poner el [0], para referirnos al objeto del DOM, sino estamos accediendo a la lista de objetos del dom.. y no al objeto en si mismo.*/ 
		container.appendChild(numAgregar)
		ultimoNumeroStr = Number(document.body.firstElementChild.lastElementChild.textContent);
		proxNumero = ultimoNumeroStr + 1;
		arrOptions = [proxNumero];
		crearOpciones()
		arrOptions = mezclarArr(arrOptions)
		cargarOpciones()
		textMot.textContent = "Muy Bien! Sigue así!"
	}else {
		textMot.textContent = "Uups!  Probemos de nuevo."
	}


}
	 


optionList = document.querySelectorAll('.option')

console.log(optionList)
for(i=0; i<optionList.length; i++){
	optionList[i].addEventListener("click", elementoClikeado) 
}






