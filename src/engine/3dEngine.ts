import * as THREE from "three";
import {Lensflare, LensflareElement} from "three/examples/jsm/objects/Lensflare";

export class ThreeDEngine {
    private _elementToWatch: HTMLElement;
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _flareLight: THREE.PointLight;
    private _timeoutId: number | null = null;

    private static readonly CAMERA_ROTATION_SPEED = 0.0002;
    private static readonly NORMAL_BRIGHTNESS = 1.5;
    private static readonly FAST_BRIGHTNESS = 2.5;
    private static readonly BRITHNESS_DELAY_MS = 100;

    constructor(element: HTMLCanvasElement, elementToWatch: HTMLElement) {
        console.log("Initializing Game Engine...")
        this._timeoutId = null;

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
        const textureLoader = new THREE.TextureLoader();

        const textureFlare0 = textureLoader.load('textures/lensflare/lensflare0.png');
        const textureFlare3 = textureLoader.load('textures/lensflare/lensflare3.png');

        this._flareLight = new THREE.PointLight(0xffffff, 1.5, 2000);
        this._flareLight.color.setHSL(0.08, 0.8, 0.5);
        this._flareLight.position.set(0, 0, -1000);
        this._scene.add(this._flareLight);

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, this._flareLight.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        this._flareLight.add(lensflare);

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
        this._camera.rotation.z += ThreeDEngine.CAMERA_ROTATION_SPEED % 360;
    }

    private onScroll = () => {
        if (this._timeoutId != null) {
            clearTimeout(this._timeoutId);
        }
        this._flareLight.intensity = ThreeDEngine.FAST_BRIGHTNESS;
        this._timeoutId = setTimeout(() => this._flareLight.intensity = ThreeDEngine.NORMAL_BRIGHTNESS, ThreeDEngine.BRITHNESS_DELAY_MS) as unknown as number;
    }

    private onResize = () => {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
    }
}
