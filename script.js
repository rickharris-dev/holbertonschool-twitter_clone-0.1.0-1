HTMLElement.prototype.toggle = function() {
   if (this.classList.contains("hidden")) { // if element is hidden, remove hidden.
    this.classList.remove('hidden');
  } else {
    this.classList.add('hidden'); // else add hidden
  }
}

// Function to factorize AJAX request and response
function ajaxGet(url, onSuccess){ // function called ajaxGet that expects 2 arguments (url, onSuccess)
 	var buttonId = document.getElementById("button-load"); // defines what happens to button-load
  	buttonId.disabled = "true"; // gets disabled when time out
  	buttonId.style.cursor = "text";
  	buttonId.style.background = "#CDFFCB";

 	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() // For the Ajax call, use the method that uses readyState, because it's the only way to be compatible with IE8
	{
	    if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
	    {
	        onSuccess(xmlhttp.responseText); // onSuccess: a callback that will run after the call was successfully performed and that expects one argument; a string that contains what's in the file that was just fetched
	    }
	}
	xmlhttp.open('GET', url, true); // url: a string that contains the local URL to be calling

	setTimeout(function(){ // set 2 sec time out before Ajax call is made
		xmlhttp.send();
  		buttonId.disabled = false;
  		buttonId.style.cursor = "default";
  	}, 2000);
}

// Need to make reply button work with extra statuses
document.addEventListener("DOMContentLoaded", function() {
// document.addEventListener(function() {
	var reply = document.querySelectorAll('.button-reply'); // find all elements with reply class
	var r = 0, r_length = reply.length; // create & set new vars to 0 and to number of reply btns (length)
		for (r; r < r_length; r++) { // iterates through all reply btns adding event listeners to each
		reply[r].addEventListener('click', function() { // when click is heard do the following:
  		var parent = this.closest('.post-status-button-div');  // set target 1 for toggling
  		var post = this.parentNode.nextElementSibling; // set target 2 for toggle
  		post.toggle();
  		parent.toggle();
		});
	}
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("post-status-btn").addEventListener("click", function () { // call toggle function on poststatusbtn
    document.getElementById('statuspost').toggle(); // call toggle on div containing new status post
    this.toggle();
  });
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("button-load").addEventListener("click", function () {
    ajaxGet('statuses-1.html', function(text) { // an Ajax call is made to the file with path /statuses-1.html
      document.getElementById("extra_statuses").innerHTML = text; // extra statuses are loaded ie injected  into empty div with ID "extra_statuses" in index.html, using innerHTML
    });
  });
});
