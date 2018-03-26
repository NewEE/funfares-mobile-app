var args = $.args;

$.win.addEventListener("close", function(){
    $.destroy();
    });

Alloy.Collections.webOrders.fetch();

function F_webOrdersForm(model) {
     var transform = model.toJSON();
    return transform;
};
