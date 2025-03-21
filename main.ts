
type Color = {
    h: number; // hue
    s: number; // saturation
    l: number; // lightness
};

const blackcolor: Color = { h: 0, s: 0, l: 0 };
const colorArray: Array<Color> = [
    { h: 0, s: 100, l: 50 },    
    { h: 120, s: 100, l: 50 },  
    { h: 240, s: 100, l: 50 }, 
    { h: 60, s: 100, l: 50 }    
];

const hasColor = [1, 3, 5, 7, 5, 3, 1];
const stripLength = hasColor.length;
const strip = neopixel.create(DigitalPin.P0, stripLength, NeoPixelMode.RGB);

basic.forever(function() {
    for (let i = 0; i < stripLength; i++) {
        const count = hasColor[i];
        const place = (stripLength - count) / 2;
        const color = colorArray[i % colorArray.length];

        strip.clear();

        for (let j = place; j < place + count; j++) {
            strip.setPixelColor(j, neopixel.hsl(color.h, color.s, color.l));
        }

        strip.show();
        basic.pause(300);
    }
})