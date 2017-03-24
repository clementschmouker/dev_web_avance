/**
  * App Manager
  *
  * @memberOfApp
  */


import * as THREE from 'three'; //import tous les exports de three, les store dans un objet THREE, depuis le fichier "three"
import CustomCube from 'Cube';
const OrbitControls = require('three-orbit-controls')(THREE)
const { Stats } = require('three-stats');

class App {

	// this.name = "";

	constructor() {
		this.initScene();
		this.initCamera();
		this.initRenderer();

        if(global.debug) {
            this.initControls();
            this.initStats();
        }

        //launch app rendering loop
        this.renderApp();

	}




	initScene() {
		console.log('Scene initialization');

		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._scene = new THREE.Scene();
        if(global.debug) {
            window.scene = this._scene;
            window.THREE = THREE;
        }
        //lights
        this.initLight();

        //first cube
        this.createCube();

        //add keys
        this.initKeys();

	}


    initLight() {
        const light = new THREE.AmbientLight(0xffffff);
		this._scene.add(light);

    }


    createCube() {
        this._cube = new CustomCube( { wireframe: false } );
        this._scene.add(this._cube);
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


    initControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    }


    initStats() {
        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);
    }


	updateApp() {

	}


    initKeys() {
        this.pressedKey = [];

        addEventListener('keydown', function(event) {
            console.log(event.key, event.keyCode);
            switch(event.key) {
                case 'z':
                    this.pressedKey[0] = true;
                    break;
                case 's':
                    this.pressedKey[1] = true;
                    break;
                case 'q':
                    this.pressedKey[2] = true;
                    break;
                case 'd':
                    this.pressedKey[3] = true;
                    break;
            };

        }.bind(this))

        addEventListener('keyup', function(event) {
            switch(event.key) {
                case 'z':
                    this.pressedKey[0] = false;
                    break;
                case 's':
                    this.pressedKey[1] = false;
                    break;
                case 'q':
                    this.pressedKey[2] = false;
                    break;
                case 'd':
                    this.pressedKey[3] = false;
                    break;
            };

        }.bind(this))

    }

    updateMovement() {
        (this.pressedKey[0] ? this._cube.position.z -=.1 : false);
        (this.pressedKey[1] ? this._cube.position.z +=.1 : false);
        (this.pressedKey[2] ? this._cube.position.x -=.1 : false);
        (this.pressedKey[3] ? this._cube.position.x +=.1 : false);
    }


	renderApp() {
		this._renderer.render(this._scene, this._camera);
		requestAnimationFrame(() => {
            this.renderApp();
            this.updateMovement();
        }); // équivalent à un .bind(this);
	}
}


export default App;
