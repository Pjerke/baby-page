import { Component, inject, OnInit, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-moment';
import { BaseChartDirective } from "ng2-charts";
import { Measurement } from '../../models/measurement.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'baby-home',
  templateUrl: './home.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [BaseChartDirective, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule],
})
export class BabyHomeComponent implements OnInit {
    public tempChartData: ChartConfiguration['data'] = {
      datasets: [],
      labels: []
    };
    public weightChartData: ChartConfiguration['data'] = {
      datasets: [],
      labels: []
    };
    public tempChartOptions: ChartConfiguration['options'] = {
      plugins: {
        title: {
          display: true,
          text: 'Temperature [°C]',
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              'day': 'DD-MM-YYYY'
            }
          }
        },
        y: {
          min: 35,
          max: 40
        }
      },
      maintainAspectRatio: false
    };
    public weightChartOptions: ChartConfiguration['options'] = {
      plugins: {
        title: {
          display: true,
          text: 'Weight [kg]',
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              'day': 'DD-MM-YYYY'
            }
          }
        }
      },
      maintainAspectRatio: false
    };
    public charts = viewChildren(BaseChartDirective);
    public inputTemperature: number | undefined;
    public inputWeight: number | undefined;
    public inputDate: Date | undefined;
    public minDate: Date | undefined;

    private readonly snackBarService = inject(MatSnackBar);
    private readonly apiService = inject(ApiService);

    ngOnInit(): void {
      this.fetchAndRenderchart();
    }

    public onSave(): void {
      const measurement = {
        temperature: this.inputTemperature,
        weight: this.inputWeight,
        date: this.inputDate?.toISOString().slice(0, 10)
      } as Measurement;

      if (measurement.date == undefined || (measurement.temperature == undefined && measurement.weight == undefined)) {
        this.snackBarService.open('Invalid input', undefined, { duration: 3000, verticalPosition: 'top' });
      }
      console.log(this.inputDate)

      this.apiService.addMeasurement(measurement).subscribe({
        next: () => {
          this.snackBarService.open('Success', undefined, { duration: 3000, verticalPosition: 'top' });
          this.inputTemperature = undefined;
          this.inputWeight = undefined;
          this.inputDate = undefined;
          this.fetchAndRenderchart();
        },
        error: () => this.snackBarService.open('Error', undefined, { duration: 3000, verticalPosition: 'top' })
      });
    }

    private fetchAndRenderchart(): void {
      this.apiService.getAllMeasurements().subscribe((measurements) => {
        this.tempChartData.datasets = [{
          data: measurements.map(() => 36.5),
          borderWidth: 0,
          pointRadius: 0,
          fill: false
        }, {
          data: measurements.map(() => 37.5),
          borderWidth: 0,
          pointRadius: 0,
          fill: '-1',
          backgroundColor: 'rgba(76, 175, 80, 0.2)'
        }, {
          data: measurements.map((m) => m.temperature),
          borderColor: 'blue',
          pointBorderColor: 'blue',
          pointBackgroundColor: 'blue',
          cubicInterpolationMode: 'monotone'
        }];
        this.tempChartData.labels = measurements.map((m) => new Date(m.date));
        this.weightChartData.datasets = [{
          data: measurements.map((m) => m.weight),
          borderColor: 'blue',
          pointBorderColor: 'blue',
          pointBackgroundColor: 'blue',
          cubicInterpolationMode: 'monotone'
        }];
        this.weightChartData.labels = measurements.map((m) => new Date(m.date));
        for (const chart of this.charts()) {
          chart.update();
        }
        const lastDate = new Date(measurements[measurements.length - 1]?.date);
        if (lastDate) {
          this.minDate = new Date(lastDate.getTime() + 60 * 60 * 24 * 1000)
        }
      });
    }
}
