chrome.runtime.onConnect.addListener(function(port) {
  if (port.name=="douban-id") {
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
  } else if (port.name=="readfree-search") {
    port.onMessage.addListener(function(msg) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          console.log(xhr);
          if (xhr.status == 200) {
            var dom = document.createElement('html');
            dom.innerHTML = xhr.responseText;
            var link = dom.getElementsByClassName('pjax');
            if (link) {
              msg.success = true;
              var url = 'http://readfree.me/'
                  + link[0].getAttribute('href');
              msg.readfreeUrl = url;
              port.postMessage(msg);
            } else {
              msg.success = false;
              port.postMessage(msg);
            }
          }
      };
      xhr.open('GET', msg.url, true);
      xhr.setRequestHeader('Content-type', 'text/html');
      xhr.send();
    });
  }
});
