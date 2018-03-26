var args = $.args;


$.win.addEventListener("close", function(){
    $.destroy();
    });


// login function
function loginFunction(e) {
    var responses = {};

    var xhr = Ti.Network.createHTTPClient();
    var ip = 'http://localhost:1337/user/Applogin';
    xhr.open('POST',ip);
    xhr.send({
        "User[UserName]": $.textField.value,
        "User[Password]": $.textField2.value
    });

    xhr.onload = function(e) {

        var  responses= JSON.parse(this.responseText);
        Alloy.Globals.username = responses.models.UserName;
        Alloy.Globals.vistorsID = responses.models.id;
        Alloy.Globals.isLogin = true;
       Alloy.Globals.usernameLabal.text = Alloy.Globals.username;
       if(Alloy.Globals.username != Alloy.Globals.vistor)
          alert("welcome, Back "+Alloy.Globals.username);
        else alert(responses.msg);

    };

    $.win.close();

}; // end of login function
