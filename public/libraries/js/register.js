

ipcRenderer.on('asynch-reply', (event, arg) => {
   if(arg == "Registered")
   {
     $('#contentWindow').load("login.html");
   }
})

//ipcRenderer.send('asynchronous-message', 'async ping')

//here data from register page is captured and sent to server Js
function registerFunction() {
  var fullName = document.getElementById('fullName').value;
  var email = document.getElementById('email').value;
  var pNumber   = document.getElementById('pNumber').value;
  var  password  = document.getElementById('password').value;
  var registerObject = {
    fullName : fullName.toString(),
    email : email.toString(),
    pNumber : pNumber.toString(),
    password : password.toString()
  }
  $.ajax({
  type: "POST",
  url: "http://127.0.0.1:5000/registerPost",
  cache: false,
  data: JSON.stringify(registerObject),
  contentType: 'application/json',

  success: function(data){
  //$("#more").after(html);
  //alert(data)

  ipcRenderer.send('asynch-register', data)
  }
  });

}

function saveProfile(){

}
