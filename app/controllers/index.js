$.index.open();

Alloy.Globals.tabGroup = $.index;

Alloy.Globals.usernameLabal = $.userWelcome;

Alloy.Globals.vistor="Vistor";

Alloy.Globals.usernameLabal.text = Alloy.Globals.vistor;

Alloy.Globals.isLogin =false;

// Map Controller
Alloy.Collections.Map.fetch();

function btClick(evt){

    if(evt.clicksource=='rightButton'){
     var regionArray ={"Americas":"AMR","East Asia":"EAR","South-east Asia":"SEA"};

        var validDateController = Alloy.createController('ValidDateList',{region:regionArray[evt.annotation.region],city:evt.annotation.city,title:'Region'});

        $.index.activeTab.open(validDateController.getView());
    }


}

function MapTransform(model){

        var mapModel = model.toJSON();

        mapModel.title = mapModel.country+" Consulate General";
        mapModel.rightButton = Titanium.UI.iOS.SystemButton.DISCLOSURE;
       return mapModel;
}



// ---- begin funfares [Region]--------------
Alloy.Collections.FanFares.fetch();

var previousRecord =  {};
function dataTransformRegion(model){
   var transModel = model.toJSON();


    if(transModel.Region==previousRecord && previousRecord !='undefined'){
        transModel.HeaderTitle = null;
    }else {
        transModel.HeaderTitle = transModel.Alias;
    }

    previousRecord =transModel.Region ;

    return transModel;
};


// create class tab
function tableClickClass(e){

    var validDateController = Alloy.createController('ValidDateList',{classType:e.row.classType,pType:e.row.pType,pRange:e.row.pRange});

    $.index.activeTab.open(validDateController.getView());
};


// create region tab
function tableClickRegion(e){
    var validDateController = Alloy.createController('ValidDateList',{region:e.row.region,city:e.row.city,title:e.row.title});

    $.index.activeTab.open(validDateController.getView());

};

Alloy.Collections.webFans.fetch();

function F_transformFunction(model) {
     var transform = model.toJSON();
     var f_class= transform.Class;

    if(f_class>'1'){
        transform.Class ='Business';
    }else{
        transform.Class ='Economy';
    }

    return transform;
};

function clickDetails(e){

    var resultController = Alloy.createController('result',{id:e.row.rowid,city:e.row.city});

    $.index.activeTab.open(resultController.getView());
};


function tableClickMore(e){

    var tabType = e.row.tabType||{};
    var MoreController = {};

    if(tabType =='Log'){
        tabType = 'Login';

        if( Alloy.Globals.isLogin){
            tabType = 'Logout';
          var dialog = Ti.UI.createAlertDialog({
              cancel: 1,
              buttonNames: ['Confirm', 'Cancel'],
              message: 'Loug Out?'
           });

           dialog.addEventListener('click', function(e){
              if (e.index === e.source.cancel){

              } else {

                var xhr = Ti.Network.createHTTPClient();
                var ip = 'http://localhost:1337/user/logout';
                xhr.open('POST',ip);
                xhr.send();

                alert('You have successfully logged out.');
                Alloy.Globals.usernameLabal.text = Alloy.Globals.vistor;
                Alloy.Globals.vistorsID ="";
                Alloy.Globals.isLogin =false;
              }

              //Ti.API.info('e.index: ' + e.index);
            });
          dialog.show();
        }


    }else if(tabType == 'Order'){

        tabType ='Orders';

    }else if(tabType == 'AboutUs'){
        tabType = 'AboutUs';

    }

    if(tabType =='Logout') return ;

    if(!Alloy.Globals.isLogin &&tabType == 'Orders'){
        tabType = 'Login'; // default;
        alert("pls login your profile firstly!! ");
    }

    MoreController = Alloy.createController(tabType);

    $.index.activeTab.open(MoreController.getView());
}
