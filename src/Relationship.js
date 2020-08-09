const uuid = require('uuid').v4;

class Relationship {

    id = null;
    name = null;
    properties = null;
    realtedNode = null;
    direction = null;

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
    setRelatedNode(relatedNode) {
        this.relatedNode = relatedNode;
    }
    getRelatedNode() {
        return this.relatedNode
    }
    setDirection(direction) {
        this.direction = direction;
    }
    getDirection() {
        return this.direction;
    }
}

Relationship {
    id: 'some-randome-id',
    name: 'studies',
    properties: {
        studyingSince: '2014'
    },
    direction: 'both',
    relatedNode: 'i-am-something-random-2' // UUID
}