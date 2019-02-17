const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')
var Datastore = require('nedb');
var db = new Datastore({ filename: 'dataFile/userInfo.db', autoload: true });
//const fs = require('fs-extra')
let win
let $ = require('jquery')

function createWindow() {
   win = new BrowserWindow({width: 1450, height: 1000})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'public', 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
   //win.webContents.openDevTools()

}


// Event handler for asynchronous incoming messages
ipcMain.on('asynch-register', (event, arg) => {
  //This gets the registration information, parse it and get it \
  // to server api endpoint to be saved and used during login.
   console.log(arg)


   // Event emitter for sending asynchronous messages
   event.sender.send('asynch-reply', 'Registered')
})

ipcMain.on('asynch-login', (event, arg) => {
  //This gets the registration information, parse it and get it \
  // to server api endpoint to be saved and used during login.
   console.log(arg)
   var obj = JSON.parse(arg);
   if(obj["LoggedIn"] == "true")
   {
     //if there is no user saved in local with the user info then it saves it
     db.find({ email: obj.email }, function (err, docs) {
       // If no document is found, docs is equal to []
       if(docs == []){
         db.insert(obj, function (err, newDoc) {   // Callback is optional
      // newDoc is the newly inserted document, including its _id
      // newDoc has no key called notToBeSaved since its value was undefined
          });
       }
      });
      event.sender.send('asynch-login', true)
   }
   // Event emitter for sending asynchronous messages
   //event.sender.send('asynch-login', arg)
})

app.on('ready', createWindow)
