function ajax(options) {
  options = options || {};
  options.method = (options.method || "GET").toUpperCase();
  var params = formatParams(options.data);

  var xhr;

  // if (window.XMLHTTPRequest) {
    xhr = new XMLHttpRequest();
  // } else {
  //   xhr = new ActiveXObject("Microsoft.XMLHTTP");
  // }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.error && options.error(status);
      }
    }
  }

  if (options.method == 'GET') {
    var urlstr = options.url + '?' + params;
    xhr.open("GET", options.url + '?' + params, true);
    xhr.send(null);
  } else if (options.method == 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-method', 'application/x-www-form-urlencode');
    xhr.send(options.data);

  }

  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    arr.push(('v=' + Math.random()).replace('.', ""));
    return arr.join('&');
  }




}
