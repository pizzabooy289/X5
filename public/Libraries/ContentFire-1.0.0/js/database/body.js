class Body{

    constructor(header, data) {
        this.table_header = header;
        this.table_body = new Array();
    
        this.data = data;
    }

    setTableHeader(val){this.table_header = val;}
    getTableHeader() {return this.table_header;}

    setTableBody(val){this.table_body = val;}
    getTableBody() {return this.table_body;}

    setData(val){this.data = val;}
    getData() {return this.data;}

    toArray(){

        if( ! Array.isArray(this.table_header) ){

            //Converting Set to Array
            this.table_header = Array.from(this.table_header);
        }

        var table = new Array();

        for(var m=0; m <this.data.length; m++ ){

            //Stepping though JSON Array to get the object from the database.js
            //element[0] =  {name : "Pete Johnson",age : 18,dept : "CSE",score : 90}
            var element = this.data[m];

            table.push("<tr>");

            for(var i=0; i <this.table_header.length; i++ ){

                //This is array of all keys from the Header Set
                //table_header = ['name', 'age', 'dept', 'score', 'grade']

                var table_data = element[this.table_header[i]];

                if (typeof table_data === 'undefined' || table_data === null){
                    table.push("<td></td>");
                }else{
                    table.push("<td>" + table_data + "</td>");
                }

            }

            table.push("</tr>");         
            
        }

        return table;

    }

}

if( typeof module !== 'undefined' ){ 
    module.exports = Body;
}

