import * as THREE from "three";
import {Lensflare, LensflareElement} from "three/examples/jsm/objects/Lensflare";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class ThreeDEngine {
    private _elementToWatch: HTMLElement;
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;

    constructor(element: HTMLCanvasElement, elementToWatch: HTMLElement) {
        console.log("Initializing Game Engine...")

        this._elementToWatch = elementToWatch;

        // Camera
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15000);
        this._camera.position.z = 250;

        // scene
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
        this._scene.fog = new THREE.Fog(this._scene.background, 3500, 15000);

        // world
        const boxSize = 250;

        const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
        const material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 50});

        for (let i = 0; i < 3000; i++) {

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
            mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
            mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;

            // optimization as they wont move
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();

            this._scene.add(mesh);
        }

        // Lights
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
        dirLight.position.set(0, -1, 0).normalize();
        dirLight.color.setHSL(0.1, 0.7, 0.5);
        this._scene.add(dirLight);

        // lensflares
        this.addLensFlare(
            {h: 0.08, s: 0.8, l: 0.5},
            {x: 0, y: 0, z: -1000}
        );
        // addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
        // addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

        // On scroll
        this._elementToWatch.addEventListener("scroll", _ => this.onScroll());
        this.onScroll();

        // Render
        this._renderer = new THREE.WebGLRenderer({canvas: element});
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.outputEncoding = THREE.sRGBEncoding;

        // controls

        window.addEventListener("resize", this.onResize);
        this.animate();
        console.log("All done!")
    }

    private animate() {
        requestAnimationFrame(() => this.animate());
        this._renderer.render(this._scene, this._camera);
        this._camera.rotation.z = this._camera.rotation.z + 0.0002 % 360;
    }

    private onScroll = () => {
        const top = this._elementToWatch.scrollTop;
        console.log(top)

        // this._camera.rotation.x = top * 0.0002 % 360;
    }

    private onResize = () => {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
    }

    private addLensFlare(hsl: { h: number, s: number, l: number }, pos: { x: number, y: number, z: number }) {
        const textureLoader = new THREE.TextureLoader();

        const textureFlare0 = textureLoader.load('textures/lensflare/lensflare0.png');
        const textureFlare3 = textureLoader.load('textures/lensflare/lensflare3.png');

        const baseLight = new THREE.PointLight(0xffffff, 1.5, 2000);
        baseLight.color.setHSL(hsl.h, hsl.s, hsl.l);
        baseLight.position.set(pos.x, pos.y, pos.z);
        this._scene.add(baseLight);

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, baseLight.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        baseLight.add(lensflare);

    }
}
