


function load(url, callback) {

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness() {
    if(xhr.readyState < 4) {
      return;
  }
  if(xhr.status !== 200) {
      return;
  }
    // all is well 
    if(xhr.readyState === 4) {
      JSONObject = JSON.parse(xhr.responseText);
      callback(JSONObject);
  }          
}
xhr.open('GET', url, true);
xhr.send('');
}

(function(window, document, undefined){
    'use strict';
    var Articles = {
        images : ["./img/0.jpg", "./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg", "./img/5.jpg", "./img/6.jpg", "./img/7.jpg", "./img/8.jpg", "./img/9.jpg"],
        data : [],
        pageNum: 0,
        itemsPerPage: 12,
        articleCount: 0,
        articles: 0,
        setPageData: function (data) {
            var ctx = Articles,
                wrapper = document.getElementById('videolist'),
                html = document.createDocumentFragment(),
                articles = data,
                markup = {},
                i = Articles.pageNum*12,
                image = "",
                imgIndex = "";
                Articles.data = data;
                Articles.articleCount = articles.length;
                //console.log(articles.length);
                // (Articles.pageNum*Articles.itemsPerPage)+Articles.itemsPerPage
            while (i < (Articles.pageNum+1)*Articles.itemsPerPage && i < Articles.articleCount) { //articles.length
                imgIndex = parseInt(articles[i].image);
                
                if (isNaN(imgIndex)) {
                    image = "./img/def.jpg";
                } else {
                    image = ctx.images[imgIndex];
                }
                markup = ctx.toHtml(articles[i].title, image, articles[i].categories, articles[i].timestamp);
                html.appendChild(markup);
                i += 1;

            }
            wrapper.innerHTML="";
            wrapper.appendChild(html);
            Articles.renderPagination();
        },
        formatDate : function (unixtimestamp) {
            var date = new Date(unixtimestamp*1);
            var out = date.toDateString(date);
            return out;
        },
        toHtml: function (title, img, categories, timestamp) {
            var ctx = Articles,
                desc = "",
                element = document.createDocumentFragment(),
                li = document.createElement("li"),
                article = document.createElement("article"),
                div = document.createElement("div"),
                a = document.createElement("a"),
                div2 = document.createElement("div"),
                div3 = document.createElement("div"),
                img2 = document.createElement("img"),
                div4 = document.createElement("div"),
                h2 = document.createElement("h2"),
                a2 = document.createElement("a"),
                time = document.createElement("time"),
                titleText = document.createTextNode(title),
                timestampText = document.createTextNode(ctx.formatDate(timestamp)),
                i = 0,
                categoriesText = "";


            while (i < categories.length) {
                desc = desc + categories[i] + " ";
                i += 1;
            }
            categoriesText = document.createTextNode(desc);

            div.className = "container";
            a.href = "";
            div2.className = "overlay";
            div3.className = "play";
            img2.className = "image";
            img2.src = img;
            img2.alt = title;
            div4.className = "description";
            a2.href = "";
            time.datetime = "2008-02-14 20:00";
            // console.log(ctx.formatDate(timestamp));

            li.appendChild(article);
            article.appendChild(div);
            article.appendChild(div4);
            div.appendChild(a);
            a.appendChild(div2);
            a.appendChild(div3);
            a.appendChild(img2);
            div4.appendChild(h2);
            div4.appendChild(time);
            h2.appendChild(a2);
            element.appendChild(li);

            div2.appendChild(categoriesText);
            a2.appendChild(titleText);
            time.appendChild(timestampText);

            return element;

        },
            renderPagination : function () {
                var wrapper = document.getElementById('paging'),
                    html = document.createDocumentFragment(),
                    a = "",
                    pages = Math.ceil(Articles.articleCount/Articles.itemsPerPage),
                    navHtml = "";
                if (Articles.pageNum === 0) {
                    document.getElementById('previous-button').className = "previous-button-passive";
                } else {
                    document.getElementById('previous-button').className = "previous-button";
                }
                for (var i = 0; i < pages; i++) {
                    console.log("Articles.pageNum: "+Articles.pageNum),
                    console.log("i: "+i),
                    console.log("pages: "+pages)
                    if (2 >= Math.abs(Articles.pageNum-i) && i < pages-1) {
                        if (a.innerHTML === "..."){} else {
                        a = document.createElement("span");
                        a.innerHTML = "...";
                        html.appendChild(a);
                        }
                    } else {
                        a = document.createElement("a");
                        a.className = "paging-button";
                        a.setAttribute("data-page", i);
                        a.innerHTML = i+1;
                        html.appendChild(a);
                    }
                    //ak je aktualna stranka vacsia ako 3 a mensia ako pocet stranok -1 tak miesto <a> rob <span>
                }
                if (Articles.articleCount-(Articles.itemsPerPage*Articles.pageNum) <= Articles.itemsPerPage + 1) {
                    document.getElementById('next-button').className = "next-button-passive";
                } else {
                    document.getElementById('next-button').className = "next-button";
                }
                wrapper.innerHTML="";
                wrapper.appendChild(html);
                Articles.bindPagination();
            },
            nextPage: function() {
                Articles.calculatePage(1);
            },
            previousPage: function() {
                Articles.calculatePage(-1);
            },
            switchPage: function(element, scope) {
                var clickedPage = element.getAttribute('data-page');
                scope.calculatePage(clickedPage-scope.pageNum);
            },
            bindPagination : function () {
                var pageButtons = document.getElementsByClassName('paging-button'),
                    i = 0,
                    size = pageButtons.length;
                while (i < size) {
                    pageButtons[i].addEventListener('click', function(e) {
                        var targetElement = e.target || e.srcElement;
                        Articles.switchPage(targetElement, Articles);            
                    }); 
                    i += 1;
                }
            },
            calculatePage: function(num) {
            

                console.log(num);
                console.log(Articles.pageNum);
                Articles.pageNum = Articles.pageNum + num;
                // if (Articles.pageNum < 0){
                //     Articles.pageNum = 0;
                // }
                // if (Articles.pageNum === 0) {
                //     document.getElementById('previous-button').style.display = "none";
                // } else {
                //     document.getElementById('previous-button').style.display = "inline-block";
                // }

                // if (Articles.articleCount-(Articles.itemsPerPage*Articles.pageNum) <= Articles.itemsPerPage + 1) {
                //     document.getElementById('next-button').style.display = "none";
                // } else {
                //     document.getElementById('next-button').style.display = "inline-block";
                // }

                Articles.setPageData(Articles.data);
            }    
        }

        load('http://academy.tutoky.com/api/json.php', Articles.setPageData);
        var next = document.getElementsByClassName("next-button")[0];
        next.addEventListener("click", Articles.nextPage);
        var prev = document.getElementsByClassName("previous-button")[0];
        prev.addEventListener("click", Articles.previousPage);
        Articles.renderPagination();
    }(window,document));
