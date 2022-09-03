class DataTable{

    constructor(){ 

        this.dicTable = '';

        this.html = new Html();

    }

    getDicTable(){ return this.dicTable; }
    setDicTable(val){ this.dicTable = val; }

    pageLayout(header, body){

        console.log(' **** DATA TABLE PAGE LAYOUT ****');

        var table_list = ""; 
        table_list = table_list + '<table id="cf-datatable-box" class="display" > \n' ;

        table_list = table_list + this.groupTab('<thead>', header );
        table_list = table_list +this.groupTab('<tbody>', body );
        table_list = table_list +this.groupTab('<tfoot>', header );
    
        table_list = table_list + '</table> \n';

        $('#cf-data-table').html(table_list);

        this.buildDataTable();

    }

    groupTab(frontTag, infixTags){

        var tags = '';
        
        tags = tags+ frontTag +"\n";


        for (var element of infixTags) {
            
            tags =  tags + element;
        }

        var backTag = this.html.createBackTag(frontTag);

        tags = tags + backTag  +"\n";

        return tags;

    }

    buildDataTable(){ 

        // pagingType - The pagination option of DataTables will display a pagination control below the table
        // full_numbers - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
        this.dicTable = $('#cf-datatable-box').DataTable( {
            "pagingType": "full_numbers"
        } );

    }

    deleteRow(dataPage){

        $.ajax({
            type: "POST",
            url: "/delete/" +dataPage[0]
        });


    }

}