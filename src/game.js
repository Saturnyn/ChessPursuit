window.onload = function(){
	"use strict";

	var win = window;
	var document = win.document;
	var body = document.body;
	var Math = win.Math;

	var PI = Math.PI;
	var sqrt = Math.sqrt;
	var rand = Math.random;


	var YES = true;
	var NO = false;


	//------------------------------------------------------------------------------------------------------------------
	// sizes and DOM
	//------------------------------------------------------------------------------------------------------------------

	var HORIZON_Y = 100;
	var SIZE = 400;
	var NUM_CELLS = 8;
	var CELL_SIZE = SIZE/NUM_CELLS;
	var NUM_CELLS_DISPLAYED = NUM_CELLS*2+3;

	var screenWidth;
	var screenHeight;
	var screenMinSize;

	var bgCanvas = makeCanvas(SIZE, SIZE);
	var bgCtx = getContext(bgCanvas);

	var shadowCanvas = makeCanvas(SIZE, SIZE);
    var shadowCtx = getContext(shadowCanvas);

	var skyCanvas = makeCanvas(SIZE, 2*SIZE);
    var skyCtx = getContext(skyCanvas);

	window.onresize = onResize();
	function onResize(){
		screenWidth = win.innerWidth;
		screenHeight = win.innerHeight;
		bgCanvas.width = SIZE;
		bgCanvas.height = SIZE + HORIZON_Y;
	}



	//------------------------------------------------------------------------------------------------------------------
	// game logic
	//------------------------------------------------------------------------------------------------------------------

	var gameIsOver = false;
    var homeScreen = false;
    var progress = 0;	//expressed as a number of rows
    var progressPerSec = 1;
    var checkBoard = {};
    var topRowDisplayed = -1;
    var raf = true;

    var playerPiece = null;

    //pieces
    var PLAYER = 'kp';
    var PAWN = 'p';
    var KING = 'k';


	//input
	var keys = {};
	var mouse = {};

	//------------------------------------------------------------------------------------------------------------------
	// main loop
	//------------------------------------------------------------------------------------------------------------------

	function init(){
		body.appendChild(bgCanvas);
		initSvg();
		initShadowCanvas();

		drawSky();
		initCheckBoard();

		onResize();
        tic();

        document.onmousedown = function(){
        	raf = !raf;
			console.log('debug toggle anim: ',raf);
			if(raf){
				lastTime = Date.now();
				tic();
			}
        };
	}

	function initCheckBoard(){
		var p = makePiece;
		var iCol, iRow;

		p(PAWN, 0, 4);

		for(iCol=0; iCol<NUM_CELLS; iCol++){
			p(PAWN,1,iCol);
		}

		playerPiece = p(PLAYER, 5, 5);

		/*
		iCol = 0;
		for(iRow=0; iRow<100; iRow++){
			for(iCol=0; iCol<NUM_CELLS; iCol++){
				p(PAWN, 10+iRow, iCol);
			}
		}
		*/
	}

	function makePiece(shapeId, row, col){
		var piece = {
			shape: null,
			shapeId: shapeId,
			row: row,
			col: col
		};
		if(!checkBoard[row]){
			checkBoard[row] = {};
		}
		checkBoard[row][col] = piece;
		return piece;
	}

	var KEY_LATENCY = 4;
	var KEY_DONE = -10;
	var moveX = 0;
	var moveY = 0;
	function processInput(){
		if(topRowDisplayed <= 0){
			return;
		}
		//We have to detect combinations for diagonal movement with some latency
		var dx = 0;
		var dy = 0;
		if(keys.down == KEY_LATENCY || keys.down === 0){
			dy = -1;
		}
		if(keys.up == KEY_LATENCY || keys.up === 0){
			dy = 1;
		}
		if(keys.left == KEY_LATENCY || keys.left === 0){
			dx = -1;
		}
		if(keys.right == KEY_LATENCY || keys.right === 0){
			dx = 1;
		}
		if(dx && !dy){
			if(keys.down >= 0 && keys.down <= KEY_LATENCY){
				dy = -1;
				keys.down = 0;
			}
			if(keys.up >= 0 && keys.up <= KEY_LATENCY){
				dy = 1;
				keys.up = 0;
			}
		}
		if(dy && !dx){
			if(keys.left >= 0 && keys.left <= KEY_LATENCY){
				dx = -1;
				keys.left = 0;
			}
			if(keys.right >= 0 && keys.right <= KEY_LATENCY){
				dx = 1;
				keys.right = 0;
			}
		}

		if(dx || dy){
			var oldCol = playerPiece.col;
			var oldRow = playerPiece.row;

			playerPiece.col += dx;
			playerPiece.row += dy;
			if(playerPiece.col<0){
				playerPiece.col = 0;
			}else if(playerPiece.col >= NUM_CELLS){
				playerPiece.col = NUM_CELLS-1;
			}
			var rowMin = Math.floor(progress);
			var rowMax = topRowDisplayed-2;
			if(playerPiece.row < rowMin){
				playerPiece.row = rowMin;
			}else if(playerPiece.row >= rowMax){
				playerPiece.row = rowMax;
			}
			//move piece on check board
			delete checkBoard[oldRow][oldCol];
			if(!checkBoard[playerPiece.row]){
				checkBoard[playerPiece.row] = [];
			}
			checkBoard[playerPiece.row][playerPiece.col] = playerPiece;

			if(dx){
				keys.left = KEY_DONE;
				keys.right = KEY_DONE;
			}
			if(dy){
				keys.up = KEY_DONE;
				keys.down = KEY_DONE;
			}
		}



		for(var key in keys){
			if(keys[key] >= 1){
				keys[key]++;
			}else{
				keys[key]--;
			}
		}
	}

	function tic(){

		if(window.stb) stb(); // Stats plugin for debug

		//lives=1;
		if(gameIsOver){
			if(keys.space){
				gameIsOver = false;
				init();
				keys.space = false;
			}
		}else{
			if(homeScreen){
				renderHomeScreen();
			}else{
				processInput();
				update();

				//var t = Date.now();
				render();
				//console.log('renderTime', Date.now()-t);
			}
		}

		if(window.ste) ste();

		if(raf){
			requestAnimationFrame(tic);
		}
	}


	var lastTime;
	function update(){
		var t = Date.now();
		if(lastTime){
			progress += progressPerSec * (t-lastTime)/1000;
		}
		var topRow = Math.floor(progress) + NUM_CELLS_DISPLAYED;
		if(!lastTime || topRowDisplayed < topRow){
			var row, colIndex, changes;
			//Destroy out of view rows
			for(var i=topRow - NUM_CELLS_DISPLAYED - 5; i>topRowDisplayed - NUM_CELLS_DISPLAYED - 5; i--){
				row = checkBoard[i];
				if(row){
					changes = true;
					console.log('removing row',i);
					for(colIndex=0; colIndex<NUM_CELLS; colIndex++){
						if(row[colIndex]){
							removeSvgShape(row[colIndex]);
						}
					}
					delete checkBoard[i];
				}
			}

			//Create missing shapes in new rows elements
			for(i=topRowDisplayed+1; i<=topRow; i++){
				row = checkBoard[i];
				if(row){
					changes = true;
					console.log('init row',i);
					for(colIndex=0; colIndex<NUM_CELLS; colIndex++){
						//make sure elements can't overlap
						var index = NUM_CELLS/2;
						if(colIndex%2 === 0){
							index += colIndex/2;
						}else{
							index -= (colIndex+1)/2;
						}
						if(row[index]){
							addSvgShape(row[index]);
						}
					}
				}
			}
			if(changes) console.log('updated checkboard, topRowDisplayed',topRowDisplayed,topRow,checkBoard);
			topRowDisplayed = topRow;
		}
		lastTime = t;
	}

	var BG_COLOR = '#193441';
	var CELL_COLOR_1 = '#D1DBBD';
	var CELL_COLOR_2 = '#3E606F';
	var STROKE_COLOR = '#D1DBBD';

	function render(){
		clearCanvas(bgCtx);


		//clear & fill
		bgCtx.save();
		bgCtx.translate(0,HORIZON_Y);
		bgCtx.fillStyle = BG_COLOR;
		bgCtx.beginPath();
		bgCtx.rect(0,0,SIZE,SIZE);
		bgCtx.fill();
		bgCtx.clip();

		var progressIndex = Math.floor(progress);
		var di = -(progress - Math.floor(progress));
		var p1 = {}, p2 = {}, p3 = {}, p4 = {};
		for(var i=-1; i<NUM_CELLS_DISPLAYED; i++){
			for(var j=0; j<NUM_CELLS; j++){
				project((j)/NUM_CELLS, (i+di)/NUM_CELLS, p1);
				project((j)/NUM_CELLS, (i+1+di)/NUM_CELLS, p4);
				project((j+1)/NUM_CELLS, (i+1+di)/NUM_CELLS, p3);
				project((j+1)/NUM_CELLS, (i+di)/NUM_CELLS, p2);

				bgCtx.beginPath();
				bgCtx.moveTo(p1.x * SIZE, p1.y * SIZE);
				bgCtx.lineTo(p2.x * SIZE, p2.y * SIZE);
				bgCtx.lineTo(p3.x * SIZE, p3.y * SIZE);
				bgCtx.lineTo(p4.x * SIZE, p4.y * SIZE);
				bgCtx.closePath();
				bgCtx.lineWidth = 1;
                //bgCtx.strokeStyle = STROKE_COLOR;
                if(((i+j+progressIndex)%2 === 0)){
               		bgCtx.fillStyle = CELL_COLOR_1;
                	//bgCtx.fillStyle = pattern;
                	bgCtx.fill();
                }else{
                	bgCtx.fillStyle = CELL_COLOR_2;
                	//bgCtx.fillStyle = pattern;
                	bgCtx.fill();
                }
			}
		}
		//bgCtx.strokeStyle = 'green';
		//bgCtx.beginPath();
		//bgCtx.rect(0,0,SIZE,SIZE);
		//bgCtx.stroke();
		bgCtx.restore();

		bgCtx.drawImage(skyCanvas,0,0);

		//update pieces
		var projectRes = {};
		for(var rowIndex=topRowDisplayed-NUM_CELLS_DISPLAYED-5; rowIndex<=topRowDisplayed; rowIndex++){
			var row = checkBoard[rowIndex];
			if(row){
				for(var colIndex=0; colIndex<NUM_CELLS; colIndex++){
					if(row[colIndex]){
						var piece = row[colIndex];
						project( (piece.col+0.5)/NUM_CELLS, (piece.row-progress+0.5)/NUM_CELLS, projectRes);
						var thresholdDown = -0.02;
						var thresholdUp = 0.02;
						var opacity = 1;
						if(projectRes.y < thresholdDown){
							opacity = 0;
						}else if(projectRes.y < thresholdUp){
							opacity = 1-(thresholdUp-projectRes.y)/(thresholdUp-thresholdDown);
						}
						piece.shape.style.opacity = opacity;

						var x = projectRes.x * SIZE;
						var y = projectRes.y * SIZE;
						var scale = projectRes.scaleX;
						if(scale > 0){
							y += HORIZON_Y;
							//Note: svg transform origin is the root SVG element origin
							piece.shape.setAttributeNS(null,'transform', 'scale('+scale+') translate('+(x/scale)+','+(y/scale)+')');
						}
					}
				}
			}
		}
	}

	function project(x, y, res){
		res = res || {};

		var t = 0.5*y; // t in [0,1]
        //for width, interpolate between y=1-0.25x and y=2.5-2*x + 0.125*x [0,2]=>[0,1]
      	var width = ellipseEq(t + 0.2, 1.4, 1.0);
		//for y, interpolate between y=x and y=0.75 + 0.125*x [0,2]=>[0,1]
        y = (1-t)*t + t*(0.75+0.25*t);

		res.x = (1-width)/2 + x*width;
		res.y = 1-y;
		res.scaleX = width;
		res.scaleY = width;

		return res;
	}

	function ellipseEq(x, a, b){
		// x²/a² + y²/b² = 1
		// y = sqrt( (1-x²/a²)*b² )
		return Math.sqrt( (1-((x*x)/(a*a)))*b*b );
	}

	function initShadowCanvas(){
		var ctx = shadowCtx;
		//Top down shadow */
		var grd = ctx.createLinearGradient(0,0,0,SIZE);
		var c = 'rgba(10,20,25,';
		var c2 = ')';
		grd.addColorStop(0, c + 0 + c2);
		grd.addColorStop(0.2, c + 0 + c2);
		//grd.addColorStop(0.9,"rgba(0,0,0,0.3)");
		grd.addColorStop(1, c + 0.5 + c2);

		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, SIZE, SIZE);
		ctx.restore();

		shadowCanvas.style.top = HORIZON_Y+'px';
		shadowCanvas.style.pointerEvents = 'none';
		body.appendChild(shadowCanvas);
	}
	function drawSky(){
		var ctx = skyCtx;
		ctx.clearRect(0,0,SIZE,SIZE);

		ctx.save();
		//Draw sky
		ctx.fillStyle = '#FF8601';
		ctx.beginPath();
		ctx.rect(0, 0, SIZE, HORIZON_Y);
		ctx.fill();
		ctx.clip();
		//Draw sun
		ctx.fillStyle = '#FFE7CA';
		var sunRadius = SIZE/4;
		ctx.beginPath();
		ctx.arc(SIZE/2, HORIZON_Y + 0.3*sunRadius, sunRadius, 0, PI, true);
		ctx.fill();
		ctx.restore();
		//Draw Mountains
		ctx.beginPath();
		ctx.fillStyle = 'rgb(10,20,25)';

		var mountainMaxHeight = 40;
        var points = [
        	0, 0.7,
        	0.1,0.3,
        	0.2, 1,
        	0.3, 0.5,
        	0.35, 0.8,
        	0.42, 0.5,
        	0.55, 0.9,
        	0.7, 0.45,
        	0.8, 1.1,
        	0.88, 0.4,
        	1,0.8
        ];
        var mountainX = 0;
        for(var i=0; i<points.length; i+=2){
        	var x = points[i] * SIZE;
        	var y = HORIZON_Y - (mountainMaxHeight*points[i+1]);
        	if(i===0){
				ctx.moveTo(x, y);
			}else{
				ctx.lineTo(x, y);
			}
		}
		ctx.lineTo(SIZE,HORIZON_Y);
		ctx.lineTo(0,HORIZON_Y);
		ctx.fill();
		ctx.restore();

		ctx.save();
		ctx.translate(0,HORIZON_Y);
		var shadowSize = SIZE * 0.02;
		var grd = ctx.createLinearGradient(0,0,0,shadowSize);
		var c = 'rgba(10,20,25,';
		var c2 = ')';
		grd.addColorStop(0, c + 1 + c2);
		grd.addColorStop(1, c + 0 + c2);

		ctx.fillStyle = grd;
        ctx.fillRect(0, 0, SIZE, shadowSize);
		ctx.restore();

		/*
		skyCtx.beginPath();
		skyCtx.lineWidth = 1;
		skyCtx.strokeStyle = STROKE_COLOR;
		var randOffset = 4;
		var y1, y2;
		for(var i=-randOffset; i<SIZE+randOffset; i+=10){
			y1 = 1-Math.sin( (i/SIZE)*PI/2);
			y2 = 1-Math.sin( (i/SIZE)*PI/2);
			y1 = y1*SIZE + rand()*randOffset;
			y2 = y2*SIZE +rand()*randOffset;
            skyCtx.moveTo(0,y1);
			skyCtx.lineTo(SIZE,y2);
		}
		skyCtx.stroke();
		document.body.appendChild(skyCanvas);
		*/

		/*
		//Top down shadow
		var grd = skyCtx.createLinearGradient(0,0,0,SIZE/2);
        grd.addColorStop(0,"rgba(0,0,0,0.6)");
		grd.addColorStop(0.1,"rgba(0,0,0,0.3)");
		grd.addColorStop(1,"rgba(0,0,0,0)");
		*/


	}

	//------------------------------------------------------------------------------------------------------------------
    //  svg
    //------------------------------------------------------------------------------------------------------------------

	var svgMakeUse;
	var svgElem;
	var svgCache = {};

	function addSvgShape(piece){
		var shape;
		if(!svgCache[piece.shapeId]){
			svgCache[piece.shapeId] = [];
		}
		if(svgCache[piece.shapeId].length){
			shape = svgCache[piece.shapeId].pop();
		}else{
			shape = svgMakeUse(piece.shapeId);
		}
		//Important: we assume element are always added to the top of the screen
		//so they have to be prepended in order to be painted in the correct order
		if(svgElem.firstChild){
			svgElem.insertBefore(shape,svgElem.firstChild);
		}else{
			svgElem.appendChild(shape);
		}

		if(piece.shape){
			throw new Error();
		}
		piece.shape = shape;
	}

	function removeSvgShape(piece){
		svgCache[piece.shapeId].push(piece.shape);
		svgElem.removeChild(piece.shape);
		piece.shape = null;
	}

	function initSvg(){
		svgMakeUse = makeUse;
		var xmlns = "http://www.w3.org/2000/svg";
		var xlinkns = "http://www.w3.org/1999/xlink";
		var boxWidth = SIZE;
		var boxHeight = SIZE + HORIZON_Y;

		svgElem = document.createElementNS (xmlns, "svg");
		svgElem.setAttribute("xmlns", xmlns);
		svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
		svgElem.setAttributeNS(null, "width", boxWidth);
		svgElem.setAttributeNS(null, "height", boxHeight);
		document.body.appendChild (svgElem);

		var defs = document.createElementNS (xmlns, "defs");
		svgElem.appendChild (defs);

		//For convenience, shape defs are given in a [10,10] rect, transformed to [CELL_SIZE,CELL_SIZE] in actual SVG
		//We also transform the shape positions so that the piece origin is [OX,OY]
		var OX = 5;
		var OY = 8;
		var PIECE_FILL_COLOR = '#eee';
		var PIECE_STROKE_COLOR = '#555';
		//PAWN
		svgStyle(
			makeDef(PAWN,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[5,3],'L',[2,8]]),
				makeCircle(5,3,2)
			]), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		//PLAYER
		svgStyle(
			makeDef(PLAYER,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[5,3],'L',[2,8]]),
				makeCircle(5,3,2)
			]), '#002', '#333', 0
		);

		function makeDef(id, shapes){
			var def = document.createElementNS (xmlns, "g");
			def.setAttributeNS (null, "id", id);

			def.appendChild(makeShadow());
			for(var i=0; i<shapes.length; i++){
				var shape = shapes[i];
				shape.setAttributeNS(null,'x',-CELL_SIZE/2);
				shape.setAttributeNS(null,'y',-CELL_SIZE);
				def.appendChild(shape);
			}

			defs.appendChild (def);
			return def;
		}

		function makeShadow(){
			var shadow = makeEllipse(5, 8, 3.1, 1.8);
			svgStyle(shadow,'rgba(0,0,0,0.2)','none');
			return shadow;
		}

		function makeCircle(cx, cy, r){
			var circle = document.createElementNS (xmlns, "circle");
			svgAttrs(circle, {
				cx: svgFloat(cx - OX),
				cy: svgFloat(cy - OY),
				r: svgFloat(r)
			});
			return circle;
		}

		function makeEllipse(cx, cy, rx, ry){
			var ellipse = document.createElementNS (xmlns, "ellipse");
			svgAttrs(ellipse, {
				cx: svgFloat(cx - OX),
				cy: svgFloat(cy - OY),
				rx: svgFloat(rx),
				ry: svgFloat(ry)
			});
			return ellipse;
		}

		function makePath(list){
			var path = document.createElementNS (xmlns, "path");
			path.setAttributeNS (null, "d", makePathString(list));
			return path;
		}

		function makePathString(list){
			var path = '';
			for(var i=0; i<list.length; i++){
				var e = list[i];
				if(typeof e == 'object'){
					e = svgFloat(e[0]-OX) + ',' + svgFloat(e[1]-OY);
				}
				path += e+' ';
			}
			return path;
		}

		function makeUse(id, attrs){
			var use = document.createElementNS(xmlns, "use");
			svgAttrs(use, attrs);
			use.setAttributeNS (xlinkns, "xlink:href", "#"+id);
			use.setAttribute("xmlns:xlink", xlinkns);
			return use;
		}

		function svgFloat(f){
			return Math.round(CELL_SIZE * f)*0.1;
		}

		function svgStyle(svgElem, fill, stroke, strokeWidth){
			var attrs = {};
			if(typeof fill != 'undefined'){
				attrs.fill = fill;
			}
			if(typeof stroke != 'undefined'){
				attrs.stroke = stroke;
			}
			if(typeof strokeWidth != 'undefined'){
				attrs.strokeWidth = strokeWidth;
			}
			svgAttrs(svgElem, attrs);
			return svgElem;
		}

		function svgAttrs(el, attrs){
			if(attrs){
				for(var key in attrs){
					el.setAttributeNS (null, key, attrs[key]);
				}
			}
			return el;
		}
	}

	//------------------------------------------------------------------------------------------------------------------
	// canvas helper functions
	//------------------------------------------------------------------------------------------------------------------

	function makeCanvas(width, height){
		var canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		return canvas;
	}

	function getContext(canvas){
		return canvas.getContext("2d");
	}

	function style(ctx, fill,stroke,lineWidth){
		if(fill) ctx.fillStyle = fill;
		if(stroke) ctx.strokeStyle = stroke;
		if(lineWidth) ctx.lineWidth = lineWidth;
	}

	// c: color string or canvas/image
	function fillRect(ctx,x,y,w,h,c){
		if(c){
			if(c.width){
				c = ctx.createPattern(c, 'repeat');
			}
			style(ctx,c);
		}
		ctx.fillRect(x,y,w,h);
	}

	function drawImage(ctx,src,x,y){
		ctx.drawImage(src,x,y);
	}

	function drawCircle(ctx,x,y,radius,fill,stroke){
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * PI, false);
		if(fill){
			ctx.fill();
		}
		if(stroke){
			ctx.stroke();
		}
	}

	function drawLine(ctx,x,y,x2,y2){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}

	function clearCanvas(ctx){
		ctx.clearRect(0,0,screenWidth,screenHeight);
	}

	//-----------------------------------------------------------
	// Input
	//-----------------------------------------------------------


	var keyMap = {
		37: "left", // left arrow
		65: "left", // a
		81: "left", // q
		38: "up",   // up arrow
		90: "up",	// z
		87: "up",	// w
		83: "down",	// d
		40: "down",
		39: "right",// right arrow
		68: "right",//d
		32: "space",
		27: "esc",
		13: "Enter"
	};
	//Set up key listener
	function onkey(isDown, e) {
		if (!e) e = window.e;
		var c = e.keyCode;
		if (e.charCode && !c) c = e.charCode;

		if(isDown){
			keys[keyMap[c]] = 1;
		}else{
			if(keys[keyMap[c]] > 0){
				keys[keyMap[c]] = 0;
			}
		}
	}
	document.onkeyup = function(e){
		onkey(false, e);

		if(e.keyCode==27) toggleHome();
		if(e.keyCode==32 && homeScreen) toggleHome();

	};
	document.onkeydown = function(e){
		onkey(true, e);
	};

	function onmouse(isDown,e){
		var rightClick;
		var middleClick;
		if ("which" in e){ // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
			rightClick = e.which == 3;
			middleClick = e.which == 2;
		}else if ("button" in e){  // IE, Opera
			rightClick = e.button == 2;
			middleClick = e.button == 1;
		}
		if(rightClick){
			mouse.right = isDown;
		}else if(middleClick){
			mouse.middle = isDown;
		}else{
			mouse.left = isDown;
		}
		document.onmousemove(e);
	}
	document.onmousedown = function(e){
		onmouse(true,e);
	};
	document.onmouseup = function(e){
		onmouse(false,e);
	};
	document.onmousemove = function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};

	document.oncontextmenu = function(e){
		return false;
	};


	init();
};