// server/seed.js
const mongoose = require('mongoose');
const User = require('./models/user');

// Replace the connection string with your MongoDB URI
const uri = 'mongodb://localhost:27017/ruleEngine'; // or your actual connection URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

        const sampleUsers = [
            { age: 25, department: 'Sales', income: 50000, spend: 15000, eligibility: 'Eligible' },
            { age: 30, department: 'Marketing', income: 60000, spend: 25000, eligibility: 'Ineligible' },
            { age: 40, department: 'HR', income: 70000, spend: 30000, eligibility: 'Eligible' },
            { age: 22, department: 'IT', income: 45000, spend: 20000, eligibility: 'Eligible' },
            { age: 35, department: 'Finance', income: 80000, spend: 50000, eligibility: 'Ineligible' },
            { age: 28, department: 'Operations', income: 55000, spend: 10000, eligibility: 'Eligible' },
            { age: 50, department: 'Executive', income: 100000, spend: 60000, eligibility: 'Ineligible' },
            { age: 29, department: 'R&D', income: 65000, spend: 12000, eligibility: 'Eligible' },
        ];

        User.insertMany(sampleUsers)
            .then(() => {
                console.log('Sample data inserted');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error inserting data:', err);
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
