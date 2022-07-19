
RegExp.prototype.execAll = function(str) {
  var map = {};
  var result = null;
  do {
    result = this.exec(str);
    if (result) map[result[1]] = result[2];
  } while (this.lastIndex != 0)
  return map;
};



Location.prototype.getSearch = function(url) {
  if (!url) url = this.href;
  let search = /([^&?#]+)=([^&?#]+)/g.execAll(url);
  for (var key in search) {
    search[key] = window.decodeURIComponent(search[key]);
  }
  return search;
};

Location.prototype.getSearchString = function(url) {
  let search = this.getSearch(url);
  let ret = [];
  for (let key in search) {
    if (search[key] && typeof search[key] !== 'undefined') {
      /* let val = window.urlencode(search[key]);
      ret.push(`${key}=${val}`); */
    }
  }
  return ret.join("&");
};
Location.prototype.setSearch = function(url, options) {
  if (!url) url = this.href;
  let oldSearch = this.getSearch(url);

  let t1 = url.split("#");
  let hash = "";
  url = t1[0].split("?")[0];
  if (t1[1]) {
    hash = "#" + t1[1].split("?")[0];
  }

  let newSearch = Object.assign({}, oldSearch, options);
  let search = [];
  for (let key in newSearch) {
    if (newSearch[key] !== null) { //代表去除属性
      search.push(key + "=" + window.encodeURIComponent(newSearch[key]));
    }
  }

  search = search.join("&");
  if (search) {
    search = "?" + search;
  }
  return url + hash + search;
};

function initTitle(stage){
  stage.innerHTML+=`<label class="title" id="title"></label>`;
  setTimeout(function(){
    let req = location.getSearch();
    if(req.title){
      document.querySelector('#title').innerText = req.title;
    }
  }, 1);
 
}

// function getSearch(url) {
//   let search = /([^&?#]+)=([^&?#]+)/g.execAll(url);
//   for (var key in search) {
//     search[key] = window.urldecode(search[key]);
//   }
//   return search;
// }

