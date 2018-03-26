var args = $.args;

var a_city=args.city;

$.win.title= a_city;


// Map Controller
Alloy.Collections.Map.fetch();

function F_filterLocation(collection){

    return collection.where({city: a_city});
};


$.win.addEventListener("close", function(){
    $.destroy();
});


function MapTransform(model){

        var mapModel = model.toJSON();
        mapModel.title = mapModel.city;
        mapModel.rightButton = Titanium.UI.iOS.SystemButton.DISCLOSURE;
       return mapModel;
}
