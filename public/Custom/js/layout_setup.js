$(document).ready(function(){

    /*************\
    *   VARIABLES *
    \**************/

    var dataPage;

    //My Variables
    var repo = Repo;

    //My Classes
    var header = new Header(repo);
    var permissions = new Permissions();

    var dataTable = new DataTable();

 
    /***********\
    *    CODE   *
    \************/

    console.log( '**** LAYOUT ENVIRONMENT ****');

    console.log( 'Account Type: ' + permissions.getAccountType() );
    console.log( 'Environment Type: ' + permissions.getEnvirType() );

    header.buildHeader();
        
    var htmlHeader = new Html('<tr>','<th>');
    var headerArray = htmlHeader.toArray(header.getTableHeader(), '-- Header part of the table ');

    var body = new Body(header.getTableHeader(),repo);

    dataTable.pageLayout( headerArray, body.toArray() );

    if( permissions.accessAllowed()){
        console.log( 'Permission Level: Access Allowed' );

        var controlButtons = new ControlButtons();
        var controlDatabase = new ControlDatabase();

        controlButtons.pageLayout();
        controlDatabase.pageLayout();

        var dialog = new Dialog();

        /*****************************\
         *   CONTROL BUTTONS - method *
        \*****************************/

        $('#cf-control-buttons-message').text('The Blue Control Buttons updates the MongoDB Database automatically.');
        

        $("#cf-new-entry").click(function() {
            dialog.pageLayout(header.getTableHeader(), 'New Entry', dataTable.getDicTable(), 'NEW');

            //Set fields on dialog box to blank
            for (var element of header.table_header) {
                $("#"+element).val("");
            }

        });

        $("#cf-edit-entry").click(function() {
            dialog.pageLayout(header.getTableHeader(), 'Edit Entry', dataTable.getDicTable(), 'EDIT');

            //Popular dialog from the data table
            dialog.setTextField(header.getTableHeader(), dataPage);
            
        });

        $("#cf-delete-entry").click(function() {
            var dicTable = dataTable.getDicTable();

            dicTable.row('.selected').remove().draw( false );

            dataTable.deleteRow(dataPage);

        });

        $("#cf-cancel-entry").click(function() {
            controlButtons.setButtons(true);

            $('#cf-datatable-box tbody tr').each(function(index ) {
                $( this ).removeClass('selected');
            });
        });

        /******************************\
         *   CONTROL DATABASE - method *
        \******************************/
    

        $("#cf-mongo-delete").click(function() {
            controlDatabase.deleteMongoDB();
        });


        $("#cf-mongo-save").click(function() {
            controlDatabase.saveDataTabletoMongoDB(dataTable.getDicTable());
        });


        $("#cf-json-save").click(function() {
            controlDatabase.saveMongoDBtoJSONFile();
        });


    }else{
        console.log( 'Permission Level: Access Denied' );

    }

    /***************************\
    *   DATA TABLE - method    *
    \***************************/
    
    //Record Click Function
    $('#cf-datatable-box').on('click', 'tbody tr', function() {

        var dicTable = dataTable.getDicTable();
    
        /*
        If you select a record in the Database the Edit, Delete, and Cancel 
        Buttons will be enable and other button disable (New Button). When click
        the same row in the DataTable the New Button will be enable and other buttons disable
        */
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');

            controlButtons.setButtons(true);

        }
        else {
            dicTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            controlButtons.setButtons(false);
    
        }


        //Get Record from the table which is clicked.
        //Put record in an array

        dataPage = new Array();

        dicTable.$('tr.selected' ).children().each(function( index ) {
            
            dataPage[index] = $(this).text();

        });

        
        //Show DataTable record click
        console.log("DataTable clicked Record: \n");
        for(var i = 0; i < dataPage.length; i++){
            console.log("[" + i + "]= " +dataPage[i] ); 
        }
            
    
    });

});
