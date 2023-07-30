import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],

})
export class FormComponent implements OnInit {

  myForm: FormGroup;
  onlyAnyLettersPattern = '^[a-zA-Z]*$';

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      searchString: ['', [Validators.required, Validators.pattern(this.onlyAnyLettersPattern)]],
    });

    this.myForm.valueChanges.subscribe(console.log)
  }

  get searchString(){
    return this.myForm.get('searchString');
  }

}
