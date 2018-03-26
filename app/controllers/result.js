
var args = $.args;

var city = args.city || {};
var id = args.id||"";


Alloy.Collections.webFans.fetch();

$.win.addEventListener("close", function(){
$.destroy();
});

function F_fileterResult(collection) {

   return collection.where({id:id});

};

function F_transFormResult(model){

    var transModel = model.toJSON();

    if(transModel.Class>'1'){
        transModel.Class="Business";
    }else{
        transModel.Class="Economy";
    }
     return transModel;
};


function viewMapButoon(e){

    var viewMapControler = Alloy.createController("viewMap",{city:e.source.city});

    Alloy.Globals.tabGroup.activeTab.open(viewMapControler.getView());

};

function takeOrderButoon(e){

    // if( ! Alloy.Globals.isLogin) {
    //     alert('You should login firstly.');
    //     return ;
    // }
    //
    // var xhr = Ti.Network.createHTTPClient();
    // var ip = 'http://localhost:1337/Order/book';
    // xhr.open('POST',ip);
    // xhr.send({
    //     "Order[UserName]":Alloy.Globals.username ,
    //     "Order[fanID]": e.source.fanID,
    //     "Order[fanCity]": e.source.city,
    //     "Order[fanBDate]": e.source.BDates,
    //     "Order[fanEDate]": e.source.EBates,
    //     "Order[fanPrice]": e.source.Price,
    //     "Order[fanClass]": e.source.Class,
    //     "Order[fanSeats]": e.source.Seats
    //
    // });
    //
    // xhr.onload = function(e) {
    //     alert('You have successfully booked +'+e.source.city+ ' package.');
    // }

    if( Alloy.Globals.isLogin){

      var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: ['Confirm', 'Cancel'],
          message: 'Do you book this package!!'
       });

       dialog.addEventListener('click', function(e3){
          if (e3.index === e3.source.cancel){

          } else {

            var xhr = Ti.Network.createHTTPClient();
            var ip = 'http://localhost:1337/Order/book';
            xhr.open('POST',ip);
            xhr.send({
                "Order[UserName]":Alloy.Globals.username ,
                "Order[fanID]": e.source.fanID,
                "Order[fanCity]": e.source.city,
                "Order[fanBDate]": e.source.BDates,
                "Order[fanEDate]": e.source.EBates,
                "Order[fanPrice]": e.source.Price,
                "Order[fanClass]": e.source.Class,
                "Order[fanSeats]": e.source.Seats
            });

            xhr.onload = function(e) {
                alert('You have successfully booked +'+ Alloy.Globals.username + ' package.');
            }
          }
        });
      dialog.show();
    }else{
      alert('You should login firstly.');
    }
};
