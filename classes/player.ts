import Role from './role';
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import keyboard from '../utils/keyboard'
interface PositionOptions {
    position: {
        x: number,
        y: number
    },
    velocity: {
        x: number,
        y: number
    }
}

export default class player extends Role {
    constructor(texture: PIXI.Texture | undefined, option: PositionOptions, idles: PIXI.AnimatedSprite) {
        super(texture, option, idles);
    }
    animation = (app: Application) => {
        super.animation(app);
        // user keyPress
        const left = keyboard("ArrowLeft"),
            up = keyboard("ArrowUp"),
            right = keyboard("ArrowRight"),
            down = keyboard("ArrowDown");
        left.press = () => {
            this.option.velocity.x = -1;
        }
        left.release = () => {
            if (!right.isDown) {
                this.option.velocity.x = 0;
            }
        };
        right.press = () => {
            this.option.velocity.x = 1;
        }
        right.release = () => {
            if (!left.isDown) {
                this.option.velocity.x = 0;
            }
        }
        up.press = () => {
            this.option.velocity.y = -5;
        }
    }
}