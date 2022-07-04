
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
const Sprite = PIXI.Sprite,
Graphics = PIXI.Graphics;
const gravity = 0.2
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
  
export default class Role  {
    texture?:PIXI.Texture;
    idles:PIXI.AnimatedSprite;
    option:PositionOptions;
    sprite?:PIXI.Sprite;
    height:number;
    width:number;
    attackBox:PIXI.Graphics;
    isAttacking:boolean;
    constructor(texture:PIXI.Texture | undefined,option:PositionOptions,idles:PIXI.AnimatedSprite) {
      this.texture = texture;
      this.option = option
      this.height = 120;
      this.width = 100;
      this.attackBox = new Graphics ();
      this.attackBox.lineStyle(1, 0xFF3300, 1);
      this.attackBox.beginFill(0x66CCFF);
      this.attackBox.drawRect(0, 0, 75, 50);
      this.attackBox.endFill();
      this.attackBox.x = this.option.position.x;
      this.attackBox.y = this.option.position.y;
      this.isAttacking = false;
      this.idles = idles;
    }
    draw(app:Application) {
      const sprite = new Sprite(this.texture);
       sprite.x = this.option?.position.x || 0;
      this.attackBox.y = sprite.y = this.option?.position.y || 0;
      this.sprite = sprite;
      // pass the sprite to the app
      // paint the attack box
      app.stage.addChild(this.attackBox)
      app.stage.addChild(sprite);
      // paint the idles
      this.idles.x = sprite.x
      this.idles.y = sprite.y;
      this.idles.anchor.set(0.5);
      this.idles.animationSpeed = 0.1;
      this.idles.play();
      app.stage.addChild(this.idles);
    }
    update(app:Application) {
      if (!this.sprite) return 
      if (this.option?.velocity.x + this.sprite.x + this.width < app.renderer.width || this.sprite.x > 0)  { 
        this.sprite.x += this.option?.velocity.x;
      } else {
        this.option.velocity.x = 0
      }
      if (this.option?.velocity.y + this.sprite.y + this.height < app.renderer.height) {
        this.option.velocity.y += gravity;
        this.sprite.y += this.option?.velocity.y;
  
      }
      else {
        this.option.velocity.y = 0
      }
      this.attackBox.x = this.sprite.x + this.width / 2;
      this.attackBox.y = this.sprite.y +  + this.height / 2;;
  
    }
    animation (app:Application) {
      // update the animation
      app.ticker.add((delta) =>  this.update(app));

      // detect for collision
    }
  }