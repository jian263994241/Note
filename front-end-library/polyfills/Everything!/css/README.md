###Step 1: Download it

Download the PIE distribution and unzip it somewhere.

###Step 2: Upload it

Upload the contents of the unzipped package to a directory on your web server. It doesn't matter where exactly, as long as you know where it is.

###Step 3: Write some CSS3

Assuming you already have a HTML document, let's say you want to give one of its elements rounded corners. Create a CSS rule for that element and give it a border-radius style like so:
	
	#myAwesomeElement {
	    border: 1px solid #999;
	    -webkit-border-radius: 10px;
	    -moz-border-radius: 10px;
	    border-radius: 10px;
	}
(Note the -webkit- and -moz- prefixed versions; these are necessary to make the rounded corners work in WebKit and Mozilla-based browsers.)

###Step 4: Apply PIE

In that same CSS rule, add the following style line:

	behavior: url(path/to/pie_files/PIE.htc);
Of course you will need to adjust the path to match where you uploaded PIE.htc in step 2. Note: this path is relative to the HTML file being viewed, not the CSS file it is called from.

Step 5: View it in IE

If all went well, at this point you should be able to load the page in IE and see the CSS3 rounded corners rendered just like other browsers. Now you can play around with some of the other supported CSS3 decorations like box-shadow. See the documentation on supported CSS3 features to see exactly what PIE can do. Have fun!


	#myElement {
	    background: url(bg-image.png) no-repeat #CCC; /*non-CSS3 browsers will use this*/
	    background: url(bg-image.png) no-repeat, -webkit-gradient(linear, 0 0, 0 100%, from(#CCC) to(#EEE)); /*old webkit*/
	    background: url(bg-image.png) no-repeat, -webkit-linear-gradient(#CCC, #EEE); /*new webkit*/
	    background: url(bg-image.png) no-repeat, -moz-linear-gradient(#CCC, #EEE); /*gecko*/
	    background: url(bg-image.png) no-repeat, -ms-linear-gradient(#CCC, #EEE); /*IE10 preview*/
	    background: url(bg-image.png) no-repeat, -o-linear-gradient(#CCC, #EEE); /*opera 11.10+*/
	    background: url(bg-image.png) no-repeat, linear-gradient(#CCC, #EEE); /*future CSS3 browsers*/
	    -pie-background: url(bg-image.png) no-repeat, linear-gradient(#CCC, #EEE); /*PIE*/
	}