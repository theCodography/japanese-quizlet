import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ THIẾU CẤU HÌNH SUPABASE_URL hoặc SUPABASE_ANON_KEY trong file .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Hàm hỗ trợ upload file (Audio, Hình ảnh) lên Supabase Storage
 * @param bucketName Tên bucket (VD: 'flashcards', 'audio', 'images')
 * @param filePath Đường dẫn muốn lưu trên bucket (VD: 'vocab/chao_hoi.mp3')
 * @param fileBuffer Buffer của file
 * @param mimeType Kiểu định dạng file (VD: 'audio/mpeg', 'image/png')
 */
export async function uploadFileToSupabase(
  bucketName: string,
  filePath: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) {
    throw new Error(`Upload lỗi: ${error.message}`);
  }

  // Lấy Public URL trả về để có thể lưu link vào Database (Ví dụ bảng Vocabulary hoặc Card)
  const { data: publicData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicData.publicUrl;
}
