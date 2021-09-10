import * as THREE from "three";
import {Vector3} from "three";
import {Lensflare, LensflareElement} from "three/examples/jsm/objects/Lensflare";
import {ThreeJsCube} from "./infrastructure/adapters/ThreeJsCube";
import {CubeManager} from "./domain/usecase/CubeManager";
import {Point} from "./domain/usecase/utils";
import {ThreeJSScene} from "./infrastructure/adapters/ThreeJSScene";
import {JSRandom} from "./infrastructure/adapters/JSRandom";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export class ThreeDEngine {
    private _scene: THREE.Scene;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _flareLight: THREE.PointLight;
    private _timeoutId: number | null = null;
    private _clock: THREE.Clock = new THREE.Clock();
    private _controls: OrbitControls | null = null;
    private stats: any;

    private _cubeManager: CubeManager;

    private static readonly NORMAL_BRIGHTNESS = 1.5;
    private static readonly FAST_BRIGHTNESS = 2.5;
    private static readonly BRITHNESS_DELAY_MS = 100;

    private static readonly GEOMETRY = new THREE.BoxGeometry(50, 50, 50);
    private static readonly MATERIAL = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 50});

    constructor(canvas: HTMLCanvasElement, elementToWatch: HTMLElement, withHelpers: boolean) {
        console.log("Initializing Engine...")
        this._timeoutId = null;

        // Camera
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 15000);
        this._camera.position.z = 250;

        // scene
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
        this._scene.fog = new THREE.Fog(this._scene.background, 3500, 15000);

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
        this._flareLight.position.set(0, 0, -500);
        this._scene.add(this._flareLight);

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, this._flareLight.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        this._flareLight.add(lensflare);

        // On scroll
        elementToWatch.addEventListener("scroll", _ => this.onScroll());
        this.onScroll();

        // Render
        this._renderer = new THREE.WebGLRenderer({canvas: canvas});
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.outputEncoding = THREE.sRGBEncoding;

        // cube manager
        this._cubeManager = new CubeManager(
            {
                spawnPoint: new Vector3(0, 0, -1000),
                outOfBoundsX: (x) => x > 500,
                outOfBoundsY: (y) => y > 500,
                outOfBoundsZ: (z) => z > 500,
                intervalMS: 200,
                howManyPerBatch: 10,
                radiusMin: 300,
                radiusMax: 500,
                speed: 0.5,
                cubeFactory: () => new ThreeJsCube(new THREE.Mesh(ThreeDEngine.GEOMETRY, ThreeDEngine.MATERIAL)),
                computeDirection: (randomPointInCircle: Point, spawnPoint: Vector3) => new Vector3(
                    randomPointInCircle.x,
                    randomPointInCircle.y,
                    -spawnPoint.z
                ),
                cubeNumberLimit: 6000,
            },
            new ThreeJSScene(this._scene),
            new JSRandom(),
         );

        if (withHelpers) {
            this._controls = new OrbitControls(this._camera, canvas);
            this._controls.update();

            const gridHelper = new THREE.GridHelper(300, 10);
            this._scene.add(gridHelper);

            const axesHelper = new THREE.AxesHelper(1000);
            this._scene.add(axesHelper);
        }

        // @ts-ignore
        this.stats = new Stats();
        canvas.appendChild(this.stats.dom);

        // controls
        window.addEventListener("resize", this.onResize);
        this.animate();
        console.log("All done!");
    }

    private animate() {
        requestAnimationFrame(() => this.animate());
        this._controls && this._controls.update();
        this._cubeManager.update(this._clock.getDelta() * 1000);
        this._renderer.render(this._scene, this._camera);
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
