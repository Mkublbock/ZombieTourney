import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faq: string[][];
  faq_single: string[][];

  constructor() { }

  ngOnInit() {
    /*
    this.faq = [
      'How to participate?',
      'Do I need to use a Timer?',
      'Am I allowed to pause my game?'
    ]
    [
      `In order to participate you need to register via "register" in the navigation bar.
      Then you can submit a game for your favourite tourney`,
      `For all speed runs, although it is not required, we highly encourage you to have a timer on your gameplay at all times.
       Elapsed Time on PS4 streams counts as a timer.
       Theater mode recordings with elapsed timer on controls menu also counts as a timer. Please ensure your gameplay is not sped up.`,
      'This depends on the tourney itself and is described on the tourney page. Generally speaking: For speedruns no. For high rounds yes'
    ];
    */
  }
}
