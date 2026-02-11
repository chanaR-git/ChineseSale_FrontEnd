import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotteryService } from '../../services/lottery.service';


@Component({
  selector: 'app-lottery',
  imports: [CommonModule],
  templateUrl: './lottery.html',
  styleUrl: './lottery.scss',
})
export class Lottery implements OnInit {
  lotteryService = inject(LotteryService);
  afterLottery = false;
  beforeLottery = true;
  message = '';
  winners:string[]=[];
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.message = 'טוען זוכים...';
    this.loadWinners();
  }

  loadWinners() {
      this.lotteryService.getAllGiftWinners().subscribe({
        next: (winners) => {
          if (winners.length === 0) {
            this.message = 'טרם הוגרלו זוכים';
            this.afterLottery = false;
            this.winners = [];
          } 
          else 
          {       
            winners.forEach(w => this.winners.push(`${w.giftName} - ${w.winnerName} (${w.winnerEmail})`));
            this.afterLottery = true;
          }   
           this.cdr.detectChanges();
        },
        error: (err) => {
          this.message = 'שגיאה בטעינת זוכים';
          console.error('Error loading winners:', err);
           this.cdr.detectChanges();
        }
      });
  } 
  // הרצת הגרלה לכל המתנות
  runAllLotteries() {
    if (confirm('האם אתה בטוח שברצונך להגריל את כל המתנות שטרם הוגרלו?')) {
      this.lotteryService.runLottery().subscribe({
        next: (res) => {
          this.message = 'ההגרלה הסתיימה בהצלחה!';
          this.loadWinners();
        },
        error: (err) => {
          console.error('Server Error:', err.error);
          this.message = 'שגיאה בהרצת ההגרלה';
        }
      });
    }
  }


  // הורדת דוח זוכים ב-ZIP
  downloadWinners() {
    this.lotteryService.downloadWinnersZip().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'winners_report.zip';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => alert('לא נמצאו נתוני זוכים להורדה')
    });
  }


  // איפוס מכירה
  resetSale() {
    if (confirm('אזהרה! פעולה זו תמחק את כל הזוכים ותאפס את המכירה. האם להמשיך?')) {
      this.lotteryService.startNewSale().subscribe({
        next: (res) => {
          console.log('המכירה אופסה בהצלחה');
          this.loadWinners();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
