const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('badword') ? 'rejected' : 'approved';

        axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                status,
                postId: data.postId, 
                content: data.content
            }

            
        }).catch((err) => {
            console.log(err.message);
        });

        res.send({});
    }
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});