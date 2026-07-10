const express = require('express');
const {router: authRoutes}= require('./routes/auth');
const userRoutes= require('./routes/users');
const {router: taskRoutes}= require('./routes/tasks');
const errorHandle= require('./middleware/errorHandler');
const cors= require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandle);

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});