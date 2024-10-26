const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Node schema for AST representation
const NodeSchema = new Schema({
    type: { type: String, required: true }, // 'operator' or 'operand'
    value: { type: String }, // Condition or operator
    left: { type: Schema.Types.Mixed },  // Left child (another Node or null)
    right: { type: Schema.Types.Mixed }, // Right child (another Node or null)
}, { _id: false });

// Rule schema in MongoDB
const RuleSchema = new Schema({
    ruleAST: { type: NodeSchema, required: true }
});

module.exports = mongoose.model('Rule', RuleSchema);
