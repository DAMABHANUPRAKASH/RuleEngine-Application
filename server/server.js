const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/rules');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ruleEngine', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/rules', ruleRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
