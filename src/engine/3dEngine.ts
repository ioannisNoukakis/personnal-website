import * as THREE from "three";

export class ThreeDEngine {
    private _elementToWatch: HTMLElement | null = null;
    private _scene: THREE.Scene | null = null;
    private _camera: THREE.Camera | null = null;
    private _renderer: THREE.WebGLRenderer | null = null;
    private _torus: THREE.Mesh | null = null;

    public init(element: HTMLCanvasElement, elementToWatch: HTMLElement) {
        console.log("Initializing Game Engine...")

        // Setup
        this._elementToWatch = elementToWatch;
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this._renderer = new THREE.WebGLRenderer({
            canvas: element,
        });

        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        this._renderer.render(this._scene, this._camera);

        // Lights

        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        this._scene.add(pointLight, ambientLight);

        // Helpers

        const lightHelper = new THREE.PointLightHelper(pointLight);
        const gridHelper = new THREE.GridHelper(200, 50);
        this._scene.add(lightHelper, gridHelper);

        // Torus
        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({color: 0xff6347});
        this._torus = new THREE.Mesh(geometry, material);

        this._scene.add(this._torus);

        this._elementToWatch.onscroll = (e) => this.moveCamera();
        this.moveCamera();
        this.animate();
        console.log("All done!")
    }

    private animate() {
        if (!this._torus || !this._renderer || !this._scene || !this._camera) {
            console.warn("_torus, _renderer, _scene, _camera must be initialized:",
                this._torus,
                this._renderer,
                this._scene,
                this._camera
            );
        } else {
            this._renderer.render(this._scene, this._camera);
        }
        requestAnimationFrame(() => this.animate());
    }

    private moveCamera() {
        if (!this._torus || !this._camera || !this._elementToWatch) {
            console.warn("_torus, _camera, _elementToWatch must be initialized:",
                this._torus,
                this._camera,
                this._elementToWatch,
            );
            return;
        }
        const top = this._elementToWatch.scrollTop;
        console.log(top)

        this._torus.rotation.x = top * 0.001;
        this._torus.rotation.y = top * 0.0005;
        this._torus.rotation.z = top * 0.001;

        this._camera.position.x = -3 + top * -0.0002;
        this._camera.position.y = top * -0.0002;
        this._camera.position.z = 30 + top * -0.01;
    }
}
