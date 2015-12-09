(function() {
    var gb = {
        LINK_TYPE: {
            SUBJECT: 0,
            HOME: 1,
            DOULIST: 2,
            UPDATE: 3,
            IMAGE: 4
        }
    }
    
    // search with douban id
    function search(doubanId, linkType, parentTag) {
        var xhr = new XMLHttpRequest();
        var url = 'http://readfree.me/book/' + doubanId;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var div = document.createElement('div');
                div.innerHTML = xhr.responseText;
                var a = div.getElementsByTagName('a');
                var panel = getLinkStyle(linkType, url);
                parentTag.appendChild(panel);
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    }

    function searchIsbn(isbn, callback) {
        var xhr = new XMLHttpRequest();
        var url = 'http://readfree.me/search/?q=' + isbn;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-type', 'text/html');
        xhr.send();
    }
    
    function getLinkStyle(linkType, readfreeUrl) {
        var className = null;
        var text = null;
        if (linkType === gb.LINK_TYPE.SUBJECT) {
            className = 'rf-book-page-main-link';
            text = 'ReadFree!';
        } else if (linkType === gb.LINK_TYPE.HOME) {
            className = 'rf-douban-home-link';
            text = 'ReadFree!';
        } else if (linkType === gb.LINK_TYPE.IMAGE) {
            className = 'rf-normal-link';
            text = 'R!';
        }
        if (className !== null) {
            var ahref = document.createElement('a');
            ahref.setAttribute('href', readfreeUrl);
            ahref.setAttribute('target', '_blank');
            ahref.setAttribute('class', className);
            ahref.innerHTML = text;
            return ahref;
        }
        return null;
    }


    function insertCss() {
        // insert css
        var style = document.createElement('style');
        // webkit hack
        style.appendChild(document.createTextNode(''));
        // insert to head
        document.head.appendChild(style);

        // rules
        var primaryColor = '#37a';
        var secondaryColor = '#614e3c';
        var rules = {
            '.rf-book-page-main-link': {
                position: 'fixed',
                top: '160px',
                left: '-10px',
                padding: '10px 20px 10px 30px',
                display: 'block',
                background: secondaryColor,
                color: 'white !important'
            },
            '.rf-douban-home-link': {
                display: 'inline-block',
                padding: '2px 4px',
                'text-align': 'center',
                background: primaryColor,
                color: 'white !important'
            },
            '.rf-normal-link': {
                padding: '2px',
                'text-align': 'center',
                position: 'absolute',
                'margin-left': '-64px',
                display: 'inline-block',
                background: primaryColor,
                color: 'white !important'
            }
        };
        for (var ele in rules) {
            var rulesStr = ele + '{';
            for (var attr in rules[ele]) {
                rulesStr += attr + ': ' + rules[ele][attr] + ';';
            }
            rulesStr += '} ';
            style.sheet.insertRule(rulesStr, 0);
        }
    }

    function runDouban() {
        var pathRe = location.pathname.match(/\/(\w+)\/(\d+)\//);
        
        var links = document.getElementsByTagName('a');
        for (var i in links) {
            (function(e) {
                var re = links[e].href === undefined ? null :
                        links[e].href.match(/\/subject\/(\d+)(\/$|\/\?)/);

                // ignore those with both title and images
                if (links[e].className === 'cover') {
                    // cover image in people page, don't ignore
                    search(re[1], gb.LINK_TYPE.IMAGE, links[e].parentNode);
                    return;
                }
                var children = links[e].childNodes;
                for (var j in children){
                    if (children[j].tagName === 'IMG') {
                        if (children[j].className === 'climg') {
                            // common list in people page, don't ignore
                            search(re[1], gb.LINK_TYPE.IMAGE, links[e].parentNode);
                        }
                        // ignore other images
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
    
        // douban book
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
                            search(re[1], gb.LINK_TYPE.HOME, links[e].parentNode);
                        }
                    })(i);            
                }
                if (callback) {
                    callback();
                }
            }, 2000);
        };

        reloadIndex();
    }
    
    // index page of read
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



    function runAmazon() {
        var detail = document.getElementById('detail_bullets_id');
        var isbn = '<b>ISBN:</b> ';
        if (detail) {
            var list = detail.getElementsByTagName('li');
            for (var lid = 0, llen = list.length; lid < llen; ++lid) {
                var text = list[lid].innerHTML;
                var offset = text.indexOf(isbn);
                if (offset > -1) {
                    var splitOffset = text.indexOf(', ');
                    if (splitOffset > -1) {
                        // multiply isbn, use the second one
                        var code = text.substr(splitOffset + 2);
                    } else {
                        var code = text.substr(isbn.length);
                    }
                    searchIsbn(code, function(text) {
                        // create a div to parse html
                        var dom = document.createElement('html');
                        dom.innerHTML = text;
                        var link = dom.getElementsByClassName('pjax');
                        if (link) {
                            var url = 'http://readfree.me/'
                                + link[0].getAttribute('href');
                            var panel = getLinkStyle(gb.LINK_TYPE.SUBJECT, url);
                            document.body.appendChild(panel);
                        }
                    });
                    break;
                }
            }
        }
    }



    insertCss();
    var host = window.location.hostname;
    if (host === 'www.douban.com' || host === 'book.douban.com') {
        runDouban();
    } else if (host === 'www.amazon.cn') {
        runAmazon();
    }
})();
