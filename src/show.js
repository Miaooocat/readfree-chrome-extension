(function() {
    var gb = {
        LINK_TYPE: {
            SUBJECT: 0,
            HOME: 1,
            DOULIST: 2,
            UPDATE: 3
        }
    }
    
    function search(doubanId, linkType, parentTag) {
        var xhr = new XMLHttpRequest();
        var url = 'http://readfree.me/book/' + doubanId;
        
        xhr.addEventListener('error', function() {
            console.log('rr');
        }, true);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var div = document.createElement('div');
                div.innerHTML = xhr.responseText;
                var a = div.getElementsByTagName('a');
                var panel = getLinkStyle(linkType, url);
                parentTag.appendChild(panel);
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    }
    
    function getLinkStyle(linkType, readfreeUrl) {
        if (linkType === gb.LINK_TYPE.SUBJECT) {
            var panel = document.createElement('div');
            panel.style['position'] = 'fixed';
            panel.style['top'] = '160px';
            panel.style['left'] = '-10px';
            panel.style['padding'] = '10px 20px 10px 30px';
            panel.style['border-radius'] = '10px';
            panel.style['background'] = '-webkit-linear-gradient(rgba(50, 74, 105, 0.8), rgba(50, 74, 105, 1))';
            var ahref = document.createElement('a');
            ahref.setAttribute('href', readfreeUrl);
            ahref.setAttribute('target', '_blank');
            ahref.innerHTML = 'ReadFree!';
            ahref.style['color'] = 'white';
            panel.appendChild(ahref);
            return panel;
        
        } else if (linkType === gb.LINK_TYPE.HOME) {
            var ahref = document.createElement('a');
            ahref.setAttribute('href', readfreeUrl);
            ahref.setAttribute('target', '_blank');
            ahref.innerHTML = 'ReadFree!';
            ahref.style['color'] = 'white';
            ahref.style['background'] = 'rgb(50, 74, 105)';
            ahref.style['display'] = 'inline-block';
            ahref.style['padding'] = '2px';
            ahref.style['border-radius'] = '5px';
            ahref.style['text-align'] = 'center';
            return ahref;
        }
        return null;
    }
    
    var pathRe = location.pathname.match(/\/(\w+)\/(\d+)\//);
    
    var links = document.getElementsByTagName('a');
    for (var i in links) {
        (function(e) {
            // ignore those with images
            var children = links[e].childNodes;
            for (var j in children){
                if (children[j].tagName === 'IMG') {
                    return;
                }
            }
            // not current book if in book page
            var re = links[e].href === undefined ? null :
                    links[e].href.match(/\/subject\/(\d+)(\/$|\/\?)/);
            if (re) {
                if (!pathRe || (pathRe && pathRe[2] && pathRe[2] !== re[1])) {
                    search(re[1], gb.LINK_TYPE.HOME, links[e].parentNode);
                }
            }
        })(i);
    }
    
    // book page
    if (pathRe) {
        var urlClass = pathRe[1];
        var doubanId = pathRe[2];
        if (urlClass === 'subject') {
            search(doubanId, gb.LINK_TYPE.SUBJECT, document.body);
        }
    }
    
    // add link to my douban page on book page
    if (window.location.hostname === 'book.douban.com') {
        var menu = document.getElementsByClassName('nav-items');
        if (menu && menu[0]) {
            // show link only when mouse hover
            menu[0].addEventListener("mouseover", function() {
                var link = document.getElementById('readfree-menu');
                if (link) {
                    link.style['display'] = 'inline-block';
                }
            }, false);
            menu[0].addEventListener("mouseout", function() {
                var link = document.getElementById('readfree-menu');
                if (link) {
                    link.style['display'] = 'none';
                }
            }, false);

            var li = document.createElement('li');
            li.setAttribute('id', 'readfree-menu');
            li.style['display'] = 'none';
            var a = document.createElement('a');
            a.setAttribute('href', 'http://www.douban.com/people/ovilia1024/');
            a.innerHTML = 'ReadFree 插件作者';
            li.appendChild(a);
            menu[0].appendChild(li);
        }
    }
    
    // dynamically loaded books
    var handler = function(links, callback) {
        setTimeout(function() {
            for (var i in links) {
                (function(e) {
                    // ignore those with images
                    var children = links[e].childNodes;
                    for (var j in children){
                        if (children[j].tagName === 'IMG') {
                            return;
                        }
                    }
                    // not current book if in book page
                    var re = links[e].href === undefined ? null :
                            links[e].href.match(/\/subject\/(\d+)(\/$|\/\?)/);
                    if (re) {
                        console.log(re[1], links[e].parentNode);
                        search(re[1], gb.LINK_TYPE.HOME, links[e].parentNode);
                    }
                })(i);            
            }
            if (callback) {
                callback();
            }
        }, 2000);
    };
    
    // index page
    function reloadIndex() {
        var bookX = document.getElementsByClassName('book_x');
        if (bookX.length > 0) {
            for (var i = 0; i < bookX.length; ++i) {
                bookX[i].addEventListener('click', function() {
                    var links = document.getElementById('book_rec')
                        .getElementsByTagName('a');
                    handler(links, reloadIndex);
                });
            }
        }
    }
    reloadIndex();
})();
