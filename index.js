var getUserMedia = require('getusermedia')

getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  // document.getElementById('send').addEventListener('click', function () {
  //   var yourMessage = document.getElementById('yourMessage').value
  //   peer.send(yourMessage)
  // })

  document.getElementById('send').addEventListener('click', function(){
    var messages = [{
      "name": "Host",
      "msg": "Hello",
      "posted_at": new Date(),
      "msg_id": new Date().getTime()
    }];

    $("#send").on("click", function() {
      // Adds new message object to message's array.
      messages.push({
        name: "NewUser",
        msg: $("#txtMessage").val(),
        posted_at: new Date(),
        msg_id: new Date().getTime()
      });
      console.log(messages);
    });

    // Previously, you need to save the messages's length.
    var oldCountMessages = messages.length;

    // Declare a numeric variable to use like new index to show a new chat message.
    var newMessageIndex = 0;

    // You need to print the messages, only once.
    for (var i = 0; i < messages.length; i++) {
      $("#chatMessages").append("<div class=\"chat\"><span class=\"user\">" + messages[i].name + "</span><br /> " + messages[i].msg + "</div>");
    }
    // Self-looping function to show check if there are new messages.
    (function loop() {
      // Checking if there are new messages.
      if (messages.length > oldCountMessages) {
        // Initializing newMessageIndex with the new message index, to show it.
        newMessageIndex = messages.length - 1;
        // Printing only the new message.
        $("#chatMessages").append("<div class=\"chat\"><span class=\"user\">" + messages[newMessageIndex].name + "</span><br /> " + messages[newMessageIndex].msg + "</div>");
      }
      // Updating oldCountMessages variable for the next verification in the looping function.
      oldCountMessages = messages.length;
      setTimeout(loop, 1000); // Checking the server every second.
    })();
  });

  // peer.on('data', function (data) {
  //   document.getElementById('messages').textContent += data + '\n'
  // })

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
    document.getElementById('cam').appendChild(video)

    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
})
