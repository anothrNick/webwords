
//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
      console.log(request);
      chrome.storage.local.set({'words': request.words});
    }
);