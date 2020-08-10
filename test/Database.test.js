const assert = require('assert');
const fs = require('fs');

const Database = require('../src/Database');
const Node = require('../src/Node');

describe('Interaction with the database.', function() {
    it('Should create a Node in an empty database', function() {
        const dbName = 'mydatabase';
        fs.writeFileSync(dbName + '.graphdb', '{\n\n}');
        fs.writeFileSync(dbName + '.map', '{\n\n}');
        let database = new Database(dbName);
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        database.addObjectToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName + '.map').toString();
        writtenData = JSON.parse(writtenData);
        let start = parseInt(writtenData[node.getID()].start);
        let end = parseInt(writtenData[node.getID()].end);
        var stream = fs.createReadStream(dbName + '.graphdb', {start: start, end: end});
        stream.on('data', function(chunk) {
            let _n = JSON.parse('{' + chunk.toString() + '}');
            assert.deepEqual(_n, node.toJSON());
        });
    });
    it('Should add a node to a non-empty database.', function() {
        const dbName = 'mydatabase';
        let database = new Database(dbName);
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        database.addObjectToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName + '.map').toString();
        writtenData = JSON.parse(writtenData);
        let start = parseInt(writtenData[node.getID()].start);
        let end = parseInt(writtenData[node.getID()].end);
        var stream = fs.createReadStream(dbName + '.graphdb', {start: start, end: end});
        stream.on('data', function(chunk) {
            let _n = JSON.parse('{' + chunk.toString() + '}');
            assert.deepEqual(_n, node.toJSON());
        });
    });
    it('Should be able to count the number of objects in the database', function() {
        const dbName = 'mydatabase';
        let database = new Database(dbName);
        var objects = database.countDatabaseObjects();
        assert.equal(objects, 2);
    });
});