var DOMAIN_NAME = '';
var ASSET_ID = '';



var assetObj = {
    assetId: ASSET_ID == ''? "testAsset": ASSET_ID,
    name: "test3",
    description: "asset api test",
    domainKey: DOMAIN_NAME
};
var sAssetobj = {
    assetId: "stestAsset",
    name: "test2",
    description: "asset api test",
    domainKey: DOMAIN_NAME
}
var listAssetobj = { // list asset obj
    dkey: DOMAIN_NAME,
    page: '',
    pageSize: '',
    next: false,
    aid: ''
}



var deviceObj = { 
    deviceId: 'testDevice'
}
var linkObj = {
    aid: assetObj.assetId,
    did: deviceObj.deviceId
}
var propObj = { // asset property obj
    aid: assetObj.assetId,
    dataFormat: 'AS_IS',
    description: 'test property',
    name: 'ptest',
    value: 'testValue',
    domainKey:DOMAIN_NAME
}
var groupObj = { // asset Group obj
    domainKey: DOMAIN_NAME,
    groupId: 'testgroup',
    name:'group1',
    description:'',
    individualBroadcast: true,
    groupEmail: '',
    groupPhone: '',
    ownerAssetId: assetObj.assetId
}
var listGroupObj = {
    oaid: assetObj.assetId,
    dkey: DOMAIN_NAME,
    page: '',
    pageSize: '',
    next:false
}

var assetGMemObj = {
    oaid:groupObj.ownerAssetId,
    gid:groupObj.groupId,
    description:'',
    aid:sAssetobj.assetId,
    dkey:DOMAIN_NAME
}

var countAssetGroupMemObj = {
    oaid:assetObj.assetId,
    gid:groupObj.groupId,
    dkey:DOMAIN_NAME
}

var gMemObj = {
    oaid:assetObj.assetId,
    gid:groupObj.groupId,
    aid: sAssetobj.aid,
    dkey:DOMAIN_NAME
}

var searchAssetObj = { 
    dkey:DOMAIN_NAME,
    pageSize:'',
    query: "name like '%es%'"
}

var searchAssetGroupObj = {
    dkey:DOMAIN_NAME,
    pageSize:'',
    query: "name like '%es%'"
}
var listAGMemObj = {
    dkey:DOMAIN_NAME,
    oaid:gMemObj.oaid,
    gid:gMemObj.gid,
    pageSize:'',
    page:'',
    next:'',
    aid:''
}
var searchGMObj = { // search Group Member object
   
    dkey:DOMAIN_NAME,
    pageSize:'',
    query: "groupId like '%es%'"

} 


$(document).ready(function () {
    $(".docmenu").addClass('active');

});

function clearConsole(){
    $('#console-area').html('');
}

