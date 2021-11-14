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
        commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "success" }, { "functionName": "error" })
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
    formBuilder = $(fbEditor).formBuilder(options);
    $(".table_name").val(params[0].master_table_name.replace(/eks_/gi, ''));
    $(".form_name").val(params[0].master_form_name);
    $(".company").val(params[0].company_id);
}

function success(params) {
    location.reload();
}


function error(params) {
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


function simpleInsert() {
    let data = {
        "list_key": "AddTable",
        "master_table_name": removeSpacenumber("Tank Cleaning", 6),
        "master_form_name": "Tank Cleaning",
        "company_id": '6',
        "created_by": "1",
        "master_table_json": ''
    }

    data['master_table_json'] = JSON.stringify(
        [
            short('date', 'Date'),
            short('textarea', 'Bay/Cell', 'bay_cell'),
            short('textarea', 'Machine Name'),
            short('textarea', 'Oil Grade'),
            short('text', 'Washing Tank'),
            short('text', 'Remarks')

        ]
    );
    console.log(data);
    commonAjax('services.php', 'POST', data, '', '', '', { "functionName": "success" }, { "functionName": "error" })
}


short('date', 'Date')
short('textarea', 'Bay/Cell', 'bay_cell')
short('textarea', 'Machine Name')
short('text', 'Qty (Ltr)', 'qty')
short('text', 'Remarks')

short('textarea', 'Oil Grade')

function short(type, label, name) {
    let n = '';
    (!name) ? n = removeSpace(label): n = name;
    return { "type": type, "required": true, "label": label, "name": n }
}

function removeSpace(params) {
    if (typeof(params) != 'undefined') {
        let r = params.replace(/ /g, '_');
        r = r.replaceAll("[^a-zA-Z0-9]", " ");
        return r.toLowerCase();
    } else
        return '';

}

function removeSpacenumber(params, n) {
    if (typeof(params) != 'undefined') {
        let r = params.replace(/ /g, '_');
        r = r.replaceAll("[^a-zA-Z0-9]", " ");
        return r.toLowerCase() + "_" + n;
    } else
        return '';
}

let radio = {
    "type": "radio-group",
    "required": false,
    "label": "Abnormality",
    "inline": false,
    "name": "abnormality",
    "access": false,
    "other": false,
    "values": [{
            "label": "Identified",
            "value": "Identified",
            "selected": false
        },
        {
            "label": "Corrected",
            "value": "Corrected",
            "selected": false
        }
    ]
}

let d = [{
        "type": "date",
        "required": true,
        "label": "Date",
        "className": "form-control",
        "name": "date",
        "access": false
    },
    {
        "type": "textarea",
        "required": true,
        "label": "Unit",
        "className": "form-control",
        "name": "unit",
        "access": false,
        "subtype": "textarea"
    }, { "type": "text", "required": false, "label": "Text Field", "className": "form-control", "name": "text-1636806096777-0", "access": false, "subtype": "text" },
    {
        "type": "number",
        "required": true,
        "label": "Qty (Ltr)",
        "className": "form-control",
        "name": "qty",
        "access": false
    }, {
        "type": "text",
        "required": false,
        "label": "Text Field",
        "className": "form-control",
        "name": "text-1636806096777-0",
        "access": false,
        "subtype": "text"
    },
    {
        "type": "radio-group",
        "required": false,
        "label": "Radio Group",
        "inline": false,
        "name": "radio-group-1636806098545-0",
        "access": false,
        "other": false,
        "values": [{ "label": "Option 1", "value": "option-1", "selected": false },
            { "label": "Option 2", "value": "option-2", "selected": false },
        ]
    }
]