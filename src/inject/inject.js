// chrome.extension.sendMessage({}, function(response) {
// 	var readyStateCheckInterval = setInterval(function() {
// 	if (document.readyState === "complete") {
// 		clearInterval(readyStateCheckInterval);

// 		// ----------------------------------------------------------
// 		// This part of the script triggers when page is done loading
// 		console.log("Hello. This message was sent from scripts/inject.js");
// 		// ----------------------------------------------------------

// 	}
// 	}, 10);
// });

(function(){
  // if page is already done loading, send timing, else set onload event
  if(document.readyState == "complete") sendWords();
  else window.onload = sendWords;

  function sendWords() {
    console.log("send words");
    chrome.runtime.sendMessage({
      words: document.getElementsByTagName("body")[0].innerText.split("\n").join(" ").split("\"").join(" "),
      site: location.href
    });
  }

})();
