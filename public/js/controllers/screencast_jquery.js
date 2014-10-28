// screencast_jquery.js
'use strict';

var socket = io.connect('http://127.0.0.1');

var last_conn_time = new Date().getTime() / 1000;
var made_connection = false;
var IDLE_THRESHOLD = 10; // in seconds
var INIT_THRESHOLD = 3;

var idle_img = new Image();
var col = "black";

var $_GET = {};

function color(obj) {
    col = obj.target.id;
}

function joinChannel(chan) {
    document.getElementById('chan').text(chan.toLowerCase());
    socket.emit("channel", { room: chan });
}

function displayIdle(){
        if (idleDisplayed === false) {
            idleDisplayed = true;
            
            document.getElementById('load_gif').css('display', 'none');
            
            var thecanvas = $("#test")[0];
            var thecontext = thecanvas.getContext("2d");
            
            thecontext.fillStyle = "rgba(75,75,75,0.8)";
            thecontext.fillRect(0,0, thecanvas.width, thecanvas.height);    
            thecontext.fillStyle = "white";
            thecontext.font = "15px Helvetica";
            thecontext.textAlign = "center";
            thecontext.fillText("(no stream detected)", thecanvas.width/2, thecanvas.height/2);
        }
    }

function closeModal(id){
        if (id.length !== 8) {
            $('#login-modal').effect('shake');
        } else {
            console.log('Attempting to join ' + id);
            joinChannel(id);
            document.getElementById('load_gif').css('display', 'block');

            last_conn_time = new Date().getTime() / 1000; 
            setInterval(function(){
                var now = new Date().getTime() / 1000;
                var threshold = (made_connection) ? IDLE_THRESHOLD : INIT_THRESHOLD;

                if (now - last_conn_time > threshold){
                    displayIdle();
                }
            },5000);

            $('#login-modal').modal('hide');
            $('#main-row').css('opacity',1);
            $('.panel-title > span')[0].innerText = id;
        }
    }

function emailButtonHook() {
    var screenshots = $('canvas.screenshot');
    var imgarray = [];
    var payload = {};
    var _i = 1;
    
    for (_i = 0; _i < screenshots.length; _i++) {
        imgarray.push(encodeURI(screenshots[_i].toDataURL("image/jpeg")));
    }
    
    payload = {email: encodeURI($('#email-id')[0].value), img_array: imgarray};

    socket.emit('pics', {msg: payload});
}

function downloadButtonHook(e) {
        e.preventDefault();

        var target = e.target;

        while (!$(target).hasClass('panel-heading') && !$(target).hasClass('panel-footer')) {
            target = target.parentElement;
        }

        Canvas2Image.saveAsPNG(target.parentElement.children[1].children[0]);

        return;
    }

function screenshotButtonHook(lcarousel,rcarousel, container) {
    
    document.addEventListener("keypress", function (e) {
        if (e.altKey){return;}

        if (enteringText && (e.keyCode === 13 /*enter*/ || e.keyCode === 27 /*esc*/)){
            enteringText = false;
            flag = false;
            dot_flag = false;
        }

        if (!enteringText){
            return; 
        }
        
        e.preventDefault();
        
        var thecontext = textCanvas.getContext('2d');
        thecontext.font = "20pt Arial"; //Courier";

        var text_offset = (thecontext.measureText(currentString).width);
        
        currentString += String.fromCharCode(e.which);
        thecontext.fillText(String.fromCharCode(e.which), text_x + text_offset, text_y);

    }, false);

    $('#main-panel').removeClass('col-md-offset-4');
    $('#main-panel').addClass('col-md-offset-2');
    lcarousel.style.visibility = 'visible';
    rcarousel.style.visibility = 'visible';
    
    var time = new Date();
    time = time.toTimeString();
    
    var text = document.getElementById('hidden_partial').innerHTML;    
    if (container.children[0]) {
        $(container.children[0]).removeClass('active');
    }
    
    container.insertAdjacentHTML('afterbegin', text); 

    var canvas = document.getElementById("test");
    var canvas2 = $('.screenshot')[0];
    var context2 = canvas2.getContext('2d');
    
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    //context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    context2.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    canvas2.addEventListener("mousemove", function (e) {
        findxy('move', e);
    }, false);
    canvas2.addEventListener("mousedown", function (e) {
        findxy('down', e);
    }, false);
    canvas2.addEventListener("mouseup", function (e) {
        findxy('up', e);
    }, false);
    canvas2.addEventListener("mouseout", function (e) {
        findxy('out', e);
    }, false);

    var enteringText = false;
    var textCanvas = null;
    var currentString = "";
    var text_x = 0;
    var text_y = 0;

    var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    ctx = {};

    var x = "black",
    y = 2;

    function draw() {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = col;
        ctx.lineWidth = "3";
        ctx.stroke();
        ctx.closePath();
    }

    function erase(w,h) {
        var m = window.confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = document.getElementById("test").toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

    function getPos(el) {
        // yay readability
        for (var lx=0, ly=0;
             el !== null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent)
         { return {x: lx,y: ly}; }
    }

    function findxy(res, e) {

        var event = e || window.event; 
        if (enteringText){ 
            return; 
        }

        var canvas = e.target;
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        var pos = 0;

        if (res === 'down') {
            prevX = currX;
            prevY = currY;
            pos = getPos(canvas);
            currX = e.pageX - $(e.target).offset().left;
            currY = e.pageY - $(e.target).offset().top;
        }
    
        if (e.altKey) { 
            enteringText = true;
            textCanvas = e.target;
            text_x = currX;
            text_y = currY;
            currentString = "";

            flag = false;
            dot_flag = false;
        }

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = col;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    

        if (res === 'up' || res === "out") {
            currX = 0;
            currY = 0;
            flag = false;
        }

        if (res === 'move') {
            if (flag) {
                pos = getPos(canvas);
                currX = e.pageX - $(e.target).offset().left;
                currY = e.pageY - $(e.target).offset().top;
                ctx.lineJoin = "round";
                ctx.lineCap = "round";
                ctx.beginPath();
                if (prevX === 0 && prevY === 0) {
                    ctx.moveTo(currX, currY);
                } else {
                    ctx.moveTo(prevX,  prevY);
                }
                ctx.lineTo(currX, currY);

                ctx.strokeStyle = col;
                ctx.lineWidth = 5;
                ctx.stroke();
                prevX = currX;
                prevY = currY;
            }
        }
    }
}

