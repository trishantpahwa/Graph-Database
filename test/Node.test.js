const assert = require('assert');

const Node = require('../src/Node');
const SingleDirectionRelationship = require('../src/SingleDirectionRelationship');
const BothDirectionRelationship = require('../src/BothDirectionRelationship');


describe('Testing Node constructors', function() {
    it('Should create a simple Node', function() {
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        let id = node.getID();
        assert.deepEqual(node, {
            'id': id,
            'name': 'Student',
            'properties': {
                'Firstname': 'Trishant',
                'Lastname': 'Pahwa'
            },
            'relationships': []
        });
    });
    it('Should create a Node with a Relationship', function() {
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        let node2 = new Node('Subject', {'Name': 'Computer Science'}, []);
        let relationship1 = new SingleDirectionRelationship('Studies', {'Since': '2014'}, node2);
        node.addRelationship(relationship1);
        let node1ID =  node.getID();
        let node2ID = node2.getID();
        let relationshipID = relationship1.getID();
        assert.deepEqual({'Node1': node, 'Node2': node2, 'Relationship': relationship1}, {
            'Node1': {
                'id': node1ID,
                'name': 'Student',
                'properties': {
                    'Firstname': 'Trishant',
                    'Lastname': 'Pahwa'
                },
                'relationships': [
                    {
                        'direction': 'single',
                        'id': relationshipID,
                        'name': 'Studies',
                        'properties': {
                            'Since': '2014'
                        },
                        'realtedNode': node2ID
                    }
                ]
            },
            'Node2': {
                'id': node2ID,
                'name': 'Subject',
                'properties': {
                  'Name': 'Computer Science'
                },
                'relationships': []
            },
            'Relationship': {
                'direction': 'single',
                'id': relationshipID,
                'name': 'Studies',
                'properties': {
                  'Since': '2014'
                },
                'realtedNode': node2ID
            }
        });
    });
    // let relationship2 = new BothDirectionRelationship('Studies', {'Since': '2014'}, [node1, node2]);
    // node1.addRelationship(relationship2);
    // node2.addRelationship(relationship2)
    // console.log(node1);
    // console.log(node2);
});