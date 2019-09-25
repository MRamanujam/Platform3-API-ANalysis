var DOMAIN_NAME = '';
var DEVICE_ID = '';


$(document).ready(function () {
    $(".docmenu").addClass('active');
    // addDevice();

// console.log(assetObj);
});

var deviceObj = {
    deviceId: 'testDevice', 
    domainKey: DOMAIN_NAME,
    name: 'test',
    description: 'test device api',
    modelId: '',
    version:'1.0.1',
    password:'',
    assetId:''
}
var listDeviceObj = {
    dkey: DOMAIN_NAME,
    page:'',
    pageSize: '',
    next:'',
    deviceId: ''
}
var searchDeviceObj = {
    dkey: DOMAIN_NAME,
    page: '',
    pageSize:'',
    query:"name like '%es%'"
}
var propObj = {
    domainKey: DOMAIN_NAME,
    dataFormat: 'AS_IS',
    name:'testprop',
    value:'devicepropertytest',
    description: 'property test'
}
var listPropObj = {
    deviceId: deviceObj.deviceId,
    dkey: DOMAIN_NAME,
    pageSize: '',
    page: '',
    next: '',
    name: propObj.name
}
var devGroupObj = {
    domainKey:DOMAIN_NAME,
    groupId:'testgroup',
    name: 'test',
    description: 'test device group',
    individualBroadcast: true,
    groupEmail:'',
    groupPhone: '',
    ownerDeviceId: deviceObj.deviceId
}
var listGroupObj = {
    odid: deviceObj.deviceId,
    dkey:DOMAIN_NAME,
    page:'',
    pageSize:'',
    next:false,
    gid:''
}

var searchGroupObj = {
    dkey:DOMAIN_NAME,
    pageSize:'',
    query:"name like '%es%'"
}
var sendJsoncommandObj = { // Send JSON Command to Device
    dkey:DOMAIN_NAME,
    cid: 1000,
    command:  {
        deviceIds: [
            deviceObj.deviceId
        ],
        data: {test:'test'}
    }
}
var sendJsoncommandTempObj = { // Send JSON Command to Device by Template
    dkey:DOMAIN_NAME,
    cid: 1000,
    command:  {
        command: {
          deviceIds: [
            deviceObj.deviceId
          ],
          data: {test:'test'}
        },
        templateId: 'testTemp',
        system: true,
        mergeContent: {}
      }

    
}

var bJsonCommandDObj = { // broadcast JSON Command to Device
    cid: 1000,
    dkey:DOMAIN_NAME,
    command: {
        data: { test:'test' },
        deviceModel: "",
        deviceVersion: ""
      }
}
var bJsonCommandDTObj = { // broadcast JSON Command to Device by Template
    cid: 1000,
    dkey:DOMAIN_NAME,
    command: {
        deviceModel: "",
        deviceVersion: "",
        templateId: "testTemp",
        system: true,
        mergeContent: {}
      }
}
var rawCommandObj = { // send Raw Command to Device
    dkey:DOMAIN_NAME,
    command:{
        deviceIds: [
          deviceObj.deviceId
        ],
        data: "",
        format: "BASE64"
    }
}
var rawCommandGObj = { // send Raw Command to Device Group
    deviceId: deviceObj.deviceId,
    groupId: devGroupObj.groupId,
    dkey:DOMAIN_NAME,
    command: {
        data: "",
        format: "BASE64"
      }
}
var bRawCommandObj = { // broadcast Raw Command to Device
    dkey:DOMAIN_NAME,
    command:{
        deviceModel: "",
        deviceVersion: "",
        data: "",
        format: "BASE64"
      }
}
var bRawCommandGObj = { // broadcast Raw Command to Device Group
    deviceId:deviceObj.deviceId,
    groupId:devGroupObj.groupId,
    dkey:DOMAIN_NAME,
    command:{
        deviceModel: "",
        deviceVersion: "",
        data: "",
        format: "BASE64"
      }
}
var listCommandStatusObj = { // List Command Status 
    dkey:DOMAIN_NAME,
    page:'',
    pageSize:'',
    next:false,
    requestId:''
}
var listCommandSentStatusObj = { // List Command Sent Status
    dkey:DOMAIN_NAME,
    pageSize: '',
    page:'',
    next:false,
    deviceId:'',
    corrId:''
}
var sJsonCtoDinGObj = { // send JSON Command to Devices in Group 
    deviceId: deviceObj.deviceId,
    groupId:devGroupObj.groupId,
    commandId: 1000,
    dkey:DOMAIN_NAME,
    command: {
        data: {}
    }
}
var sJsonCtoDinGbyTObj = { // send JSON Command to Devices in Group using Template
    deviceId: deviceObj.deviceId,
    groupId:devGroupObj.groupId,
    commandId: 1000,
    dkey:DOMAIN_NAME,
    command: {
        command: {
          data: {}
        },
        templateId: "testTemp",
        system: true,
        mergeContent: {}
      }
}
var bJsonCtoDinGObj = {
    deviceId: deviceObj.deviceId,
    groupId:devGroupObj.groupId,
    commandId: 1000,
    dkey:DOMAIN_NAME,
    command: {
        data: {},
        deviceModel: "",
        deviceVersion: ""
      }
}
var bJsonCtoDinGbyTObj = {
    deviceId: deviceObj.deviceId,
    groupId:devGroupObj.groupId,
    commandId: 1000,
    dkey:DOMAIN_NAME,
    command: {
        command: {
          data: {},
          deviceModel: "",
          deviceVersion: ""
        },
        templateId: "testTemp",
        system: true,
        mergeContent: {}
      }
}
function testDeviceApi() {
    DOMAIN_NAME = $('#domainName').val();
    DEVICE_ID = $('#deviceId').val();

    upsertDeviceApi(deviceObj);
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

function upsertDeviceApi(obj) {
    var apiName=' Upsert Device '
    upsertDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);
        retrieveDeviceApi(deviceObj.deviceId);    
    })
}

