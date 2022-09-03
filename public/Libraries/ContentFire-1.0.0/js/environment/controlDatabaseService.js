class ControlDatabaseService{

    constructor(){

    }

    getDataTablesRows(){

        console.log( "***CONTROL DATABASE SERVICE ***");
        console.log( "--getFieldData");

        var headerFields = new Array();
        var data = new Array();
        var fieldData;


        $('#cf-datatable-box thead tr').each(function( index ) {

            $( this ).children().each(function(index ) { 

                var saveValue = $(this).text().toLowerCase();

                console.log(  index +") "+ saveValue );

                if(saveValue == 'id'){
                    saveValue = '_'+saveValue;
                }
                headerFields[index] = saveValue;
            });

            
        });

        $('#cf-datatable-box tbody tr').each(function( index ) {

            console.log( "Row Number: " + index );

            fieldData = {};


            $( this ).children().each(function(index ) { 

                console.log(  $(this).text() );

                fieldData[headerFields[index]] = $(this).text()
            });

            data[index] = fieldData;
            
        });

        return data;
    }

}