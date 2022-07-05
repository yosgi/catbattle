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
interface RoleSprite {
    idle:PIXI.AnimatedSprite,
    // run:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // },
    // jump:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // },
    // fall:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // },
    // attack1:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // },
    // tackHit:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // },
    // death:{
    //   src:PIXI.Sprite,
    //   framesMax:Number
    // }
  }
export default class player extends Role {
    constructor(sprite:RoleSprite,option:PositionOptions) {
        super(sprite, option);
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