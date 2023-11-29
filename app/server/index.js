const express = require('express');
const { connection } = require("./models/database/database.js");
const routes = require('./router/endPoints.js');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT","DELETE","PATCH","HEAD","CONNECT"]
}));
app.use(express.json());

// Conexión a la base de datos
connection.authenticate()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

// Usar las rutas
app.use('/', routes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});