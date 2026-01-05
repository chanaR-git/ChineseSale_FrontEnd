// ============================
// Model ליצירה (POST)
// ============================
export interface CreateGiftModel {
  name: string;
  description: string;
  categoryId: number;
  donorId: number;
  price: number;
  imagePath: string;
}


