const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (res, req) => {
    console.log('called')
    res.send('ok')
})

app.listen(port, () => console.log(`Listening on port ${port}`))