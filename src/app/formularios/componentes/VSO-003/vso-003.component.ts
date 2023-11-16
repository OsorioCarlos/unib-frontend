import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vso-003',
  templateUrl: './vso-003.component.html',
  styleUrls: ['./vso-003.component.css']
})
export class VSO003Component {

  formularioVSO003: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioVSO003 = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

}
