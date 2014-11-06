function screenshotButtonHook(colour){

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