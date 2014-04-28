requirejs.config({
    baseUrl: 'scripts',
    paths:{
        "text": "lib/text"
    }
});

requirejs([],
function   () {    
    var userSettings = null;

    getJSON(serverURL+"usersettings.php", {
                    user_id: 1
                }, function(response){
        var iconContainer = $("#moduleBar");
        var icon = iconContainer.find(".moduleIcon");
        /*icon.moduleIcon({
            moduleName: response.moduleInfo[0].ModuleName,
            mainWidget: response.moduleInfo[0].MainWidget,
            root: response.moduleInfo[0].root,
            title: response.moduleInfo[0].Title
        });*/
        icon.moduleIcon({
            moduleName: "Home",
            mainWidget: "modules/Home/widgets/UT.home",
            title: "Home"
        });
        
        for(var i=0;i<response.length;i++){
            icon = $("<div class='moduleIcon'><img/></div>");
            icon.moduleIcon({
                moduleName: response[i].Name,
                mainWidget: response[i].MainWidget,
                root: response[i].Root,
                title: response[i].Title
            });
            iconContainer.append(icon);
        }
        
        icon = $("<div class='moduleIcon'><img src='css/images/mock1.jpg'/></div>");
        iconContainer.append(icon);

        icon = $("<div class='moduleIcon'><img src='css/images/mock2.jpg'/></div>");
        iconContainer.append(icon);

        openModule("Home", "modules/Home/widgets/UT.home");
    });
    
    var loginButton = $("#headerButtons #loginButton");
    if(_USERROLE == _USERROLES.VISITOR){
        loginButton.click(openLogin);
    } else {
        loginButton.hide();
    }
    
    var logoutButton = $("#headerButtons #logoutButton");
    if(_USERROLE != _USERROLES.VISITOR){
        logoutButton.click(logout);
    } else {
        logoutButton.hide();
    }
});

var serverURL = "php/";

var _USERROLES = {
    VISITOR: 1,
    USER: 2,
    ORGANISATION: 3,
    ADMIN: 4
}
var _USERROLE = _USERROLES.VISITOR;

function getJSON(url, data, successHandler){
    $.ajax({
        url: url,
        data: data,
        type: "GET",
        dataType: 'json',
                            
        success: successHandler
    });
}

var activeModule = null;

function openModule(moduleNam, mainWidget){
    console.log(moduleName, mainWidget);
	var moduleName = moduleNam.replace(/(\s)/gi,"");
    var container = $("#mainContainer");
    requirejs([mainWidget],function(){
        if(activeModule != null){
            activeModule.clear(function(){
                container[moduleName]();
                activeModule = container.data()["UT"+moduleName];
            });
        } else {
            container[moduleName]();
            activeModule = container.data()["UT"+moduleName];
        }
    });
}

function setActiveModuleName(name){
    $("#activeModuleName").text(name);
}

function openLogin(){
    console.log("user login");
    var dialog = $("#loginContainer");
    dialog.dialog({
        modal: true,
        //draggable: false,
        title: "Login",
        buttons:[
            {
                text: "Login",
                click: function(){
                    //$( this ).dialog( "close" )
                    var dialog = $(this);
                    $.ajax({
                        url: serverURL+"login.php",
                        type: "POST",
                        data:{
                            userName: $("#loginName").val(),
                            password: $("#loginPassword").val()
                        },
                        success: function(){
                            //console.log("asdadds");
                            _USERROLE = _USERROLES.ORGANISATION;
                            $("#loginButton").hide();
                            $("#logoutButton").show();
                            $("#logoutButton").click(logout);
                            dialog.dialog("close");
                            if(activeModule){
                                activeModule.element.trigger("onUserLogin");
                            }
                        },
                        error: function(){
                            console.log("WRONG")
                        }
                    });
                }
            }
        ]
    });
}

function logout(){
    $.ajax({
        url: serverURL+"logout.php",
        success: function(){
            if(activeModule){
                activeModule.element.trigger("onUserLogout");
            }
            location.reload();
        }
    });
}