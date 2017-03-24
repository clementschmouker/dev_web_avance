/**
  * App Manager
  *
  * @memberOfApp
  */


import * as THREE from 'three'; //import tous les exports de three, les store dans un objet THREE, depuis le fichier "three"
import CustomCube from 'Cube';
const OrbitControls = require('three-orbit-controls')(THREE)
const { Stats } = require('three-stats');
import debounce from 'lodash/debounce';

class App {

	// this.name = "";

	constructor() {
        this._lights = [];
        this._objects = [];
		this.initScene();
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

        this.initCamera();
        this.initRenderer();

        //lights
        this.initLight();
        //first cube
        this.createCube();
        //add keys
        this.initKeys();


        //debug mode
        if(global.debug) {
            this.initControls();
            this.initStats();
        }


        //launch app rendering loop
        this.renderApp();

        this.addHelpers();


        this.bind();
	}


    initLight() {
        const ambientLight = new THREE.AmbientLight(0x777777);
        this._lights.push(ambientLight);
		this._scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, .75);
        spotLight.position.set( -300, 300, 300 );
        spotLight.castShadow = true;
        this._lights.push(spotLight);
        this._scene.add(spotLight);

    }


    createCube() {
        this._cube = new CustomCube( { wireframe: false, speed: 5 } );
        this.add(this._cube);
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
		this._camera.position.z = -500;
		this._camera.position.y = 100;
	}


	initRenderer() {
		this._renderer = new THREE.WebGLRenderer({
            antialias: true
        });
		this._renderer.setSize(this._width, this._height);
        this._renderer.shadowMap.enabled = true;
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
        this._camera.lookAt(this._cube.position);

        this._objects.forEach((obj) => {
            obj.update();
        })
	}

    bind() {
        window.addEventListener('resize', debounce(this.onResize.bind(this), 500))
    }

    onResize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._renderer.setSize(this._width, this._height);
        this._camera.aspect = this._width / this._height;
        this._camera.updateProjectionMatrix();
    }


    addHelpers() {
        //go through lights
        this._lights.forEach((item) => {
            if(item.shadow) {
                this.addHelper(item.shadow.camera);
            }
        })
        //Add helpers
    }

    addHelper(camera) {
        const helper = new THREE.CameraHelper(camera)
        this._scene.add(helper);
    }


    initKeys() {
        this.pressedKey = [];

        addEventListener('keydown', (event) => {
            // console.log(event.key, event.keyCode);
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
                case 'a':
                    this.pressedKey[4] = true;
                    break;
                case 'e':
                    this.pressedKey[5] = true;
                    break;
            };

        })

        addEventListener('keyup', (event) => {
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
                case 'a':
                    this.pressedKey[4] = false;
                    break;
                case 'e':
                    this.pressedKey[5] = false;
                    break;
            };

        })

    }

    updateMovement() {
        const angle = this._cube.rotation.y;

        //rotate
        (this.pressedKey[4] ? this._cube.rotation.y += this._cube.speed / 100 : false);
        (this.pressedKey[5] ? this._cube.rotation.y -= this._cube.speed / 100 : false);

        //deplacement
        if(this.pressedKey[0] ){
            this._cube.position.z += this._cube.speed* Math.cos(angle);
            this._cube.position.x += this._cube.speed* Math.sin(angle);
            this._cube._mesh.rotation.x += .1;
        }
        if(this.pressedKey[1]) {
            this._cube.position.z -= this._cube.speed* Math.cos(angle);
            this._cube.position.x -= this._cube.speed* Math.sin(angle);
            this._cube._mesh.rotation.x -= .1;
        }
        if(this.pressedKey[2]) {
            this._cube.position.z += this._cube.speed* Math.sin(-angle);
            this._cube.position.x += this._cube.speed* Math.cos(angle);
            // this._cube._mesh.rotation.z -= .1;
        }
        if(this.pressedKey[3]) {
            this._cube.position.z -= this._cube.speed* Math.sin(-angle);
            this._cube.position.x -= this._cube.speed* Math.cos(angle);
            // this._cube._mesh.rotation.z += .1;
        }
    }


	renderApp() {
        if(this._stats) {
            this._stats.begin();
        }

		this._renderer.render(this._scene, this._camera);
		requestAnimationFrame(() => {
            this.renderApp();
            this.updateApp();
            this.updateMovement();
        }); // équivalent à un .bind(this);

        if(this._stats) {
            this._stats.end();
        }
    }

    add(obj) {
        this._objects.push(obj);
        this._scene.add(obj);
    }
}


export default App;
