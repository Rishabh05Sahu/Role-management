const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Node and Express!');
});