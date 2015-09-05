# Chess Pursuit

This is the game I created for the JS13K contest of 2015, the theme was "Reversed".

### Concept

My interpretation of the theme was quite loose. The idea was to turn the chess game upside down, making it an action game instead of a strategy game.
For once, I started with the graphical concept, the perspective and the scrolling and tried to make some game out of it.
The result is a little weird, the 'action' part and the 'puzzle' part don't blend so well, but I kinda like it anyway.

### Code

I lost a lot of time drawing the checkerboard. My first version used shaky code to compute the projections from checkerboard space to screen space.
While it looked good enough, it was impossible to reverse the projection for computing mouse input, so I had to do it again with a more mathematical approach.

For the pieces, I decided to use SVG in order to have them scale nicely. It was my first contact with SVG and it was quite interesting.
I probably would have saved some time by writing the SVG elements directly in the HTML instead of using JS to generate everything.

As for the rest of the code, it is a little messy, as usual. I should probably have taken some time to write things more cleanly, especially the intro & dialogs part.


### External code

I relied on Mr Doob stats.js lib during debug:
https://github.com/mrdoob/stats.js/

And on jsfx for the sound:
https://github.com/mneubrand/jsfxr

Using code provided by Jack Rugile for the integration of jsfxr:
http://codepen.io/jackrugile/blog/arcade-audio-for-js13k-games
