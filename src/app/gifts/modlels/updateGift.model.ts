// ============================
// Model לעדכון (PUT / PATCH)
// ============================
export interface UpdateGiftModel {
  name?: string;
  description?: string;
  categoryId?: number;
  donorId?: number;
  price?: number;
  imagePath?: string;
}