
type Color = {
    h: number; // hue
    s: number; // saturation
    l: number; // lightness
};


function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

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
            const [r, g, b] = hslToRgb(color.h, color.s, color.l);
            strip.setPixelColor(j, neopixel.rgb(r, g, b));
        }

        strip.show();
        basic.pause(300);
    }
})