// Socket public js
'use strict';

var last_conn_time = new Date().getTime() / 1000;
var made_connection = false;
var IDLE_THRESHOLD = 10; // in seconds
var INIT_THRESHOLD = 3;

var idle_img = new Image();
var idleDisplayed = false;
var col = "black";

var color = function(obj) {
    col = obj.target.id;
};

// TODO - replace this with a totally different get call, this is broken.
var $_GET = {}; 

// FUNCTIONS LIST ====================================================
var emailModalHook = function () {
    $('#email-modal').modal('show');
};

var emailButtonHook = function(){
    var screenshots = $('canvas.screenshot'),
        imgarray = [],
        _i = 1
        ;

    _.each(screenshots, function(shot){
            imgarray.push(decodeURI(shot.toDataURL("image/jpeg")));
        });

    var payload = {
        email: decodeURI($('#email-id')[0].value),
        img_array: imgarray
    };
        
    // Send out some e-mail! We don't need to support this part.
    socket.emit('pics', {msg: payload});
}

var downloadButtonHook = function(e){
    e.preventDefault();
    var target = e.target;

    while (!$(target).hasClass('panel-heading') && !$(target).hasClass('panel-footer')) {
        target = target.parentElement;
    }

    Canvas2Image.saveAsPNG(target.parentElement.children[1].children[0]);

    return;
}


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

            var threshold = (made_connection) ? IDLE_THRESHOLD : INIT_THRESHOLD;
            if (now - last_conn_time > threshold){
                displayIdle();
            }
        },5000);

        $('#login-modal').modal('hide');
        $('#main-row').css('opacity',1);
        $('.panel-title > span')[0].innerText = id;
    }

};


