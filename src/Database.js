const fs = require('fs');
const { assert } = require('console');

class Database {

    dbName = null;
    mapName = null;

    constructor(dbName) {
        this.dbName = dbName + '.graphdb';
        this.mapName = dbName + '.map';
    }

    addNodeToDatabase(data) {
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
                ['Node-' + nodeID]: {
                    'start': start.toString(),
                    'end': end.toString()
                }
            }, null, 4).slice(1, -1) + '}';
        } else {
            end -= 1;
            fs.truncateSync(this.mapName, mapSize-3);
            dataToWrite = JSON.stringify({
                ['Node-' + nodeID]: {
                    'start': start.toString(),
                    'end': end.toString()
                }
            }, null, 4).slice(1, -1) + '}';
        }
        fs.appendFileSync(this.mapName, dataToWrite);
        } catch(exception) {
            console.log(exception);
        }
    }
    countDatabaseObjects() {
        var data = fs.readFileSync(this.mapName);
        data = JSON.parse(data);
        return Object.keys(data).length;
    }  // Need function to count nodes and relationships seperately
    readNodefromDatabase(identifier) {
        if(typeof identifier === 'string') {
            return this.getNodeFromID(identifier).then(function(node) {
                return node;
            }).catch(function(err) {
                console.log(err);
                return ;
            });
        }
        if(typeof identifier === 'object') {
            return this.getNodeFromProperties(identifier).then(function(node) {
                return node;
            }).catch(function(err) {
                console.log(err);
                return ;
            })
        }
    }
    getNodeFromID(id) {
        id = 'Node-' + id;
        let _dbName = this.dbName;
        let _mapName = this.mapName;
        return new Promise(function(resolve, reject) {
            let map = JSON.parse(fs.readFileSync(_mapName));
            if(Object.keys(map).indexOf(id) <= -1) {
                reject('ID ' + id + ' not found');
            }
            let start = parseInt(map[id].start);
            let end = parseInt(map[id].end);
            var stream = fs.createReadStream(_dbName, {start: start, end: end});
            let object = null;
            stream.on('data', function(chunk) {
                object = JSON.parse('{' + chunk.toString() + '}');
            });
            stream.on('close', function() {
                if(object == null) {
                    reject('Couldn\'t read object');
                } else {
                    resolve(object);
                }
            });
        });
    }
    getNodeFromProperties (properties) {
        let _dbName = this.dbName;
        let _mapName = this.mapName;
        var _regex = /^Node-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b$/gm;
        return new Promise(async function(resolve, reject) {
            let nodes = [];
            let map = JSON.parse(fs.readFileSync(_mapName));
            Object.keys(map).forEach(function(key) {
                if(!key.match(_regex)) {
                    delete map[key];
                }
            });
            for(let node in map) {
                let start = parseInt(map[node].start);
                let end = parseInt(map[node].end);
                let nodeData = null;
                let maxMatch = Object.keys(properties).length;
                for await (const chunk of fs.createReadStream(_dbName, {start: start, end: end})) {
                    let match = 0;
                    nodeData = JSON.parse('{' + chunk.toString() + '}');
                    nodeData = nodeData[Object.keys(nodeData)[0]];
                    for(var key in properties) {
                        if(nodeData.properties[key] == properties[key]) {
                            match += 1;
                        }
                    }
                    if(match == maxMatch) {
                        nodes.push(nodeData);
                    }
                }
            }
            resolve(nodes);
        });
    }
}


module.exports = Database;