var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")
var audioFail = new Audio('sounds/wrong.mp3');
var audioSuccess = new Audio('sounds/right.mp3');

init();

function init(){
	//mode buttons event listeners
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove(".selected");
		modeButtons[1].classList.remove(".selected");
		this.classList.add(".selected");
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		modeSwitch();
		})
	}
	for(var i = 0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if(clickedColor === pickedColor){
				audioSuccess.play();
				messageDisplay.textContent = "Correct"
				reset.textContent = "Play Again?";
				changeColors(clickedColor);
				resetColors(numSquares, clickedColor);
			}
			else{
				audioFail.play();
				this.style.backgroundColor = "#232323"
				messageDisplay.textContent = "Try Again"
			}
		});
	};

	modeSwitch();

	colorDisplay.textContent = pickedColor;
}

reset.addEventListener("click", function(){
	modeSwitch();
});

function modeSwitch(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetColors(numSquares, "#232323");
	reset.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}

}


function changeColors(color){
	//loop through all squares
	for(var i = 0; i < colors.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}

}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return(colors[random])
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())

	}
	//return that array
	return arr
}

function randomColor(){
	//pick a "rgb" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")"
}

function resetColors(num, color){
	h1.style.backgroundColor = color;
	if (num === 3) {
		modeButtons[0].style.backgroundColor = color;
		modeButtons[0].style.color = "white";
		modeButtons[1].style.backgroundColor = "white";
		modeButtons[1].style.color = "#232323";
	}
	else{
		modeButtons[1].style.backgroundColor = color;
		modeButtons[1].style.color = "white";
		modeButtons[0].style.backgroundColor = "white";
		modeButtons[0].style.color = "#232323";
	}
}