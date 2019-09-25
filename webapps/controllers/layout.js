$(document).ready(function () {
    USER_OBJ = JSON.parse(USER_OBJ);
    API_TOKEN = USER_OBJ.token;
    DOMAIN_KEY = USER_OBJ.domainKey;
    API_KEY = USER_OBJ.apiKey;

    $(".currentYear").html(moment().format('YYYY'));
    getSystemStatus()

    $(".user_name").html(USER_OBJ.user.firstName +' '+USER_OBJ.user.lastName);
    $(".user_email").html(USER_OBJ.user.email);

    $(".domainKey").html(DOMAIN_KEY)
    $(".apiKey").html(API_KEY)
    $(".token").html(API_TOKEN)

    loadApiDocs()

});

function getSystemStatus() {
    getPlatformSystem(function (status, data) {
        if(status){
            $(".licenseType").html(data.licenseType)
        }
    })
}

function logout() {

    loginOutCall(function (status) {
        if(status){
            Cookies.set('session_obj','');
            document.location="/login";
        }else{
            errorMsg('Error in logout')
        }
    })
}

function loadApiDocs() {
    getAPIFiles(function (status,data) {
        $(".apiList").html("");
        // console.log(data);
        if(status && data.status){
            for(var i=0;i<data.data.length;i++){
                var val = data.data[i].split(".")[0];
                var valText = val.replace("api-","")
            
                $(".apiList").append(`<li class="menu__item " aria-haspopup="true"><a href="/`+valText+`-api" class="menu__link ">
                <i class="menu__link-bullet menu__link-bullet--dot"><span></span></i>
                <span style="text-transform: capitalize" class="menu__link-text">`+valText+` API</span></a>
                </li>`)
            
            }
            // loadURL(data.data[0].split(".")[0])
        }
    })
}

function loadURL(val,url) {

    var valText = val.replace("api-","");

    var url = val.replace("api","doc")

    $(".apiTitle").html(valText +' API');

    $(".leftLinkMenu").removeClass('nav__item--active')
    $(".c_"+val).addClass('nav__item--active')

    $("#loadApiContent").attr("src","/"+url)

    jQuery('html,body').animate({scrollTop:0},0);
}