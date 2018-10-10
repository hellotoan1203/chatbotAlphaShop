const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/',(req,res)=>{
    res.send('chay con me no roi...')
});

app.get('/webhook',(req,res)=>{
    if (req.query['hub.verify_token'] === 'toandeptrai') {
        res.send(req.query['hub.challenge']);
      }
      res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
      var messaging = entry.messaging;
      console.log(messaging);
      for (var message of messaging) {
        var senderId = message.sender.id;
        if (message.message) {
          if (message.message.text !== "" && message.message.quick_reply == undefined) {
            var text = message.message.text;
            sendFirstMessage(senderId,"Xin chào bạn đã quan tâm tới AlphaShop, dưới đây là 1 số thông tin nhanh mà chúng mình có thể hỗ trợ bạn")
          }
          if(message.message.quick_reply){
            console.log(message.message.quick_reply.payload)
          }
        }
      }
    }
    res.status(200).send("OK");
  });

  function sendFirstMessage(senderId, message) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: "EAAIG6MuEZAs4BAAMz0n4uvAF2cnkuYk8iBlpLlXjUUqfY1Bneq9pdan875cpKYe3HjMWOaz1c4vPGrrMXo3q9KvHtCwJvdnZBgFmQtMSBM9YlHVJiNgQlIoUNOCK4SCTDmzEazEEj0N2NR0dzOvMRtJ5jeQScv5cTZBi4SaGJzPA77NtEOR",
      },
      method: 'POST',
      json: {
        recipient: {
          id: senderId
        },
        message: {
          text: message,
          quick_replies: [
            {
              content_type :"text",
              title:"Địa chỉ",
              payload:"<POSTBACK_DIACHI>"
            },
            {
              content_type :"text",
              title:"Link Shopee",
              payload:"<POSTBACK_SHOPEE>"
            },
            {
              content_type :"text",
              title:"Số điện thoại",
              payload:"<POSTBACK_SHOPEE>"
            }
          ]
        },
      }
    });
  }

  app.listen(process.env.PORT || 3000,()=>{
      console.log('chay tot vcl');
  })