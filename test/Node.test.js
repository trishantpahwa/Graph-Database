const assert = require('assert');
const fs = require('fs');

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
    it('Should create a Node with a basic uni-direction(Single) Relationship with another Node', function() {
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
    it('Should create Node and a basic bi-directional(Both) Relationship with another Node', function() {
        let node1 = new Node('Person', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        let node2 = new Node('Person', {'Firstname': 'Shantanu', 'Lastname': 'Saini'}, []);
        let relationship = new BothDirectionRelationship('Friends', {'Type': 'Best Friends', 'Since': '2000'}, [node1, node2]);
        node1.addRelationship(relationship);
        node2.addRelationship(relationship);
        let node1ID = node1.getID();
        let node2ID = node2.getID();
        let relationshipID = relationship.getID();
        assert.deepEqual({'Node1': node1, 'Node2': node2, 'Relationship': relationship}, {
            'Node1': {
                'id': node1ID,
                'name': 'Person',
                'properties': {
                    'Firstname': 'Trishant',
                    'Lastname': 'Pahwa'
                },
                relationships: [
                    {
                        'direction': 'both',
                        'id': relationshipID,
                        'name': 'Friends',
                        'properties': {
                            'Type': 'Best Friends',
                            'Since': '2000'
                        },
                        'realtedNode': {
                            'left': node1ID,
                            'right': node2ID
                        }
                    }
                ]
            },
            'Node2': {
                id: node2ID,
                'name': 'Person',
                'properties': {
                    'Firstname': 'Shantanu',
                    'Lastname': 'Saini'
                },
                relationships: [
                    {
                        'direction': 'both',
                        'id': relationshipID,
                        'name': 'Friends',
                        'properties': {
                            'Type': 'Best Friends',
                            'Since': '2000'
                        },
                        'realtedNode': {
                            'left': node1ID,
                            'right': node2ID
                        }
                    }
                ]
            },
            'Relationship': {
                'direction': 'both',
                'id': relationshipID,
                'name': 'Friends',
                'properties': {
                    'Type': 'Best Friends',
                    'Since': '2000'
                },
                'realtedNode': {
                    'left': node1ID,
                    'right': node2ID
                }
            }
        })
    });
});

describe('Testing Node functions', function() {
    it('Should return the Node in JSON format', function() {
        let node = new Node('Student', {'Firstname': 'Trishant', 'Lastname': 'Pahwa'}, []);
        let nodeID = node.getID();
        let data = node.toJSON();
        assert.deepEqual(data, JSON.stringify({
            "Node": {
                "id": nodeID,
                "name": "Student",
                "properties": {
                    "Firstname":"Trishant",
                    "Lastname":"Pahwa"
                },
                "relationships": []
            }
        }));
    });
});