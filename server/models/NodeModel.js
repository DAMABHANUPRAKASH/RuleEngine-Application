// Define Node structure for AST
class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;  // "operator" for AND/OR, "operand" for conditions
        this.value = value;  // Optional for operands (e.g., >30)
        this.left = left;    // Reference to left child
        this.right = right;  // Reference to right child
    }
}

module.exports = Node;
