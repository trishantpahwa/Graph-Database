const Relationship = require('./Relationship');

class SingleDirectionRelationship extends Relationship {
    constructor(name, properties, relatedNode) {
        super(name, properties, relatedNode, 'single');
    }
}

module.exports = SingleDirectionRelationship;