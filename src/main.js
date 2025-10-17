import { Engine } from './core/Engine.js';

function main() {
    const canvas = document.getElementById('glCanvas');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    const engine = new Engine(canvas);
    engine.start();
}

main();
