/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas, context, and image data
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    var w = context.canvas.width; // as set in html
    var h = context.canvas.height;  // as set in html
    var imagedata = context.createImageData(w,h);
 
    // Draw a Burberry-style check swatch, pixel by pixel.
    // Each axis gets the same stripe pattern; crossing them by averaging
    // is what gives woven plaid its characteristic blended squares.
    var CAMEL = [206,178,134], BLACK = [28,24,22],
        WHITE = [246,244,238], RED   = [178,42,40];

    var PERIOD = 64;
    function stripe(i) { // color of the stripe running through offset i
        var q = ((i % PERIOD) + PERIOD) % PERIOD;
        if (q < 2)  return WHITE;         // thin white guard line
        if (q < 12) return BLACK;         // wide black band
        if (q < 14) return WHITE;         // thin white guard line
        if (q >= 38 && q < 40) return RED; // lone red accent in the camel field
        return CAMEL;
    }

    var left = 128, top = 128, size = 256; // a 256x256 swatch, centered
    var c = new Color(0,0,0,255);
    for (var x=left; x<left+size; x++) {
        var sx = stripe(x-left);
        for (var y=top; y<top+size; y++) {
            var sy = stripe(y-top);
            c.change(Math.round((sx[0]+sy[0])/2),
                     Math.round((sx[1]+sy[1])/2),
                     Math.round((sx[2]+sy[2])/2), 255);
            drawPixel(imagedata,x,y,c);
        }
    }

    context.putImageData(imagedata, 0, 0); // display the image in the context
}
