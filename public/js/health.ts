export class PlayerHealth {
    public maxHp: number = 100;
    public currentHp: number = 100;
    private hpBarElement: HTMLElement | null = null;

    constructor() {
        this.createHpBarUI();
    }

    private createHpBarUI() {
        const uiContainer = document.createElement('div');
        uiContainer.innerHTML = `
            <div id="hp-container" style="
                position: absolute; top: 15px; right: 15px; width: 200px;
                background: rgba(0, 0, 0, 0.6); padding: 8px; border-radius: 8px;
                border: 2px solid rgba(255,255,255,0.3); z-index: 10; font-family: sans-serif;
            ">
                <div style="color: white; font-size: 12px; margin-bottom: 4px; font-weight: bold;">❤️ HP: <span id="hp-text">100</span>/100</div>
                <div style="width: 100%; background: #444; height: 12px; border-radius: 6px; overflow: hidden;">
                    <div id="hp-fill" style="width: 100%; height: 100%; background: #ff3333; transition: width 0.3s;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(uiContainer);
        this.hpBarElement = document.getElementById('hp-fill');
    }

    public takeDamage(amount: number) {
        this.currentHp = Math.max(0, this.currentHp - amount);
        this.updateUI();
        if (this.currentHp === 0) {
            console.log("Player đãmẹo!");
            // Xử lý hồi sinh ở đây nếu muốn
        }
    }

    public heal(amount: number) {
        this.currentHp = Math.min(this.maxHp, this.currentHp + amount);
        this.updateUI();
    }

    private updateUI() {
        const hpText = document.getElementById('hp-text');
        if (this.hpBarElement && hpText) {
            const percent = (this.currentHp / this.maxHp) * 100;
            this.hpBarElement.style.width = `${percent}%`;
            hpText.innerText = `${this.currentHp}`;
        }
    }
}

