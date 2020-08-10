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
        database.addNodeToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName + '.map').toString();
        writtenData = JSON.parse(writtenData);
        let start = parseInt(writtenData['Node-' + node.getID()].start);
        let end = parseInt(writtenData['Node-' + node.getID()].end);
        var stream = fs.createReadStream(dbName + '.graphdb', {start: start, end: end});
        stream.on('data', function(chunk) {
            let _n = JSON.parse('{' + chunk.toString() + '}');
            assert.deepEqual(_n, node.toJSON());
        });
    });
    it('Should add a node to a non-empty database.', function() {
        const dbName = 'mydatabase';
        let database = new Database(dbName);
        let node = new Node('Subject', {'Name': 'Arnav', 'Cost': '200'}, []);
        database.addNodeToDatabase(node.toJSON());
        let writtenData = fs.readFileSync(dbName + '.map').toString();
        writtenData = JSON.parse(writtenData);
        let start = parseInt(writtenData['Node-' + node.getID()].start);
        let end = parseInt(writtenData['Node-' + node.getID()].end);
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
    it('Should be able to read nodes from database using ID', function() {
        let dbName = 'mydatabase'
        let database = new Database(dbName);
        let node = new Node('Student', {'Firstname': 'Tavish', 'Lastname': 'Pahwa'}, []);
        database.addNodeToDatabase(node.toJSON());
        database.readNodefromDatabase(node.getID()).then(function(_n) {
            assert.deepEqual(_n, node.toJSON());
        });
    });
    it('Should be able to read nodes from database using property filter', function() {
        let dbName = 'mydatabase';
        let database = new Database(dbName);
        let property = {'Lastname': 'Pahwa'};
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        node = node.toJSON();
        node = node[Object.keys(node)[0]];
        delete node.id;
        let node2 = new Node('Student', {'Firstname': 'Tavish', 'Lastname': 'Pahwa'}, []);
        node2 = node2.toJSON();
        node2 = node2[Object.keys(node2)[0]];
        delete node2.id;
        var nodes = [node, node2];
        database.readNodefromDatabase(property).then(function(_n) {
            _n.forEach(function(n) {
                delete n.id;
            });
            assert.deepEqual(nodes, _n);
        });
    })
});