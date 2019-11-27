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
  scoreGlobal?: number,
  Github?: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[];
  charts: any[] = [];
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

  }

  initCharts() {
    console.log(this.users)

    this.users = this.users.sort(function (a, b) {
      return a.scoreGlobal - b.scoreGlobal;
    });

    this.users.forEach(user => {
      this.charts.push([
        { data: [user.scoreDev, user.scoreNetwork, user.scoreArchi, user.scoreSocial], label: 'Compétences' }
      ])
    });
  }

  // Radar
  public demoradarChartLabels: string[] = ['Développement', 'Réseau', 'Architecture', 'Social'];

  public demoradarChartData: any = [
    { data: [20, 40, 15, 30, 12], label: 'Company A' }
  ];
  public radarChartType: string = 'radar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
