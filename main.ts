
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

let colorCount = 16
let hasColor: Array<number> = [];

for (let i = 0; i <= colorCount; i+=1) {
    if(i % 2 !== 0) {
        hasColor.push(i)
    }
}
for (let i = 0; i <= colorCount; i += 1) {
    if (i % 2 !== 0 && i !== 1 && i !== colorCount - 1) {
        hasColor.unshift(i)
    }
}

const stripLength = 17;
const strip = neopixel.create(DigitalPin.P1, stripLength, NeoPixelMode.RGB);


basic.forever(function() {
    for (let i = 0; i < hasColor.length; i++) {
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