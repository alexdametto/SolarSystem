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
  var geometrySole = new THREE.SphereGeometry(100, 30, 30);
  var materialSole = new THREE.MeshBasicMaterial();
  materialSole.map = THREE.ImageUtils.loadTexture("./sun.jpg");
  materialSole.side = true;
  var sole = new THREE.Mesh(geometrySole, materialSole);
  sole.matrixAutoUpdate = false;
  scene.add(sole);
  sole.matrix = new THREE.Matrix4().makeTranslation(0, 0, -700);

  // Sun light
  var pointLight = new THREE.PointLight(0xffffff, 2.5, 0);
  pointLight.position.set(0, 0, -500);
  scene.add(pointLight);

  // Create Earth
  var geometryTerra = new THREE.SphereGeometry(30, 30, 30);
  var materialTerra = new THREE.MeshPhongMaterial();
  materialTerra.map = THREE.ImageUtils.loadTexture("./earth.jpg");
  materialTerra.shading = THREE.SmoothShading;
  var terra = new THREE.Mesh(geometryTerra, materialTerra);
  terra.matrixAutoUpdate = false;
  sole.add(terra); // la Terra ruota attorno al SOLE
  terra.matrix = new THREE.Matrix4().makeTranslation(150, 0, 150);

  // Create Moon
  var geometryLuna = new THREE.SphereGeometry(15, 30, 30);
  var materialLuna = new THREE.MeshPhongMaterial();
  materialLuna.map = THREE.ImageUtils.loadTexture("./moon.jpg");
  var luna = new THREE.Mesh(geometryLuna, materialLuna);
  luna.matrixAutoUpdate = false;
  terra.add(luna); // La luna ruota attorno alla Terra
  luna.matrix = new THREE.Matrix4().makeTranslation(50, 0, 50);

  // Create Mars
  var geometryMarte = new THREE.SphereGeometry(30, 30, 30);
  var materialMarte = new THREE.MeshPhongMaterial();
  materialMarte.map = THREE.ImageUtils.loadTexture("./mars.jpg");
  var marte = new THREE.Mesh(geometryMarte, materialMarte);
  marte.matrixAutoUpdate = false;
  sole.add(marte); // Marte ruota attorno al Sole
  marte.matrix = new THREE.Matrix4().makeTranslation(-300, 0, 300);

  // Create Jupiter
  var geometryGiove = new THREE.SphereGeometry(30, 30, 30);
  var materialGiove = new THREE.MeshPhongMaterial();
  materialGiove.map = THREE.ImageUtils.loadTexture("./jupiter.jpg");
  var giove = new THREE.Mesh(geometryGiove, materialGiove);
  giove.matrixAutoUpdate = false;
  sole.add(giove); // Giove ruota attorno al Sole
  giove.matrix = new THREE.Matrix4().makeTranslation(-400, 0, -400);

  // create Ganymede
  var geometryGanimede = new THREE.SphereGeometry(15, 30, 30);
  var materialGanimede = new THREE.MeshPhongMaterial();
  materialGanimede.map = THREE.ImageUtils.loadTexture("./ganymede.jpg");
  var ganimede = new THREE.Mesh(geometryGanimede, materialGanimede);
  ganimede.matrixAutoUpdate = false;
  giove.add(ganimede); // Ganimede ruota attorno a Giove
  ganimede.matrix = new THREE.Matrix4().makeTranslation(50, 0, 50);

  // "render" function
  var render = function () {
    var now = new Date();
    var dt = now - (render.time || now);
    render.time = now;

    // Rotate Sun on itself
    var rot = new THREE.Matrix4().makeRotationY(0.0005 * dt);
    sole.matrix = sole.matrix.multiply(rot);

    // Rotate Earth on itself
    var rot_terra = new THREE.Matrix4().makeRotationY(0.0008 * dt);
    terra.matrix = terra.matrix.multiply(rot_terra);

    // Rotate Moon on itself
    var rot_luna = new THREE.Matrix4().makeRotationY(0.001 * dt);
    luna.matrix = luna.matrix.multiply(rot_luna);

    // Rotate Mars on itself
    var rot_marte = new THREE.Matrix4().makeRotationY(0.001 * dt);
    marte.matrix = marte.matrix.multiply(rot_marte);

    // Rotate Jupyter on itself
    var rot_giove = new THREE.Matrix4().makeRotationY(0.001 * dt);
    giove.matrix = giove.matrix.multiply(rot_giove);

    // Rotate Ganymede on itself
    var rot_ganimede = new THREE.Matrix4().makeRotationY(0.001 * dt);
    ganimede.matrix = ganimede.matrix.multiply(rot_ganimede);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };

  // Call render function
  render();
};
