define(["text!modules/GiveMeAway/view/main.html", "text!modules/GiveMeAway/view/register.html"], function(mainView, registerView){
    $.widget("UT.GiveMeAway",{
        options:{
            moduleName: "GiveMeAway"
        },
        
        _create: function(){
            var self = this;
            self._options = {
                searchButton: "#searchButton",
                searchInput: ".searchInput",
                resultContainer: "#resultContent",
                registerButton: "#registerButton",
                
                backButton: "#backButton",
                
                junkForm: "#junkAccepterForm"
            };
            self._refresh();
        },
        
        _refresh: function(){
            var self = this;
            console.log("RazdaiMe refresh");
            console.log(mainView);
            self.element.html(mainView);
            setActiveModuleName(self.options.moduleName);
            
            
            $(self._options.searchButton, self.element).click(function(){
                /*getJSON("RazdaiMe/Search/"/*+$(self._options.searchInput, self.element).val()*,null,function(response){
                    $(self._options.searchButton, self.element).html("");
                    for(var i=0;i<resopnse.d.length;i++){
                        var elem = $("<div>"+response.d[i].description+"</div>")
                        $(self._options.searchButton, self.element).append(elem)
                    }
                });*/
                $.ajax({
                    url: serverURL+"junkinfo.php",
                    type: "GET",
                    dataType: 'json',
                    data:{
                        data: $(self._options.searchInput, self.element).val()
                    },
                                        
                    success: function(response){
                        $(self._options.searchButton, self.element).html("");
                        $(self._options.resultContainer, self.element).html("");
                        for(var i=0;i<response.length;i++){
                            var template = '<div class="wrapper"><div class="orgImage"></div><div class="orgInfo"><div class="orgName">'+response[i].Title+'</div><div class="orgDesc">'+response[i].Description+'</div><div class="orgContact">'+response[i].Email+'</div></div></div>';
                            //var elem = $("<div>"+response.d[i].description+"</div>");
                            var elem = $(template);
                            
                            $(self._options.resultContainer, self.element).append(elem)
                        }
                    }
                });
            });
            
            if(_USERROLE == _USERROLES.ORGANISATION){
                $(self._options.registerButton, self.element).click(function(e){
                   $(self.element).html(registerView);
                   
                   self.setRegisterHandlers();
                });
            } else {
                $(self._options.registerButton, self.element).hide();
            }
            
            $(this.element).on("onUserLogin",function(){
                if(_USERROLE == _USERROLES.ORGANISATION){
                    $(self._options.registerButton, self.element).show();
                    $(self._options.registerButton, self.element).click(function(e){
                       $(self.element).html(registerView);
                       
                       self.setRegisterHandlers();
                    });
                }
            });
            $(this.element).on("onUserLogout",function(){
                $(self._options.registerButton, self.element).hide();
            });

	$(self._options.searchButton, self.element).click();
        },
        
        
        setRegisterHandlers: function(){
            var self = this;
            
           $(self._options.registerButton, self.element).click(function(e){
            var form = $(self._options.junkForm,  self.element);
              $.ajax({
                url: serverURL+"enterjunkies.php",
                type: "POST",
                dataType: "json",
                data: {
                    title: form.find("#title").val(),
                    description: form.find("#description").val(),
                    email: form.find("#email").val(),
                    user_id: 1
                },
                success: function(response){
                    self._refresh();
                },
                complete: function(){
                    self._refresh();
                }
              });
           });
            
           $(self._options.backButton, self.element).click(function(e){
              self._refresh();
           });
        },
        
        clear:  function(callback){
            var self = this;
            self.destroy();
            if(callback){callback()};            
        },
        
        _destroy: function(){
        }
    });
});