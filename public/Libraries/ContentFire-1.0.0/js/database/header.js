class Header {

    constructor(data ) {

        this.table_header = new Set();
        this.data = data;
    }

    setTableHeader(val){this.table_header = val;}
    getTableHeader() {return this.table_header;}

    setData(val){this.data = val;}
    getData() {return this.data;}

    buildHeader(){

        //Getting the objects from the database.js data (Array of Objects)
        //Loop though th objects in the Array
        for( var i = 0; i < this.data.length; i++ ){

            // Get key for each Object. Returns Arrays of keys
            var dataArray = Object.keys(this.data[i]);

            //Going though the Array of keys adding to the Set
            dataArray.forEach(element => {

                this.table_header.add(element);

            });
        }
    }
    

}

if( typeof module !== 'undefined' ){ 
    module.exports = Header;
}



