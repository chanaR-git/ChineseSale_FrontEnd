import { ReadUserModel } from '../../auth/models/ReadUser.model';
import { ReadGiftModel } from '../../gifts/models/readGift.model';

export interface ReadBasketModel {
  id: number;
  amount: number;
  userId: number;
  user: ReadUserModel;
  giftId: number;
  gift: ReadGiftModel;
}
