var DOMAIN_NAME = '';

var dRulesObj = {
    // domainKey: DOMAIN_NAME,
    language: "GROOVY",
    code: "log.info('domain Rule Test...');",
    compilable: true,
    description: "test Domain Rule",
    contexts: [],
    plugins: []
}

$(document).ready(function () {
    $(".docmenu").addClass('active');

});


function testDRulesApi() {
    DOMAIN_NAME = $('#domainName').val();

    upsertDomainRuleApi(dRulesObj);
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
function upsertDomainRuleApi(obj){
    var apiName = ' Upsert Domain Rules ';
    upsertDomainRule(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        getDomainRuleApi();   
    })
}
function getDomainRuleApi(){
    var apiName = ' Get Domain Rules ';
    getDomainRule(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        countAllDomainRulesApi();
    })
}
function countAllDomainRulesApi() {
    var apiName = ' Count All Domain Rules ';
    countAllDomainRules(function(status,res){
        if (status) successConsole(apiName, res);
        else errorConsole(apiName, res);
        deleteDomainRuleApi();
    })
}

function deleteDomainRuleApi(){
    var apiName = ' Delete Domain Rules';
    deleteDomainRule(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else errorConsole(apiName, res); 
    })
}
function invokeDomainRuleApi(mid){
    var apiName = ' Invoke Domain Rules ';
    invokeDomainRule(mid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else errorConsole(apiName, res);
        deleteBRulesApi(bRulesObj.type);
    })
}

/// in invoke domain rule messageID????