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
        commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "success" })
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
    console.log(params)
}