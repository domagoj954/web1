//------include config.js------------------------------------------------
/*var url = "https://dev.vub.zone/sandbox/router.php";
var projekt = "p_dmacek";
var perPage = 10;*/

document.writeln("<script type='text/javascript' src='config.js'></script>");

//------hendlanje link button-a----------------------------------
$("#loginBtn").click(function () {
    $("#container").html(loginForm);
});

$("#fanoviBtn").click(function () {
    showFanovi();
});

$("#kluboviBtn").click(function () {
    showKlubovi();
});


$("#igraciBtn").click(function () {
    showIgraci();
});

$("#treneriBtn").click(function () {
    showTreneri();
});

$("#predsjedniciBtn").click(function () {
    showPredsjednici();
});

$("#stadioniBtn").click(function () {
    showStadioni();
});

$("#ligeBtn").click(function () {
    showLige();
});

$("#logoutBtn").click(function () {
    logout();
});


//------------refersh-------------------------------------------------
$(function () {
    refresh();
});

//------------refersh--------------------------------------------------
function refresh() {
    $.ajax({
        type: 'POST',
        url: url,
        data: { "projekt": "p_dmacek", 
                "procedura": "p_refresh" 
              },
        success: function (data) {
            var jsonBody = JSON.parse(data);
            if (jsonBody.h_errcode !== 999){
                var podaci = '<small>ID:' + jsonBody.ID + '<br>' + 'ime prezime:' + jsonBody.IME + ' ' + jsonBody.PREZIME + '<br>' + 'email:' + jsonBody.EMAIL + '</small>';
                $("#podaci").html(podaci); //ID IME PREZIME velikim slovima
            }  
        },
        error: function (xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        },
        async: true

    });
}

//----------------------------------------------------------------
function pagination(pageNmb, perPage, count) {
    //ne treba prikazivati ništa
    if (count < perPage) {
        return '';
    } else {
        var quotient = Math.ceil(count / perPage);
    }
    var next = pageNmb + 1;
    var prev = pageNmb - 1;
    var pagination = '<div class="float-right pagination">';

    //treba prikazati previous
    if (pageNmb > 1) {
        pagination += '<ul class="pagination"><li class="page-item "><a class="page-link" onclick="showFanovi(' + prev + ')" href="javascript:void(0)">‹</a></li>';
    }

    for (i = pageNmb; i < pageNmb + 8; i++) {
        pagination += '<li class="page-item"><a class="page-link" onclick="showFanovi(' + i + ')" href="javascript:void(0)">' + i + '</a></li>';
    }

    pagination += '<li class="page-item"><a class="page-link"  href="javascript:void(0)">...</a></li>';

    pagination += '<li class="page-item"><a class="page-link" onclick="showFanovi(' + quotient + ')" href="javascript:void(0)">' + quotient + '</a></li>';

    pagination += '<li class="page-item"><a class="page-link" onclick="showFanovi(' + next + ')" href="javascript:void(0)">›</a></li>';
    pagination += '</ul></div>';
    return pagination;
}
//-----------ajaxSetup-------------------------------------------------------
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});



