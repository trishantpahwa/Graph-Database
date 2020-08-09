const fs = require('fs');

function addObjectToDatabase(data) {
    const db = 'mydatabase.graphdb';
    try {
        if(typeof data !== 'object') {
            throw 'Object is not of type JSON';
        }
        const dbSize = fs.statSync(db)['size'];
        if(dbSize > 4) {
            fs.truncateSync(db, dbSize-2);
            data = ',' + JSON.stringify(data, null, 4).slice(1, -1) + '}';
        } else {
            fs.truncateSync(db, dbSize-3);
            data = JSON.stringify(data, null, 4).slice(1, -1) + '}';
        }
        fs.appendFileSync(db, data);
    } catch(exception) {
        console.log(exception);
    }
}
// So we are basically saving the data and have another file to create a hash map of the objects in data for faster queries.

let data = {"node": {
    "id": "some-random-id-7-here",
    "name": "Student",
    "properties": {
        "Firstname": "Trishant",
        "Lastname": "Pahwa"
    },
    "relationships": []
}};
addObjectToDatabase(data);