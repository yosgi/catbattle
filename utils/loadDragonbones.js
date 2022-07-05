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
  swordsManDisplay.animation.play('IdleWeak', 100)
  app.stage.addChild(swordsManDisplay);

});