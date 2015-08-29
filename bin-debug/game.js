/**
 * SfxrParams
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
function J(){this.B=function(e){for(var f=0;24>f;f++)this[String.fromCharCode(97+f)]=e[f]||0;.01>this.c&&(this.c=.01);e=this.b+this.c+this.e;.18>e&&(e=.18/e,this.b*=e,this.c*=e,this.e*=e)}}
var W=new function(){this.A=new J;var e,f,d,h,l,z,K,L,M,A,m,N;this.reset=function(){var b=this.A;h=100/(b.f*b.f+.001);l=100/(b.g*b.g+.001);z=1-b.h*b.h*b.h*.01;K=-b.i*b.i*b.i*1E-6;b.a||(m=.5-b.n/2,N=5E-5*-b.o);L=1+b.l*b.l*(0<b.l?-.9:10);M=0;A=1==b.m?0:(1-b.m)*(1-b.m)*2E4+32};this.D=function(){this.reset();var b=this.A;e=b.b*b.b*1E5;f=b.c*b.c*1E5;d=b.e*b.e*1E5+12;return 3*((e+f+d)/3|0)};this.C=function(b,O){var a=this.A,P=1!=a.s||a.v,r=a.v*a.v*.1,Q=1+3E-4*a.w,n=a.s*a.s*a.s*.1,X=1+1E-4*a.t,Y=1!=a.s,
	Z=a.x*a.x,$=a.g,R=a.q||a.r,aa=a.r*a.r*a.r*.2,D=a.q*a.q*(0>a.q?-1020:1020),S=a.p?((1-a.p)*(1-a.p)*2E4|0)+32:0,ba=a.d,T=a.j/2,ca=a.k*a.k*.01,E=a.a,F=e,da=1/e,ea=1/f,fa=1/d,a=5/(1+a.u*a.u*20)*(.01+n);.8<a&&(a=.8);for(var a=1-a,G=!1,U=0,v=0,w=0,B=0,t=0,x,u=0,g,p=0,s,H=0,c,V=0,q,I=0,C=Array(1024),y=Array(32),k=C.length;k--;)C[k]=0;for(k=y.length;k--;)y[k]=2*Math.random()-1;for(k=0;k<O;k++){if(G)return k;S&&++V>=S&&(V=0,this.reset());A&&++M>=A&&(A=0,h*=L);z+=K;h*=z;h>l&&(h=l,0<$&&(G=!0));g=h;0<T&&(I+=ca,
	g*=1+Math.sin(I)*T);g|=0;8>g&&(g=8);E||(m+=N,0>m?m=0:.5<m&&(m=.5));if(++v>F)switch(v=0,++U){case 1:F=f;break;case 2:F=d}switch(U){case 0:w=v*da;break;case 1:w=1+2*(1-v*ea)*ba;break;case 2:w=1-v*fa;break;case 3:w=0,G=!0}R&&(D+=aa,s=D|0,0>s?s=-s:1023<s&&(s=1023));P&&Q&&(r*=Q,1E-5>r?r=1E-5:.1<r&&(r=.1));q=0;for(var ga=8;ga--;){p++;if(p>=g&&(p%=g,3==E))for(x=y.length;x--;)y[x]=2*Math.random()-1;switch(E){case 0:c=p/g<m?.5:-.5;break;case 1:c=1-p/g*2;break;case 2:c=p/g;c=6.28318531*(.5<c?c-1:c);c=1.27323954*
	c+.405284735*c*c*(0>c?1:-1);c=.225*((0>c?-1:1)*c*c-c)+c;break;case 3:c=y[Math.abs(32*p/g|0)]}P&&(x=u,n*=X,0>n?n=0:.1<n&&(n=.1),Y?(t+=(c-u)*n,t*=a):(u=c,t=0),u+=t,B+=u-x,c=B*=1-r);R&&(C[H%1024]=c,c+=C[(H-s+1024)%1024],H++);q+=c}q=.125*q*w*Z;b[k]=1<=q?32767:-1>=q?-32768:32767*q|0}return O}};
window.jsfxr=function(e){W.A.B(e);var f=W.D();e=new Uint8Array(4*((f+1)/2|0)+44);var f=2*W.C(new Uint16Array(e.buffer,44),f),d=new Uint32Array(e.buffer,0,44);d[0]=1179011410;d[1]=f+36;d[2]=1163280727;d[3]=544501094;d[4]=16;d[5]=65537;d[6]=44100;d[7]=88200;d[8]=1048578;d[9]=1635017060;d[10]=f;for(var f=f+44,d=0,h="data:audio/wav;base64,";d<f;d+=3)var l=e[d]<<16|e[d+1]<<8|e[d+2],h=h+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>18]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>
	12&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l>>6&63]+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l&63]);return h};;/*

Code adapted from:
 http://codepen.io/jackrugile/blog/arcade-audio-for-js13k-games

 */

