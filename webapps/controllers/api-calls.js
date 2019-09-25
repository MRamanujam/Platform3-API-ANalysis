
$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {

    if (DEBUG) {
        $(".platformBody .container").append('<br><code style="">DEBUG MODE: <b>' + ajaxOptions.url + '</b><br>' + JSON.stringify(xhr.responseJSON) + '</code>');
    }

    if (xhr.status === 417 && xhr.responseJSON.code === 'INVALID_AUTH_TOKEN') {
        Cookies.remove('user_details');
        document.location = '/login';
    }

});
$(document).ready(function () {

    $.ajaxSetup({
        global: false,
        crossDomain: true,
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
});


function getAPIFiles(cbk) {
    $.ajax({
        url: "/getfileapi",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getPlatformSystem(cbk) {
    $.ajax({
        url: API_BASE_PATH + "/build",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}



//login, register, forget password

function loginCall(email, password, cbk) {
    var data = {
        userId : email,
        password: password
    }
    $.ajax({
        url: API_BASE_PATH + "/system/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function activateLicense(accKey, licKey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/system/activate/"+accKey+"/"+licKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function switchDomainCall(domainKey, token, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/domain/login/switch/" + token + "/" + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function loginOutCall(cbk) {
    $.ajax({
        url: API_BASE_PATH + "/system/logout?atoken=" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            cbk(true);
        },
        error: function (e) {
            cbk(false);
        }
    });

}

function loginAsCall(email, password, key, id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/domain/loginas/" + email + "/" + password + "/" + key + '?userEmail=' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function resetPasswordCall(email, cbk) {

    var str = DOMAIN_KEY ? '?targetDomainKey=' + DOMAIN_KEY : '';

    $.ajax({
        url: API_BASE_PATH + "/domain/password/reset/" + email + str,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function registerCall(data, cbk) {

    var str = DOMAIN_KEY ? '?targetDomainKey=' + DOMAIN_KEY : '';
    $.ajax({
        url: API_BASE_PATH + "/domain/register" + str,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

//Property Calls

function getUserProperty(name, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/user/property/get/" + API_TOKEN + "/" + USER_OBJ.user.email + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getDomainProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/domain/property/get/" + API_TOKEN + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function getSystemProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/system/property/get/" + API_TOKEN + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDomainProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/domain/property/delete/" + API_TOKEN + "/" + name,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function upsertDomainProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function upsertSystemProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/system/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function linkDomain(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/link/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function unlinkDomain(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/unlink/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


//Message Definition, Record Definition & Rules Engine
function listMessageRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/rules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listScheduleRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/srules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listNamedRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/nrules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listBinaryRules(pageSize, direction, type, cbk) {

    var data = {};
    if (type && direction) {
        data = {
            type: type,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/brules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listMessageSpec(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/mspec/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listRecordSpec(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/storage/spec/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getDomainrule(cbk) {

    var data = {};


    $.ajax({
        url: API_BASE_PATH + "/drules/get/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateDomainRuleCode(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":""}

    $.ajax({
        url: API_BASE_PATH + "/drules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateMessageRuleCode(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":"","name":"Flow Meter Message","messageId":700}

    $.ajax({
        url: API_BASE_PATH + "/rules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateScheduleRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","pattern":"0 30 6 ? * * *","id":700}

    $.ajax({
        url: API_BASE_PATH + "/srules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function updateBinaryRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","pattern":"0 30 6 ? * * *","id":700}

    $.ajax({
        url: API_BASE_PATH + "/brules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateNamedRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}


    $.ajax({
        url: API_BASE_PATH + "/nrules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteNamedRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/nrules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function deleteBinaryRule(data, cbk) {

    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}

    $.ajax({
        url: API_BASE_PATH + "/brules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteScheduleRule(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}

    $.ajax({
        url: API_BASE_PATH + "/srules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveNamedRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/nrules/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveScheduleRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/srules/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteMessagRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/rules/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function createUpdateMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function createUpdateRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

//Script Console


function executeConsoleScript(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/script/execute/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


//User Management

function upsertUserProperty(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertUser(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveUser(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteUser(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/user/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function getUserList(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/list/" + API_TOKEN + '/' + data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}



//Asset Management

function upsertAsset(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveAsset(id,dkey, cbk) {
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/asset/get/"+id+"?"+params,
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function countAllAsset(cbk) {
    $.ajax({
        url: API_BASE_PATH+"/asset/countall?atoken="+API_TOKEN,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}
function countDomainAsset(dkey,cbk) {
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH+"/asset/count?"+params,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}

function listDomainAsset(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchAsset(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function deleteAsset(aid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/asset/delete/" +aid+ '?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteAllAsset(dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/asset/deleteall?"+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function linkAssetDevice(aid, did, cbk) {
    
    $.ajax({
        url: API_BASE_PATH + "/asset/device/link/" + aid + '/'  + did+ '?atoken='+ API_TOKEN ,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function unlinkAssetDevice(aid, did, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/device/unlink/" + aid + '/'  + did+ '?atoken='+ API_TOKEN ,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function listAssetDevice(aid, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/device/list/" + aid + '?atoken='+ API_TOKEN ,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}



function storeAssetProperty(data,cbk){

    $.ajax({
        url: API_BASE_PATH+"/asset/property/upsert/"+data.aid+"?atoken="+API_TOKEN,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    });
}

function getAssetProperty(aid,name,dkey,cbk) {
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/asset/property/get/"+aid+"/"+name+"?"+params,
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}

function listAssetProperty(aid,cbk) {
   
    $.ajax({
        url: API_BASE_PATH + "/asset/property/list/" + aid + '?atoken='+ API_TOKEN ,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteAssetProperty(aid,pName,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/property/delete/' +aid+ '/'+pName+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteAllAssetProperty(aid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/property/deleteall/'+aid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertAssetGroup(data,cbk){

    $.ajax({
        url: API_BASE_PATH + '/asset/group/upsert?atoken='+API_TOKEN,
        type: 'POST',
        data: JSON.stringify(data),
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    })
}

function retrieveAssetGroup(oaid,gid,dkey,cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/asset/group/get/"+oaid+"/"+gid+"?"+params,
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function countAllAssetGroup(cbk) {
    $.ajax({
        url: API_BASE_PATH+"/asset/group/count?atoken="+API_TOKEN,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}


function deleteAllAssetGroups(dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/group/remove?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteAssetGroups(oaid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    
    $.ajax({
        url: API_BASE_PATH + '/asset/group/remove/'+oaid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteAssetGroup(oaid,gid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/group/remove/'+oaid+'/'+gid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listAssetGroup(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/group/list/"+data.oaid+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function searchAssetGroup(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/group/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}



function upsertAssetGroupMem(data,cbk){
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    if(data.dkey != '') params["dkey"] = data.dkey;
    $.ajax({
        url: API_BASE_PATH + '/asset/group/member/add/'+data.oaid+'/'+data.gid+'/'+data.aid+'?'+params,
        type: 'GET',
        // data: JSON.stringify(data),
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    })

}

function retrieveAssetGroupMem(data,cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    if(data.dkey != '') params["dkey"] = data.dkey;
    $.ajax({
        url: API_BASE_PATH + '/asset/group/member/get/'+data.oaid+'/'+data.gid+'/'+data.aid+'?'+params,
        type: 'GET',
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    })
}

function countAssetGroupMem(data,cbk){

    var params = {atoken:API_TOKEN};
    params = $.param(params);
    if(data.dkey != '') params["dkey"] = data.dkey;
    $.ajax({
        url: API_BASE_PATH + '/asset/group/member/count/'+data.oaid+'/'+data.gid+'?'+params,
        type: 'GET',
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    })

}

function removeAssetGroupMems(oaid,gid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/group/member/remove/'+oaid+'/'+gid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function removeAssetGroupMem(oaid,gid,aid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/asset/group/member/remove/'+oaid+'/'+gid+'/'+aid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listAssetGroupMem(data,cbk){
    
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/group/member/list/"+data.oaid+"/"+data.gid+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchAssetGroupMem(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/asset/group/member/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}
// end of Asset Management


// Device Management

function upsertDevice(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.domainKey != '') params["domainkey"] = data.domainKey;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + '/device/upsert?'+params,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDevice(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + '/device/get/' +id +'?atoken=' +API_TOKEN,
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}
function countAllDevices(cbk) {
    $.ajax({
        url: API_BASE_PATH+'/device/countall?atoken='+API_TOKEN,
        type:'POST',
        success: function(data){
            cbk(true,data);
        },
        error:function(e) {
            cbk(false,null);
        }

    })
}
function countDomainDevice(dkey,cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH+'/device/count?'+params,
        type:'POST',
        success: function(data){
            cbk(true,data);
        },
        error:function(e) {
            cbk(false,null);
        }

    })
}
function listDevices(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params['page'] = data.page;
    if(data.pageSize != '') params['pageSize'] = data.pageSize;
    if(data.next != '') params['next'] = data.next;
    if(data.deviceId != '') params['deviceId'] = data.deviceId;

    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH+'/device/list?'+params,
        type:'GET',
        success: function(data){
            cbk(true,data);
        },
        error:function(e) {
            cbk(false,null);
        }
    })
}

function searchDevice(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params['pageSize'] = data.pageSize;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH+'/device/search?'+params,
        type:'POST',
        contentType:'application/json',
        data: JSON.stringify(data.query),
        success: function(data){
            cbk(true,data);
        },
        error:function(e) {
            cbk(false,null);
        }
    })
}

function deleteDevice(did,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/device/delete/" +did+'?' +params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}
function deleteDomainDevices(dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/device/deleteall?" +params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}

function upsertDeviceProperty(did,data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.domainKey != '') params["dkey"] = data.domainKey;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/device/property/upsert/"+did+"?" + params,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function retrieveDeviceProperty(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.domainKey != '') params["dkey"] = data.domainKey;
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/device/property/get/"+data.did+"/" +data.name+ "?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function listDeviceProperty(data,cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params['page'] = data.page;
    if(data.pageSize != '') params['pageSize'] = data.pageSize;
    if(data.next != '') params['next'] = data.next;
    if(data.name != '') params['name'] = data.name;

    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH+'/device/property/list/'+data.deviceId+'?'+params,
        type:'GET',
        success: function(data){
            cbk(true,data);
        },
        error:function(e) {
            cbk(false,null);
        }
    })
}
function deleteDeviceProperty(did,name,dkey,cbk){
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/device/property/delete/'+did+'/'+name+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}
function deleteAllDeviceProperty(did,dkey,cbk){
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/device/property/deleteall/'+did+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}
function upsertDeviceGroup(data,cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + '/device/group/upsert?'+params,
        type: 'POST',
        data: JSON.stringify(data),
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e.message);
        }
    })
}


function retrieveDeviceGroup(odid,gid,dkey,cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/device/group/get/"+odid+"/"+gid+"?"+params,
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function countAllDeviceGroup(dkey,cbk) {
    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH+"/device/group/count?"+params,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}


function deleteAllDeviceGroups(dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/device/group/remove?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDeviceGroups(odid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/device/group/remove/'+odid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDeviceGroup(odid,gid,dkey, cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + '/device/group/remove/'+odid+'/'+gid+'?'+params,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listDeviceGroup(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.gid != '') params['gid'] = data.gid;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/device/group/list/"+data.odid+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function searchDeviceGroup(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/device/group/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


function sendJsonCommandtoDevice(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);

    // {
    //     "deviceIds": [
    //       "string"
    //     ],
    //     "data": {}
    // }
    $.ajax({
        url: API_BASE_PATH + "/device/command/send/"+data.cid+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendJsonCommandTemplatetoDevice(data,cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);

    // {
    //     "command": {
    //       "deviceIds": [
    //         "string"
    //       ],
    //       "data": {}
    //     },
    //     "templateId": "string",
    //     "system": true,
    //     "mergeContent": {}
    //   }  



    $.ajax({
        url: API_BASE_PATH + "/device/command/send/template/"+data.cid+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function braodcastJsonCommandtoDevice(data,cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "data": {},
    //     "deviceModel": "string",
    //     "deviceVersion": "string"
    //   }
    $.ajax({
        url: API_BASE_PATH + "/device/command/broadcast/"+data.cid+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function broadcastJsonCommandTemplatetoDevice(data,cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);

    // {
    //     "deviceModel": "string",
    //     "deviceVersion": "string",
    //     "templateId": "string",
    //     "system": true,
    //     "mergeContent": {}
    // }

    $.ajax({
        url: API_BASE_PATH + "/device/command/broadcast/template/"+data.cid+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendRawCommandtoDevices(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "deviceIds": [
    //       "string"
    //     ],
    //     "data": "string",
    //     "format": "BASE64"
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/command/send/raw?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendRawCommandtoDeviceGroup(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "data": "string",
    //     "format": "BASE64"
    //  }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/send/raw/"+data.deviceId+"/"+data.groupId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function broadcastRawCommandtoDevices(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "deviceModel": "string",
    //     "deviceVersion": "string",
    //     "data": "string",
    //     "format": "BASE64"
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/command/broadcast/raw?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function broadcastRawCommandtoDeviceGroup(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "data": "string",
    //     "format": "BASE64",
    //     "deviceModel": "string",
    //     "deviceVersion": "string"
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/broadcast/raw/"+data.deviceId+"/"+data.groupId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getCommmandStatus(reqId,dkey,cbk) {

    var params = $.param({atoken:API_TOKEN});
    if(dkey != ''){
        params = $.param({ atoken:API_TOKEN,dkey:dkey});   
    }
    $.ajax({
        url: API_BASE_PATH + "/device/command/status/"+reqId+"?"+params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listCommandStatus(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.requestId != '') params['requestId'] = data.requestId;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/device/command/status/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function listCommandSentStatus(data,cbk){

    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.deviceId != '') params['deviceId'] = data.deviceId;
    if(data.corrId != '') params['corrId'] = data.corrId;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/device/command/sent/status/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


function sendJsonCommandtoDevicesinGroup(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "data": {}
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/send/"+data.deviceId+"/"+data.groupId+"/"+data.commandId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendJsonCommandtoDeviceGroupinTemp(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "command": {
    //       "data": {}
    //     },
    //     "templateId": "string",
    //     "system": true,
    //     "mergeContent": {}
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/send/template/"+data.deviceId+"/"+data.groupId+"/"+data.commandId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function braodcastJsonCommandtoDevicesinGroup(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "data": {},
    //     "deviceModel": "string",
    //     "deviceVersion": "string"
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/broadcast/"+data.deviceId+"/"+data.groupId+"/"+data.commandId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function broadcastJsonCommandtoDeviceGroupinTemp(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
  
    // {
    //     "command": {
    //       "data": {},
    //       "deviceModel": "string",
    //       "deviceVersion": "string"
    //     },
    //     "templateId": "string",
    //     "system": true,
    //     "mergeContent": {}
    //   }

    $.ajax({
        url: API_BASE_PATH + "/device/group/command/broadcast/template/"+data.deviceId+"/"+data.groupId+"/"+data.commandId+"?" + params,
        type: 'POST',
        contentType:'application/json',
        data: JSON.stringify(data.command),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// end of Device Management


//ALEXA Management

function upsertAlexa(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/alexa/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getAlexa(aid,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/alexa/get/"+aid+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function countAllAlexa(cbk){

    $.ajax({
        url: API_BASE_PATH + "/alexa/countall?atoken="+API_TOKEN,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function countDomainAlexa(dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/alexa/count?"+params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listAlexa(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.eid != '') params["eid"] = data.eid;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/alexa/list?"+params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchAlexa(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/alexa/search?"+params,
        type: 'POST',
        data: JSON.stringify(data.query),
        contentType:'application/json',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteAlexa(aid,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/alexa/delete/" + aid + "?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteAllAlexa(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/alexa/deleteall?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//end of Alexa API

// Binary Rules Management

function upsertBRules(data,cbk){
    $.ajax({
        url: API_BASE_PATH + "/brules/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getBRules(type,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/brules/get/"+type+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteBRules(type,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/brules/delete/" + type + "?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteAllBRules(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/brules/deleteall?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countAllBRules(cbk){
    $.ajax({
        url: API_BASE_PATH + "/brules/count/all?atoken=" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function countBRules(dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    $.ajax({
        url: API_BASE_PATH + "/brules/count?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function listBRules(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.page != '') params["page"] = data.page;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.type != '') params["type"] = data.type;
   
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/brules/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function searchBRules(data,cbk){
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
   
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/brules/search?" + params,
        type: 'POST',
        contentType:'applicaton/json',
        data:JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function invokeBRules(type,mid,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
  
    params = $.param(params); 

    $.ajax({
        url: API_BASE_PATH + "/brules/invoke/"+type+"/"+mid+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// end of Binary Rules API


// Rules APIs Management

function upsertMessageRule(data,cbk){
    $.ajax({
        url: API_BASE_PATH + "/rules/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getMessageRule(specId,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
  
    params = $.param(params); 

    $.ajax({
        url: API_BASE_PATH + "/rules/get/"+specId+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteMessageRule(specId,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/rules/delete/" + specId + "?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteAllMessageRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/delete/all?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countAllMessageRule( cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/count/all?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countMessageRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/count?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error 
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listMessageRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != '') params["next"] = data.next;
    if(data.specId != '') params["specId"] = data.specId;

    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listMessageRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.specId != '') params["specId"] = data.specId;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function listNamedRuleSpecs(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.specId != '') params["specId"] = data.specId;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/list/specs?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function invokeMessageRule(specId,messageId,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/invoke/"+specId+"/"+messageId+"?" + params,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchMessageRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/rules/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data:JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
// end of Rules API


// Scheduled Rules Management


function upsertScheduledRule(data,cbk){
    $.ajax({
        url: API_BASE_PATH + "/srules/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getScheduledRule(ruleId,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
  
    params = $.param(params); 

    $.ajax({
        url: API_BASE_PATH + "/srules/get/"+ruleId+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteScheduledRule(ruleId,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/srules/delete/" + ruleId + "?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteAllScheduledRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/delete/all?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countAllScheduledRule(cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/count/all?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countScheduledRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/count?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error 
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listScheduledRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != '') params["next"] = data.next;
    if(data.ruleId != '') params["ruleId"] = data.ruleId;

    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listScheduledRuleIds(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.ruleId != '') params["ruleId"] = data.ruleId;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/list/ids?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function invokeScheduledRule(ruleId,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/invoke/"+ruleId+"?" + params,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchScheduledRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/srules/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data:JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// end of Scheduled Rule API

// Named Rule Management



function upsertNamedRule(data,cbk){
    $.ajax({
        url: API_BASE_PATH + "/nrules/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getNamedRule(name,dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
  
    params = $.param(params); 

    $.ajax({
        url: API_BASE_PATH + "/nrules/get/"+name+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteNamedRule(name,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/nrules/delete/" + name + "?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteAllNamedRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/delete/all?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countAllNamedRule(cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/count/all?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function countNamedRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/count?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error 
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listNamedRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != '') params["next"] = data.next;
    if(data.name != '') params["name"] = data.name;

    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/list?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function listNamedRuleNames(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.page != '') params["dkey"] = data.dkey;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    if(data.next != false) params["next"] = true;
    if(data.name != '') params["name"] = data.name;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/list/names?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function invokeNamedRule(name,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/invoke/"+name+"?" + params,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchNamedRules(data, cbk) {
    var params = {atoken:API_TOKEN};
    if(data.dkey != '') params["dkey"] = data.dkey;
    if(data.load != '') params["load"] = data.load;
    if(data.pageSize != '') params["pageSize"] = data.pageSize;
    
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/nrules/search?" + params,
        type: 'POST',
        contentType:'application/json',
        data:JSON.stringify(data.query),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

// end of Named Rules API

// Domain Rules Management


function upsertDomainRule(data,cbk){
    $.ajax({
        url: API_BASE_PATH + "/drules/upsert?atoken=" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function getDomainRule(dkey,cbk){
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
  
    params = $.param(params); 

    $.ajax({
        url: API_BASE_PATH + "/drules/get?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}
function deleteDomainRule(dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);

    $.ajax({
        url: API_BASE_PATH + "/drules/delete?" + params,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function countAllDomainRules(cbk) {
    var params = {atoken:API_TOKEN};
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/drules/count/all?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function invokeDomainRule(messageId,dkey, cbk) {
    var params = {atoken:API_TOKEN};
    if(dkey != '') params["dkey"] = dkey;
    
    params = $.param(params);
    
    $.ajax({
        url: API_BASE_PATH + "/drules/invoke/"+messageId+"?" + params,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// end of Domian Rules API















function getDeviceMessage(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/message/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function upsertDeviceModelProperty(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDeviceModelProperty(id, name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/property/get/" + API_TOKEN + "/" + id + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function simulateDeviceMessage(id, data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/BOODSKAP/1.0/" + id + '?type=JSON',
        data: JSON.stringify(data),
        contentType: "text/plain",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertDeviceModel(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveDeviceModel(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDeviceModel(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/dmodel/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}

 
function getDeviceModel(data, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/dmodel/list/" + API_TOKEN + '/' + data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


















//Templates

function listTemplates(pageSize, system, cbk) {

    var data = {
        system: system
    };

    $.ajax({
        url: API_BASE_PATH + "/templates/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


function retreiveTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/templates/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function downloadTemplates(system, cbk) {

    var data = {
        system: system
    };

    $.ajax({
        url: API_BASE_PATH + "/templates/download/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function upsertTemplate(data, system, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/templates/upsert/" + API_TOKEN + '?system=' + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteTemplate(id, system, cbk) {

    var data = {
        system: system
    };
    $.ajax({
        url: API_BASE_PATH + "/templates/delete/" + API_TOKEN + "/" + id + "?system=" + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


//Events & Notification

function upsertEvent(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/event/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveEvent(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/event/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteEvent(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/event/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function listEventsApi(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/event/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function registerEvent(eid, channel, address, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/eventreg/register/" + API_TOKEN + "/" + eid + "/" + channel + "/" + address,
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function unregisterEvent(eid, channel, address, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/eventreg/unregister/" + API_TOKEN + "/" + eid + "/" + channel + "/" + address,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listNotificationApi(id, type, pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/eventreg/list/" + API_TOKEN + "/" + id + "/" + type + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listFCMDeviceApi(pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/device/fcm/list/" + API_TOKEN + "/" + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

//Firmware

function listFirmwareApi(id, pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/firmware/list/" + API_TOKEN + "/" + id + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function deleteFirmware(dmid, version, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/firmware/delete/" + API_TOKEN + "/" + dmid + "/" + version,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function downloadFirmware(dmid, version, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/ota/update/download/" + DOMAIN_KEY + "/" + API_KEY + "/" + dmid + "/" + version,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}




//Elastic Search

function searchByQuery(id, type, data, cbk) {

    if(id){
        data['specId'] = id
    }
    data['type'] = type;

    $.ajax({
        url: API_BASE_PATH + "/elastic/search/query/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function findByID(id, type, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/elastic/find/" + API_TOKEN + '/' + type + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function searchByTemplate(id, type, data, cbk) {

    // https://api.boodskap.io/search/template/41f8993d-5a35-4f14-9512-862878dd27a3/MESSAGE/?id=500001000
    $.ajax({
        url: API_BASE_PATH + "/elastic/search/template/" + API_TOKEN + '/' + type + '?specId=' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

// function searchDevice(data, cbk) {

//     data['type'] = 'DEVICE';

//     $.ajax({
//         url: API_BASE_PATH + "/elastic/search/query/" + API_TOKEN,
//         data: JSON.stringify(data),
//         contentType: "application/json",
//         type: 'POST',
//         success: function (data) {
//             //called when successful
//             cbk(true, data);
//         },
//         error: function (e) {
//             //called when there is an error
//             //console.log(e.message);
//             cbk(false, e);
//         }
//     });
// }


//Commands
function getCommandStatus(did, corid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/status/" + API_TOKEN + '/' + did + "/" + corid,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendCommandProperty(did, cmdid, pname, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/property/send/" + API_TOKEN + '/' + did + "/" + cmdid + "/" + pname,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendCommandTemplate(did, cmdid, tid, system, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/template/send/" + API_TOKEN + '/' + did + "/" + cmdid + "/" + tid + "/" + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendRawCommand(did, cmdtype, command, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/raw/send/" + API_TOKEN + '/' + cmdtype,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// Global Property
function insertGlobalProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/insert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function insertGlobalPropertyWithId(data, id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/insert/" + API_TOKEN+'?id='+id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function updateGlobalProperty(data, id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/update/" + API_TOKEN + '/' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getGlobalProperty(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + DOMAIN_KEY,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getGlobalPropertyWithKey(id,dkey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + dkey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getDomainGlobalProperty(id, domainKey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteGlobalProperty(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//get domain settings

function getDomainSettings(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/settings/get/" + id + "/" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function setDomainSettings(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/settings/set/" + id + "/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// Machine Learning

function upsertDataModel(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function insertMLData(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/insert/" + API_TOKEN + "/" + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function trainMLData(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/train/" + API_TOKEN + "/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteMLDataModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLList(pageCount, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/list/" + API_TOKEN + '/' + pageCount,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLDataList(id, data, pageCount, cbk) {

    var data = {
        direction: 'NEXT'
    };
    if (lastId) {
        data['lastId'] = lastId;
    }
    $.ajax({
        url: API_BASE_PATH + "/ml/list/data/" + API_TOKEN + '/' + id + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//face Recognition


function getMachineLearningFRList(pageCount, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/list/" + API_TOKEN + '/' + pageCount,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertFRModel(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function deleteFRModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function trainMLFRData(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/train/" + API_TOKEN + "/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningFRModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function getMachineLearningFRLabelsList(id, pageCount, lastId, cbk) {
    var data = {};
    if (lastId) {
        data = {
            lastLabel: lastId
        }
    }

    $.ajax({
        url: API_BASE_PATH + "/fr/list/labels/" + API_TOKEN + '/' + id + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningFRLabelsImageList(id, label, pageCount, lastId, cbk) {
    var data = {};
    if (lastId) {
        data = {
            lastLabel: lastId
        }
    }

    $.ajax({
        url: API_BASE_PATH + "/fr/image/list/" + API_TOKEN + '/' + id + '/' + label + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Widgets

function upsertWidget(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function importWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/import/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteImportWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/imported/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Vertical

function upsertVertical(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function importVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/import/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteImportVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/imported/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function searchVerticals(version, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/search/query?version=" + version,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//**************************************************
//Geofence Api calls
//**************************************************

function deleteEntityGeofence(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/elastic/remove/" + API_TOKEN + "/GEOFENCE/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//Domain User Group

function upsertDomainUserGroup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDomainUserGroup(gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/get/" + API_TOKEN + "/" + gid,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteDomainUserGroup(gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/delete/" + API_TOKEN + "/" + gid,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listDomainUserGroupUsers(gid, pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/listmembers/" + API_TOKEN + "/" + gid + '/' + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function addUserToDomainGroup(data, gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/add/" + API_TOKEN + '/' + gid,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function removeUserToDomainGroup(data, gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/remove/" + API_TOKEN + '/' + gid,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//FILES
function deleteFile(fid, ispublic, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/files/delete/" + API_TOKEN + "/" + fid + '?ispublic=' + ispublic,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function updateFileInfo(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/files/update/" + API_TOKEN + "/" + id,
        data: data,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}




//GROOVY
function groovyCompile(isPublic, isOpen, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/groovy/compile/script/" + API_TOKEN + "/" + isPublic + "/" + isOpen,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function uploadGroovyScript(isPublic, isOpen, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/groovy/upload/script/" + API_TOKEN + "/" + isPublic + "/" + isOpen,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// SQL Calls


function executeSQLQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/exec/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function executeSQLTemplateQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/exec/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function checkSQLAccess(dkey, cbk) {

    var domainKey = '';

    if(dkey){
        domainKey = '?dkey=' + dkey;
    }

    $.ajax({
        url: API_BASE_PATH + "/sql/access/check/" + API_TOKEN + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function setSQLAccess(dkey, state, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/access/set/" + API_TOKEN + '/' + dkey + '/' + state,
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listSQLTemplates(pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/list/" + API_TOKEN + "/" + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}



function retreiveSQLTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertSQLTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/sql/template/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteSQLTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function createSQLTable(data, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/create/" + API_TOKEN+'?'+ignore,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function addSQLTableField(table, data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/sql/table/field/add/" + API_TOKEN + "/"+table,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function createSQLTableFieldIndex(table, field, sortDesc, ignore, cbk) {

    var sort = 'sortDesc=false';

    if(sortDesc){
        sort = 'sortDesc=true'
    }

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/index/create/" + API_TOKEN + "/"+table +"/"+field+'?'+ignore+'&'+sort,
        contentType: "application/json",
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function dropSQLTable(table, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }

    $.ajax({
        url: API_BASE_PATH + "/sql/table/drop/" + API_TOKEN + "/" + table+'?'+ignore,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function dropSQLTableField(table,field, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/table/field/drop/" + API_TOKEN + "/" + table +"/"+field,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}



function dropSQLTableIndex(table, field, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/index/drop/" + API_TOKEN + "/" + table+"/"+field+'?'+ignore,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

//DB Calls

function checkDBAccess(dkey, cbk) {

    var domainKey = '';

    if(dkey){
        domainKey = '?dkey=' + dkey;
    }

    $.ajax({
        url: API_BASE_PATH + "/db/access/check/" + API_TOKEN + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function setDBAccess(dkey, state, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/access/set/" + API_TOKEN + '/' + dkey + '/' + state,
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function retreiveDBTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertDBTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/db/template/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteDBTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function executeDBTemplateQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/exec/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function executeDBQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/exec/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function syncDBPool(pool,async, cbk) {

    var str = '';

    if(async){
        str = '&async=true'
    }else{
        str = '&async=false'
    }

    $.ajax({
        url: API_BASE_PATH + "/db/pool/sync/" + API_TOKEN+'?pool='+pool+str,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function deleteDBPool(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/pool/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function retreiveDBPool(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/pool/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertDBPool(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/db/pool/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Plugins


function retreivePlugin(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/plugin/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function retreivePluginConfiguration(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/plugin/config/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function updatePluginConfig(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/plugin/config/set/" + API_TOKEN + '/' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//Lookup



function putLookup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/lookup/put/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function getLookup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/lookup/get/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}