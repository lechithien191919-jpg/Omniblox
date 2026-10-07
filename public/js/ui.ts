export class GameUI {
    private menuElement: HTMLElement;

    constructor(onPlayClick: () => void) {
        // Tạo màn hình menu sảnh chờ phong cách Roblox
        this.menuElement = document.createElement('div');
        this.menuElement.id = 'roblox-menu';
        this.menuElement.innerHTML = `
            <div style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, #1e1e2f, #2a2a40);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: white; z-index: 999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            ">
                <h1 style="font-size: 4rem; margin-bottom: 10px; color: #ff5555; text-shadow: 2px 2px 10px rgba(0,0,0,0.5);">🧱 OMNIBLOX</h1>
                <p style="font-size: 1.2rem; margin-bottom: 30px; color: #aaaaaa;">Thế giới 3D Vạn Năng - Xây dựng & Khám phá</p>
                <button id="play-btn" style="
                    padding: 15px 40px; font-size: 1.5rem; font-weight: bold;
                    background-color: #00b06f; color: white; border: none; border-radius: 12px;
                    cursor: pointer; box-shadow: 0 5px 15px rgba(0, 176, 111, 0.4);
                    transition: transform 0.2s, background-color 0.2s;
                ">▶ CHƠI NGAY</button>
            </div>
        `;
        document.body.appendChild(this.menuElement);

        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.hideMenu();
                onPlayClick(); // Gọi callback để bắt đầu game
            });
        }
    }

    public hideMenu() {
        if (this.menuElement) {
            this.menuElement.style.opacity = '0';
            this.menuElement.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.menuElement.remove();
            }, 500);
        }
    }
}
