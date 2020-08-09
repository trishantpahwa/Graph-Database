const fs = require('fs');

class Database {

    dbName = null;

    constructor(dbName) {
        this.dbName = dbName;
    }

    addObjectToDatabase(data) {
        // Add NodeID to map file.
        try {
            if(typeof data !== 'object') {
            throw 'Object is not of type JSON';
        }
        const dbSize = fs.statSync(this.dbName)['size'];
        if(dbSize > 4) {
            fs.truncateSync(this.dbName, dbSize-2);
            data = ',' + JSON.stringify(data, null, 4).slice(1, -1) + '}';
        } else {
            fs.truncateSync(this.dbName, dbSize-3);
            data = JSON.stringify(data, null, 4).slice(1, -1) + '}';
        }
        fs.appendFileSync(this.dbName, data);
        } catch(exception) {
            console.log(exception);
        }
    }
}
// So we are basically saving the data and have another file to create a hash map of the objects in data for faster queries.

module.exports = Database;