const express = require('express');
const router = express.Router();
const Rule = require('../models/ruleModel'); // MongoDB model for rules
const { createAST, combineAST, evaluateAST } = require('../controllers/ruleController');

// Create rule
router.post('/create_rule', async (req, res) => {
    try {
        const { rule_string } = req.body;
        if (!rule_string) {
            return res.status(400).json({ error: 'Rule string is required' });
        }

        // Generate the Abstract Syntax Tree (AST) from the rule string
        const ruleAST = createAST(rule_string);
        const newRule = new Rule({ ruleAST });

        // Save the rule to the database
        await newRule.save();

        res.status(201).json(newRule);
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ error: 'Failed to create rule' });
    }
});

// Combine multiple rules
router.post('/combine_rules', async (req, res) => {
    try {
        const { rule_ids } = req.body; // Array of rule IDs to combine
        if (!rule_ids || rule_ids.length === 0) {
            return res.status(400).json({ error: 'Rule IDs are required to combine rules' });
        }

        // Fetch rules from the database by their IDs
        const rules = await Rule.find({ _id: { $in: rule_ids } });

        // Ensure that all rules were found
        if (rules.length !== rule_ids.length) {
            return res.status(404).json({ error: 'One or more rules not found' });
        }

        // Combine the ASTs of the fetched rules
        const combinedAST = combineAST(rules.map(r => r.ruleAST));

        res.json({ combinedAST });
    } catch (error) {
        console.error('Error combining rules:', error);
        res.status(500).json({ error: 'Failed to combine rules' });
    }
});

// Evaluate rule against user data
router.post('/evaluate', async (req, res) => {
    try {
        const { rule_id, data } = req.body;
        if (!rule_id || !data) {
            return res.status(400).json({ error: 'Rule ID and data are required' });
        }

        // Fetch the rule from the database by its ID
        const rule = await Rule.findById(rule_id);

        // Ensure that the rule exists
        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        // Evaluate the rule's AST against the provided data
        const isEligible = evaluateAST(rule.ruleAST, data);

        res.json({ eligible: isEligible });
    } catch (error) {
        console.error('Error evaluating rule:', error);
        res.status(500).json({ error: 'Failed to evaluate rule' });
    }
});

module.exports = router;
