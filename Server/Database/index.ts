import * as mysql from 'mysql2';

export const db = mysql.createConnection({
    database: 'e_commerce' ,
    host:'localhost' ,
    user:'root' ,
    password:'A$KraMV7th+!' ,
})