function editTestValue(){

}
function testAssetApi() {
    DOMAIN_NAME = $('#domainName').val();
    ASSET_ID = $('#assetId').val();
    // console.log('domain name: ', DOMAIN_NAME);
    // console.log('Asset id: ', ASSET_ID);
    
    upsertAssetApi(assetObj)
  
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
            <span style='color:red' class="nav__link-text status">`+ apiName + ` API Failed <i class="flaticon-x-mark"></i></span>
        </a>
    </li>`);
    $('#console-area').append(`<br> <span style='color:red'> > ` + apiName + ` API failed...<br>` + JSON.stringify(res) + ``);

}

function upsertAssetApi(obj) {
    var apiName = " Upsert Asset ";
    upsertAsset(obj, function (status, res) {
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        retreiveAssetApi(assetObj.assetId);
    });
   
}

function retreiveAssetApi(id) {
    var apiName = " Retreive Asset "
    retreiveAsset(id, DOMAIN_NAME, function (status, res) {
        if (status) successConsole(apiName, res);
        else errorConsole(apiName, res);
        countAllAssetApi()
    });
}

function countAllAssetApi() {
    var apiName = " Count All Asset "
    countAllAsset(function (status, res) {
        if (status) {
            successConsole(apiName, res);

 
        } else {
            errorConsole(apiName, res)

        }
    countDomainAssetApi(DOMAIN_NAME);

    });
   
}

function countDomainAssetApi(domain) {
    var apiName = " Count Domain Asset ";
    countDomainAsset(domain, function (status, res) {
        if (status) {
            successConsole(apiName, res);
        } else {
            errorConsole(apiName, res)
        }
    listDomainAssetApi(listAssetobj)

    })
  
}
function listDomainAssetApi(obj) {
    var apiName = " List Domain Asset ";

    listDomainAsset(obj, function (status, res) {
        if (status) {
            successConsole(apiName, res);
 

        } else {
            errorConsole(apiName, res)

        }
        searchAssetApi(searchAssetObj)
    

    })
}

function searchAssetApi(obj){

    var apiName = ' Serach Asset Group Member ';

    searchAsset(obj,function(status,res){   
        if (status) {
            successConsole(apiName, res);
 
        } else {
            errorConsole(apiName, res);
 
        }
        upsertDeviceApi(deviceObj)
    })
}





function upsertDeviceApi(obj) {
    var apiName = ' Upsert Device '
    upsertDevice(obj, function (status, res) {
        if (status) {
            successConsole(apiName, res);

        } else {
            errorConsole(apiName, res)
      
        }
    linkAssetDeviceApi(linkObj)

    })
 
}


function linkAssetDeviceApi(obj) {
    var apiName = ' Link Asset Device ';

    linkAssetDevice(obj.aid, obj.did, function (status, res) {
        if (status) {
            successConsole(apiName, res);
  
        } else {
            errorConsole(apiName, res)
 
        }
    listAssetDeviceApi(linkObj.aid)

    })
   
}


function listAssetDeviceApi(aid) {
    var apiName = ' List Asset Device ';
    listAssetDevice(aid, function (status, res) {
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
    unlinkAssetDeviceApi(linkObj)

    })
}

function unlinkAssetDeviceApi(obj) {
    var apiName = ' Unlink Asset Device ';
    unlinkAssetDevice(obj.aid, obj.did, function (status, res) {
        if (status) {
            successConsole(apiName, res);
 
        } else {
            errorConsole(apiName, res);
 
        }
        storeAssetPropertyApi(propObj);
    })
}

function storeAssetPropertyApi(obj) {
    var apiName = ' Store Asset Property ';
    storeAssetProperty(obj, function(status,res){
        if(status){
            successConsole(apiName,res)
        }else{
            errorConsole(apiName, res);
        }
        getAssetPropertyApi(obj.aid,obj.name);
    })
}
function getAssetPropertyApi(aid,name) {
    var apiName = " Get Asset Property"
    getAssetProperty(aid,name, DOMAIN_NAME, function (status, res) {
        if (status) {
            successConsole(apiName, res);

  
        } else {
            errorConsole(apiName, res);

        }
        listAssetPropertyApi(aid)
    });

}

function listAssetPropertyApi(aid) {
    var apiName = ' List Asset Property ';
    listAssetProperty(aid, function (status, res) {
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }

        upsertAssetGroupApi(groupObj)
    })
}

function upsertAssetGroupApi(obj){
    var apiName = ' Upsert Asset Group ';
    upsertAssetGroup(obj, function(status,res){

        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        retrieveAssetGroupApi(groupObj.ownerAssetId,groupObj.groupId);
    })
}

function retrieveAssetGroupApi(oaid,gid){
    var apiName = ' Retrieve Asset Group '
    retrieveAssetGroup(oaid,gid,DOMAIN_NAME,function(status,res){
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        countAllAssetGroupApi();
    })
}
function countAllAssetGroupApi(){
    var apiName = ' Count Asset Group '

    countAllAssetGroup(function(status,res){
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        listAssetGroupApi(listGroupObj);
    })
}

function listAssetGroupApi(obj){

    var apiName = ' List Asset Group ';

    listAssetGroup(obj,function(status,res){

        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        searchAssetGroupApi(searchAssetGroupObj)
        
    })
}

function searchAssetGroupApi(obj){

    var apiName = ' Serach Asset Group Member ';

    searchAssetGroup(obj,function(status,res){   
        if (status) {
            successConsole(apiName, res);
 
        } else {
            errorConsole(apiName, res);
 
        }
        upsertAssetGroupMemApi(assetGMemObj);
        
    })
}


function upsertAssetGroupMemApi(obj){
    var apiName = ' upsert Asset Group Member ';
    upsertAssetGroupMem(obj, function(status,res){
        
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        retrieveAssetGroupMemApi(assetGMemObj);
    })
}


function retrieveAssetGroupMemApi(obj){
    var apiName = ' Retrieve Asset Group '
    retrieveAssetGroupMem(obj,function(status,res){
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        countAssetGroupMemApi(countAssetGroupMemObj);
    }) 
}

function countAssetGroupMemApi(obj){
    var apiName = ' Count Asset Group Member '

    countAssetGroupMem(obj,function(status,res){
        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        listAssetGroupMemApi(listAGMemObj);
    })
}


function listAssetGroupMemApi(obj){

    var apiName = ' List Asset Group ';

    listAssetGroupMem(obj,function(status,res){

        if(status){
            successConsole(apiName, res);

        }else{
            errorConsole(apiName, res);

        }
        searchAssetGroupMemApi(searchGMObj)
        
    })
}

function searchAssetGroupMemApi(obj){

    var apiName = ' Serach Asset Group Member ';

    searchAssetGroupMem(obj,function(status,res){   
        if (status) {
            successConsole(apiName, res);
 
        } else {
            errorConsole(apiName, res);
 
        }
        removeAssetGroupMemApi(assetGMemObj.oaid,assetGMemObj.gid,assetGMemObj.aid);
    })
}

function removeAssetGroupMemApi(oaid,gid,aid){

    var apiName = ' Remove Asset Group Member ';

    removeAssetGroupMem(oaid,gid,aid,DOMAIN_NAME, function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        // removeAssetGroupMemsApi(assetGMemObj.oaid,assetGMemObj.gid)
    })
}

function removeAssetGroupMemsApi(oaid,gid){
    var apiName = ' Remove Asset Group Members ';
    removeAssetGroupMems(oaid,gid,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAssetGroupApi(groupObj.ownerAssetId,groupObj.groupId)
    })

}

function deleteAssetGroupApi(oaid,gid) {
    var apiName = ' Delete Asset Group ';
    deleteAssetGroup(oaid,gid,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAssetGroupsApi(groupObj.ownerAssetId)
    })
}

function deleteAssetGroupsApi(oaid){
    var apiName = ' Delete Asset Groups ';
    deleteAssetGroups(oaid,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAllAssetsGroupApi();
    })
}

function deleteAllAssetsGroupApi(){
    var apiName = ' Delete All Asset Groups ';
    deleteAllAssetGroups(DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAssetPropertyApi(propObj.aid,propObj.name);
    })
}

function deleteAssetPropertyApi(aid,pName){
    var apiName = ' Delete Asset Property ';
    deleteAssetProperty(aid,pName,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAllAssetPropertyApi(propObj.aid);
    })
}
function deleteAllAssetPropertyApi(aid){
    var apiName = ' Delete All Asset Property ';
    deleteAllAssetProperty(aid,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAssetApi(assetObj.assetId);
    });
}

function deleteAssetApi(aid){
    var apiName = ' Delete Asset ';
    deleteAsset(aid,DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
        deleteAllAssetApi();
    })
}
function deleteAllAssetApi(){
    var apiName = ' Delete All Asset ';
    deleteAllAsset(DOMAIN_NAME,function(status,res){
        if (status) {
            successConsole(apiName, res);   
        } else {
            errorConsole(apiName, res); 
        }
    })
}