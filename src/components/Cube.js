import * as THREE from 'three';

class CustomCube extends THREE.Object3D {

	constructor( obj ){
		super();
		this.size = 60;
		this.speed = obj.speed;
		if(obj.wireframe) {
			this.createCube(this.size, true);
		}
		else {
			this.createCube(this.size, false);
		}
	};


	createCube( size, isWireframe ) {
		const geometry = new THREE.BoxGeometry(size, size, size);
		const material = new THREE.MeshLambertMaterial({
			color: 0xffffff
		});
		//checks if wireframe or not
		if(isWireframe) {
			material.wireframe = true;
		}
		this._mesh = new THREE.Mesh( geometry, material);

		//adds the cube to the object
		this.add(this._mesh);
		this.addArrow();
	}

	update() {
		
	}



	addArrow() {
		//directional arrow
		const dirGeo = new THREE.CylinderGeometry(0, this.size/4, this.size/2);
		const dirMat = new THREE.MeshLambertMaterial({
			color: 0x00ff00
		})
		this._directionMesh = new THREE.Mesh(dirGeo, dirMat);
		this._directionMesh.position.set(0, 50, 40);
		this._directionMesh.rotation.set(Math.PI/2, 0, 0);
		this.add(this._directionMesh);

		const dirBodyGeo = new THREE.CylinderGeometry(5, 5, this.size);
		this._directionBodyMesh = new THREE.Mesh(dirBodyGeo, dirMat);
		this._directionBodyMesh.position.set(0, 50, 0);
		this._directionBodyMesh.rotation.set(Math.PI/2, 0, 0);
		this.add(this._directionBodyMesh);


	}



}
export default CustomCube
