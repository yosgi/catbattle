import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import * as PIXI from 'pixi.js'
import { Application } from 'pixi.js'
import Player from '../classes/player'
import Monster from '../classes/monster'
import {Spine} from '@pixi-spine/runtime-4.0';
const Container = PIXI.Container,
loader = PIXI.Loader.shared,
resources = PIXI.Loader.shared.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Rectangle = PIXI.Rectangle,
Graphics = PIXI.Graphics;

// get animationsprites from a png file
const getAnimatedSprites = (texture:PIXI.Texture,frames:Number) => {
  let sprites = [];
  let height = Math.floor(texture.height / Number(frames));
  console.log('height',height)
  console.log('width',texture.width)
  for (let i = 0; i < frames; i++) {   
    let childTexture = Object.assign(texture)
    let rectangle = new Rectangle(32, 32, 16, 22);
    // // console.log(rectangle)
    childTexture.frame =  rectangle;
    sprites.push(childTexture);
  }
  return new PIXI.AnimatedSprite(sprites);
}


const render = function () {
  let app = new Application({width: 1024, height: 576, antialias: true, transparent: false, 
  resolution: 1});
  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  function setup() {
    // get a reference to the sprite sheet you've just loaded:
    let sheet = loader.resources["images/MeowKnight/MeowKnight.json"];
    // init player
    console.log(sheet.textures)
    if (!sheet || !sheet.textures)
      return;
    let idleAnimate = getAnimatedSprites(sheet.textures['Meow-Knight_Idle.png'],6)
    console.log(idleAnimate)
    const player = new Player(
      {
        idle:idleAnimate
      },
    {position: {x: 100, y: 100},velocity: {x: 0, y: 0}});
    // player.draw(app);
    player.animation(app);


  }
  loader.reset() 
  loader
    .add("images/MeowKnight/MeowKnight.json")
    .load(setup);
}
 
const Home: NextPage = () => {
  useEffect(() => {
    render()
  },[]);
  return (
    <div className={styles.container}>
       
    </div>
  )
}

export default Home
