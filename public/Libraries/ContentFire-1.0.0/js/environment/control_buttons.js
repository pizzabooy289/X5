class ControlButtons{

    constructor(options){
        this.default = {
            buttons:['NEW','EDIT','DELETE','CANCEL'],
            start:{ 
                'NEW':'ENABLED', 
                'EDIT':'DISABLED',
                'DELETE':'DISABLED',
                'CANCEL':'DISABLED'
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

        console.log(' **** CONTROL BUTTONS PAGE LAYOUT ****');

        var buttons = this.default.buttons;
        var label = '';
        var name = '';

        for(var i=0; i < buttons.length; i++){

            label = '';
            name = '';

            //All to lower case
            label = buttons[i].toLowerCase();

            //Capitalize the first letter, Just first letter Upper Case
            name = name + buttons[i].slice(0,1).toUpperCase();
            
            //Rest letters but first letter all Lower Case
            name = name + buttons[i].slice(1,buttons[i].length).toLowerCase()

            this.buttons_list =  this.buttons_list + '<button id="cf-'+label+'-entry" type="button" class="btn btn-primary" data-toggle="modal">'+name+'</button>' +"\n";

        }

        $(".cf-control-buttons").html(this.buttons_list);

        this.setButtons(true);

    }

    setButtons(initialState){

        var buttons = this.default.buttons;
        var buttons_start = this.default.start;

        for(var i=0; i < buttons.length; i++){

            var button_name = buttons[i]; 
            var prop = buttons_start[button_name];

            console.log(button_name + ' Buttons is '+ prop);
            
            if(initialState){
                $('#cf-'+button_name.toLowerCase()+'-entry').prop("disabled", (prop == 'DISABLED') );
            }else{
                $('#cf-'+button_name.toLowerCase()+'-entry').prop("disabled", (prop != 'DISABLED') );
            }
            
        }

    }



}