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

function reset() {
						$("#word").empty();
						getWord();
						$("#winner").html("");
						$("#wrong").html("");
						counter = 0;
						$(".wrapper").css("display", "block");
						man = 0;
}

var chosen = "word";

function getWord() {

	// instantiate the variable up here to avoid scope problems

	// set up an ajax call to our "library"
	var ajaxCall = new XMLHttpRequest();

	// tell the ajax call what to do when it's done running (we do this before we actually run it)
	ajaxCall.onreadystatechange = function() { 
		if (ajaxCall.readyState == 4 && ajaxCall.status == 200) {

		
		  word = JSON.parse(ajaxCall.responseText);

		  var chosen2 = word[Math.floor(Math.random() * 6) + 1  ];
		  	chosen = chosen2.word;


		  for (var i = 0; i < chosen.length; i++) {
    		console.log(chosen.charAt(i));
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

function compare() {



var subLetter = document.querySelector('#submission').value;
counter ++;
for (var i = 0; i < chosen.length; i++) {
    		console.log(chosen.charAt(i));
	    		if ( subLetter === chosen.charAt(i)) {
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
	    		}
				
				else if ( subLetter === chosen){
					
					for (var i = 0; i < chosen.length; i++) {
					
					$(".color" + i).css( "transition", "all .5s");
					$(".color" + i).css( "color", "green");
					
					}
					$("#winner").html("Congrats you won! It took you " + counter + " moves. Click here to play again!");
					console.log(counter);
					$(".wrapper").css("display", "none");
					$("#winner").click(function () {
						reset();
					});
					break;
				}

	    		else {
					
					if (subLetter !== chosen.slice(-1)) {
						fancyLog(subLetter);
						console.log(chosen.slice(-1));
						man ++;
						$(".man" + man).css("display", "block");
						console.log(man);
						
						if (man === 7) {
							$("#winner").html("Sorry you lost! Click here to play again!");
							$(".wrapper").css("display", "none");
							$("#winner").click(function () {
								reset();
							});
							
						}
	    			
	    		}
		}

document.querySelector('#submission').value = "";
}
}

/*

function answer() {
	if (document.getElementById("submission") === word) {
		fancyLog("Great Job it took you" number " tries!")
	}

	else {
		fancyLog("Sorry thats not right")
	}
}

/*

var arr = ["Jee", "bee", "gee"];
function test() {
	var chosen1 = arr[Math.floor(Math.random() * 3) + 1  ];
		  alert(chosen1);
}

test();

*/

document.querySelector('#submit').addEventListener('click', function() {
	compare();
});