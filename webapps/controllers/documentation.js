$(document).ready(function () {
    loadApiDocs()
    $(".docmenu").addClass('active')
});

function loadApiDocs() {
    getAPIFiles(function (status,data) {
        $(".apiDocs").html("")
        if(status && data.status){
            console.log(data);
            for(var i=0;i<data.data.length;i++){
                var val = data.data[i].split(".")[0];
                var valText = val.replace("api-","")

                $(".apiDocs").append('<li class="nav__item leftLinkMenu c_'+val+'">' +
                    '<a href="javascript:void(0)" class="nav__link" onclick="loadURL(\''+val+'\')" style="text-transform: capitalize">' +
                    '<span class="nav__link-text">'+valText+' API</span></a></li>');
            }
            loadURL(data.data[0].split(".")[0])
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