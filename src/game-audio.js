/*

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
})();