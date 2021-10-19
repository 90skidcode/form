jQuery(function($) {
    var $fbEditor = document.getElementById('build-wrap');
    var formBuilder = $($fbEditor).formBuilder();
    $(document).on('click', '.save-template', function() {
        let data = {
            "list_key": "AddTable",
            "master_table_name": $(".table_name").val(),
            "company_master_id": $(".company").val(),
            "created_by": "1",
            "master_table_json": formBuilder.formData
        };
        commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "success" })
    });
    $($fbEditor).formBuilder();
});