var screenshotButtonHook = function(colour){

    $('#main-panel').removeClass('col-md-offset-4');
    $('#main-panel').addClass('col-md-offset-2');
    
    var screenshotsContainer = document.getElementById('screenshots-container'),
        leftCarouselButton = $('.left.carousel-control')[0],
        rightCarouselButton = $('.right.carousel-control')[0],
        canvas = document.getElementById("test"),
        canvas2 = $('.screenshot')[0],
        context2 = canvas2.getContext('2d');


    leftCarouselButton.style.visibility = 'visible';
    rightCarouselButton.style.visibility = 'visible';
    
    var time = new Date();
    time = time.toTimeString();
    
    var text =  '<div class="item active">'+
                '<div class="panel panel-primary">'+
                '<div class="panel-heading">'+
                    '<h4 class="panel-title">' + time + '</h4>'+
                '</div>'+
                '<div class="panel-screenview panel-body">'+
                    '<canvas class="screenshot"></canvas>'+
                '</div>'+
                '<div class="panel-footer">'+
                    '<button type="button" class="download-link btn btn-default">Download <span class="glyphicon glyphicon-download"></span></button>'+
                    '<button type="button" class="emailBtn btn btn-default">Email <span class="glyphicon glyphicon-envelope"></span></button>'+
                '</div>'+
                '</div>'+
                '</div>';
    
    if (screenshotsContainer.children[0]) {
        $(screenshotsContainer.children[0]).removeClass('active');
    }
    screenshotsContainer.insertAdjacentHTML('afterbegin', text); 
        
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    //context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    context2.drawImage(canvas, 0, 0, canvas.width, canvas.height);

     // Start Shenil --> start listening for mouse events on the web screen? Hmm.
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

    // listening for enter or esc keys, and otherwise...?
    document.addEventListener("keypress", function (e) {
    //    if (e.altKey){ return; }

        if (enteringText && (e.keyCode === 13 /*enter*/ || e.keyCode === 27 /*esc*/)){
            enteringText = false;
            flag = false;
            dot_flag = false;
        }
        
        if (!enteringText){ return; }

        e.preventDefault();
        
        var thecontext = textCanvas.getContext('2d');
        thecontext.font = "20pt Arial"; //Courier";

        var text_offset = (thecontext.measureText(currentString).width);
        currentString += String.fromCharCode(e.which);
        thecontext.fillText(String.fromCharCode(e.which), text_x + text_offset, text_y);

    }, false);

    var flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

    var x = "black",
        y = 2;

    // This draws the user-received touchpoint on the web app screen
    function draw(colour) {

        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = colour;
        ctx.lineWidth = "3";
        ctx.stroke();
        ctx.closePath();
    }

    // This clears the user-received touchpoint on the web app screen
    function erase() {
        var m = confirm("Want to clear");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    }

    // This takes a screencap of whatever's happening on screen.
    function save() {
        document.getElementById("canvasimg").style.border = "2px solid";
        var dataURL = canvas.toDataURL();
        document.getElementById("canvasimg").src = dataURL;
        document.getElementById("canvasimg").style.display = "inline";
    }

    // variables for the following set of functions, which are positional?
    var enteringText = false,
        textCanvas = null,
        currentString = "",
        text_x = 0,
        text_y = 0;

    // get the position of something
    function getPos(el){
        // yay readability
        for (var lx=0, ly=0; 
             el !== null; 
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent)
        {
            return {x: lx,y: ly};
        }
    }

  // is this different than the above?
    function findxy(res, e) {

        var event = e || window.event; 
        if (enteringText) {return;}
        

        var canvas = e.target;
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        var pos;

        // if the response is down, move the cursor down.
        if (res === 'down') {
            prevX = currX;
            prevY = currY;
            pos = getPos(canvas);
            currX = e.pageX - $(e.target).offset().left;
            currY = e.pageY - $(e.target).offset().top;
  
            if (e.altKey){
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
                ctx.fillStyle = colour;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }

      // if the response is up, or out, draw the cursor up and out?
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
                ctx.strokeStyle = colour;
                ctx.lineWidth = 5;
                ctx.stroke();
                prevX = currX;
                prevY = currY;
            }
        }
    }
    // End Shenil --> Stop listening for mouse events on the web screen? Hmm.

    var downloadButtons = $('.download-link');
    var emailButtons = $('.emailBtn');

    _.each(downloadButtons, function(button){
        button.addEventListener('click', downloadButtonHook, false);
    });
    
    _.each(emailButtons, function(button){
        button.addEventListener('click',emailModalHook, false);
    });

};

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


// APP - ON LOAD OF DOCUMENT, DO THESE THINGS
$(document).ready(function() {

    var load_gif = $("#load-gif"),
        video = document.getElementById('main-screen'),
        btnScreenshot = document.getElementById('btn-screenshot'),
        mainRow = document.getElementById('main-row'),
        streamChooser = document.getElementById('stream-chooser'),
        channelChange = document.getElementById('#change-channel-btn');
        
    btnScreenshot.onclick = function(){ screenshotButtonHook(col); };
    // channelChange.onclick = function(){ $('#login-modal').modal('show'); };
    
    $('.carousel').carousel({
        interval: 0
    });

    // SOCKET THINGS ==============================================
    var i=0,
        image = document.getElementById("ia"),
        canvas = document.getElementById("test"),
        context = canvas.getContext('2d');

    var socket = io('http://127.0.0.1:2000'); 

    var joinChannel = function(chan) {
        $('#chan').text(chan.toLowerCase());
        socket.emit("channel", { room: chan });
    }

    // Add a connect listener
    socket.on('connect',function() {
        console.log('Client has connected to the server!');
    });

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


// DO THINGS WITH GET ===============================================
    $('#login-modal').modal('show');
    
    if ($.get('channel')) {
        joinChannel($.get('channel'));
        load_gif.css('display', 'block');

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
        $('.panel-title > span')[0].innerText = $.get('channel');
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

// I have no idea what this part is for.
document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    var decode = function(s) {
        return decodeURIComponent(s.split("+").join(" "));
    };
    
    $.get(decode(arguments[1])) = decode(arguments[2]);
});
