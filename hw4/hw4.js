// Implement your fetch method using XHR api, so you can make get, post, put, delete with it.

function fetch(url, options) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url);
    
    if (options.headers) {
      Object.keys(options.headers).forEach(function(key) {
        xhr.setRequestHeader(key, options.headers[key]);
      });
    }
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        var responseData = xhr.responseType === 'json' ? xhr.response : JSON.parse(xhr.responseText);
        resolve(responseData);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    
    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    
    xhr.send(options.body);
  });
}

// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Hong Zhang',
//     age: 21
//   })
// })
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(error) {
//   console.error(error);
// });

// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'John Doe',
//     age: 35
//   })
// })
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(error) {
//   console.error(error);
// });

// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Jane Doe',
//     age: 40
//   })
// })
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(error) {
//   console.error(error);
// });

// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//   method: 'DELETE',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(function(data) {
//   console.log(data);
// })
// .catch(function(error) {
//   console.error(error);
// });
