import * as THREE from 'three';

const perlinNoiseTexture = () => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(size, size);
    const data = imageData.data;

    // Perlin noise parameters
    const gradients = [];
    for (let i = 0; i < 256; i++) {
      const angle = Math.random() * Math.PI * 2;
      gradients.push([Math.cos(angle), Math.sin(angle)]);
    }
    const permutation = Array.from({length: 256}, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    const p = [...permutation, ...permutation];

    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t, a, b) => a + t * (b - a);
    const grad = (hash, x, y) => {
      const gradient = gradients[hash % 256];
      return gradient[0] * x + gradient[1] * y;
    };

    const noise2D = (x, y) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const a = p[p[X] + Y];
      const b = p[p[X + 1] + Y];
      const c = p[p[X] + Y + 1];
      const d = p[p[X + 1] + Y + 1];

      return lerp(v,
        lerp(u, grad(a, x, y), grad(b, x - 1, y)),
        lerp(u, grad(c, x, y - 1), grad(d, x - 1, y - 1))
      );
    };

    const scale = 20;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const value = (noise2D(x / scale, y / scale) + 1) * 0.5;
        const noise = value * 255;
        data[i] = noise/1.5;     // red
        data[i+1] = noise/1.5;   // green 
        data[i+2] = noise;   // blue
        data[i+3] = 255;     // alpha
      }
    }
    
    context.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
};

export default perlinNoiseTexture;