function retrieveDeviceApi(did){
    var apiName = ' retrieve Device ';
    retrieveDevice(did,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        countAllDevicesApi()
    })
}
function countAllDevicesApi(){
    var apiName = ' Count All Devices '
    countAllDevices(function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        countDomainDeviceApi();
    })
}
function countDomainDeviceApi(){
    var apiName = ' Count Domain Devices ';
    countDomainDevice(DOMAIN_NAME,function (status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        listDevicesApi(listDeviceObj);
    })
}listPropObj
function listDevicesApi(obj) {
    var apiName = ' List Devices ';
    listDevices(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        searchDeviceApi(searchDeviceObj);
    })
}
function searchDeviceApi(obj){
    var apiName = ' Search Device ';
    searchDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        upsertDevicePropertyApi(propObj);
    })
}

function upsertDevicePropertyApi(obj){
    var apiName = ' Upsert Device Property ';
    upsertDeviceProperty(deviceObj.deviceId,obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        retrieveDevicePropertyApi(propObj);
    })
}
function retrieveDevicePropertyApi(obj) {
    obj['did']= deviceObj.deviceId;
    var apiName = ' Retrieve Device Property ';
    retrieveDeviceProperty(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        listDevicePropertyApi(listPropObj);
    })
}

function listDevicePropertyApi(obj) {
    var apiName = ' List Device Property ';
    listDeviceProperty(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        upsertDeviceGroupApi(devGroupObj);
    })
}
function upsertDeviceGroupApi(obj){
    var apiName = ' Upsert Device Group ';
    upsertDeviceGroup(obj,function(status,res) {
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        retrieveDeviceGroupApi(devGroupObj.ownerDeviceId,devGroupObj.groupId);
    })
}
function retrieveDeviceGroupApi(odid,gid){
    var apiName = ' Retrieve Device Group ';
    retrieveDeviceGroup(odid,gid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        countAllDeviceGroupApi();
    })
}
function countAllDeviceGroupApi(){
    var apiName = ' Count All Device Group ';
    countAllDeviceGroup(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        listDeviceGroupApi(listGroupObj);
    })
}
function listDeviceGroupApi(obj){
    var apiName = ' List Device Group ';
    listDeviceGroup(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        searchDeviceGroupApi(searchGroupObj);
    })
}
function searchDeviceGroupApi(obj){
    var apiName = ' Search Device Group ';
    searchDeviceGroup(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendJsonCommandtoDeviceApi(sendJsoncommandObj);
    })
}
function sendJsonCommandtoDeviceApi(obj){
    var apiName = ' Send JSON Command to Device ';
    sendJsonCommandtoDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendJsonCommandTemplatetoDeviceApi(sendJsoncommandTempObj);
    })
}
function sendJsonCommandTemplatetoDeviceApi(obj){
    var apiName = ' Send JSON Command to Device by Template ';
    sendJsonCommandTemplatetoDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        braodcastJsonCommandtoDeviceApi(bJsonCommandDObj)
    })
}
function braodcastJsonCommandtoDeviceApi(obj){
    var apiName = ' Broadcast JSON Command to Device ';
    braodcastJsonCommandtoDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        broadcastJsonCommandTemplatetoDeviceApi(bJsonCommandDTObj)
    })
}

