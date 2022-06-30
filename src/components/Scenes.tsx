import { render } from '@testing-library/react';
import { useEffect } from 'react';
import {
	Scene,
	WebGLRenderer,
	PerspectiveCamera,
	Mesh,
	MeshBasicMaterial,
	BoxBufferGeometry,
	SphereBufferGeometry,
	//* Geometra de la esfera
	SphereGeometry,
	//* argador de testuras
	TextureLoader,
	//* BackSide para que la textura se vea desde el otro lado
	BackSide,
	//* Material de la esfera
	MeshPhongMaterial,

	//*Importamos luz
	DirectionalLight,
	HemisphereLight,
	AmbientLight,
	TorusBufferGeometry,
	TorusKnotBufferGeometry,
	Vector3,
	MeshNormalMaterial,
	MeshMatcapMaterial,
	MeshStandardMaterial,
	PointLight,
	CubeTextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//!para usar la libreria theeejs nesecitamos 3 componentes impotantes
//*1. Una esena
//*2. Una camara
//*3. Un renderizador

function Scenes() {
	useEffect(() => {
		const scene = new Scene();
		const camera = new PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new WebGLRenderer({
			antialias: true,
			canvas: document.getElementById('bg')!,
		});

		// //! Controles de la camara
		const controls = new OrbitControls(camera, renderer.domElement);
		// controls.target = new Vector3(0, 0, 2);
		controls.enableDamping = true;

		/*
		//! loader
		const loader1 = new GLTFLoader();
		loader1.load(
			'./model/Mclaren.gltf',
			(gltf) => {
				scene.add(gltf.scene);
			},
			() => {},
			() => {}
		);
		*/

		const loader = new TextureLoader();
		const texture = loader.load('./textures/MapCap1.png');
		//* Un objeto 3D es una geometria (Mesh o mallas en español) y un material
		//* Una analojia seria que una geometria es el equeleto y un material es la piel
		//! Creacion de cubo
		const cube = new Mesh(
			new BoxBufferGeometry(1, 1, 1),
			new MeshBasicMaterial({ color: 0xff3300, wireframe: true })
		);

		//! Creacion de esfera
		const sfera = new Mesh(
			new SphereBufferGeometry(0.7, 32, 32),
			new MeshMatcapMaterial({ matcap: texture })
		);
		sfera.position.set(1, 0, -2);

		//! Creaccion de Torus

		const torus = new Mesh(
			new TorusKnotBufferGeometry(0.5, 0.18, 150, 13),
			new MeshNormalMaterial({ flatShading: true })
		);
		// torus.position.x = 3;
		torus.position.set(3, 0, 0);
		torus.scale.set(1.5, 1.5, 1.5);
		scene.add(cube, sfera, torus);

		/*
		//! Crear textura
		const loader = new TextureLoader();
		const map = loader.load('./textures/basecolor.jpg');
		const aoMap = loader.load('./textures/ambientOcclusion.jpg');
		const roughnessMap = loader.load('./textures/roughness.jpg');
		const normalMap = loader.load('./textures/normal.jpg');
		const heightMap = loader.load('./textures/height.png');

		//! Creacion de cubo
		const cubo = new Mesh(
			new BoxBufferGeometry(1, 1, 1, 250, 250, 250),
			new MeshStandardMaterial({
				map: map,
				aoMap: aoMap,
				roughnessMap: roughnessMap,
				normalMap: normalMap,
				displacementMap: heightMap,
				displacementScale: 0.15,
				// wireframe: true,
			})
		);
		scene.add(cubo);
		*/

		//! Creacion Luz
		// const A0 = new AmbientLight(0xffffff, 1);
		// scene.add(A0);

		const pointLight = new PointLight(0xffffff, 1.3, 100);
		pointLight.position.set(0, 5, 0);
		scene.add(pointLight);

		const directionalLight = new DirectionalLight(0xffffff, 1.3);
		directionalLight.position.set(5, 10, 2);
		scene.add(directionalLight);

		// //! Luz anbiental
		// const environmentMap = new CubeTextureLoader();
		// const envMap = environmentMap.load([
		// 	'./luces/px.png',
		// 	'./luces/nx.png',
		// 	'./luces/py.png',
		// 	'./luces/ny.png',
		// 	'./luces/pz.png',
		// 	'./luces/nz.png',
		// ]);
		// scene.environment = envMap;
		// scene.background = envMap;

		//! Creamos una funccion que renderiza la escena
		function animate() {
			controls.update();
			renderer.render(scene, camera);

			requestAnimationFrame(animate);
		}

		//! Movemos la camara
		// camera.position.set(0, 0, 11);
		camera.position.set(0, 0, 7);

		renderer.setSize(window.innerWidth, window.innerHeight);
		animate();
	}, []);

	return <canvas id='bg' />;
}

export default Scenes;
