// Socket public js
'use strict';

var last_conn_time = new Date().getTime() / 1000;
var made_connection = false;
var IDLE_THRESHOLD = 10; // in seconds
var INIT_THRESHOLD = 3;

var idle_img = new Image();
var col = "black";

$(document).ready(function() {

    var load_gif = $("#load-gif"),
        video = document.getElementById('main-screen'),
        btnScreenshot = document.getElementById('btn-screenshot'),
        mainRow = document.getElementById('main-row'),
        streamChooser = document.getElementById('stream-chooser');
        

    // TODO -- make this a proper function call to screenshotButtonHook();
    btnScreenshot.onclick = function(){ screenshotButtonHook(col); };

    $('#change-channel-btn').click(function(){
        $('#login-modal').modal('show');
    });

    $('.carousel').carousel({
        interval: 0
    });

    if ($_GET['channel']) {
        joinChannel($_GET['channel']);
        load_gif.css('display', 'block');

        last_conn_time = new Date().getTime() / 1000; 
        setInterval(function(){
            var now = new Date().getTime() / 1000;
            threshold = (made_connection) ? IDLE_THRESHOLD : INIT_THRESHOLD;
            if (now - last_conn_time > threshold){
                displayIdle();
            }
        },5000);

        $('#login-modal').modal('hide');
        $('#main-row').css('opacity',1);
        $('.panel-title > span')[0].innerText = $_GET['channel'];
    } else {
        $('#login-modal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }
  
    $('#green').click(color);
    $('#blue').click(color);
    $('#red').click(color);
    $('#yellow').click(color);
    $('#orange').click(color);  

    $('#stream-id').bind('keypress', function(e) {
        if (e.keyCode === 13) {
            closeModal(this.value);
        }
    });

    $('#go-channel').bind('click', function(e) {
        closeModal($('#stream-id')[0].value);
    });

    $('#cancel-email').bind('click', function() {
        $('#email-modal').modal('hide');
    });

    $('#go-email').bind('click', function() {
        $('#email-modal').modal('hide');
        emailButtonHook();
    });

    $('#email-id').bind('keypress', function(e) {
        if (e.keyCode === 13) {
            $('#email-modal').modal('hide');
            emailButtonHook();
        }
    });
});

var color = function(obj) {
    col = obj.target.id;
};

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});



// This is not necessary.
var emailModalHook = function () {
    $('#email-modal').modal('show');
};

var emailButtonHook = function () {
    var screenshots = $('canvas.screenshot'),
        imgarray = [],
        _i = 1;

    _.each(screenshots, function(shot){
        imgarray.push(decodeURI(shot.toDataURL("image/jpeg")));
    });

    var payload = {email: decodeURI($('#email-id')[0].value), img_array: imgarray};

    // Send out some e-mail! We don't need to support this part.
    socket.emit('pics', {msg: payload});
};

var downloadButtonHook = function (e) {
    e.preventDefault();

    var target = e.target;

    while (!$(target).hasClass('panel-heading') && !$(target).hasClass('panel-footer')) {
        target = target.parentElement;
    }

    Canvas2Image.saveAsPNG(target.parentElement.children[1].children[0]);

    return;
};

// SOCKET THINGS BEGIN ==============================================

var socket = new io.connect('http://api.fuckitstreamit.com:2000'); 

function joinChannel(chan) {
    $('#chan').text(chan.toLowerCase());
    socket.emit("channel", { room: chan });
}

// Add a connect listener
socket.on('connect',function() {
    console.log('Client has connected to the server!');
});

var i=0,
    image = document.getElementById("ia"),
    canvas = document.getElementById("test"),
    context = canvas.getContext('2d');

// Add a connect listener
socket.on('message',function(data) {
    idleDisplayed = false;
    load_gif.css('display', 'none');
    last_conn_time = new Date().getTime() / 1000;
    made_connection = true;
    image.src = "data:image/jpg;base64,"+data;
    canvas.width = 358;
    canvas.height = 358 * image.height / image.width;

    context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
});

socket.on('disconnect',function() {
    console.log('The client has disconnected!');
});


// MISCELLANEOUS FUNCTIONS AND ANIMATIONS ===========================
jQuery.fn.shake = function(intShakes, intDistance, intDuration) { 
    this.each(function() { 
        $(this).css("position","relative"); 
        for (var x=1; x<=intShakes; x++) { 
            $(this).animate(
              { left:(intDistance*-1) },
              ( ((intDuration/intShakes)/4) )).animate({left:intDistance}, 
              ( (intDuration/intShakes)/2) ).animate({left:0},
              ( ((intDuration/intShakes)/4) ));
        } 
    }); 
    return this; 
};

var idleDisplayed = false;

var displayIdle = function() {
    if (idleDisplayed === false) {
        idleDisplayed = true;

        load_gif.css('display', 'none');
        
        var thecanvas = $("#test")[0];
        var thecontext = thecanvas.getContext("2d");
        
        thecontext.fillStyle = "rgba(75,75,75,0.8)";
        thecontext.fillRect(0,0, thecanvas.width, thecanvas.height);
        thecontext.fillStyle = "white";
        thecontext.font = "15px Helvetica";
        thecontext.textAlign = "center";
        thecontext.fillText = "(no stream detected) "+ (thecanvas.width/2) +' '+ (thecanvas.height/2);
            
    }      
};


var closeModal = function(id) {
    if (id.length !== 8) {
        $('#login-modal').effect('shake');
    } else {
        console.log('Attempting to join ' + id);
        joinChannel(id);
        
        load_gif.css('display', 'block');

        last_conn_time = new Date().getTime() / 1000; 
        setInterval(function(){
            var now = new Date().getTime() / 1000;

            threshold = (made_connection) ? IDLE_THRESHOLD : INIT_THRESHOLD;
            if (now - last_conn_time > threshold){
                displayIdle();
            }
        },5000);

        $('#login-modal').modal('hide');
        $('#main-row').css('opacity',1);
        $('.panel-title > span')[0].innerText = id;
    }

};
