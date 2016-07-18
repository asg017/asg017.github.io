
function functionTest(){

	var counter;

	counter = document.getElementById("numClicks").innerHTML;
	counter++;

	document.getElementById("id1").innerHTML = "You've clicked the button "+
			"<span id='numClicks'>" + counter + "</span> times.";
}
