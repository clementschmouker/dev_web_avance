import * as THREE from 'three';

class CustomCube extends THREE.Object3D {

	constructor( obj ){
		super();
		this.size = 1;
		if(obj.wireframe) {
			this.createCube(1, true);
		}
		else {
			this.createCube(1, false);
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
	}



}
export default CustomCube
