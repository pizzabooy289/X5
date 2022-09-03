class Html{

    constructor(prefix, infix){

        this.prefix = prefix;
        this.infix = infix;
    }

    getPrefix(){return this.prefix;}
    setPrefix(val){this.prefix = val;}

    getInfix(){return this.infix;}
    setInfix(val){this.infix = val;}


    toArray(data, label){
        
        console.log(label);
 
        var table = new Array();
        table.push(this.prefix);

        for (var element of data) {

            table.push(this.infix + this.formatHeader( element ) + this.createBackTag(this.infix) );
        }
        table.push(this.createBackTag(this.prefix));

        table.forEach( element => {
            console.log(element +'\n');
        } );

        return table;

    }

    createBackTag(frontTag){

        var backTag = frontTag.split('');
        backTag.splice(1,0,'/');

        var result = '';

        backTag.forEach( element => result = result + element);

        return result;

    }

    formatHeader(columnField){

        var firstLetter = columnField.slice(0,1);
        var restLetter = columnField.slice(1,columnField.letter);

        return firstLetter.toUpperCase() + restLetter;

    }
    
}

if( typeof module !== 'undefined' ){ 
    module.exports = Html;
}


