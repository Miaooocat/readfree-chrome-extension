chrome.runtime.onConnect.addListener(function(port) {
  if (port.name=="douban") {
    port.onMessage.addListener(function(msg) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          console.log(xhr);
          if (xhr.status == 200) {
            msg.success = true;
            port.postMessage(msg);
          } else if (xhr.status == 404) {
            msg.success = false;
            port.postMessage(msg);
          }
      };
      xhr.open('GET', msg.url, true);
      xhr.setRequestHeader('Content-type', 'text/html');
      xhr.send();
    });
  }
});
