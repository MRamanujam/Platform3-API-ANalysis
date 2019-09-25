var DOMAIN_NAME = '';
var ALEXA_ID = '';

var alexaObj = {
    alexaId: "testAlexa",
    domainKey: DOMAIN_NAME,
    ruleType: "",
    ruleName: "",
    intentName: "",
    errorResponse: ""
}
var listAlexaObj = {
    page:'',
    pageSize:'',
    dkey:DOMAIN_NAME,
    next:false,
    eid:''
}
var searchAlexaObj = {
    pageSize:'',
    dkey:DOMAIN_NAME,
    query:"alexaId like '%es%'"
}
$(document).ready(function () {
    $(".docmenu").addClass('active');

});


function testAlexaApi() {
    DOMAIN_NAME = $('#domainName').val();
    ALEXA_ID = $('#alexaId').val();

    upsertAlexaApi(alexaObj);
}
function clearConsole(){
    $('#console-area').html('');
}
function successConsole(apiName, res) {
    $('.apiDocs').append(` <li class="nav__item">
        <a href="#" class="nav__link">
            <span class="nav__link-text status">`+ apiName + ` API Success <i class="flaticon-check"></i></span>
        </a>
    </li>`);
    $('#console-area').append(`<br> > ` + apiName + ` API success...<br>Details:` + JSON.stringify(res) );
    // $('#console-area').append(`<br> > ` + apiName + ` API success...<br>Asset details:` + JSON.stringify(obj) + `, Status:` + JSON.stringify(res) + ``);

}

function errorConsole(apiName, res) {
    $('.apiDocs').append(` <li class="nav__item">
    <a href="#" class="nav__link">
            <span style="color:red" class="nav__link-text status">`+ apiName + ` API Failed <i class="flaticon-x-mark"></i></span>
        </a>
    </li>`);
    $('#console-area').append(`<br> <span style="color:red"> > ` + apiName + ` API failed...</span><br>` + JSON.stringify(res) + ``);

}
function upsertAlexaApi(obj){
    var apiName = ' Upsert Alexa ';
    upsertAlexa(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        getAlexaApi(alexaObj.alexaId);   
    })
}
function getAlexaApi(aid){
    var apiName = ' Get Alexa ';
    getAlexa(aid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countAllAlexaApi();
    })
}
function countAllAlexaApi() {
    var apiName = ' Count All Alexa ';
    countAllAlexa(function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countDomainAlexaApi();
    })
}
function countDomainAlexaApi(){
    var apiName = ' Count Domain Alexa ';
    countDomainAlexa(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        listAlexaApi(listAlexaObj);
    })
}
function listAlexaApi(obj){
    var apiName = ' List Alexa ';
    listAlexa(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        searchAlexaApi(searchAlexaObj);
    })
}
function searchAlexaApi(obj){
    var apiName = ' Search Alexa ';
    searchAlexa(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        deleteAlexaApi(alexaObj.alexaId);
    })
}
function deleteAlexaApi(aid) {
    var apiName = ' Delete Alexa';
    deleteAlexa(aid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        deleteAllAlexaApi();
    })
}
function deleteAllAlexaApi() {
    var apiName = ' Delete All Alexa ';
    deleteAllAlexa(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
    })
}