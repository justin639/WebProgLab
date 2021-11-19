
function openDialog(){
    $('#mainContent').addClass('ui-widget-overlay');
    $('#addDialog').dialog('open');
}



$(document).ready(function (){
    $('#addDialog').dialog(
        {autoOpen: false,
        resizable: false,
            height: 'auto',
        modal: true,
        buttons:{
            "Close": function() {
                $(this).addClass('white');
                $('#mainContent').removeClass('ui-widget-overlay');
                $( this ).dialog( "close" );
            },
            "Save Changes": function() {
                // save change
                $( this ).dialog( "close" );
            }

        }
    });

    $('#addNewBtn').on('click', function (){
        openDialog();
    });
})