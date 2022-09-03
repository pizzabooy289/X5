class Permissions{

    constructor(){

        this.accountType = $('#cf-account_type').html()
        this.envirType = $( "#cf-envir_type" ).html();

    }

    getAccountType(){ return this.accountType; }
    setAccountType(val){this.accountType = val;}

    getEnvirType(){ return this.envirType; }
    setEnvirType(val){this.envirType = val;}

    accessAllowed(){

        if( typeof this.accountType === 'undefined' || typeof this.envirType === 'undefined' || this.accountType === null || this.envirType === null ){ 
            return false;
        }else{

            if( this.accountType == 'ADMIN' && this.envirType == 'SERVER'){
                return true;
            }else{
                return false;
            }

        }
    }

};