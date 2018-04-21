function ajax(options) {
  console.log('ajax start');
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
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

  if (options.type == 'GET') {
    console.log('ajax get start');
    var urlstr = options.url + '?' + params;
    xhr.open("GET", options.url + '?' + params, true);
    console.log(urlstr);
    xhr.send(null);
  } else if (options.type == 'POST') {
    console.log('ajax post start');
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
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
