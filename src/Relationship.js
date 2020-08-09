const uuid = require('uuid').v4;

class Relationship {

    id = null;
    name = null;
    properties = null;
    realtedNode = null;
    direction = null;

    constructor(name, properties, relatedNode, direction) {
        this.id = uuid();
        this.setName(name);
        this.setProperties(properties);
        this.setRelatedNode(relatedNode);
        this.setDirection(direction);
    }

    getID() {
        return this.id;
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
        if(typeof relatedNode === 'string') {
            this.relatedNode = relatedNode;
        }
        if(relatedNode.constructor.name === 'Node') {
            this.realtedNode = relatedNode.getID();
        }
        if(Array.isArray(relatedNode)) {
            this.realtedNode = {
                left: relatedNode[0].getID(),
                right: relatedNode[1].getID()
            };
        }
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


module.exports = Relationship;
// Basic structure
/*Relationship {
    id: 'some-randome-id',
    name: 'studies',
    properties: {
        studyingSince: '2014'
    },
    direction: 'both',
    relatedNode: 'i-am-something-random-2' // UUID
}*/