function broadcastJsonCommandTemplatetoDeviceApi(obj){
    var apiName = ' Broadcast JSON Command to Device by Template ';
    broadcastJsonCommandTemplatetoDevice(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendRawCommandtoDevicesApi(rawCommandObj);
    }) 
}
function sendRawCommandtoDevicesApi(obj){
    var apiName = ' Send Raw Command to Device ';
    sendRawCommandtoDevices(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendRawCommandtoDeviceGroupApi(rawCommandGObj)
    })
}
function sendRawCommandtoDeviceGroupApi(obj){
    var apiName = ' Send Raw Command to Device Group ';
    sendRawCommandtoDeviceGroup(obj,function(status,res){
        if (status)  successConsole(apiName, res);
        else       errorConsole(apiName, res);  
        broadcastRawCommandtoDevicesApi(bRawCommandObj)
    })
}
function broadcastRawCommandtoDevicesApi(obj){
    var apiName = ' Broadcast Raw Command to Device ';
    broadcastRawCommandtoDevices(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        broadcastRawCommandtoDeviceGroupApi(bRawCommandGObj);
    })
}
function broadcastRawCommandtoDeviceGroupApi(obj){
    var apiName = ' Broadcast Raw Command to Device Group ';
    broadcastRawCommandtoDeviceGroup(obj,function(status,res){
        if (status) { 
            successConsole(apiName, res); 
            getCommmandStatusApi(res.id);  
        }
        else errorConsole(apiName, res); 
        listCommandStatusApi(listCommandStatusObj);
    })
}
function getCommmandStatusApi(reqId){
    var apiName = ' Get Command Status ';
    getCommmandStatus(reqId,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 

    })
}
function listCommandStatusApi(obj){
    var apiName = ' List Command Status ';
    listCommandStatus(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        listCommandSentStatusApi(listCommandSentStatusObj);
    })
}
function listCommandSentStatusApi(obj){
    var apiName = ' List Command Sent Status ';
    listCommandSentStatus(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendJsonCommandtoDevicesinGroupApi(sJsonCtoDinGObj)
    })
}

function sendJsonCommandtoDevicesinGroupApi(obj){
    var apiName = ' send JSON Command to Devices in Group ';
    sendJsonCommandtoDevicesinGroup(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        sendJsonCommandtoDeviceGroupinTempApi(sJsonCtoDinGbyTObj);
    })
}
function sendJsonCommandtoDeviceGroupinTempApi(obj){
    var apiName = ' Send JSON Command to Devices in Group by Template ';
    sendJsonCommandtoDeviceGroupinTemp(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        braodcastJsonCommandtoDevicesinGroupApi(bJsonCtoDinGObj);
    })
}
function braodcastJsonCommandtoDevicesinGroupApi(obj){
    var apiName = ' Broadcast JSON Command to Devices in Group ';
    braodcastJsonCommandtoDevicesinGroup(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        broadcastJsonCommandtoDeviceGroupinTempApi(bJsonCtoDinGbyTObj)

    })
}
function broadcastJsonCommandtoDeviceGroupinTempApi(obj){
    var apiName = ' Broadcast JSON Command to Devices in Group by Template ';
    broadcastJsonCommandtoDeviceGroupinTemp(obj,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);   
        deleteDeviceGroupApi(deviceObj.deviceId,devGroupObj.groupId)
    })
}
function deleteDeviceGroupApi(odid,gid){
    var apiName = ' Delete Device Group '
    deleteDeviceGroup(odid,gid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 

        deleteDeviceGroupsApi(deviceObj.deviceId);
    })
}
function deleteDeviceGroupsApi(odid){
    var apiName = ' Delete Device Groups ';
    deleteDeviceGroups(odid,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);   
        deleteAllDeviceGroupsApi();
    })
}
function deleteAllDeviceGroupsApi(){
    var apiName = ' Delete All Device Groups ';
    deleteAllDeviceGroups(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);   
        deleteDevicePropertyApi(deviceObj.deviceId,propObj.name);
    })
}
function deleteDevicePropertyApi(did,name){
    var apiName = ' Delete Device Property ';
    deleteDeviceProperty(did,name,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res);   
        deleteAllDevicePropertyApi(deviceObj.deviceId);
    })
}
function deleteAllDevicePropertyApi(did){
    var apiName = ' Delete All Device Property ';
    deleteAllDeviceProperty(did,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        deleteDeviceApi(deviceObj.deviceId);
    })
}
function deleteDeviceApi(did){
    var apiName = ' Delete Device ';
    deleteDevice(did,DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 
        deleteDomainDevicesApi()
    })
}
function deleteDomainDevicesApi(){
    var apiName = ' Delete Domain Devices '
    deleteDomainDevices(DOMAIN_NAME,function(status,res){
        if (status) successConsole(apiName, res);
        else       errorConsole(apiName, res); 

    })
}