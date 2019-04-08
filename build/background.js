chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.contentScriptQuery == 'ajax') {
        var url = request.url;
        fetch(url)
          .then(response => response.json())
          .then(json => sendResponse(json))
          .catch(error => console.log(error))
        return true;
      }
    }
  );
