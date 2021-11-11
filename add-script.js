var fbEditor = '';
var formBuilder = '';
jQuery(function($) {
    fbEditor = document.getElementById('build-wrap');
    $(document).on('click', '.save-template', function() {
        let data = {
            "list_key": "AddTable",
            "master_table_name": $(".table_name").val(),
            "master_form_name": $(".form_name").val(),
            "company_id": $(".company").val(),
            "created_by": "1",
            "master_table_json": formBuilder.formData
        }
        console.log(data);
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "success" }, { "functionName": "error" })
    });

    if (getParameter('id')) {
        let data = {
            "query": 'fetch',
            "key": 'master_table',
            "column": {
                "*": "*"
            },
            "condition": {
                "status": '1',
                "master_table_id": getParameter('id')
            },
            "like": ""
        }
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayList", "param1": "table" });
    } else
        formBuilder = $(fbEditor).formBuilder();
});

function displayList(params) {
    var options = {
        formData: params[0].master_table_json,
        dataType: 'json'
    };
    console.log(options.formData);
    formBuilder = $(fbEditor).formBuilder(options);
    $(".table_name").val(params[0].master_table_name);
    $(".company").val(params[0].company_id);
}

function success(params) {
    console.log(params);
    location.reload();
}


function error(params) {
    console.log(params);
    alert(JSON.stringify(params))
}

$('table.display.dataTable th.editable.cloumnshow').each(function() {
    let c = $(this).attr('class');
    let d = '';
    try {
        c = c.split("xcv ");
        c = c.slice(-1)[0].split('_');
        (c.slice(-1)[0].indexOf('DT') > -1) ? d = 'jDate': d = '';
    } catch (e) {}
    $(this).append(`<br><input type="text" class="search-column ${d}">`);
});

// Date
$('.jDate').inputmask('dd/mm/yyyy', {
    placeholder: '__/__/____'
});

/*
 * Date Function on blur and Focus in
 */

$(document).on('focusin', '.jDate', function(e) {
    $('.jDate').datetimepicker({
        format: "dd/mm/yyyy",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    }).on('changeDate', function(ev) {
        var dateId = $(this).attr('id');
        $(this).focus();
        $(this).trigger('keyup');
    })
});