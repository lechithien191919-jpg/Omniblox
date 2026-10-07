import { Pool } from 'pg';

// Khởi tạo kết nối trực tiếp với Neon PostgreSQL của ôg
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_2J9frpQxFnuy@ep-late-resonance-b5zvjki2-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  // Bật ssl nếu chạy trên môi trường cloud như Render
  ssl: {
    rejectUnauthorized: false
  }
});

// Hàm test kết nối thử xem thông tuyến chưa
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Kết nối Database thất bại rồi ôg ơi:', err.stack);
  }
  console.log('🚀 Kết nối Neon PostgreSQL thành công rực rỡ luôn ôg ơi!');
  release();
});

export default pool;
