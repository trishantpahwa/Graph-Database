const Relationship = require('./Relationship');

class BothDirectionRelationship extends Relationship {
    
    constructor(name, properties, relatedNode, selfNode) {
        super(name, properties, relatedNode, 'both');
    }

}

module.exports = BothDirectionRelationship;