var DOMAIN_NAME = '';

var nRulesObj = {
    domainKey: DOMAIN_NAME,
    language: "GROOVY",
    code: "log.info('nrule test...');",
    compilable: true,
    description: "Named Rules Test...",
    contexts: [],
    plugins: [],
    name: "ntest"
  }
var listNRulesObj = {
    load:true,
    page:'',
    pageSize:'',
    dkey:DOMAIN_NAME,
    next:false,
    name:''
}
var listNRuleNamesObj = {
    page:'',
    pageSize:'',
    dkey:DOMAIN_NAME,
    next:false,
    name:''
}

var searchNRulesObj = {
    load:true,
    pageSize:'',
    dkey:DOMAIN_NAME,
    query:"name like '%es%'"
}
$(document).ready(function () {
    $(".docmenu").addClass('active');

});


function testNRulesApi() {
    DOMAIN_NAME = $('#domainName').val();

    upsertNamedRuleApi(nRulesObj);
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
function upsertNamedRuleApi(obj){
    var apiName = ' Upsert Named Rules ';
    upsertNamedRule(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        getNamedRuleApi(nRulesObj.name);   
    })
}
function getNamedRuleApi(name){
    var apiName = ' Get Named Rules ';
    getNamedRule(name,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countAllNamedRuleApi();
    })
}
function countAllNamedRuleApi() {
    var apiName = ' Count All Named Rules ';
    countAllNamedRule(function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countNamedRuleApi();
    })
}
function countNamedRuleApi(){
    var apiName = ' Count Named Rules ';
    countNamedRule(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        listNamedRulesApi(listNRulesObj);
    })
}
function listNamedRulesApi(obj){
    var apiName = ' List Named Rules ';
    listNamedRules(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        listNamedRuleNamesApi(nRulesObj.name,listNRuleNamesObj);
    })
}
function listNamedRuleNamesApi(name,obj){
    var apiName = ' List Named Rules Name ';
    listNamedRuleNames(name,obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        searchNamedRulesApi(searchNRulesObj);
    })
}
function searchNamedRulesApi(obj){
    var apiName = ' Search Named Rules ';
    searchNamedRules(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        deleteNamedRuleApi(nRulesObj.name);
    })
}
function invokeNamedRule(type,mid){ // to be implemented
    var apiName = ' Invoke Binary Rules ';
    invokeBRules(type,mid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        // deleteBRulesApi(bRulesObj.type);
    })
}
function deleteNamedRuleApi(name) {
    var apiName = ' Delete Named Rules';
    deleteNamedRule(name,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        deleteAllNamedRuleApi();
    })
}
function deleteAllNamedRuleApi() {
    var apiName = ' Delete All Named Rules ';
    deleteAllNamedRule(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
    })
}