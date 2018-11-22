window.onload = function() {
    // Creo una scena
    var scene = new THREE.Scene();

    // Creo una camera e la posiziono
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
    camera.position.z = 300;
    camera.position.y = 300;
    camera.rotation.x = -3.14/20;

    // Creo un render con alpha a true così da essere trasparente per mostrare lo sfondo
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luce leggera per la parte non illuminata dal sole
    var ligth = new THREE.AmbientLight(0x222222);
    ligth.position.set(0.5, 0, 1).normalize();
    scene.add(ligth);


    // Creo il sole
    var geometrySole = new THREE.SphereGeometry(100, 30, 30);
    var materialSole = new THREE.MeshBasicMaterial();
    materialSole.map = THREE.ImageUtils.loadTexture('sun.jpg');
    materialSole.side = true;
    var sole = new THREE.Mesh(geometrySole, materialSole);
    sole.matrixAutoUpdate = false;
    scene.add(sole);
    sole.matrix = new THREE.Matrix4().makeTranslation(0, 0, -700);


    // Luce da mettere esattamente sul sole così da illuminare dal centro
    var pointLight = new THREE.PointLight(0xffffff, 2.5, 0);
    pointLight.position.set(0, 0, -500);
    scene.add(pointLight);


    // Creo la Terra
    var geometryTerra = new THREE.SphereGeometry(30, 30, 30);
    var materialTerra = new THREE.MeshPhongMaterial();
    materialTerra.map = THREE.ImageUtils.loadTexture('earth.jpg');
    materialTerra.shading = THREE.SmoothShading;
    var terra = new THREE.Mesh(geometryTerra, materialTerra);
    terra.matrixAutoUpdate = false;
    sole.add(terra); // la Terra ruota attorno al SOLE
    terra.matrix = new THREE.Matrix4().makeTranslation(150, 0, 150);


    // Creo la Luna
    var geometryLuna = new THREE.SphereGeometry(15, 30, 30);
    var materialLuna = new THREE.MeshPhongMaterial();
    materialLuna.map = THREE.ImageUtils.loadTexture('moon.jpg');
    var luna = new THREE.Mesh(geometryLuna, materialLuna);
    luna.matrixAutoUpdate = false;
    terra.add(luna); // La luna ruota attorno alla Terra
    luna.matrix = new THREE.Matrix4().makeTranslation(50, 0, 50);

    // Creo Marte
    var geometryMarte = new THREE.SphereGeometry(30, 30, 30);
    var materialMarte = new THREE.MeshPhongMaterial();
    materialMarte.map = THREE.ImageUtils.loadTexture('mars.jpg');
    var marte = new THREE.Mesh(geometryMarte, materialMarte);
    marte.matrixAutoUpdate = false;
    sole.add(marte); // Marte ruota attorno al Sole
    marte.matrix = new THREE.Matrix4().makeTranslation(-300, 0, 300);

    // Creo Giove
    var geometryGiove = new THREE.SphereGeometry(30, 30, 30);
    var materialGiove = new THREE.MeshPhongMaterial();
    materialGiove.map = THREE.ImageUtils.loadTexture('jupiter.jpg');
    var giove = new THREE.Mesh(geometryGiove, materialGiove);
    giove.matrixAutoUpdate = false;
    sole.add(giove); // Giove ruota attorno al Sole
    giove.matrix = new THREE.Matrix4().makeTranslation(-400, 0, -400);

    // Creo Ganimede
    var geometryGanimede = new THREE.SphereGeometry(15, 30, 30);
    var materialGanimede = new THREE.MeshPhongMaterial();
    materialGanimede.map = THREE.ImageUtils.loadTexture('ganymede.jpg');
    var ganimede = new THREE.Mesh(geometryGanimede, materialGanimede);
    ganimede.matrixAutoUpdate = false;
    giove.add(ganimede); // Ganimede ruota attorno a Giove
    ganimede.matrix = new THREE.Matrix4().makeTranslation(50, 0, 50);

    
    // Creo la funzione che renderizza
    var render = function(){
        var now = new Date();
        var dt = now-(render.time||now);
        render.time = now;


        // Ruoto il Sole su se stesso
        var rot = new THREE.Matrix4().makeRotationY(0.0005*dt);
        sole.matrix = sole.matrix.multiply(rot);

        // Faccio ruotare la Terra su se stessa
        var rot_terra = new THREE.Matrix4().makeRotationY(0.0008*dt);
        terra.matrix = terra.matrix.multiply(rot_terra);


        // Faccio ruotare la Luna su se stessa
        var rot_luna = new THREE.Matrix4().makeRotationY(0.001*dt);
        luna.matrix = luna.matrix.multiply(rot_luna);


        // Faccio ruotare Marte su se stesso
        var rot_marte = new THREE.Matrix4().makeRotationY(0.001*dt);
        marte.matrix = marte.matrix.multiply(rot_marte);


        // Faccio ruotare Giove su se stesso
        var rot_giove = new THREE.Matrix4().makeRotationY(0.001*dt);
        giove.matrix = giove.matrix.multiply(rot_giove);


        // Faccio ruotare Ganimede su se stesso
        var rot_ganimede = new THREE.Matrix4().makeRotationY(0.001*dt);
        ganimede.matrix = ganimede.matrix.multiply(rot_ganimede);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    // Richiamo la funzione render
    render();
}
