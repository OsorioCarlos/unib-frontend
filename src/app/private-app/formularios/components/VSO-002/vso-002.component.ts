import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vso-002',
  templateUrl: './vso-002.component.html',
  styleUrls: ['./vso-002.component.css']
})
export class VSO002Component {
  constructor(private route: ActivatedRoute) {
    // console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });
  }
}
