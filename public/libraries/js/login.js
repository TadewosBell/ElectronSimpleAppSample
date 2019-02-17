ipcRenderer.on('asynch-login', (event, arg) => {
  if(arg == true)
  {
    $('#contentWindow').load("profile.html");
  }
})

//ipcRenderer.send('asynchronous-message', 'async ping')

//here data from register page is captured and sent to server Js
function loginFunction() {

  var email = document.getElementById('email').value;

  var  password  = document.getElementById('password').value;
  var loginObject = {
    email : email.toString(),
    password : password.toString()
  }
  $.ajax({
  type: "POST",
  url: "http://127.0.0.1:5000/login",
  cache: false,
  data: JSON.stringify(loginObject),
  contentType: 'application/json',

  success: function(data){
  //$("#more").after(html);
  //alert(data)
  ipcRenderer.send('asynch-login', data)
  }
  });

}
