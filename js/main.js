// Log the letters to the screen

function fancyLog(text) {
  var para = document.createElement("p");
  para.classList.add("float-left");
  para.classList.add("letterSpace");
	var content = document.createTextNode(text);
  para.appendChild(content);
  document.querySelector("#wrong").appendChild(content);
}

function fancyLog2(text, i) {
		var span = document.createElement("span");
		span.classList.add("bot_border");
		span.classList.add("color" + i)
		var content = document.createTextNode(text);
  		span.appendChild(content);
 	 	document.querySelector("#word").appendChild(span);
		
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//reset the screen

function reset() {
						$("#word").empty();
						getWord();
						$("#winner").html("");
						$("#wrong").html("");
						counter = 0;
						$(".wrapper").css("display", "block");
						man = 0;
						$(".man1").css("display", "none");
						$(".man2").css("display", "none");
						$(".man3").css("display", "none");
						$(".man4").css("display", "none");
						$(".man5").css("display", "none");
						$(".man6").css("display", "none");
						$(".man7").css("display", "none");
						gameWin = 0;
						letterArray = [];
						
}

var chosen = "word";

//get the word from the json file

function getWord() {

	// instantiate the variable up here to avoid scope problems

	// set up an ajax call to our "library"
	var ajaxCall = new XMLHttpRequest();

	// tell the ajax call what to do when it's done running (we do this before we actually run it)
	ajaxCall.onreadystatechange = function() { 
		if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {

		
		  word = JSON.parse(ajaxCall.responseText);

		  var chosen2 = word[Math.floor(Math.random() * 33) + 1  ];
		  	chosen = chosen2.word;


		  for (var i = 0; i < chosen.length; i++) {
    		fancyLog2(chosen.charAt(i), i);
    		//draw an underscore for character 
    		//wrap each letter in a span and give them diff classes 

		}



		

}
}
	
	ajaxCall.open("GET", "words.json", true);
	ajaxCall.send();

}

getWord();

//On submission of letter 

var counter = 0;
var man = 0;
var letterRight = true;
var subLetter = document.querySelector('#submission').value;
var gameWin = 0;
var letterArray = [];
var duplicate = 1;

function compare() {



var subLetter = document.querySelector('#submission').value;
subLetter = subLetter.toLowerCase();


console.log(letterArray);

//Check if letter is duplicate
for (i = 0; i <= letterArray.length; i++) {
	if (subLetter === letterArray[i]){
		duplicate = 0;
		break;
	}
	
	else {
		duplicate = 1;
	}
}
	
	if (duplicate === 0) {
		alert("You already used that letter!");
		document.querySelector('#submission').value = "";
	}
	
//Check if there is a letter	
	else if (subLetter === "") {
		alert("You did not put in a letter!");
	}
	
	else {
		 
//How many hangman items are displayed
counter ++;
//Loop through word with letter
for (var i = 0; i < chosen.length; i++) {
	    		if ( subLetter === chosen.charAt(i)) {
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
					letterRight = true;
					gameWin++;
					
					if (chosen.split(subLetter).length-1 > 1) {
							str = chosen.replaceAt(i, "2");
							letterRight = true;
							gameWin++;
							
							for (var i = 0; i < str.length; i++) {
								if ( subLetter === str.charAt(i)) {
								$(".color" + i).css( "transition", "all .5s");
								$(".color" + i).css( "color", "green");
								}
							}
					}
					
					console.log(gameWin);
					//Word is correct and player wins
					if (chosen.length === gameWin) {
					$("#winner").html("Congrats you won! It took you " + counter + " moves. Click here to play again!");
					$(".wrapper").css("display", "none");
					letterRight = true;
					break;
						}
							
					break;
					
					}
					
	    		
				//Check if word is correct
				else if (subLetter === chosen) {
					
					for (var i = 0; i < chosen.length; i++) {
					
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
					
					}
					$("#winner").html("Congrats you won! It took you " + counter + " moves. Click here to play again!");
					$(".wrapper").css("display", "none");
					letterRight = true;
					
					break;
				}

	    		else {
						letterRight = false;
						
							
							
						}

	    		
		}
						
					
							
//Add letter to wrong scoreboard
if (letterRight === false) {
						fancyLog(subLetter);
						man ++;
						console.log(letterArray);
						
						$(".man" + man).css("transition", "all .5s");
						$(".man" + man).css("display", "block");
						
						
						if (man === 7) {
							$("#winner").html("Sorry you lost! Click here to play again!");
							$(".wrapper").css("display", "none");
							
							for (var i = 0; i < chosen.length; i++) {
					
								$(".color" + i).css( "transition", "all .5s");
								$(".color" + i).css( "color", "green");
					
							}
}
}

document.querySelector('#submission').value = "";
letterArray.push(subLetter);
console.log(letterArray);

}
	}


/*
if (subLetter != "") {
//How many hangman items are displayed
counter ++;
//Loop through word with letter
for (var i = 0; i < chosen.length; i++) {
	    		if ( subLetter === chosen.charAt(i)) {
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
					letterRight = true;
					gameWin++;
					letterArray.push(subLetter);
					console.log(letterArray);
					
					if (chosen.split(subLetter).length-1 > 1) {
							str = chosen.replaceAt(i, "2");
							letterRight = true;
							gameWin++;
							
							for (var i = 0; i < str.length; i++) {
								if ( subLetter === str.charAt(i)) {
								$(".color" + i).css( "transition", "all .5s");
								$(".color" + i).css( "color", "green");
								}
							}
					}
					
					console.log(gameWin);
					//Get this working
					if (chosen.length === gameWin) {
					$("#winner").html("Congrats you won! It took you " + counter + " moves. Click here to play again!");
					$(".wrapper").css("display", "none");
					letterRight = true;
					break;
						}
							
					break;
					
					}
					
	    		
				//Check if word is correct
				else if (subLetter === chosen) {
					
					for (var i = 0; i < chosen.length; i++) {
					
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
					
					}
					$("#winner").html("Congrats you won! It took you " + counter + " moves. Click here to play again!");
					$(".wrapper").css("display", "none");
					letterRight = true;
					
					break;
				}

	    		else {
						letterRight = false;
						
						
							
							
						}
	    			
	    		
		}
						
					
							
//Add letter to wrong scoreboard
if (letterRight === false) {
						fancyLog(subLetter);
						man ++;
						$(".man" + man).css("display", "block");
						
						if (man === 7) {
							$("#winner").html("Sorry you lost! Click here to play again!");
							$(".wrapper").css("display", "none");
							
							for (var i = 0; i < chosen.length; i++) {
					
								$(".color" + i).css( "transition", "all .5s");
								$(".color" + i).css( "color", "green");
					
							}
}
}

document.querySelector('#submission').value = "";


}

else if (subLetter = letterArray) {
	alert("You already used that letter!")
}

else {
	alert("You did not put in a letter!")
}
}
*/
//Add Buttons

document.querySelector('#submit').addEventListener('click', function() {
	compare();
});

$("#winner").click(function () {
								reset();
							});
							
function block() {
	compare();
	return false;
}