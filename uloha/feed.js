 
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
        setPageData: function (data) {
            var ctx = Articles,
                wrapper = document.getElementById('videolist'),
                html = document.createDocumentFragment(),
                articles = data,
                markup = {},
                i = 0,
                image = "",
                imgIndex = "";
            Articles.data = data;
            while (i < (12)) { //articles.length
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
            wrapper.appendChild(html);
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
                j = 0;

                
                while (j < categories.length) {
                    desc = desc + categories[j] + " ";
                    j += 1;
                }
                var titleText = document.createTextNode(title);
                var categoriesText = document.createTextNode(desc);
                var timestampText = document.createTextNode(ctx.formatDate(timestamp));
                
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

    }
    load('http://academy.tutoky.com/api/json.php', Articles.setPageData);
}(window,document));
