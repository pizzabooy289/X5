var Login = [
    { 
        user:'jjcusey',
        pswd:'password',
        account_type:'USERS'
    },
    { 
        user:'johnjcuseyhub',
        pswd:'password',
        account_type:'ADMIN'
    }

];

var Database_Name = 'StudentsDB';

var Data_Table_Header = [ '_id' , 'name', 'age', 'dept', 'score', 'grade'];


if( typeof module !== 'undefined' ){ 
    module.exports.Login = Login;
    module.exports.Database_Name = Database_Name;
    module.exports.Data_Table_Header = Data_Table_Header;
}