import Role from './role';
import * as PIXI from 'pixi.js'
interface  PositionOptions {
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
}