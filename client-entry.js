'use strict';

var THREE = require('three');
var ThreeStereoEffect = require('three-stereo-effect')(THREE);
var ThreeDeviceOrientation = require('three.orientation');
var ThreeOrbitControls = require('three-orbit-controls')(THREE);
var ThreeObjLoader = require('three-obj-loader');
ThreeObjLoader(THREE);
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

var camera, scene, renderer;
var effect, controls;
var element, container;

var clock = new THREE.Clock();

function update(dt) {
  resize();
  camera.updateProjectionMatrix();
  controls.update(dt);
}

function render(dt) {
  effect.render(scene, camera);
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
  var width = container.offsetWidth;
  var height = container.offsetHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  effect.setSize(width, height);
}

var init = function() {

  renderer = new THREE.WebGLRenderer();
  element = renderer.domElement;
  container = document.getElementById('canvas');
  container.appendChild(element);

  effect = new ThreeStereoEffect(renderer);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(90, 1, 0.001, 2000);
  camera.position.set(0, 20, 0);
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

  var texture = THREE.ImageUtils.loadTexture('/checker.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat = new THREE.Vector2(5, 5);
  texture.anisotropy = renderer.getMaxAnisotropy();

  var groundMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff,
    shininess: 20,
    shading: THREE.FlatShading,
    map: texture
  });

  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000,4000,100,100),
    groundMaterial
  );

  groundMaterial.needsUpdate = true;

  ground.rotation.x = -(90*(Math.PI/180));
  ground.position.setY(0);
  ground.receiveShadow = true;

  // light the scene
  var keyLight = new THREE.SpotLight(0xffffff, 0.8);
  keyLight.position.set(500,500,500);
  var fillLight1 = new THREE.PointLight(0xff6666, 0.5);
  fillLight1.position.set(-1000,300,0);
  var fillLight2 = new THREE.PointLight(0xDDAA55, 0.3);
  fillLight2.position.set(1000,300,-300);

  // populate the scene
  scene.add(ground);
  scene.add(keyLight);
  scene.add(fillLight1);
  scene.add(fillLight2);



  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {};

  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  var loader = new THREE.OBJLoader(manager);
  loader.load( '/test.obj', function ( object ) {
    object.traverse( function ( child ) {
      if (child instanceof THREE.Mesh) {
        child.material = groundMaterial;
      }
    });

    object.position.y = 10;
    scene.add(object);

  }, onProgress, onError );



  // start animation
  console.log("Initialized");
};

init();
animate();
