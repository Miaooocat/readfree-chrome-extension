var cached = {};

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name=="douban-id") {
    port.onMessage.addListener(function(msg) {
      if (cached[msg.url]) {
        port.postMessage(cached[msg.url]);
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          console.log(xhr);
          if (xhr.status == 200) {
            msg.success = true;
            port.postMessage(msg);
            cached[msg.url] = msg;
          } else if (xhr.status == 404) {
            msg.success = false;
            port.postMessage(msg);
            cached[msg.url] = msg;
          }
      };
      xhr.open('GET', msg.url, true);
      xhr.setRequestHeader('Content-type', 'text/html');
      xhr.send();
    });
  } else if (port.name=="readfree-search") {
    port.onMessage.addListener(function(msg) {
      if (cached[msg.url]) {
        port.postMessage(cached[msg.url]);
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          console.log(xhr);
          if (xhr.status == 200) {
            var dom = document.createElement('html');
            dom.innerHTML = xhr.responseText;
            var link = dom.getElementsByClassName('pjax');
            console.log(link);
            if (link) {
              var url = 'https://readfree.me/'
                  + link[0].getAttribute('href');
              msg.readfreeUrl = url;
              msg.success = true;
              port.postMessage(msg);
              cached[msg.url] = msg;
            } else {
              msg.success = false;
              port.postMessage(msg);
              cached[msg.url] = msg;
            }
          }
      };
      xhr.open('GET', msg.url, true);
      xhr.setRequestHeader('Content-type', 'text/html');
      xhr.send();
    });
  }
});
