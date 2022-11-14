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


/*Creo una funcion que calcule la luminance de un color.*/

function luminance(r, g, b) {
	const a = [r, g, b].map(function (v) {
		v /= 255;
		return v <= 0.03928
			? v / 12.92
			: Math.pow( (v + 0.055) / 1.055, 2.4 );
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
/* creo una funcion que me de el contraste entre 2 colores, los colores tienen que ser pasado como un vector del sistema rgb*/
function contrastRatio(color1,color2){
	const L1 = luminance(color1[0], color1[1], color1[2])
	const L2 = luminance(color2[0], color2[1], color2[2])
	return L1 >= L2 ? ((L1+0.05)/(L2+0.05)) : ((L2+0.05)/(L1+0.05))
}


/*creo una funcion que me pase un vector de los valores de un color en RGB y que me lo pase la notacion rgb tengo q asignar en css.*/
function rgbNotation([r,g,b]) {
	return 'rgb('+r+','+g+','+b+')'
}



function randomColorsWithHightContrast(){
	let CR = 0
	while (true) {
		const color1 = [256,256,256].map(function(x){return Math.floor(Math.random()*x)})
		const color2 = [256,256,256].map(function(x){return Math.floor(Math.random()*x)})
		CR = contrastRatio(color1,color2)
		if (CR >= 7.5) {
			c1 = rgbNotation(color1)
			c2 = rgbNotation(color2)
			return [c1,c2]
		}
	}
}

/*creo la funcion para cargar las opciones mezcladas*/
function cargarOpciones(){
	let colorsOp1;
	let colorsOp2;
	let colorsOp3;
	let colorsOp4;

	option1 = document.querySelector(".op1")
	option1.textContent = arrOptions[0]
	colorsOp1 = randomColorsWithHightContrast()
	option1.style.background = colorsOp1[0]
	option1.style.color = colorsOp1[1]

	option2 = document.querySelector(".op2")
	option2.textContent = arrOptions[1]
	colorsOp2 = randomColorsWithHightContrast()
	option2.style.background = colorsOp2[0]
	option2.style.color = colorsOp2[1]

	option3 = document.querySelector(".op3")
	option3.textContent = arrOptions[2]
	colorsOp3 = randomColorsWithHightContrast()
	option3.style.background = colorsOp3[0]
	option3.style.color = colorsOp3[1]

	option4 = document.querySelector(".op4")
	option4.textContent = arrOptions[3]
	colorsOp4 = randomColorsWithHightContrast()
	option4.style.background = colorsOp4[0]
	option4.style.color = colorsOp4[1]
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






