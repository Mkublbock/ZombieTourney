import { Component, OnInit } from '@angular/core';
import { DateService } from '../../providers/date-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dateService: DateService) { }

  ngOnInit() {
  }

}
