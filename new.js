$(function() {
  var messages = [{
    "name": "Dima",
    "msg": "i don't know i feel bad today :(",
    "posted_at": "2015-08-29 02:50:31",
    "msg_id": "12"
  }, {
    "name": "toma",
    "msg": "whats wrong?",
    "posted_at": "2015-08-29 02:48:59",
    "msg_id": "11"
  }, {
    "name": "toma",
    "msg": "hey",
    "posted_at": "2015-08-29 02:46:11",
    "msg_id": "10"
  }];

  $("#btnSendMessage").on("click", function() {
    // Adds new message object to message's array.
    messages.push({
      name: "NewUser",
      msg: $("#txtMessage").val(),
      posted_at: new Date(),
      msg_id: new Date().getTime()
    });
    console.log(messages);
  });

  var oldCountMessages = messages.length; // Previously, you need to save the messages's length.

  var newMessageIndex = 0; // Declare a numeric variable to use like new index to show a new chat message.

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
