//LINEAS
const n_lados = 5;
const radius = 10;
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const points = [];
for(let i=0; i<=n_lados; i++){
    var theta = (i / n_lados) * Math.PI * 2;
    let x = radius * Math.cos(theta);
    let y = radius * Math.sin(theta);
    points.push( new THREE.Vector3( x, y, 0 ) );
}

const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );

//"PERSONAS"
for(let i = 0; i < n_lados; i++){
    let sphereGeometry = new THREE.SphereGeometry( 1, 32, 16 );
    let sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    sphere.position.x = points[i].getComponent(0)
    sphere.position.y = points[i].getComponent(1)
    scene.add( sphere );
}