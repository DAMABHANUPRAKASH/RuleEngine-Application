const express = require('express');
const router = express.Router();
const { createRule, combineRules, evaluateRule } = require('../ruleUtils');

router.post('/create_rule', (req, res) => {
    const { rule_string } = req.body;
    const rule = createRule(rule_string);
    res.json({ rule });
});

router.post('/combine_rules', (req, res) => {
    const { rules } = req.body;
    const combined = combineRules(rules);
    res.json({ combined });
});

router.post('/evaluate', (req, res) => {
    const { rule_ast, data } = req.body;
    const result = evaluateRule(rule_ast, data);
    res.json({ result });
});

module.exports = router;
