// server/utils/ruleUtils.js

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

// Function to create a rule AST from a rule string
function create_rule(rule_string) {
    const trimmedRule = rule_string.trim();
    const rootNode = new Node('AND'); // Assuming the root node is 'AND'
    
    // Example parsing logic (you might want to implement a proper parser)
    const conditions = trimmedRule.split(' AND '); // Split by 'AND'
    conditions.forEach(condition => {
        const conditionNode = new Node(condition);
        rootNode.children.push(conditionNode);
    });
    
    return rootNode;
}

// Function to combine multiple rules into a single AST
function combine_rules(rules) {
    const rootNode = new Node('OR'); // Assuming combined rules are 'OR'ed

    rules.forEach(rule => {
        const ruleAST = create_rule(rule); // Create AST for each rule
        rootNode.children.push(ruleAST); // Add the AST to the combined root
    });

    return rootNode;
}

// Function to evaluate the rule against the provided data
function evaluate_rule(ast, data) {
    if (!ast || !ast.children) return false;

    const results = ast.children.map(child => {
        const condition = child.value;
        return evaluate_condition(condition, data);
    });

    return ast.value === 'AND' ? results.every(result => result) : results.some(result => result);
}

// Function to evaluate a single condition
function evaluate_condition(condition, data) {
    const [key, operator, value] = condition.split(' '); // e.g. "age > 30"
    
    switch (operator) {
        case '>':
            return data[key] > Number(value);
        case '<':
            return data[key] < Number(value);
        case '>=':
            return data[key] >= Number(value);
        case '<=':
            return data[key] <= Number(value);
        case '==':
        case '=':
            return data[key] === value;
        case '!=':
        case '<>':
            return data[key] !== value;
        default:
            return false;
    }
}

module.exports = {
    create_rule,
    combine_rules,
    evaluate_rule,
};
