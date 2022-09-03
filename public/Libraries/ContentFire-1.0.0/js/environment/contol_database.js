class ControlDatabase{

    constructor(options){
        this.default = {
            buttons:['MONGO-DELETE','MONGO-SAVE','JSON-SAVE'], 
            label:{
                'MONGO-DELETE':'Delete MongoDB Database',
                'MONGO-SAVE':'Save FROM Data Table TO MongoDB',
                'JSON-SAVE': 'Save FROM MongoDB TO JSON file'
            }
                
        };

        this.options = options;

        if( this.options != 'undefined'){
            $.extend(this.default,this.options);
        }

        this.buttons_list = "";

    }

    getDefault(){ return this.default;}
    setDefault(val){ this.default = val}

    getOptions(){ return this.options}
    setOptions(val){ this.options = val}

    getButtonsList(){ return this.buttons_list}
    setButtonsList(val){ this.buttons_list = val}

    pageLayout(){

        console.log(' **** CONTROL DATABASE PAGE LAYOUT ****');

        var buttons = this.default.buttons;
        var button_label = this.default.label;
        var id_attribute = '';
        var inner_label = '';

        for(var i=0; i < buttons.length; i++){

            inner_label = button_label[buttons[i]];
            id_attribute = buttons[i].toLowerCase();

            this.buttons_list =  this.buttons_list + '<button id="cf-'+id_attribute+'" type="button" class="btn btn btn-success" >'+inner_label+'</button>' +"\n";
        }

        $(".cf-contol-database").html(this.buttons_list);
    }

    deleteMongoDB(){

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: '/mongodelete',
            data: JSON.stringify({}),
            dataType: 'json',
            timeout: 600000,
            success: function (data) { 
                console.log("MongoDB Delete Process: " + data.message );
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

    saveDataTabletoMongoDB(table){

        var service = new ControlDatabaseService();
        var data = service.getDataTablesRows();


        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: '/mongosave',
            data: JSON.stringify(data),
            dataType: 'json',
            timeout: 600000,
            success: function (data) { 

                console.log("MongoDB Delete Process: " + data.message );
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

    saveMongoDBtoJSONFile(){       

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: '/jsonsave',
            data: JSON.stringify({}),
            dataType: 'json',
            timeout: 600000,
            success: function (data) { 
                console.log(data);
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