var idleDisplayed = false;

$(document).ready(function() {
    var video = document.getElementById('main-screen');
    var mainRow = document.getElementById('main-row');
    var streamChooser = document.getElementById('stream-chooser');

    var btnScreenshot = document.getElementById('btn-screenshot');
    var screenshotsContainer = document.getElementById('screenshots-container');
    var leftCarouselButton = $('.left.carousel-control')[0];
    var rightCarouselButton = $('.right.carousel-control')[0];

    btnScreenshot.onclick = screenshotButtonHook;
    $('#change-channel-btn').click(function(){
        $('#login-modal').modal('show');
    });

    $('.carousel').carousel({
        interval: 0
    });

// get channel
    if ($_GET['channel']) {
        joinChannel($_GET['channel']);
        document.getElementById('load_gif').css('display', 'block');

        last_conn_time = new Date().getTime() / 1000; 
        setInterval(function(){
            var now = new Date().getTime() / 1000;
            var threshold = (made_connection) ? IDLE_THRESHOLD : INIT_THRESHOLD;
            if (now - last_conn_time > threshold){
                displayIdle();
            }
        }, 5000);

        $('#login-modal').modal('hide');
        $('#main-row').css('opacity',1);
        $('.panel-title > span')[0].innerText = $_GET['channel'];
    } else {
        $('#login-modal').modal({
            backdrop: 'static',
            keyboard: false
        });

    }
    // $('#green').click(color);
    // $('#blue').click(color);
    // $('#red').click(color);
    // $('#yellow').click(color);
    // $('#orange').click(color);

    $('#stream-id').bind('keypress', function(e) {
        if (e.keyCode === 13) {
            closeModal(this.value);
        }
    });

    $('#go-channel').bind('click', function(e) {
        closeModal($('#stream-id')[0].value);
    });

    // $('#cancel-email').bind('click', function() {
    //     $('#email-modal').modal('hide');
    // });

    // $('#go-email').bind('click', function() {
    //     $('#email-modal').modal('hide');
    //     emailButtonHook();
    // });

    // $('#email-id').bind('keypress', function(e) {
    //     if (e.keyCode === 13) {
    //         $('#email-modal').modal('hide');
    //         emailButtonHook();
    //     }
    // });

    // Create SocketIO instance, connect
    // var socket = new io.connect('http://api.fuckitstreamit.com:2000'); 

    // Add a connect listener
    socket.on('connect',function() {
        console.log('Client has connected to the server!');
    });

    // i=0;

    var image = document.getElementById("ia");
    var canvas = document.getElementById("test");
    var context = canvas.getContext('2d');

    // Add a connect listener

    socket.on('message',function(data) {
        idleDisplayed = false;
        document.getElementById('load_gif').css('display', 'none');
        last_conn_time = new Date().getTime() / 1000;
        made_connection = true;
        image.src = "data:image/jpg;base64,"+data;
        document.getElementById("test").width = 358;
        document.getElementById("test").height = 358 * image.height / image.width;

        context.drawImage(image, 0, 0, 358, 358 * image.height / image.width);
    });

    socket.on('disconnect',function() {
        console.log('The client has disconnected!');
    });
});

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    $_GET[decode(arguments[1])] = decode(arguments[2]);
});


// var downloadButtons = $('.download-link');
// for (var i = 0; i < downloadButtons.length; i++) {
//     downloadButtons[i].addEventListener('click', downloadButtonHook, false);
// }

// var emailButtons = $('.emailBtn');
// for (i = 0; i < emailButtons.length; i++) {
//     emailButtons[i].addEventListener('click',emailModalHook, false);
// }

// var emailModalHook = function () {
//     $('#email-modal').modal('show');
// };


    // jQuery.fn.shake = function(intShakes, intDistance, intDuration) { 
    //         this.each(function() { 
    //                 $(this).css("position","relative"); 
    //                 for (var x=1; x<=intShakes; x++) { 
    //                     $(this).animate({left:(intDistance*-1)
    //                 }, (((intDuration/intShakes)/4))) 
    //                 .animate({left:intDistance}, 
    //                     ((intDuration/intShakes)/2)) 
    //                 .animate({left:0}, 
    //                     (((intDuration/intShakes)/4))); 
    //                 } 
    //             }); 
    //         return this; 
    //     };