import * as THREE from 'three';
import { GameRenderer } from './renderer';
import { MapManager } from './map';
import { RobloxPlayer } from './player';
import { GameControls } from './controls';
import { GameUI } from './ui';
import { PlayerHealth } from './health';
import { RobloxJumpPhysics } from './jumpPhysics';

class GameApp {
    private gameRenderer!: GameRenderer;
    private player!: RobloxPlayer;
    private controls!: GameControls;
    private health!: PlayerHealth;
    private jumpPhysics!: RobloxJumpPhysics;
    private blockMeshes: THREE.Mesh[] = [];
    private isGameStarted: boolean = false;

    constructor() {
        // Khởi tạo menu sảnh chờ trước
        new GameUI(() => {
            this.startGame();
        });
    }

    private startGame() {
        this.isGameStarted = true;
        this.gameRenderer = new GameRenderer();
        this.player = new RobloxPlayer();
        this.controls = new GameControls();
        this.health = new PlayerHealth();
        this.jumpPhysics = new RobloxJumpPhysics();

        this.gameRenderer.scene.add(this.player.mesh);
        this.loadAndRenderMap();

        // Bắt đầu vòng lặp game loop
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

    private animate() {
        if (!this.isGameStarted) return;
        requestAnimationFrame(this.animate);

        // 1. Cập nhật di chuyển ngang
        const speed = 0.08;
        this.player.mesh.position.x += this.controls.moveDirection.x * speed;
        this.player.mesh.position.z += this.controls.moveDirection.z * speed;

        // 2. Cập nhật vật lý nhảy chậm rãi kiểu Roblox
        const jumpResult = this.jumpPhysics.update(
            this.controls.isJumping, 
            this.player.mesh.position.y, 
            1 // Mặt đất mặc định ở y = 1
        );
        this.player.mesh.position.y = jumpResult.newY;
        this.controls.isJumping = false; // Reset trạng thái nhảy sau khi xử lý

        // 3. Cập nhật góc nhìn camera thứ 3 bám theo nhân vật
        this.controls.updateCamera(this.gameRenderer.camera, this.player.mesh);

        // 4. Render khung hình 3D
        this.gameRenderer.render();
    }
}

// Khởi chạy ứng dụng
window.onload = () => {
    new GameApp();
};
