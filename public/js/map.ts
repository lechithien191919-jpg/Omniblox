export interface BlockData {
    x: number;
    y: number;
    z: number;
    color: string;
}

export class MapManager {
    // Tạo sẵn một map mẫu (vài khối block xếp hình bậc thang và tường chắn) để test 3D
    public static getSampleMap(): BlockData[] {
        const blocks: BlockData[] = [];

        // Tạo mặt sàn cơ bản
        for (let x = -5; x <= 5; x++) {
            for (let z = -5; z <= 5; z++) {
                blocks.push({ x, y: 0, z, color: "#55aa55" }); // Cỏ xanh
            }
        }

        // Tạo một bức tường và bậc thang mẫu
        for (let i = 0; i < 5; i++) {
            blocks.push({ x: 2, y: i + 1, z: 2, color: "#aa5533" }); // Cột gỗ
            blocks.push({ x: -3, y: 1, z: -3 + i, color: "#888888" }); // Bậc thang đá
        }

        return blocks;
    }
}
