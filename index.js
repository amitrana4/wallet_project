const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const routes = require('./api/routes');
routes(app);
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});
module.exports = app; // for testing