

var args = $.args;

var title = "";
var flag ="class";

var classType = args.classType || {}; // 1 or 2
var pType = args.pType || {};
var pRange = args.pRange || {};


var region = args.region || {};
var city = args.city || {};
var Rtitle = args.title || "Class";

    if(Rtitle=="Class"){
        // define 2 for business; 1 for Economy;
        title = classType=="2"?"Business":"Economy";

    }else{
        title = "Region";
        flag = "region";
    }


$.win.title = title;



Alloy.Collections.webFans.fetch();

function F_filterFunction(collection) {
    if(flag=="class"){

        return collection.filter(function (model){
            if(pType=="Under"){
                return (model.get('Class') == classType && model.get('Price') <= pRange);
            }else{
                return (model.get('Class') == classType && model.get('Price') >= pRange);
            }
        });

    }else{
        return collection.where({Region:region,City:city});
    }

};


function clickConditionsFunction(e){

    var resultController = Alloy.createController('result',{city:e.row.city,id:e.row.rowid});

   Alloy.Globals.tabGroup.activeTab.open(resultController.getView());

};

$.win.addEventListener("close", function(){
$.destroy();
});
