class Dialog{

    constructor(){
    }

    pageLayout (headerList, title, dicTable, action){

        console.log(' **** DIALOG PAGE LAYOUT ****');

        var dialog_list = '';

        dialog_list = dialog_list + '<div id="cf-dialog-modal" title="'+title+'" > \n';

        for (var element of headerList) {

            dialog_list = dialog_list +'<div class="form-group"> \n'
            dialog_list = dialog_list +'<label for="'+element+'">'+element+'</label> \n'
            dialog_list = dialog_list +'<input  type="text" class="form-control cf-form-control" id="'+element+'"> \n'
            dialog_list = dialog_list +'</div> \n'

        }

        dialog_list = dialog_list + '</div> \n'


        $("#cf-dialog").html(dialog_list);

        this.buildDialog(dicTable, action);

    }

    buildDialog(dicTable, action){
        $( "#cf-dialog-modal" ).dialog({
            buttons: [
                        {
                            text: "Save",
                            class:"btn btn-primary",
                            click: function() {

                               var dialogService = new DialogService();

                               var fieldData = dialogService.getFieldData();

                               var url = '';

                               if( action == 'EDIT'){
                                    url = '/edit/'+ fieldData._id;
                                }

                                if(action == 'NEW'){
                                    url = '/new';
                                }

                               dialogService.callBackEnd(url, fieldData, dicTable);

                                $( this ).dialog( "close" );
                            }
                        },
                        {
                            text: "Close",
                            class:"btn btn-primary",
                            click: function() {

                                //Unselect all rows in the DataTable
                                dicTable.$('tr.selected').removeClass('selected');

                                //Enable the New Button
                                $("#cf-cancel-entry").click();

                                $( this ).dialog( "close" );
                            }
                        }
            ]
          });

    }


    setTextField(header, dataArray){

        var headerArray;

        if( ! Array.isArray(header) ){

            //Converting Set to Array
            headerArray = Array.from(header);
        }

        console.log('--- Set Text Fields in Dialog Box');

        for( var w =0 ; w < dataArray.length ; w++){

            $( "#cf-dialog-modal #"+headerArray[w] ).val( dataArray[w]);

        }


    }


}