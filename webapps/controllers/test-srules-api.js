var DOMAIN_NAME = '';

var bRulesObj = {
    domainKey: DOMAIN_NAME,
    language: "GROOVY",
    code: "log.info('testing...')",
    compilable: true,
    description: "test Binary Rules",
    contexts: [],
    plugins: [],
    type: "test"
  }
var listBRulesObj = {
    load:true,
    page:'',
    pageSize:'',
    dkey:DOMAIN_NAME,
    next:false,
    type:''
}
var searchBRulesObj = {
    load:true,
    pageSize:'',
    dkey:DOMAIN_NAME,
    query:"type like '%es%'"
}
$(document).ready(function () {
    $(".docmenu").addClass('active');

});


function testBRulesApi() {
    DOMAIN_NAME = $('#domainName').val();

    upsertBRulesApi(bRulesObj);
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
    $('#console-area').append(`<br> > ` + apiName + ` API success...<br>Details:` + JSON.stringify(res));
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
function upsertBRulesApi(obj){
    var apiName = ' Upsert Binary Rules ';
    upsertBRules(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        getBRulesApi(bRulesObj.type);   
    })
}
function getBRulesApi(type){
    var apiName = ' Get Binary Rules ';
    getBRules(type,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countAllBRulesApi();
    })
}
function countAllBRulesApi() {
    var apiName = ' Count All Binary Rules ';
    countAllBRules(function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countBRulesApi();
    })
}
function countBRulesApi(){
    var apiName = ' Count Binary Rules ';
    countBRules(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        listBRulesApi(listBRulesObj);
    })
}
function listBRulesApi(obj){
    var apiName = ' List Binary Rules ';
    listBRules(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        searchBRulesApi(searchBRulesObj);
    })
}
function searchBRulesApi(obj){
    var apiName = ' Search Binary Rules ';
    searchBRules(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        invokeBRulesApi(bRulesObj.type,'1001');
    })
}
function invokeBRulesApi(type,mid){
    var apiName = ' Invoke Binary Rules ';
    invokeBRules(type,mid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        deleteBRulesApi(bRulesObj.type);
    })
}
function deleteBRulesApi(type) {
    var apiName = ' Delete Binary Rules';
    deleteBRules(type,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        deleteAllBRulesApi();
    })
}
function deleteAllBRulesApi() {
    var apiName = ' Delete All Binary Rules ';
    deleteAllBRules(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
    })
}