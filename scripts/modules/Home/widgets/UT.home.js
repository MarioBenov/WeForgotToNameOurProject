define(["text!modules/Home/view/mainView.html"], function(mainView){
    $.widget("UT.Home",{
        options:{
            moduleName: "Home"
        },
        
        _create: function(){
            var self = this;
            self._options = {
            };
            self._refresh();
        },
        
        _refresh: function(){
            var self = this;
            self.element.html(mainView);
            setActiveModuleName(self.options.moduleName);
        },
        
        clear:  function(callback){
            var self = this;
            self.element.html("");
            self.destroy();
            if(callback){callback()};
            
        },
        
        _destroy: function(){
        }
    });
});