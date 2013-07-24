var lettersLower = [];
var lettersUpper = [];
var numbers = [];
var shapes = [];
var words = [];

var display = [];

var currentPos,currentArrayNumm,currentArray,mode,menuBarHeight;
var canvas,context,windowHeight,windowWidth,lastItem,baseFontHeight,fontHeight,soundEnabled;
var singleLetter,shrinkToFit;

$(document).ready(function() {

	init();
	newItem();

	// Clicks - just get next item
	$("#canvas").click(mouseEventHandler);

	// Add listener for keyboard events
	$("#canvas").on('keyup',keyboardEventHandler);

});

function init() {
	setupCanvas();
	setupInitialMode();
	
	drawMenuBar();
	buildItems();
}

function setupCanvas() {
	windowHeight = window.innerHeight * 0.970;
	windowWidth = window.innerWidth * 0.975;

	// Adjust font height based on window height 
	baseFontHeight = "500";
	fontHeight = baseFontHeight;

	canvas = document.getElementById("canvas");

	// Now adjust canvas
	$("#canvas").attr("height",windowHeight);
	$("#canvas").attr("width",windowWidth);
	$("#canvas").focus();

	context = canvas.getContext("2d");
	context.font = fontHeight + "px bold helvetica";
}

function drawMenuBar() {
	context.beginPath();
	menuBarHeight = Math.floor(canvas.height * 0.05);
	context.rect(0, 0, canvas.width, menuBarHeight);
	setRandomColor();
	context.fill();

    // Menu bar will have toggles for:
    // ABC, Numbers, Shapes, Sound, Background music
    var menuItems1 = ["ABC","123","Shapes"];
    var menuItems2 = ["Sound","Bkg"];
    var itemSpacing = 20;
    var it;

    // Need to take into account original height, reset back to original when done
    context.font = "20px bold helvetica";
    context.fillStyle= 'rgb(0,0,0)';

    var x = itemSpacing;
    // Gameplay items on left
    for (var i = 0; i < menuItems1.length; i++) {
    	context.fillText(menuItems1[i],x,20);
    	x += context.measureText(menuItems1[i]).width + itemSpacing;
    }
    // Toggles on right
    x = 0;
    for (i = 0; i < menuItems2.length; i++) {
    	it = menuItems2[i];
    	context.measureText(it).width;

    	//context.fillText(it,(canvas.width - x),20);
    	x += context.measureText(menuItems2[i]).width + itemSpacing;

    	context.fillText(it,(canvas.width - x),20);
    }

    // reset
    context.font = fontHeight + "px bold helvetica";
}

function buildItems() {
	buildLettersUpper();
	buildLettersLower();
	buildNumbers();
	buildShapes();
	buildWords();
}

function buildLettersUpper() {
	// Build upper-case
	var s = 65;
	for (var i = 0; i < 26; i++) {
		lettersUpper[i] = String.fromCharCode(s+i); 
	}
}

function buildLettersLower() {
	// Build lower-case
	var s = 97;
	for (var i = 0; i < 26; i++) {
		lettersLower[i] = String.fromCharCode(s+i);
	}
}

function buildNumbers() {
	for (var i = 0; i < 20; i++) {
		numbers[i] = i+1;
	}
}

function buildShapes() {
	//shapes = ["circle","square","rectangle","triangle","diamond","star"];
	shapes = ["circle","square","rectangle","triangle","diamond","trapezoid"];
}

function buildWords() {
	words = [
	"Mommy","Daddy","Lukas","Diego","Kiwi",
	"Nonno","Gramma","Grammy","Grampy",
	"Apple","Ball","Cat","Dog","Elephant","F","Giraffe","Hippo","Ice","Juice","Kiwi","Lion","Monkey",
	"Nuts","Orange","Pancake","Queen","Rabbit","S","T","Umbrella","Violin","Walrus","Xylophone","Yellow","Zebra"];
}

function setupInitialMode() {
	if (1) {
		mode = "sequential";

		singleLetter = true;
		shrinkToFit = true;

		currentPos = -1;
		currentArrayNum = 0;
		currentArray = lettersUpper;
	}
	else {
		mode = "random";
	}

	soundEnabled = false;
}

//----------------------------------------------------------------------------------------------------
// Drawing-related
//----------------------------------------------------------------------------------------------------
function newItem() {
	clearCanvas();

	var num;
	var item;
	var tmp;

	if (mode === "random") {
		tmp = nextRandomItem();
	}
	else {
		tmp = nextSeqItem();
	}
	num = tmp[0];
	item = tmp[1];

	// Now draw	
	if(num === 3) {
		drawShape(item);
	}
	else {
		drawText(item);
	} 
	//
	if (soundEnabled) {
		playSound(item);
	}
}

function nextSeqItem() {
	// Get item
	var item;
	// TODO: for now just do upper letters

	var returnVal = [currentArrayNum,currentArray[currentPos]];

	// Adjust counters, arrays
	currentPos++;
	if (currentPos == currentArray.length) {
		currentPos = 0;
		currentArrayNum++;
		switch (currentArrayNum) {
			case 1: currentArray = lettersLower;
			break;
			case 2: currentArray = numbers;
			break;
			case 3: currentArray = shapes;
			break;
			case 4: currentArray = lettersUpper;
			currentArrayNum = 0;
			break;
		}
	}
//	return returnVal;
return [currentArrayNum,currentArray[currentPos]];
}

