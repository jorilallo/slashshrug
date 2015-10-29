var GIPHY_URL = "http://api.giphy.com/v1/gifs/tv?api_key=CW27AW0nlp5u0&tag=shrug";

(function() {
  var copyElem = document.getElementById("copy");
  var copyContent = copyElem.innerHTML;
  var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

  // Init copy action
  var clipboard = new Clipboard('#copy');
  clipboard.on("success", function(e) {
  	copyElem.innerHTML = "Copied";
  	setTimeout(function(){
  		copyElem.innerHTML = copyContent;
  	}, 1000);
  });
  clipboard.on("error", function(e) {
  	// Fallback for Safari
  	if (isMac)
  		copyElem.innerHTML = "Press Cmd+C to copy";
  	else
  		copyElem.innerHTML = "Press Ctrl+C to copy";
  });

  // Don't fire default actions on link
  copyElem.addEventListener("click", function(event) {
  	event.preventDefault();
  }, false);

  // Safari requires that we show a message to copy the shrug.
  // Added logic to return to default state by clicking the background or hitting Esc
  document.body.addEventListener("click", function(event) {
  	if (event.delegateTarget !== copyElem && copyElem.innerHTML !== copyContent)
  		copyElem.innerHTML = copyContent;
  }, false);

  document.addEventListener("keydown", function(event) {
  	if (event.keyCode == 67 && (event.ctrlKey || event.metaKey)){
      copyElem.innerHTML = "Copied";
      setTimeout(function(){
	  		copyElem.innerHTML = copyContent;
	  	}, 1000);
    }
    if (event.keyCode == 27)
    	copyElem.innerHTML = copyContent;
  }, false);

  // Load background image
  var gifElem = document.getElementById("gif");
  var fallbackGif = "http://i.giphy.com/K6VhXtbgCXqQU.gif";
  fetch(GIPHY_URL)
  .then(function(response) {
    if (response.status !== 200) {
      gifElem.src = "http://i.giphy.com/K6VhXtbgCXqQU.gif"
    }

    response.json().then(function(data) {
    	gifElem.src = data["data"]["image_url"];
    });
  });
})();