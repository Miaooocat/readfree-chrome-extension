(function() {
    if (document.URL.slice(31, -1) != '') {
        var url = 'http://readfree.me/search?q=' + document.URL.slice(31, -1);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var div = document.createElement('div');
                div.innerHTML = xhr.responseText;
                var a = div.getElementsByTagName('a');
                for (i in a) {
                    if (a[i].className == 'pjax') {
                        var panel = document.createElement('div');
                        panel.style['position'] = 'fixed';
                        panel.style['top'] = '160px';
                        panel.style['left'] = '-10px';
                        panel.style['padding'] = '10px 20px 10px 30px';
                        panel.style['border-radius'] = '10px';
                        console.log(panel.style.color);
                        panel.style['background'] = '-webkit-linear-gradient(rgba(50, 74, 105, 0.8), rgba(50, 74, 105, 1))';            
                        var ahref = document.createElement('a');
                        ahref.setAttribute('href', 'http://readfree.me' 
                                + a[i].getAttribute('href'));
                        ahref.setAttribute('target', '_blank');
                        ahref.innerHTML = 'ReadFree!';
                        ahref.style['color'] = 'white';
                        panel.appendChild(ahref);
                        document.body.appendChild(panel);
                        return;
                    }
                }        
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    }
})()
