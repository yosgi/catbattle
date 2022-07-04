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
import dragonBones from "../utils/dragonBones";
const Container = PIXI.Container,
loader = PIXI.Loader.shared,
resources = PIXI.Loader.shared.resources,
TextureCache = PIXI.utils.TextureCache,
Sprite = PIXI.Sprite,
Rectangle = PIXI.Rectangle,
Graphics = PIXI.Graphics;




const render = function () {
  let app = new Application({width: 1024, height: 576, antialias: true, transparent: false, 
  resolution: 1});
  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  // function setup() {
  //   // get a reference to the sprite sheet you've just loaded:
  //   let sheet = loader.resources["images/roles.json"];
  //   // init player

  //   const playerTextures = [];
  //   for (let i = 0; i < 8; i++) {
  //       playerTextures.push(sheet && sheet.textures &&sheet.textures[`hero40001/idle/frame${i}.png`]);
        
  //   }
  //   console.log(playerTextures)
  //   const playerAni = new PIXI.AnimatedSprite(playerTextures as any);
  //   console.log('playerAni',playerAni)

  //   const player = new Player(sheet && sheet.textures && sheet.textures["hero40001/idle/frame0.png"],{position: {x: 100, y: 100},velocity: {x: 0, y: 0}},
  //   playerAni
  //   );
  //   //init a enemy
  //   // const enemy = new Monster(sheet && sheet.textures && sheet.textures["hero40002/idle/frame0.png"],{position: {x: 500, y: 400},velocity: {x: 0, y: 0}});
  //   //draw player
  //   player.draw(app);
  //   player.animation(app);
  //   // draw enemy
  //   // enemy.draw(app);
  //   // enemy.animation(app);

  // }
  // loader.reset() 
  // loader
  //   .add("images/roles.json")
  //   .load(setup);
  


  app.loader
    .add('swordsManBonesData', 'images/ClockworkPrototype/ClockworkPrototype_ske.json')
    .add('swordsManTexData', 'images/ClockworkPrototype/ClockworkPrototype_tex.json')
    .add('swordsManTex', 'images/ClockworkPrototype/ClockworkPrototype_tex.png')
    .load(function (loader, resource) {
      console.log('resources',resources)
      const dragonbonesFactory = dragonBones.PixiFactory.factory;   
      let textureImg = resource["swordsManTex"].texture;
      let textureData = resource["swordsManTexData"].data;
      let skeletonData = resource["swordsManBonesData"].data;
      let swordsManDisplay = null;
      //骨骼动画实现
      dragonbonesFactory.parseDragonBonesData(skeletonData); //解析骨骼数据
      dragonbonesFactory.parseTextureAtlasData(textureData, textureImg); //解析纹理数据
      console.log('skeletonData',skeletonData)
      swordsManDisplay = dragonbonesFactory.buildArmatureDisplay(skeletonData.armature[0].name); //构建骨骼动画
      swordsManDisplay.x = 200;
      swordsManDisplay.y = 200;
      swordsManDisplay.animation.play('Damage', 0)
      app.stage.addChild(swordsManDisplay);

    });
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
