const SUN = {
  name: "Sun",
  texture: "./sun.jpg",
  radius: 100,
  width: 30,
  height: 30,
  translation: {
    x: 0,
    y: 0,
    z: -700,
  },
  rotationSpeed: 0.0005,
  side: true,
  material: new THREE.MeshBasicMaterial(),
};

const EARTH = {
  name: "Earth",
  texture: "./earth.jpg",
  radius: 30,
  width: 30,
  height: 30,
  translation: {
    x: 150,
    y: 0,
    z: 150,
  },
  rotationSpeed: 0.0008,
  side: false,
  material: new THREE.MeshPhongMaterial(),
};

const MOON = {
  name: "Moon",
  texture: "./moon.jpg",
  radius: 15,
  width: 30,
  height: 30,
  translation: {
    x: 50,
    y: 0,
    z: 50,
  },
  rotationSpeed: 0.001,
  side: false,
  material: new THREE.MeshPhongMaterial(),
};

const MARS = {
  name: "Mars",
  texture: "./mars.jpg",
  radius: 30,
  width: 30,
  height: 30,
  translation: {
    x: -300,
    y: 0,
    z: 300,
  },
  rotationSpeed: 0.001,
  side: false,
  material: new THREE.MeshPhongMaterial(),
};

const JUPITER = {
  name: "Jupiter",
  texture: "./jupiter.jpg",
  radius: 30,
  width: 30,
  height: 30,
  translation: {
    x: -400,
    y: 0,
    z: -400,
  },
  rotationSpeed: 0.001,
  side: false,
  material: new THREE.MeshPhongMaterial(),
};

const GANYMEDE = {
  name: "Ganymede",
  texture: "./ganymede.jpg",
  radius: 15,
  width: 30,
  height: 30,
  translation: {
    x: 50,
    y: 0,
    z: 50,
  },
  rotationSpeed: 0.001,
  side: false,
  material: new THREE.MeshPhongMaterial(),
};

const buildMaterial = (rotateAround, objectDetails) => {
  const geometry = new THREE.SphereGeometry(
    objectDetails.radius,
    objectDetails.width,
    objectDetails.height
  );
  const material = objectDetails.material;
  material.map = THREE.ImageUtils.loadTexture(objectDetails.texture);
  material.side = objectDetails.side;
  const object = new THREE.Mesh(geometry, material);
  object.matrixAutoUpdate = false;
  rotateAround.add(object);
  object.matrix = new THREE.Matrix4().makeTranslation(
    objectDetails.translation.x,
    objectDetails.translation.y,
    objectDetails.translation.z
  );

  return object;
};

const rotate = (material, objectDetails, deltaTime) => {
  var rotation = new THREE.Matrix4().makeRotationY(
    objectDetails.rotationSpeed * deltaTime
  );
  material.matrix = material.matrix.multiply(rotation);
};

window.onload = function () {
  // Create a scene
  var scene = new THREE.Scene();

  // Create and position a camera
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 300;
  camera.position.y = 300;
  camera.rotation.x = -3.14 / 20;

  // Create renderer
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // "Low" ambient light
  var ligth = new THREE.AmbientLight(0x222222);
  ligth.position.set(0.5, 0, 1).normalize();
  scene.add(ligth);

  // Create Sun
  const sunObject = buildMaterial(scene, SUN);

  // Sun light
  var pointLight = new THREE.PointLight(0xffffff, 2.5, 0);
  pointLight.position.set(0, 0, -500);
  scene.add(pointLight);

  // Create Earth
  const earthObject = buildMaterial(sunObject, EARTH);

  // Create Moon
  const moonObject = buildMaterial(earthObject, MOON);

  // Create Mars
  const marsObject = buildMaterial(sunObject, MARS);

  // Create Jupiter
  const jupiterObject = buildMaterial(sunObject, JUPITER);

  // create Ganymede
  const ganymedeObject = buildMaterial(jupiterObject, GANYMEDE);

  // "render" function
  var render = function () {
    var now = new Date();
    var deltaTime = now - (render.time || now);
    render.time = now;

    // Rotate Sun on itself
    rotate(sunObject, SUN, deltaTime);

    // Rotate Earth on itself
    rotate(earthObject, EARTH, deltaTime);

    // Rotate Moon on itself
    rotate(moonObject, MOON, deltaTime);

    // Rotate Mars on itself
    rotate(marsObject, MARS, deltaTime);

    // Rotate Jupiter on itself
    rotate(jupiterObject, JUPITER, deltaTime);

    // Rotate Ganymede on itself
    rotate(ganymedeObject, GANYMEDE, deltaTime);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  // Call render function
  render();
};
