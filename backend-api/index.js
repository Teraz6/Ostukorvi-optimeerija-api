require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml')
//const swaggerDocument = require('./docs/swagger.json');
const { sync } = require("./db")

// app.get('/products', (req, res) =>{
//     res.send(["Piim", "Leib", "Muna"])
// });

app.use(cors());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json())

require("./routes/productRoutes.js")(app)
require("./routes/profileRoutes.js")(app)

app.listen(port, async () => {
    if (process.env.SYNC === 'true')
    {
        await sync()
    };
    console.log(`API on aadressil: http://${host}:${port}`)
});