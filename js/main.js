var bgColorSelect;
var sound;
var soundOption;
var bgImage;
var x = "";
var y = "";
var bgColor;
var startTime;
var checkTime;
var charset = ["A","B","O","C","I","D","E","F","O","G","A","H","U","I","J","K","U","L","O","M","I","N","P","E","Q","A","R","U","S","O","T","U","V","A","W","X","U","Y","A","Z"];
var mainString = "";
var score = 0;
var buttonClick = new Array();
var arrayLength;
var previousArrayLength;
var arrayElement;
var previousArrayElement;
var currentRowId;
var currentColId;
var previousRowId;
var previousColId;
var saveTime;
var length;
var lastElement;
var correct = document.getElementById("correct");
var error = document.getElementById("error");
var new_page = document.getElementById("new_page");
var correct = document.getElementById("correct");
var error = document.getElementById("error");
var new_page = document.getElementById("new_page");
var my_background_color;
var my_background_image;
var soundEnable;
var message;

//Initialize function
var init = function () {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for tizenhwkey
	/*document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});*/
};
// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
	var today = new Date();
	var h = today.getHours();

	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('divbutton1').innerHTML="Current time: " + h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 250);
}

function checkTime(i) {
	if (i < 10) {
		i="0" + i;
	}
	return i;
}

function InitialAlp()
{
	for (var i = 0; i < 5; i++)
		{
		for (var j = 1; j < 6; j++)
			{
			var index = randomIntInc(0,39);
			var str = "button"+i+j;
			document.getElementById(str).style.background = "rgb(255,255,255)";
			document.getElementById(str).value = charset[index];
			}
		}	
}

function NewAlp()
{
	for ( var i = 0; i <= buttonClick.length-1; i++)
		{
		var tran = (buttonClick[i]);
		document.getElementById(tran).style.background = "rgb(255,255,255)";
		document.getElementById(tran).value = "";	
        }
    
	for (var j = 0; j <= buttonClick.length-1; j++) 
		{
		var button = buttonClick[j];
		var rowId = button[6];
		var colId = button[7];
		var tempButton;
		if(rowId == 0)
			{
			AssignAlp(button);
			}
		else
			{
			
			rowId = rowId - 1;
			tempButton = "button"+(rowId)+colId;
		var next = document.getElementById(tempButton).value;
			while(next=="")
			{
				if (rowId == 0 && next!="flag")
					{
					AssignAlp(button);
					AssignAlp(tempButton);
					next = "flag";
					}
				else
					{
				rowId = rowId -1;
				tempButton = "button"+(rowId)+colId;
				next = document.getElementById(tempButton).value;
					}
			}
		while(next!="flag" && rowId>=0)
			{ 
			document.getElementById(button).value = next;
			button = tempButton;
			if(button[6]==0)
				{
				AssignAlp(button);
				}
			rowId = rowId - 1;
			if(rowId == -1)
				{
				next="flag";
				}
			else
				{
				tempButton = "button"+rowId+colId;
				next = document.getElementById(tempButton).value;
				}
			}
			}
			}
		ClearBackground();
	}

function AssignAlp(id)
{
	buttonid = id;
	var index = randomIntInc(0,39);
	document.getElementById(buttonid).value = charset[index];
}

function ClearBackground()
{
	mainString = "";
for ( var i = 0; i <= buttonClick.length-1; i++)
	{
	var tran = (buttonClick[i]);
	document.getElementById(tran).style.background = "rgb(255,255,255)";
	}
	while(buttonClick.length)
		{
		buttonClick.pop();
		}
}

function Reshuffle()
{
	if(soundEnable == "ON")
	{
	new_page.play();
	}
	mainString="";
	ClearBackground();
	for ( var i = 0; i < 5; i++)
		{
		for (var j = 1; j < 6; j++)
			{
			var index = randomIntInc(0,39);
			var str = "button"+i+j;
			document.getElementById(str).value = charset[index];
			}
		}	
}

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

