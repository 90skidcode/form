$(document).ready(function() {
    displayBookingListInit();
});


function displayBookingListInit() {
    let data = {
        "query": 'fetch',
        "key": 'master_table',
        "column": {
            "*": "*"
        },
        "condition": {
            "status": '1'
        },
        "like": ""
    }
    commonAjax('database.php', 'POST', data, '', '', '', { "functionName": "displayList", "param1": "table" });
}

function displayList(response, dataTableId) {
    var tableHeader = [];
    let html = '<thead><tr>';
    let d = ['status', 'created_by', 'created_at', 'updated_at'];
    $.each(response[0], function(i, v) {
        if (d.indexOf(i) == -1) {
            console.log(i, v);
            tableHeader.push({
                "data": i
            });
            html += `<td>${capitalizeFirstLetter((i.replace(/_/g, " ")))}</td>`;
        }
    });
    tableHeader.push({
        "data": 'action',
        mRender: function(data, type, row) {
            return `<td>
                        <a href="edit.html?id=${row.master_table_id}" title='Edit' class="btn btn-icon btn-hover btn-sm btn-rounded pull-right">
                            <i class="gg-pen"></i>
                        </a>
                    </td>`;
        }
    });
    html += '<td class="text-center">Action</td></tr></thead>';
    $("#" + dataTableId).html(html);

    dataTableDisplay(response, tableHeader, false, dataTableId)
}