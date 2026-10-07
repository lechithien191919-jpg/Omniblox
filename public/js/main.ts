import * as THREE from 'three';
import { GameRenderer } from './renderer';
import { MapManager } from './map';
import { RobloxPlayer } from './player';
import { GameControls } from './controls';

class GameApp {
    private gameRenderer: GameRenderer;
    private player: RobloxPlayer;
    private controls: GameControls;
    private blockMeshes: THREE.Mesh[] = [];
    private velocityY = 0;
    private isGrounded = false;

    constructor() {
        this.gameRenderer = new GameRenderer();
        this.player = new RobloxPlayer();
        this.controls = new GameControls();

        this.gameRenderer.scene.add(this.player.mesh);

        // Load map mẫu và render các khối block lên scene
        this.loadAndRenderMap();

        // Chạy vòng lặp game loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    private loadAndRenderMap() {
        const sampleBlocks = MapManager.getSampleMap();
        const boxGeo = new THREE.BoxGeometry(1, 1, 1);

        sampleBlocks.forEach(b => {
            const mat = new THREE.MeshLambertMaterial({ color: b.color });
            const cube = new THREE.Mesh(boxGeo, mat);
            cube.position.set(b.x, b.y + 0.5, b.z);
            this.gameRenderer.scene.add(cube);
            this.blockMeshes.push(cube);
        });
    }

    private updatePlayerMovement() {
        const speed = 0.1;
        const dx = this.controls.moveDirection.x * speed;
        const dz = this.controls.moveDirection.z * speed;

        // Di chuyển nhân vật theo hướng góc nhìn camera
        this.player.mesh.position.x += dx;
        this.player.mesh.position.z += dz;

        // Xử lý nhảy & trọng lực
        if (this.controls.isJumping && this.isGrounded) {
            this.velocityY = 0.2;
            this.isGrounded = false;
            this.controls.isJumping = false;
        }

        this.velocityY -= 0.01; // Trọng lực kéo xuống
        this.player.mesh.position.y += this.velocityY;

        // Kiểm tra chạm đất đơn giản (mặt phẳng y = 1)
        if (this.player.mesh.position.y <= 1) {
            this.player.mesh.position.y = 1;
            this.velocityY = 0;
            this.isGrounded = true;
        }
    }

    private animate() {
        requestAnimationFrame(this.animate);

        this.updatePlayerMovement();
        this.controls.updateCamera(this.gameRenderer.camera, this.player.mesh);

        this.gameRenderer.render();
    }
}

// Khởi chạy game khi web tải xong
window.onload = () => {
    new GameApp();
    console.log("🎮 Omniblox đã khởi động thành công góc nhìn thứ 3 kiểu Roblox!");
};
