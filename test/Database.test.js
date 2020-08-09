const assert = require('assert');
const fs = require('fs');

const Database = require('../src/Database');
const Node = require('../src/Node');

describe('Interaction with the database.', function() {
    it('Should create a Node in an empty database', function() {
        const dbName = 'mydatabase.graphdb';
        fs.writeFileSync(dbName, '{\n\n}');
        let database = new Database(dbName);
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        database.addObjectToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName);
        writtenData = JSON.parse(writtenData);
        assert.deepEqual(writtenData, node.toJSON());
    });
    it('Should add a node to a non-empty database.', function() {
       const dbName = 'mydatabase.graphdb';
        let database = new Database(dbName);
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        database.addObjectToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName);
        writtenData = JSON.parse(writtenData);
        let _n = 'Node-' + node.getID();
        writtenData = { [_n]: writtenData[_n] };
        assert.deepEqual(writtenData, node.toJSON());
    });
});