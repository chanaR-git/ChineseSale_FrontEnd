// ============================
// Model לקריאה (GET)
// ============================
export interface ReadGiftModel {
  name: string;
  description: string;
  categoryName: string;
  categoryId: number;
  donorName: string;
  donorId: number;
  price: number;
  imagePath: string;
}