var aa;
(function(){
function ArcadeAudio() {
	this.sounds = {};
}

ArcadeAudio.prototype.add = function( key, count, settings ) {
	this.sounds[ key ] = [];
	settings.forEach( function( elem, index ) {
		this.sounds[ key ].push( {
			tick: 0,
			count: count,
			pool: []
		} );
		for( var i = 0; i < count; i++ ) {
			var audio = new Audio();
			audio.src = jsfxr( elem );
			this.sounds[ key ][ index ].pool.push( audio );
		}
	}, this );
};

ArcadeAudio.prototype.play = function( key ) {
	var sound = this.sounds[ key ];
	var soundData = sound.length > 1 ? sound[ Math.floor( Math.random() * sound.length ) ] : sound[ 0 ];
	soundData.pool[ soundData.tick ].play();
	soundData.tick < soundData.count - 1 ? soundData.tick++ : soundData.tick = 0;
};

aa = new ArcadeAudio();

aa.add( 'start', 1,
	[
		[0,0.2,0.13,0.01,,0.3328,,,,,,,,0.0994,,,,,1,,,0.1,,0.5]
	]
);

aa.add( 'right', 5,
	[
		[3,1,0.3197,0.7823,0.2124,0.1117,,0.091,,,,,,,,0.3901,0.1061,-0.0873,1,,,,,0.5]
	]
);

aa.add( 'pad', 1,
	[
		[0,,0.0945,,0.1582,0.4416,,-0.535,,,,,,0.3856,,,,,1,,,0.0896,,0.5]
	]
);
aa.add( 'boost', 1,
	[
		[0,,0.2833,,0.1918,0.4914,,0.2408,,,,,,0.0182,,,,,1,,,,,0.5]
	]
);
aa.add( 'ring', 5,
	[
		[0,,0.0177,0.565,0.2893,0.4147,,,,,,0.4159,0.6958,,,,,,1,,,,,0.5]
	]
);
aa.add( 'bumper', 1,
	[
		[0,,0.2389,,0.2437,0.5057,,0.164,,,,,,0.1032,,,,,1,,,,,0.5]
	]
);
aa.add( 'hurt', 1,
	[
		[0,,0.2056,,0.2341,0.2899,,0.3315,,,,,,0.1817,,0.6354,,,1,,,,,0.5]
	]
);
aa.add( 'eat', 1,
	[
		[0,,0.3402,,0.2772,0.4978,,0.1736,,0.2589,0.3885,,,0.1153,,,,,1,,,,,0.5]
	]
);
aa.add( 'die', 1,
	[
		[3,,0.296,0.6924,0.1761,0.2478,,0.0895,,,,-0.6933,0.8848,,,,,,1,,,,,0.5]
	]
);
})();;window.onload = function(){
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

	var gameOverScreen = null;
	var gameIsOver = false;
	var autoMove = false;
    var homeScreen = false;
    var progress = 0;	//expressed as a number of rows
    var progressPerSec = 1; //1
    var checkBoard = null;
    var checkPoints = null;
    var topRowDisplayed = -1;
    var raf = true;
    var removedPieces = [];

    var player = null;
	var playerAnimDuration = 0.05;
	var playerInvalidDuration = 0.5;

	var checkText;

    //pieces id (used in SVG and checkboard)
    var HERO_KING = 'h';
    var ENEMY_KING = 'e';
    var PAWN = 'p';
    var ROOK = 'r';
    var BISHOP = 'b';
    var KNIGHT = 'k';
    var LAND_MINE = 'l';
    var WAR_BEAR = 'w';
    var CASTLE = 'c';

    //other SCG ids
    var ENEMY_FILTER = 'ef';
    var CHECK_TEXT = 'ct';
	var CHECK_GRADIENT = 'cg';



	var DANGER = '*';
	var CHECK_POINT = '#';

	//------------------------------------------------------------------------------------------------------------------
	// main loop
	//------------------------------------------------------------------------------------------------------------------

	function init(){
		body.appendChild(bgCanvas);
		initSvg();
		initShadowCanvas();
		drawSky();
		onResize();

		initCheckBoard(5);

        tic();
	}

	function restart(){
		//find we checkpoint we were at
		var checkPointIndex = checkPoints.length-1;
		for(var i=0; i<checkPoints.length; i++){
			if(progress < checkPoints[i]){
				if(i>0){
					checkPointIndex = i-1;
				}
				break;
			}
		}
		//reinitialize game
		initCheckBoard(checkPointIndex);
		//prepare next update
		lastTime = null;
		topRowDisplayed = -1;
	}

	function initCheckBoard(startCheckPointIndex){
		if(checkBoard){
			destroyCheckBoard();
		}
		checkBoard = [];
		checkPoints = [0];
		var CHECK_POINT_HEIGHT = 5;
		var currentRowIndex = 0;

		//0 TODO: intro: first pawn
		block(
			'',
			'',
			'',
			'',
			'',
			'',
			'pppppppp',
			'   e    '
		);

		// first pawn
		block(
			{showThreat:'p'},
			'',
			'',
			'    p',
			'',
			'',
			'',
			'',
			''
		);

		// scattered pawns
		block(
			'  pppp',
			'  pppp',
			'',
			'  p',
			'',
			'     p',
			'',
			' p'
		);

		// pawn rows
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

		// triangle
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

		// sawtooth
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

		// wedges
		block(
			'',
			'    ppp',
			'     p',
			'ppp',
			' p   ppp',
			'      p',
			'',
			''
		);

		//CHECK POINT 1
		checkPoint();

		// first rook
		block(
			{showThreat:'r'},
			'',
			'   p',
			'',
			'   r',
			'',
			'   p',
			'',
			''
		);

		// rook diag
		block(
			'',
			'',
			'r',
			' r',
			'  r',
			'   r',
			'    r',
			'     r',
			'pppppp'
		);

		// rook rows
        block(
            '',
            '',
            '',
            '       p',
            '   rp pr',
            '',
            '',
            'p',
            'r  p   p',
            'p'
        );

		// rook labyrinth
		block(
			'',
			' r     p',
			'      pp',
			'   p   r',
			'p   p',
			'r p p',
			'r   p',
			'ppppp  p'
		);

		//CHECK POINT 2
        checkPoint();

		//10 first bishop
		block(
			{showThreat:'b'},
			'',
			'',
			'',
			'...b',
			'',
			'',
			'',
			''
		);

		//11 bishop field
		block(
			'',
			'b b b b',
			'',
			'',
			'',
			'',
			'',
			''
		);

		//12 rooks & bishops simple
		block(
			'',
			'r.p..p.r',
			'p......p',
			'',
			'b      b',
			'pp....pp',
			'',
			''
		);


		//13 pawns, bishops and rooks
		block(
			'',
			'r',
			' r  p..b',
			'     ..r',
			'....p',
			'...p',
			'..p',
			'pp.....p'
		);

		//CHECK POINT 3
		checkPoint();

		//14 first knight
		block(
			{showThreat:'k'},
			'',
			'',
			'   k',
			'',
			'',
			'',
			'',
			''
		);

		//15 knight rows
		block(
			'p',
			'r.....p',
			'',
			'',
			'......kk',
			'',
			'pkk',
			''
		);

		//rooks bishop and knight
        block(
            'p   pppp',
            'r    b r',
            '   p b p',
            '',
            '',
            '',
            ' k',
            '',
            '',
            ''
        );

        //CHECK POINT 4
        checkPoint();

        //first land mine
        block(
            {showThreat:'l'},
            '',
            '',
            '',
            '   l',
            '',
            '',
            '',
            ''
        );

        //land mines
        block(
            'l.llllll',
            'l.l....l',
            '..l.llll',
            '.ll.l   ',
            'l...l l ',
            'l.lll l ',
            'l.    l ',
            'lllllll '
        );

		//land mines and pawns
        block(
            ' p  pll',
            ' l p   l',
            'lpl p p ',
            '     lp',
            'll ll l',
            ' l  l',
            '',
            ''
        );

        //k,r,b,p,l
        block(
            '',
            '   r',
            ' kll',
            '',
            '',
            ' l pl  b',
            '       l',
            '  p  l',
            '',
            '',
            '',
            '',
            ''
        );

        //CHECK POINT 5
        checkPoint();

        block(
            '',
            'c',
            '',
            '',
            '',
            '',
            ''
        );

		if(startCheckPointIndex === 0){
			//Add player
			player = addPieceAt(HERO_KING, 5, 3).piece;
			progress = 0;
		}else{
			progress = checkPoints[startCheckPointIndex];
			player = addPieceAt(HERO_KING, progress, 3).piece;
			progress -= 4;
		}

		function checkPoint(){
			var center = Math.ceil(CHECK_POINT_HEIGHT/2);
			checkPoints.push(currentRowIndex + center);
			for(var i=0; i<CHECK_POINT_HEIGHT ; i++){
				checkBoard[currentRowIndex] = [];
				if(i==center){
					for(var j=0 ; j<NUM_CELLS; j++){
						checkBoard[currentRowIndex][j] = {checkPoint:true};
					}
				}
				currentRowIndex ++;
			}
		}

		//Create a block of 8/8
		function block(){
			var hasStars = false;
			var piece;
			var args = Array.prototype.slice.call(arguments);
			var options;
			if(typeof args[0] == 'object'){
				options = args.shift();
			}else{
				options = {};
			}
			var showThreatCell;
			var doAdd = startCheckPointIndex < checkPoints.length;
			var startRowIndex =currentRowIndex;
			var row, i,j;
			for(i=args.length-1; i>=0; i--){
				row = args[i];
				if(row.length > NUM_CELLS) throw new Error();

				checkBoard[currentRowIndex] = [];
				if(doAdd){
					if(row !== ''){
						for(j=0; j<row.length; j++){
							var char = row.charAt(j);
							if(char!==' ' && char!=='.'){
								var lowerChar = char.toLowerCase();
								addPieceAt(lowerChar, currentRowIndex, j);
								if(options.showThreat == lowerChar){
									showThreatCell = checkBoard[currentRowIndex][j];
								}
								if(char != lowerChar){
									//TODO: allied pieces
								}
							}
						}
					}
				}
				currentRowIndex++;
			}
			if(showThreatCell){
				showThreatCell.piece.showThreat = true;
				for(i=startRowIndex; i<currentRowIndex; i++){
					row = checkBoard[i];
					for(j=0; j<NUM_CELLS; j++){
						var cell = getThreateningCell(i,j);
						if(cell && cell.piece == showThreatCell.piece){
							if(!checkBoard[i][j]){
								checkBoard[i][j] = {};
							}
							checkBoard[i][j].showThreat = true;
						}
					}
				}
			}
		}
	}

	function destroyCheckBoard(){
		for(var row in checkBoard){
			if(checkBoard[row]){
				for(var col in checkBoard[row]){
					var cell = checkBoard[row][col];
					if(cell && cell.piece){
						removeSvgShape(cell.piece);
					}
				}
			}
		}
	}



	function addPieceAt(type, row, col){
		var piece = {
			shape: null,
			type: type,
			row: row,
			col: col,
			showThreat: false
		};
		if(!checkBoard[row]){
			checkBoard[row] = [];
		}
		if(!checkBoard[row][col]){
			checkBoard[row][col] = {};
		}
		checkBoard[row][col].piece = piece;

		//Walls
		if(type == CASTLE){
			for(var i=0; i< NUM_CELLS; i++){
				if(i!=3 && i!=4){
					if(!checkBoard[row][i]){
                        checkBoard[row][i] = {};
                    }
                    checkBoard[row][i].wall = true;
				}
			}

		}

		return checkBoard[row][col];
	}

	//input
	var KEY_LATENCY = 6;
	var KEY_DONE = -1;
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
			var oldCell = checkBoard[oldRow][oldCol];
            if(!checkBoard[row]){
                checkBoard[row] = [];
            }
            var cell = checkBoard[row][col];
            if(!cell){
                cell = {};
                checkBoard[row][col] = cell;
            }
			if(!cell.wall){
				//can cell be taken ?
				var threateningCell = getThreateningCell(row,col);
				if(threateningCell){
					//invalid position
					player.invalid = true;
	                player.invalidCol = col;
	                player.invalidRow = row;
	                player.threateningPiece = threateningCell.piece;
					col = oldCol;
					row = oldRow;
				}else{
					player.invalid = false;
					if(cell.piece){
						//take the piece
						destroyPiece(cell.piece);
					}
					//move piece on check board
					oldCell.piece = null;
					cell.piece = player;
				}
				player.oldCol = oldCol;
				player.oldRow = oldRow;
				player.anim = true;
				player.animStartTime = now;
				player.col = col;
				player.row = row;
			}
		}
	}

	function getThreateningCell(row,col){
		var threateningCell;
		//land mine
		threateningCell = getCellWithPieceAt(row,col,LAND_MINE);
		if(threateningCell){
			return threateningCell;
		}
		//pawns
		threateningCell =
			getCellWithPieceAt(row+1,col-1,PAWN) ||
			getCellWithPieceAt(row+1,col+1,PAWN);
		if(threateningCell){
			return threateningCell;
		}
		//ROOK
		var i,j,cell;
		//Check left
		for(j=col-1; j>=0 ; j--){
			cell = getCellWithPieceAt(row,j);
			if(cell && cell.piece){
				if(cell.piece.type == ROOK){
					return cell;
				}else{
					break;
				}
			}
		}
		//Check right
		for(j=col+1; j<=NUM_CELLS ; j++){
			cell = getCellWithPieceAt(row,j);
			if(cell && cell.piece){
                if(cell.piece.type == ROOK){
                    return cell;
                }else{
                    break;
                }
            }
		}
		//Check up
		for(i=row+1; i<=row+NUM_CELLS ; i++){
			cell = getCellWithPieceAt(i,col);
			if(cell && cell.piece){
                if(cell.piece.type == ROOK){
                    return cell;
                }else{
                    break;
                }
            }
		}
		//Check down
		for(i=row-1; i>=row-NUM_CELLS ; i--){
			cell = getCellWithPieceAt(i,col);
			if(cell && cell.piece){
                if(cell.piece.type == ROOK){
                    return cell;
                }else{
                    break;
                }
            }
		}

		//BISHOP
		//diag bottom left
		for(j=col-1,i=row-1; j>=0; j--,i--){
			cell = getCellWithPieceAt(i,j);
			if(cell && cell.piece){
                if(cell.piece.type == BISHOP){
                    return cell;
                }else{
                    break;
                }
            }
		}
		//diag bottom right
		for(j=col+1,i=row-1; j<NUM_CELLS; j++,i--){
			cell = getCellWithPieceAt(i,j);
			if(cell && cell.piece){
                if(cell.piece.type == BISHOP){
                    return cell;
                }else{
                    break;
                }
            }
		}
		//diag top left
		for(j=col-1,i=row+1; j>=0; j--,i++){
			cell = getCellWithPieceAt(i,j);
			if(cell && cell.piece){
                if(cell.piece.type == BISHOP){
                    return cell;
                }else{
                    break;
                }
            }
		}
		//diag top right
		for(j=col+1,i=row+1; j<NUM_CELLS; j++,i++){
			cell = getCellWithPieceAt(i,j);
			if(cell && cell.piece){
                if(cell.piece.type == BISHOP){
                    return cell;
                }else{
                    break;
                }
            }
		}

		threateningCell =
        	getCellWithPieceAt(row+2,col-1,KNIGHT) ||
        	getCellWithPieceAt(row-2,col-1,KNIGHT) ||
        	getCellWithPieceAt(row+2,col+1,KNIGHT) ||
            getCellWithPieceAt(row-2,col+1,KNIGHT) ||
            getCellWithPieceAt(row+1,col-2,KNIGHT) ||
			getCellWithPieceAt(row-1,col-2,KNIGHT) ||
			getCellWithPieceAt(row+1,col+2,KNIGHT) ||
			getCellWithPieceAt(row-1,col+2,KNIGHT);

		return threateningCell;
	}

	function getCellWithPieceAt(row, col,type){
		var rowArray = checkBoard[row];
		if(rowArray){
			var cell = rowArray[col];
			if(cell && cell.piece && (!type || cell.piece.type == type)){
				return cell;
			}
		}
	}

	function destroyPiece(piece){
		removedPieces.push(piece);
		piece.removedTime = now;
		piece.justRemoved = true;

		if(piece.showThreat){
			//not very subtle but does the job, just scan everything in a wide range, we ensure it won't be a problem when building the checkboard
			for(var i=piece.row-NUM_CELLS; i<piece.row+NUM_CELLS; i++){
				var rowContent = checkBoard[i];
				if(rowContent){
					for(var j=piece.col-NUM_CELLS; j<piece.col+NUM_CELLS; j++){
						if(rowContent[j]){
							rowContent[j].showThreat = false;
						}
					}
				}
			}

		}
	}


	function tic(){

		if(window.stb) stb(); // Stats plugin for debug

		//lives=1;
		if(gameIsOver){
			if(keys.space === 0){
				setGameIsOver(false);
				keys.space = -1;
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

	function setGameIsOver(val){
		if(val != gameIsOver){
			gameIsOver = val;

			if(gameIsOver){
				gameOverScreen.style.display = 'block';
			}else{
				gameOverScreen.style.display = 'none';
				restart();
			}
		}
	}

	function update(){
		now = Date.now();
		if(lastTime){
			progress += progressPerSec * (now-lastTime) * MS_TO_S;
		}

		if(player.row < progress - 0.9){
			//player out of view
			if(autoMove){
				// auto move if possible
                if(!getThreateningCell(player.row+1, player.col)){
                    movePlayer(player.row+1, player.col);
                }else if(!getThreateningCell(player.row+1, player.col+1)){
                    movePlayer(player.row+1, player.col+1);
                }else if(!getThreateningCell(player.row+1, player.col-1)){
                    movePlayer(player.row+1, player.col+1);
                }else{
                    setGameIsOver(true);
                    return;
                }
			}else{
				setGameIsOver(true);
			}

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
						if(row[colIndex] && row[colIndex].piece){
							removeSvgShape(row[colIndex].piece);
						}
					}
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
						if(row[index] && row[index].piece){
							addSvgShape(row[index].piece);
						}
					}
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
    var CHECK_POINT_COLOR = 'rgba(93, 255, 182, 0.56)';

	function render(){
		// SVG ---
		 
		//update pieces
		var pieceAfterPlayer;
		var row;
		for(var rowIndex=topRowDisplayed-NUM_CELLS_DISPLAYED-5; rowIndex<=topRowDisplayed; rowIndex++){
			row = checkBoard[rowIndex];
			if(row){
				for(var colIndex=0; colIndex<NUM_CELLS; colIndex++){
					if(row[colIndex] && row[colIndex].piece){
						var piece = row[colIndex].piece;
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
			svgPiecesLayer.insertBefore(player.shape, pieceAfterPlayer.shape);
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
				if(player.invalid && player.threateningPiece){
					player.threateningPiece.shape.style.filter = 'none';
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
					player.threateningPiece.shape.style.filter = 'url(#'+ENEMY_FILTER+')';
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
				
				row = checkBoard[i+progressIndex];
				if(row && row[j]){
					var cell = row[j];
					if(cell.showThreat){
						bgCtx.fillStyle = 'rgba('+INVALID_CELL_COLOR_RGB+',0.5)';
						bgCtx.fill();
					}
					if(cell.checkPoint){
						bgCtx.fillStyle = CHECK_POINT_COLOR;
	                    bgCtx.fill();
					}
				}

				if(player.invalid && player.invalidCol == j && player.invalidRow == i + progressIndex){
					//invalid tile
					var invalidOpacity = 1.5 * (playerAnimProgress < 0.5 ? playerAnimProgress : 1-playerAnimProgress);
					bgCtx.fillStyle = 'rgba('+INVALID_CELL_COLOR_RGB+','+invalidOpacity+')';
					bgCtx.fill();
				}
			}
			/*
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
			*/
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
		if(piece.shape){
			piece.shape.style.opacity = piece.opacity;
			if(piece.scale > 0){
				//Note: svg transform origin is the root SVG element origin
				piece.shape.setAttributeNS(null,'transform', 'scale('+piece.scale+') translate('+(piece.x / piece.scale)+','+(piece.y / piece.scale)+')');
			}
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
	var svgPiecesLayer = null;
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
		if(svgPiecesLayer.firstChild && !piece.onTop){
			svgPiecesLayer.insertBefore(shape,svgPiecesLayer.firstChild);
		}else{
			svgPiecesLayer.appendChild(shape);
		}

		if(piece.shape){
			throw new Error();
		}
		piece.shape = shape;
		shape.style.filter = 'none';
	}

	function removeSvgShape(piece){
		if(piece.shape){
			svgCache[piece.type].push(piece.shape);
			svgPiecesLayer.removeChild(piece.shape);
			piece.shape = null;
		}
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

		svgPiecesLayer = document.createElementNS (xmlns, "g");
		svgElem.appendChild (svgPiecesLayer);

		//For convenience, shape defs are given in a [10,10] rect, transformed to [CELL_SIZE,CELL_SIZE] in actual SVG
		//We also transform the shape positions so that the piece origin is [OX,OY]
		var OX = 5;
		var OY = 8;


		makeFilter(ENEMY_FILTER);
		makeCheckTextDef(CHECK_TEXT,'CHECK');
		makeGameOverScreen();

		svgStyle(
			makeDef(PAWN,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[5,3],'L',[2,8]]),
				makeCircle(5,3,2)
			]), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(ENEMY_KING,[
				makePath(['M',[5,1],'L',[5,-2],'M',[4,-1],'L',[6,-1]], {'stroke-width':3}),
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,3],'L',[7,1],'Q',[5,0],[3,1],'L',[4,3],'L',[2,8]])
			]), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(KNIGHT,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[7,6],'Q',[8,3],[7,0],'L',[6,1],'L',[5,1],'L',[2,4],'L',[3,5],'L',[5,4],'L',[2,8]])
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(ROOK,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6.5,3],'L',[8,2],'L',[8,0],'L',[7,0],'L',[7,1],'L',[6,1],'L',[6,0],'L',[4,0],'L',[4,1],'L',[3,1],'L',[3,0],'L',[2,0],'L',[2,2],'L',[3.5,3],'L',[2,8]])
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
			makeDef(BISHOP,[
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,4],'Q',[8,1.1],[5,0],'Q',[2,1.1],[4,4],'L',[2,8]]),
				makeCircle(5,0,0.7),
                makePath(['M',[3.8,0.8],'L',[4.4,2.5]], {'stroke-width':2})
			]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
		);
		svgStyle(
            makeDef(WAR_BEAR,[
                makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[8.5,6],'L',[7,7],'L',[7,5],'L',[6,6],'L',[5,4.5],'L',[4,6],'L',[3,5],'L',[3,7],'L',[1.5,6],'L',[2,8]])
            ]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
        );
        svgStyle(
            makeDef(LAND_MINE,[
                makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[8.5,6],'L',[7,7],'L',[7,5],'L',[6,6],'L',[5,4.5],'L',[4,6],'L',[3,5],'L',[3,7],'L',[1.5,6],'L',[2,8]])
            ]),  PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
        );
		//HERO_KING
		svgStyle(
			makeDef(HERO_KING,[
				makePath(['M',[5,1],'L',[5,-2],'M',[4,-1],'L',[6,-1]], {'stroke-width':3}),
				makePath(['M',[2,8],'Q',[5,10],[8,8],'L',[6,3],'L',[7,1],'Q',[5,0],[3,1],'L',[4,3],'L',[2,8]])
			]), '#002', '#333', 0
		);

		OX = 2.5;
		OY = 50;
		svgStyle(
            makeDef(CASTLE,[
                makePath(['M',[25,30],'L',[50,30],'L',[50,5],
                        'L',[45,5],'L',[45,10],'L',[40,10],'L',[40,5],
                        'L',[35,5],'L',[35,10],'L',[30,10],'L',[30,5],
                        'L',[25,5],'L',[25,30]
                ]),
                makePath(['M',[0,50],'L',[0,50],'L',[27.5,50],'L',[27.5,35],'L',[47.5,35],'L',[47.5,50],
                    'L',[75,50],'L',[75,20],'L',[70,20],'L',[70,25],
                    'L',[65,25],'L',[65,20],'L',[60,20],'L',[60,25],
                    'L',[55,25],'L',[55,20],'L',[50,20],'L',[50,25],
                    'L',[45,25],'L',[45,20],'L',[40,20],'L',[40,25],
                    'L',[35,25],'L',[35,20],'L',[30,20],'L',[30,25],
                    'L',[25,25],'L',[25,20],'L',[20,20],'L',[20,25],
                    'L',[15,25],'L',[15,20],'L',[10,20],'L',[10,25],
                    'L',[ 5,25],'L',[ 5,20],'L',[ 0,20],'L',[ 0,50]
                ])
            ],true), PIECE_FILL_COLOR, PIECE_STROKE_COLOR, 0
        );

		function makeDef(id, shapes, skipShadow){
			var def = document.createElementNS (xmlns, "g");
			def.setAttributeNS (null, "id", id);

			if(!skipShadow) def.appendChild(makeShadow());
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

		function makeGameOverScreen(){
			gameOverScreen = document.createElementNS(xmlns, "g");
			gameOverScreen.style.display = 'none';
			svgElem.appendChild(gameOverScreen);

			var rect = document.createElementNS(xmlns,'rect');
			svgAttrs(rect, {x:0, y:0, width:'100%',height:'100%',fill:'rgba(0,0,0,0.5)'});
			gameOverScreen.appendChild(rect);

			var text = document.createElementNS (xmlns, 'text');
			svgAttrs(text,{
				'x': '50%',
				'y': '50%',
				'font-size':'48px',
				'fill': 'orange',
				'stroke': 'red',
				'stroke-width':'2px',
				'text-anchor': 'middle',
				'font-family':'Impact'
			});
			text.innerHTML = 'CHECKMATE !';
			gameOverScreen.appendChild(text);

			text = document.createElementNS (xmlns, 'text');
            svgAttrs(text,{
                'x': '50%',
                'y': '60%',
                'font-size':'22px',
                'fill': 'white',
                'stroke': 'black',
                'stroke-width':'1px',
                'text-anchor': 'middle',
                'font-family':'Impact'
            });
            text.innerHTML = 'Press <tspan style="fill:orange;">SPACE</tspan> to restart at last checkpoint';
            gameOverScreen.appendChild(text);
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
	// keyName => int
	var keys = {};
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
				if(typeof keys[keyName] == 'undefined'){
					keys[keyName] = -1;
				}
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
		if(keyBoolMap.esc){
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
};;(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());;
var stb;
var ste;

(function(){
	var loadInterval = setInterval( function () {
		if (document.readyState === "complete") {
			var stats = new Stats();

			var t;
			stb = function(){
				stats.begin();
				t = Date.now();
			};
			ste = function(){
				t = Date.now()-t;
				if(t>10){
					//debug break here
					console.log("FRAAAAAAME",t);
				}
				stats.end();
			};
			stats.setMode(1); // 0: fps, 1: ms

			// Align top-left
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.bottom = '0px';
			stats.domElement.style.right = '0px';

			document.body.appendChild( stats.domElement );

			clearInterval(loadInterval);
		}
	}, 200 );
})();;/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {
	var startTime = Date.now(), prevTime = startTime;
	var ms = 0, msMin = Infinity, msMax = 0;
	var fps = 0, fpsMin = Infinity, fpsMax = 0;
	var frames = 0, mode = 0;

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var fpsDiv = document.createElement( 'div' );
	fpsDiv.id = 'fps';
	fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
	container.appendChild( fpsDiv );

	var fpsText = document.createElement( 'div' );
	fpsText.id = 'fpsText';
	fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	fpsText.innerHTML = 'FPS';
	fpsDiv.appendChild( fpsText );

	var fpsGraph = document.createElement( 'div' );
	fpsGraph.id = 'fpsGraph';
	fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
	fpsDiv.appendChild( fpsGraph );

	while ( fpsGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
		fpsGraph.appendChild( bar );

	}

	var msDiv = document.createElement( 'div' );
	msDiv.id = 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
	container.appendChild( msDiv );

	var msText = document.createElement( 'div' );
	msText.id = 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML = 'MS';
	msDiv.appendChild( msText );

	var msGraph = document.createElement( 'div' );
	msGraph.id = 'msGraph';
	msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var setMode = function ( value ) {

		mode = value;

		switch ( mode ) {

			case 0:
				fpsDiv.style.display = 'block';
				msDiv.style.display = 'none';
				break;
			case 1:
				fpsDiv.style.display = 'none';
				msDiv.style.display = 'block';
				break;
		}

	};

	var updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	};

	return {

		REVISION: 12,

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = Date.now();

		},

		end: function () {

			var time = Date.now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
			updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

				prevTime = time;
				frames = 0;

			}

			return time;

		},

		update: function () {

			startTime = this.end();

		}

	}

};

if ( typeof module === 'object' ) {
	module.exports = Stats;
}