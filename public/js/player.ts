import * as THREE from 'three';

export class RobloxPlayer {
    public mesh: THREE.Group;

    constructor() {
        this.mesh = new THREE.Group();

        // Chất liệu nhân vật (màu sắc áo quần, đầu vuông vức)
        const skinMat = new THREE.MeshLambertMaterial({ color: 0xffccaa }); // Da
        const shirtMat = new THREE.MeshLambertMaterial({ color: 0x0055ff }); // Áo xanh dương
        const pantsMat = new THREE.MeshLambertMaterial({ color: 0x333333 }); // Quần tối màu

        // 1. Đầu (Head) - Hình vuông đặc trưng Roblox
        const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const head = new THREE.Mesh(headGeo, skinMat);
        head.position.y = 2.4;
        this.mesh.add(head);

        // 2. Thân (Torso)
        const torsoGeo = new THREE.BoxGeometry(1, 1.2, 0.6);
        const torso = new THREE.Mesh(torsoGeo, shirtMat);
        torso.position.y = 1.4;
        this.mesh.add(torso);

        // 3. Tay trái & phải
        const armGeo = new THREE.BoxGeometry(0.4, 1.2, 0.4);
        const leftArm = new THREE.Mesh(armGeo, skinMat);
        leftArm.position.set(-0.7, 1.4, 0);
        const rightArm = new THREE.Mesh(armGeo, skinMat);
        rightArm.position.set(0.7, 1.4, 0);
        this.mesh.add(leftArm);
        this.mesh.add(rightArm);

        // 4. Chân trái & phải
        const legGeo = new THREE.BoxGeometry(0.45, 1.2, 0.45);
        const leftLeg = new THREE.Mesh(legGeo, pantsMat);
        leftLeg.position.set(-0.25, 0.6, 0);
        const rightLeg = new THREE.Mesh(legGeo, pantsMat);
        rightLeg.position.set(0.25, 0.6, 0);
        this.mesh.add(leftLeg);
        this.mesh.add(rightLeg);

        // Đặt vị trí ban đầu của player trên mặt đất
        this.mesh.position.set(0, 1, 0);
    }
}
