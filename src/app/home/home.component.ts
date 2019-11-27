import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface User {
  iduser?: number,
  firstname?: string,
  lastname?: string,
  login?: string,
  email?: string,
  pseudo?: string,
  location?: string,
  birthdate?: Date,
  scoreDev?: number,
  scoreNetwork?: number,
  scoreArchi?: number,
  scoreSocial?: number,
  scoreKnowledge?: number,
  scoreGlobal?: number,
  Github?: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  linesCount = 2;
  page = 0;
  columnsCount = 2;
  indexLines = Array(this.linesCount).fill(0).map((x, i) => i);
  indexColumns = Array(this.columnsCount).fill(0).map((x, i) => i);

  options = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100
      }
    }
  };
  quizz: any;
  nextPage() {
    this.page++;
    this.indexLines.map((x, i) => x + this.linesCount);
    this.indexColumns.map((x, i) => x + this.columnsCount);
  }
  previousPage() {
    this.page--;
    this.indexLines.map((x, i) => x + this.linesCount);
    this.indexColumns.map((x, i) => x - this.columnsCount);
  }

  details(index) {
    this.users[index]["details"] = !this.users[index]["details"];
  }
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http
      .get<any[]>('http://localhost:3000/api-quizz/user')
      .subscribe(
        (response) => {
          this.users = response["response"];
          this.initCharts();
        },
        (error: HttpErrorResponse) => {
          console.log('Erreur ! : ' + error.message);
        }
      );

    this.http
      .get<any[]>('http://localhost:3000/api-quizz/quizz')
      .subscribe(
        (response) => {
          this.quizz = response["response"];
          this.initCharts();
        },
        (error: HttpErrorResponse) => {
          console.log('Erreur ! : ' + error.message);
        }
      );

  }

  initCharts() {
    console.log(this.users)

    this.users = this.users.sort(function (a, b) {
      return b.scoreGlobal - a.scoreGlobal;
    });

    this.users.forEach(user => {
      user["details"] = false;
      user["chart"] = [
        { data: [user.scoreDev, user.scoreNetwork, user.scoreArchi, user.scoreSocial, user.scoreKnowledge], label: 'Compétences' }
      ];
    });
  }

  // Radar
  public demoradarChartLabels: string[] = ['Développement', 'Réseau', 'Architecture', 'Social', 'Connaissance'];

  public radarChartType: string = 'radar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
