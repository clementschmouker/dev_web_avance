/**
  * App Manager
  *
  * @memberOfApp
  */


 import * as THREE from 'three'; //import tous les exports de three, les store dans un objet THREE, depuis le fichier "three"
 import CustomCube from 'Cube';

class App {

	// this.name = "";

	constructor() {
		this.initScene();
		this.initCamera();
		this.initRenderer();
	}




	initScene() {
		console.log('Scene initialization');

		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._scene = new THREE.Scene();
        //lights
        this.initLight();

        //first cube
        this._customCube = new CustomCube( { wireframe: false } );
        this._scene.add(this._customCube);
	}


    initLight() {
        const light = new THREE.AmbientLight(0xffffff);
		this._scene.add(light);

    }


	initCamera() {
		const fieldOfView = 60;
		const aspectRatio = this._width / this._height;
		const nearPlane = 1;
		const farPlane = 2000;

		this._camera = new THREE.PerspectiveCamera(
			fieldOfView,
			aspectRatio,
			nearPlane,
			farPlane
		);
		this._camera.position.z = 5;
		this._camera.position.y = 1;
	}


	initRenderer() {
		this._renderer = new THREE.WebGLRenderer();
		this._renderer.setSize(this._width, this._height);
		document.body.appendChild(this._renderer.domElement);
	}


	updateApp() {

	}


	renderApp() {
		this._renderer.render(this._scene, this._camera);
		window.requestAnimationFrame(this.renderApp.bind(this));
	}
}


export default App;
