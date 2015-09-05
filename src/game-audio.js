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

aa.add( 'check', 1,
	[
		[2,,0.1747,,0.1291,0.6731,0.2,-0.2999,,,,,,0.4368,0.1862,,0.28,,1,,,0.1596,,0.5]
	]
);
aa.add( 'move', 5,
	[
		[3,,0.0316,,0.1483,0.5871,,-0.6609,,,,,,,,,,,1,,,0.0227,,0.25]
	]
);
aa.add( 'capture', 5,
	[
		[0,,0.3065,,0.2516,0.36,,0.1584,,,,,,0.1149,,,,,1,,,0.2188,,0.25]
	]
);
aa.add( 'checkmate', 1,
	[
		[1,,0.2402,,0.3917,0.2242,,0.1535,,,,,,,,0.5609,,,1,,,,,0.5]
	]
);

})();