function nextRandomItem() {
	//clearCanvas();
	
	var sz = 4;
	var choices = [lettersUpper,lettersLower,numbers,shapes,words];
	var num = random(4);
	//Math.floor(Math.random() * 4);
	var item = getRandomItem(choices[num]);
	return [num,item];
}

function getRandomItem(items) {
	// items = array
	var pos = random(items.length);
	//Math.floor(Math.random() * items.length);
	return(items[pos]);
}

function drawShape(item) {
	console.log(item);

	context.beginPath();

	switch(item) {
		case "rectangle": drawRectangle();
		break;
		case "circle": drawCircle();
		break;
		case "square": drawSquare();
		break;
		case "diamond": drawDiamond();
		break;
		case "triangle": drawTriangle();
		break;
		case "star": drawStar();
		break;
		case "trapezoid": drawTrapezoid();
		break;
		default: drawCircle();
		break;
	}
	drawIt();
}

function drawIt() {
    setRandomColor();
    
    context.fill();
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.stroke();

}

function drawRectangle() {
	// TODO - center this
    context.rect(188, 50, 500, 300);
}

function drawCircle() {
  	var radius = 200;

	context.arc(windowWidth/2, windowHeight/2, radius, 0, 2 * Math.PI, false);
}

function drawSquare() {
    // TODO - center this
    context.rect(188, 50, 300, 300);
}

function drawDiamond() {
  	context.moveTo(210,100);
  	context.lineTo(410,400);
  	context.lineTo(210,700);
  	context.lineTo(10,400);
  	context.lineTo(210,105);
}

function drawTriangle() {
	context.moveTo(210,100);
  	context.lineTo(410,400);
  	context.lineTo(10,400);
  	context.lineTo(210,105);
}

function drawTrapezoid() {
  	context.moveTo(210,200);
  	context.lineTo(510,200);
  	context.lineTo(710,450);
  	context.lineTo(10,450);
  	context.lineTo(210,200);

}

function drawStar() {

}

function drawText(item) {
  	setRandomColor();
  	var xPos,yPos;
  	var w = context.measureText(item).width;
  	var h = fontHeight;
  	xPos = (windowWidth/2) - (w/2);
  	yPos = (windowHeight/2) + (h/3);

  	if (w > windowWidth) {
  		if (shrinkToFit) {
  			// Adjust font size based on how much to print.  This isn't perfect yet
  			fontHeight = Math.floor(fontHeight - (fontHeight * (w - windowWidth)/windowWidth) - 50);
			context.font = fontHeight + "px bold helvetica";
  		}
  	}

  	context.fillText(item,xPos,yPos);
}

function drawDisplayString() {
	setRandomColor();
  	

  	var xPos,yPos;
  	var w = context.measureText(item).width;
  	var h = fontHeight;
  	xPos = (windowWidth/2) - (w/2);
  	yPos = (windowHeight/2) + (h/3);

  	context.fillText(item,xPos,yPos);	
}

//----------------------------------------------------------------------------------------------------
// General canvas-related, keyboard and mouse functions
//----------------------------------------------------------------------------------------------------
function clearCanvas() {
	// TODO: This will eventually have a top bar - don't clear this
	//       (take height into account)
	context.clearRect(0, menuBarHeight, canvas.width, (canvas.height - menuBarHeight));
}

function clearDisplayString() {
	display = [];
	context.font = baseFontHeight + "px bold helvetica";
}

function random(max) {
	// returns random number 0 .. max - 1
	return Math.floor(Math.random() * max);
}
function setRandomColor() {
	var r = random(256);
	var g = random(256);
	var b = random(256);
	var str = "rgb("+r+","+g+","+b+")";
	context.fillStyle = str;
}

function keyboardEventHandler(e) {
	var key = e.keyCode;
	var shift = e.shiftKey;
	var letter = String.fromCharCode(key);
	var disp = false;

	// Clear
	if (key == 32) {
		clearCanvas();
		clearDisplayString();
	}

	// Numbers
	if (key >=48 && key <=57) { 
		currentArray = numbers;
		currentPos = key - 48;
		letter = currentPos;
		disp = "true";
	}
	// Letters
	else {
		if (key >= 65 && key <=91) {
			currentPos = key - 65;
			if (!shift) {
				letter = letter.toLowerCase();
				currentArray = lettersLower;
			}
			else {
				currentArray = lettersUpper;
			}
		disp = "true";
		}
	} // end else

	// Check if we have something to display
	if (disp === "true") {
		if (singleLetter === "true") {
			clearCanvas();
			drawText(letter);
		}
		else {
			display.push(letter);

			var displayString = "";
			//
			// When to reset?
			for (var i =0; i < display.length; i++) {
				displayString += display[i];
			}

			clearCanvas();
			drawText(displayString);
		}
	}
} 

function mouseEventHandler(e) {
	// Check if user clicked in the menu region
	if (e.clientY < menuBarHeight) {
		handleMenuBarClick(e.clientY);
	} 
	else {
		newItem();
	}
}

function handleMenuBarClick(y) {

}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

//----------------------------------------------------------------------------------------------------
// Toggles
//----------------------------------------------------------------------------------------------------