import * as THREE from 'three';

export class Physics {
    // Kiểm tra xem vị trí mới của player có bị đụng vào khối block nào không
    public static checkCollision(playerPosition: THREE.Vector3, obstacles: THREE.Mesh[]): boolean {
        const playerBox = new THREE.Box3().setFromCenterAndSize(
            new THREE.Vector3(playerPosition.x, playerPosition.y + 1, playerPosition.z),
            new THREE.Vector3(0.8, 2.0, 0.8) // Kích thước hitbox nhân vật
        );

        for (const block of obstacles) {
            const blockBox = new THREE.Box3().setFromObject(block);
            if (playerBox.intersectsBox(blockBox)) {
                return true; // Có va chạm
            }
        }
        return false;
    }
}