function function_temp(temp)
{
	var flag = true;
	var id = temp;
mainString = mainString.concat(id);
var temp_length = mainString.length;

if(temp_length > 1)
{
	if(temp_length > 9)
		{
		if(soundEnable == "ON")
		{
		error.play();
		}
		alert("UNKNOWN WORD - "+mainString);
		mainString="";
		ClearBackground();
		}
	
		if(data.contains(mainString))
		{
			if(soundEnable == "ON")
			{
			correct.play();
			}
			for (var t = mainString.length - 1; t >= 0; t--)
				{
				++score;
				}
			document.getElementById("score").value = score;
			document.getElementById("words").value = mainString;		
			var selectedWord = mainString;
			mainString = "";
			NewAlp();
		}			
	}
}

function DisplayPopUp(displayMessage)
{
	message = displayMessage;
	document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
    document.getElementById('light').style.borderColor = bgColor;
    document.getElementById('light').style.backgroundImage = "url(" + (bgImage) + ")";
    if(levelId == 8)
    	{
    	document.getElementById('display').innerHTML = "CONGRATULATIONS! YOU ARE NOW A CHAMPION!!!";
    	}
    else
    	{
	if(message == "NO")
    {
		document.getElementById('display').innerHTML = "FAILED !";
    }
	else
		{
		document.getElementById('display').innerHTML = "Congratulations! You have cleared Level"+levelId;
		}
    	}
}
function ClearPopUp()
{
 document.getElementById('light').style.display='none';
 document.getElementById('fade').style.display='none';
 if(message == "NO")
	 {
	 window.location.href="index.html";
	 }
 else
	 {
	 window.location.href="Play.html"
	 }
}
function randomIntInc (low, high) 
{
    return Math.floor(Math.random() * (high - low + 1) + low);
    
}

function CheckWord(id)
{
	var buttonId = id;
	document.getElementById(buttonId).style.background = "rgb(255, 255, 102)";
	buttonClick.push(buttonId);
	length = buttonClick.length;
	
		if (length > 1)
		{
		arrayLength = length - 1;
		lastElement = buttonClick[arrayLength];
		for (var t = 0; t <= length - 2; t++)
			{
				if(lastElement == buttonClick[t])
				{
					mainString="";
					ClearBackground();
					break;
				}
			}
		previousArrayLength = length - 2;
		arrayElement = buttonClick[arrayLength];
		previousArrayElement = buttonClick[previousArrayLength]; 
		previousRowId = previousArrayElement[6];
		previousColId = previousArrayElement[7];
		currentRowId = arrayElement[6];
		currentColId = arrayElement[7];
		var a = previousRowId - "1";
		var b = previousRowId;
			++b;
		var c = previousColId - "1";
		var d = previousColId;
		++d;
		var e = currentRowId;
		var f = previousRowId;
		var g = currentColId;
		var h = previousColId;

		
		if (e == a || e == b || e == f)
			{
			if (g == c || g == d || g == h)
				{
					var buttonValue = document.getElementById(buttonId).value;
					function_temp(buttonValue);
				}
			else
				{
				if(soundEnable == "ON")
				{
				error.play();
				}
				mainString = "";
				ClearBackground();
				}
			}
			else
				{
				if(soundEnable == "ON")
				{
				error.play();
				}
				mainString = "";
				ClearBackground();
				}
			}
		else
		{
		var buttonValue = document.getElementById(buttonId).value;
		function_temp(buttonValue);
		}
}

function changeTheme()
{

	bgColorSelect = document.getElementById("backgroundImage");
	sound = document.getElementById("sound");
	soundOption = sound.options[sound.selectedIndex].value;
	bgImage = bgColorSelect.options[bgColorSelect.selectedIndex].value;
	bgColor = bgColorSelect.options[bgColorSelect.selectedIndex].text;
	localStorage.setItem("my_background_color",bgColor);
	localStorage.setItem("soundEnable",soundOption);
	localStorage.setItem("my_background_image",bgImage);
	y = document.getElementsByClassName("background");
	var j;
	for( j=0;j<y.length; j++)
		{
		y[j].style.backgroundImage = "url(" + (bgImage) + ")";
		}
	 x = document.getElementsByClassName("test");
	var i;
	for ( i=0; i < x.length; i++)
		{
		x[i].style.backgroundColor = bgColor;
		}
	   		var z = document.getElementsByClassName("abcd");
		var k;
		for (k=0; k<z.length; k++)
		{
			z[k].style.color = bgColor;
		}
}


