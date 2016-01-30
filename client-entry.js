'use strict';

let THREE = require('three');
let ThreeStereoEffect = require('three-stereo-effect')(THREE);
let ThreeDeviceOrientation = require('three.orientation');
let ThreeOrbitControls = require('three-orbit-controls')(THREE);
//let ThreeObjLoader = require('three-obj-loader');
//let ObjMtlLoader = require();
//ThreeObjLoader(THREE);
global.THREE = THREE;

// Paul Irish's requestAnimationFrame shim
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();

let camera, scene, renderer;
let effect, controls;
let element, container;

let clock = new THREE.Clock();

function update(dt) {
  resize();
  camera.updateProjectionMatrix();
  controls.update(dt);
}

function render(dt) {
  if (effect) {
    effect.render(scene, camera);
  } else {
    renderer.render(scene, camera);
  }
}

function animate() {
  requestAnimationFrame(animate);
  update(clock.getDelta());
  render(clock.getDelta());
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function resize() {
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  if (effect) {
    effect.setSize(width, height);
  }
}

let init = function() {

  renderer = new THREE.WebGLRenderer({ antialias: true });
  element = renderer.domElement;
  container = document.getElementById('canvas');
  container.appendChild(element);

  effect = new ThreeStereoEffect(renderer);
  setTimeout(function() {
    effect = null;
  }, 5000);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 2000);
  camera.position.set(0, 200, 200);
  scene.add(camera);

  controls = new ThreeOrbitControls(camera, element);
  //controls.rotateUp(Math.PI / 4);
  controls.target.set(
    camera.position.x + 0.1,
    camera.position.y,
    camera.position.z
  );

  function setOrientationControls(e) {
    console.log(e);
    if (!e.alpha) {
      return;
    }

    controls = ThreeDeviceOrientation(camera);
    controls.connect();
    window.removeEventListener('deviceorientation', setOrientationControls, true);
  }

  window.addEventListener('deviceorientation', setOrientationControls, true);
  window.addEventListener('resize', resize, false);

  setTimeout(resize, 1);

  let texture = THREE.ImageUtils.loadTexture('/checker.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(5, 5);
  texture.anisotropy = renderer.getMaxAnisotropy();

  let groundMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  let wireMaterial = new THREE.MeshLambertMaterial({
    color: 0x00FFFF,
    shading: THREE.FlatShading,
    side: THREE.DoubleSide
    //wireframe: true,
    //wireframeLinewidth: 2,
  });

  let dodec = new THREE.Mesh(
    new THREE.DodecahedronGeometry(2000, 1),
    wireMaterial
  );
  dodec.position.set(100,100,100);

  let ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000,4000,100,100),
    groundMaterial
  );

  groundMaterial.needsUpdate = true;

  ground.rotation.x = -(90*(Math.PI/180));
  ground.position.setY(0);
  ground.receiveShadow = true;

  // light the scene
  let keyLight = new THREE.SpotLight(0xffffff, 0.8);
  keyLight.position.set(500,500,500);
  let fillLight1 = new THREE.PointLight(0xff6666, 0.5);
  fillLight1.position.set(-1000,300,0);
  let fillLight2 = new THREE.PointLight(0xDDAA55, 0.3);
  fillLight2.position.set(1000,300,-300);

  // populate the scene
  scene.add(ground);
  scene.add(dodec);
  scene.add(keyLight);
  scene.add(fillLight1);
  scene.add(fillLight2);

  /*
  let onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  let onError = function ( xhr ) {};

  let manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  let loader = new THREE.OBJLoader(manager);
  loader.load( '/cartoonland.obj', function ( object ) {
    object.traverse( function (child) {
      console.log(child);
      if (child instanceof THREE.Mesh) {
        //child.material.map = groundMaterial;
        console.log(child.material);
      }
    });
    object.position.y = 1;
    object.scale.set(10,10,10);
    scene.add(object);
  }, onProgress, onError );
  */

  var loader = new THREE.JSONLoader();
  loader.load('/mesh/test.json', function (geometry, materials) {
    materials[0].shading = THREE.FlatShading;
    materials[1].shading = THREE.FlatShading;
    let material = new THREE.MeshFaceMaterial(materials);
    let object = new THREE.Mesh(geometry, material);
    object.scale.set(20,20,20);
    object.position.setY(10);
    scene.add(object);
  });

  var btnToggleSplit = document.getElementsByClassName('btn-toggle-split')[0];
  btnToggleSplit.addEventListener('click', function(ev) {
    ev.preventDefault();
    if (effect) {
      effect = null;
    } else {
      effect = new ThreeStereoEffect(renderer);
    }
  });

  // start animation
  console.log("Initialized");
};

init();
animate();
