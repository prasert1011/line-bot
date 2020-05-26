const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const index = express()
const port = process.env.PORT || 4000
index.use(bodyParser.urlencoded({ extended: false }))
index.use(bodyParser.json())
index.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
index.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {oPr8fa22uagdHuLXLeq97LBTvYR9kApc+QIrYVUoWfMfN3epp4TZl7ZhO4XFw+fvK9Jm5cN6wbGGlZqeweO7RI9gMITwrZsztrdLjtDquck/dHEmZXrDwEqcXkCWO6i4pP7ZEOyr5rwLdBt/voeRtQdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
            {
                type: 'text',
                text: 'How are you?'
            }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}