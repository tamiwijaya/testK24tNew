<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
    <title>Gtrip Message</title>
</head>
<body>
<h1>Gtrip Message</h1>

<p class="newA">
    Message A : <input type="text" class="messageA"/>
    <button class="addA">Add</button>
</p>

<table>
    <thead>
    <tr>
        <th>Message</th>
    </tr>
    </thead>
    <tbody id="dataA"></tbody>
</table>

<p class="newB">
    Message B : <input type="text" class="messageB"/>
    <button class="addB">Add</button>
</p>

<table>
    <thead>
    <tr>
        <th>Message</th>
    </tr>
    </thead>
    <tbody id="dataB"></tbody>
</table>

<script src="//cdn.jsdelivr.net/sockjs/1.0.0/sockjs.min.js"></script>
<script src="/gtrip-api/resources/stomp.js"></script>
<script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    //Create stomp client over sockJS protocol
    var protocols = {protocols_whitelist: ["websocket", "xhr-streaming", "xdr-streaming", "xhr-polling", "xdr-polling", "iframe-htmlfile", "iframe-eventsource", "iframe-xhr-polling"]};
    var opt = {debug: false, devel: true}
    var socket = new SockJS("/gtrip-api/ws", protocols, opt);
    var stompClient = Stomp.over(socket);

    // Render price data from server into HTML, registered as callback
    // when subscribing to price topic
    function renderA(frame) {
        var data = JSON.parse(frame.body);
        $('#dataA').append(
                $('<tr>').append(
                        $('<td>').html(data.message),
                        $('<td>').html(data.recipient)
                )
        );
    }

    function renderB(frame) {
        var data = JSON.parse(frame.body);
        $('#dataB').append(
                $('<tr>').append(
                        $('<td>').html(data.message),
                        $('<td>').html(data.recipient)
                )
        );
    }

    // Callback function to be called when stomp client is connected to server
    var connectCallback = function () {
        stompClient.subscribe("<c:out value="/queue/${username}"/>", renderA);
        stompClient.subscribe('/topic/messageB', renderB);
    };

    // Callback function to be called when stomp client could not connect to server
    var errorCallback = function (error) {
        alert(error.headers.message);
    };

    // Connect to server via websocket
    stompClient.connect({}, connectCallback, errorCallback);

    // Register handler for add button
    $(document).ready(function () {
        $('.addA').click(function (e) {
            e.preventDefault();
            var message = $('.messageA').val();
            var jsonstr = JSON.stringify({'message': message, 'recipient': 'user A'});
            stompClient.send("/app/addMessageA", {}, jsonstr);
            return false;
        });
    });

    $(document).ready(function () {
        $('.addB').click(function (e) {
            e.preventDefault();
            var message = $('.messageB').val();
            var jsonstr = JSON.stringify({'message': message, 'recipient': 'user B'});
            stompClient.send("/app/addMessageB", {}, jsonstr);
            return false;
        });
    });

    // Register handler for remove all button
    $(document).ready(function () {
        $('.remove-all').click(function (e) {
            e.preventDefault();
            stompClient.send("/app/removeAllStocks");
            return false;
        });
    });
</script>
</body>
</html>
