var data = {
  "title": "JANO GALIK",
  "content": "Ahojte blablabla /n toto je balblabal /n/n/n blablabla",
  "autor": "NESS",
  "datum": "23.1.1914"
};

var tpl = "<html><head><title>%title%</title></head><body>%content%<br>%autor%%datum%</body></html>";

var render = function(tpl, data){
  for(var key in data){
    tpl = tpl.replace("%"+key+"%", data[key]);
  }
  return tpl;
};

x = render(tpl, data);
console.log(x);