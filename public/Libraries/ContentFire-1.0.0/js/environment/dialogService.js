class DialogService{


    constructor(){

    }


    getFieldData(){

        console.log( "***DIALOG SERVICE ***");
        console.log( "--getFieldData");
        var fieldData = {};

        $('.cf-form-control').each(function( index ) {
            console.log( index + " Header Name: "  + $( this ).attr('id') + ": Value of Text Box: " + $( this ).val() );

            var headerName = $( this ).attr('id') ; 

            fieldData[ headerName] = $( this ).val()

        });

        return fieldData;
    }

    callBackEnd(url, fieldData, dicTable){


       $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url,
            data: JSON.stringify(fieldData),
            dataType: 'json',
            timeout: 600000,
            success: function (data) { 

                //The recond with new _id that MongoDB assigned
                var updateData = data;

                if(url.indexOf("new") >= 0 ){
                    console.log("The NEW Id is:" + updateData._id);
                
                    var rowData = new Array();
    
                    //The row in table uses id but the MongoBD uses _id
                    rowData[0] = updateData._id;

                    //Getting the header 
                    $('#cf-datatable-box thead tr th').each(function( index ) {
    
                        var coloumnName = $(this).text()
    
                        //Alright assigned the id row so skip. 
                        if(index != 0){
                            rowData[index] = updateData[coloumnName.toLowerCase() ];
                        }
                      });
    
                      //Add new row the table                              
                      dicTable.row.add(rowData).draw(false);
                }else{
                    console.log("The EDIT Id is:" + updateData._id);

                    var header = new Array();

                    //Gettting the names to the column of the DataTable
                    $('#cf-datatable-box thead tr th').each(function( index ) {

                        var coloumnName = $(this).text().toLowerCase();
                        header[index] = coloumnName;

                    });

                    //Update the row
                    dicTable.$('tr.selected' ).children().each(function( index ) {

                        if(index != 0){

                            $(this).text( updateData [header[index]] );
                        }

                    });

                    //Unselect all rows in the DataTable
                    dicTable.$('tr.selected').removeClass('selected');

                    //Enable the New Button
                    $("#cf-cancel-entry").click();

                }




                //location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) { 

                var text = '';

                if( typeof jqXHR.responseJSON != 'undefined'){
                    text = jqXHR.responseJSON.message
                }

                console.log( textStatus.toUpperCase() + ": " + errorThrown + ' ' + text );
                
            }
        });

    }


}