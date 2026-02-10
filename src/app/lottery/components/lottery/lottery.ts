import { Component, inject, OnInit } from '@angular/core';
import { LotteryService } from '../../services/lottery.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lottery',
  imports:[CommonModule],
  templateUrl: './lottery.html',
  styleUrls: ['./lottery.scss']
})
export class Lottery implements OnInit {
  winners: any[] = [];
  isLoading = false;

  private lotteryService = inject(LotteryService);

  ngOnInit(): void {
    this.loadWinners();
  }

  // שימוש ב-getAllGiftWinners לטעינת הרשימה מהשרת
  loadWinners() {
    this.lotteryService.getAllGiftWinners().subscribe({
      next: (data) => this.winners = data,
      error: (err) => console.error('שגיאה בטעינת הזוכים', err)
    });
  }

  // שימוש ב-runLottery להרצת הגרלה כללית
  onRunLottery() {
    this.isLoading = true;
    this.lotteryService.runLottery().subscribe({
      next: (res) => {
        alert('ההגרלה הסתיימה בהצלחה!');
        this.loadWinners(); // רענון הרשימה לאחר ההגרלה
        this.isLoading = false;
      },
      error: (err) => {
        alert('שגיאה בהרצת ההגרלה: ' + err.error);
        this.isLoading = false;
      }
    });
  }

  // שימוש ב-downloadWinnersZip להורדת הקובץ
  onDownloadZip() {
    this.lotteryService.downloadWinnersZip().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'winners_list.zip';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => alert('שגיאה בהורדת הקובץ')
    });
  }
}