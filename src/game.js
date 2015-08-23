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

	var SCALE = 1;
	var HORIZON_Y = 100 * SCALE;
	var SIZE = 400 * SCALE;
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

	var now = 0; //Date.now(), set on update
	var lastTime;
    var MS_TO_S = 1/1000;

	var gameIsOver = false;
    var homeScreen = false;
    var progress = 0;	//expressed as a number of rows
    var progressPerSec = 1; //1
    var checkBoard = {};
    var topRowDisplayed = -1;
    var raf = true;
    var removedPieces = [];

    var player = null;
	var playerAnimDuration = 0.05;
	var playerInvalidDuration = 0.5;

	var checkText;

    //pieces
    var PLAYER = 'P';
    var PAWN = 'p';
    var KING = 'K';
    var ROOK = 'r';
    var BISHOP = 'b';
    var KNIGHT = 'k';
    //filters
    var ENEMY = 'e';
    var CHECK_TEXT = 'ct';
	var CHECK_GRADIENT = 'cg';

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

		/*
		var p = [0,0.5,1,1.5,2];
		var A_Y = A_S;
		var B_Y = B_S;
		var C_Y = C_S;
		console.log(A_Y,B_Y,C_Y);

		for(var i =0; i<p.length ; i++){
			var x = p[i];
			var y = quadraticEq(x,A_Y,B_Y,C_Y);
			var res = [ reverseQuadraticEq(y,A_Y,B_Y,C_Y, true), reverseQuadraticEq(y,A_Y,B_Y,C_Y, false) ];
			console.log(res[0]==x || res[1] == x, x,y,res);
		}
		*/
		/*
		var x = 0.35;
		var y = 0.7;
		project(x,y);
		reverseProject(project.res.x, project.res.y);
		console.log(x,project.res.x,reverseProject.res.x);
		console.log(y,project.res.y,reverseProject.res.y);
		*/
	}

	function initCheckBoard(){
		var currentBlockIndex = 0;
        var startBlockIndex = 6;

		//0 TODO: intro
		block(
			'',
			'',
			'',
			'  krb',
			'',
			'',
			'',
			'    p'
		);

		//1 scattered pawns
		block(
			'  pppp',
			'  pppp',
			'',
			'  p',
			'',
			'     p',
			'',
			''
		);

		//2 pawn rows
		block(
			'',
			'pppppp',
			'',
			'  pppppp',
			'',
			'pppppp',
			'',
			''
		);

		//3 triangle
		block(
			'',
			'pp   ppp',
			'  p p',
			'   p',
			'',
			'',
			'',
			''
		);

		//4 sawtooth
		block(
			'',
			'   pp',
			'p p  p p',
			' p    p',
			'',
			'',
			'',
			''
		);

		//5 wedges
		block(
			'',
			'     ppp',
			'      p',
			'ppp',
			' p   ppp',
			'      p',
			'',
			''
		);

		//6
		block(
			'   p',
			'   r',
			'',
			'   p',
			'   p',
			'',
			'',
			''
		);

		/*

        //first rook
        currentBlockIndex++;
       	p(PAWN,3,3);
       	p(ROOK,6,3);
		*/

		//Add player
		player = makePiece(PLAYER, 5 + progress, 5);


		/*
		//Create a piece, row / col can be an array of two values to set lines
		function piece(type, row, col){
			var rowFrom = row;
			var rowTo = row;
			var colFrom = col;
			var colTo = col;

			if(typeof row != 'number'){
				rowFrom = row[0];
				rowTo = row[1];
			}
			if(typeof col != 'number'){
				colFrom = col[0];
				colTo = col[1];
			}
			var lastPiece = null;
			for(var i=rowFrom; i<=rowTo; i++){
				for(var j=colFrom; j<=colTo; j++){
					lastPiece = makePiece(type,i + currentBlockIndex * NUM_CELLS,j);
				}
			}
			return lastPiece;
		}
		*/

		//Create a block of 8/8
		function block(){
			if(currentBlockIndex >= startBlockIndex){
				var blockIndex = startBlockIndex ? (currentBlockIndex - startBlockIndex +1) : 0;
				var args = Array.prototype.slice.call(arguments);
				if(args.length != NUM_CELLS) throw new Error();
				for(var i=args.length-1; i>=0; i--){
					var row = args[i];
					if(row.length > NUM_CELLS) throw new Error();
					var rowIndex = (blockIndex+1)*NUM_CELLS - i -1;
					if(row !== ''){
						for(var j=0; j<row.length; j++){
							var char = row.charAt(j);
							if(char!==' ' && char!=='-'){
								makePiece(char, rowIndex, j);
							}
						}

					}
				}
			}
			currentBlockIndex++;
		}

	}

	function makePiece(type, row, col){
		var piece = {
			shape: null,
			type: type,
			row: row,
			col: col
		};
		if(!checkBoard[row]){
			checkBoard[row] = {};
		}
		checkBoard[row][col] = piece;
		return piece;
	}

	//input
	var KEY_LATENCY = 6;
	var KEY_DONE = -1;
	var keys = {
		left:-1,
    	right:-1,
		up:-1,
		down:-1
	};
	var keysBlockedUntilAllUp = false;
	var mouse = {};
	var mouseRow = -1;
	var mouseCol = -1;
	function processInput(){
		if(topRowDisplayed <= 0){
			return;
		}
		if(player.anim){
			//can't during animation
			return;
		}

		var dx = 0;
        var dy = 0;
		if(!keysBlockedUntilAllUp){

			//read keys that were just released or that were pressed just a few frames ago
			//this leaves some time for a combination (ie: up+right)
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

			if(dx || dy){
				//look for a combo: another key that was pressed during the latency
				if(!dx){
					if(keys.left <= KEY_LATENCY && keys.left > 0){
						dx = -1;
					}
					if(keys.right <= KEY_LATENCY && keys.right > 0){
						dx = 1;
					}
				}else{
					if(keys.up <= KEY_LATENCY && keys.up > 0){
						dy = 1;
					}
					if(keys.down <= KEY_LATENCY && keys.down > 0){
						dy = -1;
					}
				}
				//console.log(keys,dx,dy);
				movePlayer(player.row+dy, player.col+dx);

				keysBlockedUntilAllUp = true;
			}
		}

		var keyName;
		if(keysBlockedUntilAllUp){
			var allUp = true;
			for(keyName in keyBoolMap){
				if(keyBoolMap[keyName]){
					allUp = false;
					break;
				}
			}
			keysBlockedUntilAllUp = !allUp;
		}

		//update key pressed counters
		for(keyName in keys){
			if(keys[keyName] >= 1){
				keys[keyName]++;
			}else if(keys[keyName]>KEY_DONE){
				keys[keyName]--;
			}
		}

		// no keyboard input => check mouse
		if(!player.anim && mouse.x > 0 && mouse.x<SIZE && mouse.y > HORIZON_Y && mouse.y < SIZE + HORIZON_Y ){
			/*
			dx = 0;
			dy = 0;
			var angle = Math.atan2(mouse.y-player.y,mouse.x-player.x)*180/PI;
			var part = Math.floor(angle / 22.5); //[-8,7]
			if(part <= -6 || part >= 5){
				dx = -1;
			}else if(part >= -3 && part <=2){
				dx = 1;
			}
			if(part <= -2 && part >= -7){
				dy = 1;
			}else if(part >= 1 && part <=6){
				dy = -1;
			}

			mouseRow = player.row + dy;
			mouseCol = player.col + dx;
			console.log('mouse part',part,'dx',dx,'dy',dy, Math.round(angle)+'deg');
			if(mouse.left){
				mouse.left = false;
				movePlayer(mouseRow, mouseCol);
			}
			*/
			var mouseX = mouse.x/SIZE;
			var mouseY = (mouse.y-HORIZON_Y)/SIZE;
			reverseProject(mouseX, mouseY);
			mouseCol = Math.floor(reverseProject.res.x * NUM_CELLS);
			mouseRow = Math.floor(reverseProject.res.y * NUM_CELLS + progress);
			dx = mouseCol - player.col;
			dy = mouseRow - player.row;
			if(dx > 1){
				dx = 1;
			}else if(dx < -1){
				dx = -1;
			}
			if(dy > 1){
				dy = 1;
			}else if(dy < -1){
				dy = -1;
			}
			mouseRow = player.row+dy;
			mouseCol = player.col+dx;
			if(mouse.left && (dx || dy)){
				mouse.left = false;
				movePlayer(mouseRow,mouseCol);
			}

			//console.log(mouseX,mouseY,reverseProject.res,mouseCol,mouseRow);

		}else{
			mouseCol = -1;
			mouseRow = -1;
		}
	}

	function movePlayer(row,col){
		var oldCol = player.col;
        var oldRow = player.row;

		if(col<0){
			col = 0;
		}else if(col >= NUM_CELLS){
			col = NUM_CELLS-1;
		}
		var rowMin = Math.floor(progress);
		var rowMax = topRowDisplayed-2;
		if(row < rowMin){
			row = rowMin;
		}else if(row >= rowMax){
			row = rowMax;
		}
		if(col != oldCol || row != oldRow){
			//can cell be taken ?
			var enemyPiece = getEnemyPiece(row,col);

			if(enemyPiece){
				//invalid position
				player.invalid = true;
                player.invalidCol = col;
                player.invalidRow = row;
                player.enemyPiece = enemyPiece;
				col = oldCol;
				row = oldRow;
			}else{
				player.invalid = false;
				if(checkBoard[row][col]){
					//take the piece
					destroyPiece(checkBoard[row][col]);
				}
				//move piece on check board
				delete checkBoard[oldRow][oldCol];
				checkBoard[row][col] = player;
			}
			player.oldCol = oldCol;
			player.oldRow = oldRow;
			player.anim = true;
			player.animStartTime = now;
			player.col = col;
			player.row = row;
		}
	}

	function getEnemyPiece(row,col){
		//pawns
		var enemyPiece =
			getPieceAt(row+1,col-1,PAWN) ||
			getPieceAt(row+1,col+1,PAWN);
		if(enemyPiece){
			return enemyPiece;
		}
		//rook
		var i,j,piece;
		//Check left
		for(j=col-1; j>=0 ; j--){
			piece = getPieceAt(row,j);
			if(piece){
				if(piece.type == ROOK){
					return piece;
				}else{
					break;
				}
			}
		}
		//Check right
		for(j=row+1; j<=NUM_CELLS ; j++){
			piece = getPieceAt(row,j);
			if(piece){
				if(piece.type == ROOK){
					return piece;
				}else{
					break;
				}
			}
		}
		//Check down
		for(i=row+1; i<=row+NUM_CELLS ; i++){
			piece = getPieceAt(i,col);
			if(piece){
				if(piece.type == ROOK){
					return piece;
				}else{
					break;
				}
			}
		}
		//Check up
		for(i=row-1; i>=row-NUM_CELLS ; i--){
			piece = getPieceAt(i,col);
			if(piece){
				if(piece.type == ROOK){
					return piece;
				}else{
					break;
				}
			}
		}
	}

	function getPieceAt(row, col,type){
		var rowArray = checkBoard[row];
		if(rowArray){
			var piece = rowArray[col];
			if(piece && (!type || piece.type == type)){
				return checkBoard[row][col];
			}
		}
	}

	function destroyPiece(piece){
		removedPieces.push(piece);
		piece.removedTime = now;
		piece.justRemoved = true;
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

				//var t = now;
				render();
				//console.log('renderTime', now-t);
			}
		}

		if(window.ste) ste();

		if(raf){
			requestAnimationFrame(tic);
		}
	}

	function update(){
		now = Date.now();
		if(lastTime){
			progress += progressPerSec * (now-lastTime) * MS_TO_S;
		}

		if(player.row < progress - 0.5){
			movePlayer(player.row+1, player.col);
		}

		//update checkboard based on progress
		var topRow = Math.floor(progress) + NUM_CELLS_DISPLAYED;
		if(!lastTime || topRowDisplayed < topRow){
			var row, colIndex, changes;
			//Destroy out of view rows
			for(var i=topRow - NUM_CELLS_DISPLAYED - 5; i>topRowDisplayed - NUM_CELLS_DISPLAYED - 5; i--){
				row = checkBoard[i];
				if(row){
					changes = true;
					//console.log('removing row',i);
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
					//console.log('init row',i);
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
				}else{
					checkBoard[i] = [];
				}
			}
			//if(changes) console.log('updated checkboard, topRowDisplayed',topRowDisplayed,topRow,checkBoard);
			topRowDisplayed = topRow;
		}



		lastTime = now;
	}

	var BG_COLOR = '#193441';
	var CELL_COLOR_1 = '#D1DBBD';
	var CELL_COLOR_2 = '#3E606F';
	var STROKE_COLOR = '#D1DBBD';
	var ROLLOVER_COLOR = '#794';
	var PIECE_FILL_COLOR = '#eee';
    var PIECE_STROKE_COLOR = '#555';
    var INVALID_CELL_COLOR_RGB = '255,0,0';

	function render(){
		// SVG ---
		 
		//update pieces
		var pieceAfterPlayer;
		for(var rowIndex=topRowDisplayed-NUM_CELLS_DISPLAYED-5; rowIndex<=topRowDisplayed; rowIndex++){
			var row = checkBoard[rowIndex];
			if(row){
				for(var colIndex=0; colIndex<NUM_CELLS; colIndex++){
					if(row[colIndex]){
						var piece = row[colIndex];
						//if(piece != player){
							computeCellPos(piece.row, piece.col, piece);
							updatePieceStyle(piece);
							if(piece.y > player.y && (!pieceAfterPlayer || pieceAfterPlayer.y > piece.y)){
								pieceAfterPlayer = piece;
							}
						//}
					}
				}
			}
		}
		if(pieceAfterPlayer){
			//adjust player z-index
			svgElem.insertBefore(player.shape, pieceAfterPlayer.shape);
		}

		//update player anim
		var playerAnimProgress;
		if(player.anim){
			if(!player.invalid){
				playerAnimProgress = (MS_TO_S*(now - player.animStartTime))/playerAnimDuration;
			}else{
				playerAnimProgress = (MS_TO_S*(now - player.animStartTime))/playerInvalidDuration;
			}
			if(playerAnimProgress<0 || playerAnimProgress>=1){
				player.anim = false;
				if(player.invalid && player.enemyPiece){
					player.enemyPiece.shape.style.filter = 'none';
				}
				player.invalid = false;
			}else{
				playerAnimProgress = Math.sin(playerAnimProgress * PI * 0.5); //Ease out
				if(player.invalid){
					computeCellPos(player.row, player.col);
					var shakeAmplitude = 0.4 * (playerAnimProgress < 0.5 ? playerAnimProgress : 1-playerAnimProgress)*CELL_SIZE;
					var shake = Math.sin(6*playerAnimProgress*PI) * shakeAmplitude;
					player.x += shake;
					updatePieceStyle(player);
					//color enemy piece
					player.enemyPiece.shape.style.filter = 'url(#'+ENEMY+')';
				}else{
					//compute old pos
					computeCellPos(player.oldRow, player.oldCol);
					//interpolate
					player.opacity = playerAnimProgress * player.opacity + (1-playerAnimProgress) * computeCellPos.res.opacity;
					player.scale = playerAnimProgress * player.scale + (1-playerAnimProgress) * computeCellPos.res.scale;
					player.x = playerAnimProgress * player.x + (1-playerAnimProgress) * computeCellPos.res.x;
					player.y = playerAnimProgress * player.y + (1-playerAnimProgress) * computeCellPos.res.y;
					updatePieceStyle(player);
				}
			}
		}

		//update removedPieces
		for(i=0,len=removedPieces.length; i<len; i++){
			var removedPiece = removedPieces[i];
			var removedPieceProgress = (now - removedPiece.removedTime) / 1000;

			if(removedPieceProgress > 1){
				//console.log('removedPieces',removedPieces);
				removeSvgShape(removedPiece);
				removedPieces[i] = removedPieces[len-1];
				len--;
				i--;
				removedPieces = removedPieces.slice(0,len);
				//console.log('============>',removedPieces);
			}else{
				if(removedPiece.justRemoved){
					removedPiece.justRemoved = false;
					removedPiece.removedX = removedPiece.x;
					removedPiece.removedY = removedPiece.y;
				}
				if(removedPiece.x < SIZE*0.5){
					removedPiece.x = removedPiece.removedX - removedPieceProgress * SIZE;
				}else{
					removedPiece.x = removedPiece.removedX + removedPieceProgress * SIZE;
				}
				removedPiece.y = removedPiece.removedY - Math.sin(removedPieceProgress*PI) * SIZE * 0.4;
				updatePieceStyle(removedPiece);

				//console.log(removedPiece.x, removedPiece.y, removedPieceProgress);
			}
		}

		//Check text
		if(player.anim && player.invalid){
			if(!checkText){
				checkText = {
					onTop: true,
					type: CHECK_TEXT
				};
			}
			if(!checkText.shape){
				addSvgShape(checkText);
				checkText.row = player.invalidRow;
				checkText.col = player.invalidCol;
			}
			computeCellPos(player.invalidRow, player.invalidCol, checkText);
			checkText.scale = 1;
			checkText.y -= playerAnimProgress * checkText.scale * CELL_SIZE * 0.2;
			checkText.opacity = playerAnimProgress < 0.8 ? 1 : (1-(playerAnimProgress-0.8)/(1-0.8));
			updatePieceStyle(checkText);
		}else if(checkText && checkText.shape){
			removeSvgShape(checkText);
		}



		// CANVAS -----

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
		var i,j,len;
		for(i=-1; i<NUM_CELLS_DISPLAYED; i++){
			for(j=0; j<NUM_CELLS; j++){
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

				if(mouseRow != -1 && mouseCol != -1 && i + progressIndex == mouseRow && j == mouseCol){
					//mouse over
					bgCtx.fillStyle = ROLLOVER_COLOR;
				}else{
					if(((i+j+progressIndex)%2 === 0)){
						bgCtx.fillStyle = CELL_COLOR_1;
					}else{
						bgCtx.fillStyle = CELL_COLOR_2;
					}
				}
				bgCtx.fill();

				if(player.invalid && player.invalidCol == j && player.invalidRow == i + progressIndex){
					//invalid tile
					var invalidOpacity = 1.5 * (playerAnimProgress < 0.5 ? playerAnimProgress : 1-playerAnimProgress);
					bgCtx.fillStyle = 'rgba('+INVALID_CELL_COLOR_RGB+','+invalidOpacity+')';
					bgCtx.fill();
				}
			}
			//Draw checkboard line
			if( (i+progressIndex) % NUM_CELLS === 0){
				project(0, (i+di)/NUM_CELLS, p1);
            	project(1, (i+di)/NUM_CELLS, p2);
            	bgCtx.beginPath();
            	bgCtx.moveTo(p1.x*SIZE,p1.y*SIZE);
            	bgCtx.lineTo(p2.x*SIZE,p2.y*SIZE);
            	bgCtx.closePath();
            	bgCtx.strokeStyle = '#333';
                bgCtx.strokeWidth = '1';
            	bgCtx.stroke();
			}
		}


		//Draw sky
		bgCtx.restore();
        bgCtx.drawImage(skyCanvas,0,0);
	}

	var THRESHOLD_DOWN = -0.02;
	var THRESHOLD_UP = 0.02;
	computeCellPos.res = {};
	function computeCellPos(row, col, res){
		res = res || computeCellPos.res;
		project( (col+0.5)/NUM_CELLS, (row-progress+0.5)/NUM_CELLS);
		var thresholdDown = -0.02;
		var thresholdUp = 0.02;
		var opacity = 1;
		if(project.res.y < THRESHOLD_DOWN){
			opacity = 0;
		}else if(project.res.y < THRESHOLD_UP){
			opacity = 1-(thresholdUp-project.res.y)/(THRESHOLD_UP-THRESHOLD_DOWN);
		}
		res.opacity = opacity;
		res.x = project.res.x * SIZE;
		res.y = project.res.y * SIZE + HORIZON_Y;
		res.scale = project.res.scaleX;
		return res;
	}

	function updatePieceStyle(piece){
		piece.shape.style.opacity = piece.opacity;
		if(piece.scale > 0){
			//Note: svg transform origin is the root SVG element origin
			piece.shape.setAttributeNS(null,'transform', 'scale('+piece.scale+') translate('+(piece.x / piece.scale)+','+(piece.y / piece.scale)+')');
		}
	}

	// For y, projection of a [0,2] position in logical chessboard into a [1,0] position inside the canvas
	// we want: 0->1 and 2->1. You don't want to know how I got those coeff. Don't ask.
	// http://fooplot.com/#W3sidHlwZSI6MCwiZXEiOiItKDMvMTYpKngqeCsoMC8xNikqeCsxIiwiY29sb3IiOiIjMDAwMDAwIn0seyJ0eXBlIjoxMDAwLCJ3aW5kb3ciOlsiLTYuNiIsIjYuNCIsIi0zLjkyIiwiNC4wOCJdfV0-
	var A_Y = 3/16;
	var B_Y = -14/16;
	var C_Y = 1;
	//For scale, we roughly inverse the curve
	var A_S = -2.5/16;
	var B_S = 0/16;
	var C_S = 1;

	// [0,2] in logical chessboard => [0,1] in canvas coordinates
	project.res = {};
	function project(x, y, res){
		res = res || project.res;

		res.y = quadraticEq(y, A_Y, B_Y, C_Y);
		res.scaleX = quadraticEq(y, A_S, B_S, C_S);
		res.scaleY = res.scaleX;
		res.x = (1-res.scaleX)/2 + x*res.scaleX;

		return res;
	}

	function ellipseEq(x, a, b){
		// x²/a² + y²/b² = 1
		// y = sqrt( (1-x²/a²)*b² )
		return Math.sqrt( (1-((x*x)/(a*a)))*b*b );
	}

	reverseProject.res = {};
	function reverseProject(x, y, res){
		res = res || reverseProject.res;
		res.y = reverseQuadraticEq(y, A_Y, B_Y, C_Y, false);
		var scale = quadraticEq(res.y, A_S, B_S, C_S);
		res.x = (x - (1-scale)/2)/scale;
		return res;
	}

	function quadraticEq(x, a, b, c){
		return a*x*x + b*x + c;
	}

	function reverseQuadraticEq(y, a, b, c, pos){
		if(pos){
			return (-b + Math.sqrt(b*b - 4*a*(c-y)))/(2*a);
		}else{
			return (-b - Math.sqrt(b*b - 4*a*(c-y)))/(2*a);
		}
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
		if(!svgCache[piece.type]){
			svgCache[piece.type] = [];
		}
		if(svgCache[piece.type].length){
			shape = svgCache[piece.type].pop();
		}else{
			shape = svgMakeUse(piece.type);
		}
		//Important: we assume element are always added to the top of the screen
		//so they have to be prepended in order to be painted in the correct order
		if(svgElem.firstChild && !piece.onTop){
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
		svgCache[piece.type].push(piece.shape);
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

		//ENEMY FILTER
		makeFilter(ENEMY);
		makeCheckTextDef(CHECK_TEXT,'CHECK');
		//makeCheckTextDef(CHECK_MATE,'Check Mate !');


		svgStyle(
			makeDef(PAWN,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[5,3],'L',[2,8]]),
				makeCircle(5,3,2)
			]), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(KING,[
				makePath(['M',[5,1],'L',[5,-2],'M',[4,-1],'L',[6,-1]], {'stroke-width':3}),
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,3],'L',[7,1],'Q',[5,0],[3,1],'L',[4,3],'L',[2,8]]),
			]), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(KNIGHT,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[7,6],'Q',[8,3],[7,0],'L',[6,1],'L',[5,1],'L',[2,4],'L',[3,5],'L',[5,4],'L',[2,8]]),
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(ROOK,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6.5,3],'L',[8,2],'L',[8,0],'L',[7,0],'L',[7,1],'L',[6,1],'L',[6,0],'L',[4,0],'L',[4,1],'L',[3,1],'L',[3,0],'L',[2,0],'L',[2,2],'L',[3.5,3],'L',[2,8]]),
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(BISHOP,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,4],'Q',[8,1.1],[5,0],'Q',[2,1.1],[4,4],'L',[2,8]]),
				makeCircle(5,0,0.7),
                makePath(['M',[3.8,0.8],'L',[4.4,2.5]], {'stroke-width':2}),
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		//PLAYER
		svgStyle(
			makeDef(PLAYER,[
				makePath(['M',[5,1],'L',[5,-2],'M',[4,-1],'L',[6,-1]], {'stroke-width':3}),
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,3],'L',[7,1],'Q',[5,0],[3,1],'L',[4,3],'L',[2,8]]),
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

		function makeFilter(id){
			var def = document.createElementNS (xmlns, 'filter');
			def.setAttributeNS (null, 'id', id);
			svgAttrs(def, { x:'0', y:'0', width:'100%', height:'100%', 'color-interpolation-filters':'sRGB' });

			def.innerHTML = '<feFlood flood-color="rgba(255,0,0,0.3)" result="COLOR"></feFlood>'+
                            '<feComposite operator="atop" in="COLOR" in2="SourceGraphic"></feComposite>';

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

		function makePath(list, style){
			var path = document.createElementNS (xmlns, "path");
			path.setAttributeNS (null, "d", makePathString(list));
			if(style){
				svgAttrs(path,style);
			}
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

		function makeCheckTextDef(id, text){
			/*
			//Gradient
			var def = document.createElementNS (xmlns, 'linearGradient');
			def.setAttributeNS (null, 'id', CHECK_GRADIENT);
			svgAttrs(def, { x1:'0', x2:'0', y1:'0', y2:'100%', height:'100%', 'gradientUnits':'userSpaceOnUse' });
			def.innerHTML =
                  '<stop stop-color="#FF5B99" offset="0%"></stop>' +
                  '<stop stop-color="#FF5447" offset="50%"></stop>' +
                  '<stop stop-color="#FF7B21" offset="100%"></stop>';
            defs.appendChild(def);
            */

           var def = document.createElementNS (xmlns, 'text');
            def.setAttributeNS (null, 'id', id);
            svgAttrs(def,{
            	'x':'-40',
            	'font-size':'28',
            	'fill':'red',
            	'stroke':'black',
            	'stroke-width':'1',
            	'font-family':'Impact'
            });
            def.innerHTML = text;
            defs.appendChild(def);
		}
	}

	function svgAttrs(el, attrs){
		if(attrs){
			for(var key in attrs){
				el.setAttributeNS (null, key, attrs[key]);
			}
		}
		return el;
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
	// keyName => isDown bool
	var keyBoolMap = {};
	//Set up key listener
	function onkey(isDown, e) {
		if (!e) e = window.e;
		var c = e.keyCode;
		if (e.charCode && !c) c = e.charCode;

		var keyName = keyMap[c];
		if(keyName){
			//only take events that represent an actual change
			if(keyBoolMap[keyName] !== isDown){
				keyBoolMap[keyName] = isDown;
				if(isDown){
					if(keys[keyName]<1){
						console.log('keyDown',keyName);
						keys[keyName] = 1;
					}
				}else{
					if(keys[keyName] > 0){
						console.log('keyUp',keyName);
						keys[keyName] = 0;
					}
				}
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
		//DEBUG
		if(keyBoolMap.space){
			raf = !raf;
			console.log('debug toggle anim: ',raf);
			if(raf){
				lastTime = Date.now();
				tic();
			}
		}
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

	/*
	document.oncontextmenu = function(e){
		return false;
	};
	*/

	init();
};