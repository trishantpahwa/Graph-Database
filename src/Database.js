const fs = require('fs');

class Database {

    dbName = null;
    mapName = null;

    constructor(dbName) {
        this.dbName = dbName + '.graphdb';
        this.mapName = dbName + '.map';
    }

    addObjectToDatabase(data) {
        try {
            if(typeof data !== 'object') {
            throw 'Object is not of type JSON';
        }
        const dbSize = fs.statSync(this.dbName)['size'];
        var dataToWrite = '';
        if(dbSize > 4) {
            fs.truncateSync(this.dbName, dbSize-2);
            dataToWrite = ',' + JSON.stringify(data, null, 4).slice(1, -1) + '}';
        } else {
            fs.truncateSync(this.dbName, dbSize-3);
            dataToWrite = JSON.stringify(data, null, 4).slice(1, -1) + '}';
        }
        fs.appendFileSync(this.dbName, dataToWrite);
        let start = dbSize+2;
        let end = start + dataToWrite.length - 7;
        let nodeID = data[Object.keys(data)[0]].id;
        let mapSize = fs.statSync(this.mapName)['size'];
        if(mapSize > 4) {
            fs.truncateSync(this.mapName, mapSize-2);
            dataToWrite = ',' + JSON.stringify({
                [nodeID]: {
                    'start': start.toString(),
                    'end': end.toString()
                }
            }, null, 4).slice(1, -1) + '}';
        } else {
            fs.truncateSync(this.mapName, mapSize-3);
            dataToWrite = JSON.stringify({
                [nodeID]: {
                    'start': start.toString(),
                    'end': end.toString()
                }
            }, null, 4).slice(1, -1) + '}';
        }
        fs.appendFileSync(this.mapName, dataToWrite);
        // let stream = fs.createReadStream(this.dbName, {start: start, end: end});
        // stream.on('data', function(chunk) {
        //     console.log(JSON.parse('{' + chunk.toString() + '}'));
        // });
        // stream.on('close', function() {
        //     console.log('File read completely');
        // });
        } catch(exception) {
            console.log(exception);
        }
    }
}
// So we are basically saving the data and have another file to create a hash map of the objects in data for faster queries.

module.exports = Database;