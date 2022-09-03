$(document).ready(function(){
 
    console.log( '**** ENVIRONMENT ****');
    
    var url = window.location.href;
    console.log("Browser URL: " + url);  
    
    var envir_type = "";
    if( url.indexOf('localhost:3000') > 0){
       envir_type  =  "SERVER";
       
    }else{
       envir_type = "LOCAL";
    }
    console.log("Environment Type: " + envir_type); 
    
    $( "#cf-envir_type" ).text( envir_type );
    
    });