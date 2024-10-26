// ruleController.js

const Node = require('../models/nodeModel');  // Node class for AST

// Function to create an AST from a rule string
const createAST = (ruleString) => {
    // This is a placeholder, real implementation would parse ruleString into an AST.
    return new Node('operator', 'AND',
        new Node('operand', 'age > 30'),
        new Node('operator', 'OR',
            new Node('operand', 'department == "Sales"'),
            new Node('operand', 'salary > 50000')
        )
    );
};

// Function to combine multiple ASTs
const combineAST = (ruleASTs) => {
    // Placeholder logic, combine ASTs into one using AND/OR
    let combinedAST = ruleASTs[0];  // Assume we combine using AND
    for (let i = 1; i < ruleASTs.length; i++) {
        combinedAST = new Node('operator', 'AND', combinedAST, ruleASTs[i]);
    }
    return combinedAST;
};

// Function to evaluate AST against user data
const evaluateAST = (node, data) => {
    if (!node) return true;

    if (node.type === 'operand') {
        // Evaluate operand node (condition)
        const condition = node.value;
        return evalCondition(condition, data);  // Helper function to check condition
    } else if (node.type === 'operator') {
        const leftEval = evaluateAST(node.left, data);
        const rightEval = evaluateAST(node.right, data);

        if (node.value === 'AND') {
            return leftEval && rightEval;
        } else if (node.value === 'OR') {
            return leftEval || rightEval;
        }
    }
};

// Helper function to evaluate a condition (e.g., "age > 30")
const evalCondition = (condition, data) => {
    // Parse condition and check against data
    // Example: "age > 30" => data.age > 30
    return eval(condition.replace(/(\w+)/g, (_, key) => data[key]));
};

module.exports = {
    createAST,
    combineAST,
    evaluateAST
};
