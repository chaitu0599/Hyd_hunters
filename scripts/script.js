
const Scene = require('Scene');
const Patches = require('Patches');
const Reactive = require('Reactive');
const FaceTracking = require('FaceTracking');
const face0 = FaceTracking.face(0);
const NativeUI = require('NativeUI');
const Textures = require('Textures');

  
Promise.all([
      Scene.root.findFirst('bustA'),
      Scene.root.findFirst('bustB'),
      Scene.root.findFirst('bustC'),
      Textures.findFirst('icon_1'),
      Textures.findFirst('icon_2'),
      Textures.findFirst('icon_3'),
]).then(onReady);
  
function onReady(assets) {

      const bustA = assets[0];
      const bustB = assets[1];
      const bustC = assets[2];
      const texture0 = assets[3];
    const texture1 = assets[4];
    const texture2 = assets[5];
  
      const bustAtra = bustA.transform.toSignal();
      const bustBtra = bustB.transform.toSignal();
      const bustCtra = bustC.transform.toSignal();
  
      const faceTra = face0.cameraTransform.applyTo(bustAtra).applyTo(bustBtra).applyTo(bustCtra);
  
      const FaceOffset = Reactive.point(0,0,0.535);

      const neckPos = faceTra.position.add(FaceOffset).expSmooth(70);
  
      Patches.inputs.setVector('neck', neckPos);

      const picker = NativeUI.picker;

    const index = 0;
    const selection = 0;

    const configuration = {

      selectedIndex: index,

      items: [
        {image_texture: texture0},
        {image_texture: texture1},
        {image_texture: texture2}
      ]

    };

    picker.configure(configuration);
    picker.visible = true;

    picker.selectedIndex.monitor().subscribe(function(index) {
      Patches.inputs.setScalar('selection', index.newValue);
    });
}