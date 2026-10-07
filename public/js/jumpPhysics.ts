
export class RobloxJumpPhysics {
    public velocityY: number = 0;
    public isGrounded: boolean = true;
    
    // Các thông số tinh chỉnh cảm giác nhảy y hệt Roblox
    private jumpForce: number = 0.18;   // lực đẩy khi nhảy lên
    private gravity: number = 0.007;    // Trọng lực nhỏ giúp quá trình bay lên & rớt xuống diễn ra từ từ, chậm rãi

    public update(isJumpPressed: boolean, currentY: number, groundY: number): { newY: number, grounded: boolean } {
        // Xử lý khi bấm nút nhảy
        if (isJumpPressed && this.isGrounded) {
            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }

        // Áp dụng trọng lực kéo xuống từ từ
        this.velocityY -= this.gravity;
        let newY = currentY + this.velocityY;

        // Chạm đất
        if (newY <= groundY) {
            newY = groundY;
            this.velocityY = 0;
            this.isGrounded = true;
        }

        return { newY, grounded: this.isGrounded };
    }
}
