$.widget("UT.moduleIcon",{
    options:{
        moduleName: "",
        mainWidget: "",
        root: "",
        title: ""
    },
    
    _create: function(){
        var self = this;
        self._refresh();
    },
    
    _refresh: function(){
        var self = this;
        /*
        for(var i=0;i<self.options.load.length;i++){
            self.options.load[i] = self.options.root + "/" + self.options.load[i];
        }*/
        
        $(self.element).attr("title",self.options.title);
        
        $("img", self.element).attr("src","scripts/modules/"+(self.options.moduleName.replace(/(\s)/gi,""))+"/images/icon.jpg");
        
        self.element.click(function(e){
            openModule(self.options.moduleName, self.options.mainWidget);
        });
    }
});