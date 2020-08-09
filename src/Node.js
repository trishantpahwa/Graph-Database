const uuid = require('uuid').v4;

class Node {
    
    id = null;
    name = null;
    properties = { };
    relationships = [ ];

    constructor() {
        this.id = uuid();
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setProperties(properties) {
        this.properties = properties;
    }
    getProperties() {
        return this.properties;
    }
    addProperty(property, value) {
        this.properties.property = value;
    }
    removeProperty(property) {
        delete this.properties.property;
    }
    setRelationships(relationships) {
        this.relationships = relationships;
    }
    getRelationships() {
        return this.relationships;
    }
    addRelationship(relationship) {
        this.relationship.push(relationship);
    }
    removeRelationship(relationship) {
        var relationshipIndex = this.relationships.indexOf(relationship);
        this.relationships.splice(relationshipIndex, 1);
    }
}

function tests() {
    let n = new Node();
    console.log(n);
}

tests();





Node {
    id: 'i-am-something-random',
    name: 'Student',
    properties: {
        Firstname: 'Trishant',
        Lastname: 'Pahwa'
    },
    relationships: [
        class Relationship,
        class Relationship
    ]
}