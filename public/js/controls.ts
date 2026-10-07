import * as THREE from 'three';

export class GameControls {
    public moveDirection = { x: 0, z: 0 };
    public isJumping = false;
    public cameraDistance = 10; // Khoảng cách camera góc nhìn thứ 3
    public cameraAngleX = 0;
    public cameraAngleY = 0.5;

    private isDragging = false;
    private previousMousePosition = { x: 0, y: 0 };

    constructor() {
        this.setupUIEvents();
        this.setupTouchAndMouseEvents();
    }

    private setupUIEvents() {
        // Gắn sự kiện cho các nút bấm ảo trên màn hình
        const btnJump = document.getElementById('btn-jump');
        if (btnJump) {
            btnJump.addEventListener('touchstart', () => { this.isJumping = true; });
            btnJump.addEventListener('mousedown', () => { this.isJumping = true; });
        }

        // Joystick hoặc nút di chuyển giả lập
        const btnUp = document.getElementById('btn-up');
        const btnDown = document.getElementById('btn-down');
        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');

        if (btnUp) {
            btnUp.addEventListener('touchstart', () => { this.moveDirection.z = -1; });
            btnUp.addEventListener('touchend', () => { this.moveDirection.z = 0; });
            btnUp.addEventListener('mousedown', () => { this.moveDirection.z = -1; });
            btnUp.addEventListener('mouseup', () => { this.moveDirection.z = 0; });
        }
        if (btnDown) {
            btnDown.addEventListener('touchstart', () => { this.moveDirection.z = 1; });
            btnDown.addEventListener('touchend', () => { this.moveDirection.z = 0; });
            btnDown.addEventListener('mousedown', () => { this.moveDirection.z = 1; });
            btnDown.addEventListener('mouseup', () => { this.moveDirection.z = 0; });
        }
        if (btnLeft) {
            btnLeft.addEventListener('touchstart', () => { this.moveDirection.x = -1; });
            btnLeft.addEventListener('touchend', () => { this.moveDirection.x = 0; });
            btnLeft.addEventListener('mousedown', () => { this.moveDirection.x = -1; });
            btnLeft.addEventListener('mouseup', () => { this.moveDirection.x = 0; });
        }
        if (btnRight) {
            btnRight.addEventListener('touchstart', () => { this.moveDirection.x = 1; });
            btnRight.addEventListener('touchend', () => { this.moveDirection.x = 0; });
            btnRight.addEventListener('mousedown', () => { this.moveDirection.x = 1; });
            btnRight.addEventListener('mouseup', () => { this.moveDirection.x = 0; });
        }
    }

    private setupTouchAndMouseEvents() {
        // Vuốt tay xoay góc nhìn & Lăn chuột phóng to/thu nhỏ góc nhìn thứ 3 kiểu Roblox
        window.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;

            this.cameraAngleX -= deltaX * 0.005;
            this.cameraAngleY = Math.max(0.1, Math.min(1.5, this.cameraAngleY + deltaY * 0.005));

            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => { this.isDragging = false; });

        // Hỗ trợ cảm ứng vuốt trên màn hình điện thoại
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (!this.isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
            const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

            this.cameraAngleX -= deltaX * 0.005;
            this.cameraAngleY = Math.max(0.1, Math.min(1.5, this.cameraAngleY + deltaY * 0.005));

            this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });

        window.addEventListener('touchend', () => { this.isDragging = false; });

        // Lăn chuột để kéo camera ra xa/lại gần nhân vật (Zoom in/out góc nhìn thứ 3)
        window.addEventListener('wheel', (e) => {
            this.cameraDistance = Math.max(3, Math.min(25, this.cameraDistance + e.deltaY * 0.01));
        });
    }

    // Cập nhật vị trí camera bám theo nhân vật (Góc nhìn thứ 3 Roblox)
    public updateCamera(camera: THREE.PerspectiveCamera, playerMesh: THREE.Group) {
        const targetX = playerMesh.position.x + Math.sin(this.cameraAngleX) * this.cameraDistance * Math.cos(this.cameraAngleY);
        const targetY = playerMesh.position.y + Math.sin(this.cameraAngleY) * this.cameraDistance;
        const targetZ = playerMesh.position.z + Math.cos(this.cameraAngleX) * this.cameraDistance * Math.cos(this.cameraAngleY);

        camera.position.set(targetX, targetY, targetZ);
        camera.lookAt(playerMesh.position.x, playerMesh.position.y + 1, playerMesh.position.z);
    }
        }
