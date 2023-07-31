import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {tap, first} from 'rxjs/operators';
import { FormService } from './form.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],

})
export class FormComponent implements OnInit {

  myForm: FormGroup;
  onlyAnyLettersPattern = '^[a-zA-Za-zA-ZäöüÄÖÜß ]*$';
  errorMessage: string;

  // Form state
  loading: boolean = false;
  success: boolean = false

  searchResults: any = [];

  constructor(private fb: FormBuilder, private formService: FormService ){}

  ngOnInit() {
    this.myForm = this.fb.group({
      searchString: ['', [Validators.required, Validators.pattern(this.onlyAnyLettersPattern)]],
    });

    this.myForm.valueChanges.subscribe(console.log)
  }

  get searchString(){
    return this.myForm.get('searchString');
  }

  async submitHandler(){
    this.loading = true;

    const formValue = this.myForm.value;
    //console.log(formValue.searchString)
    try {
      const res = this.formService.getSearchResult(formValue.searchString)
      .subscribe(
        (response) => {
          console.log("response received")
          this.searchResults = response;
          console.log(this.searchResults);
        },
        (error) => {
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        }
      )
      this.success = true;
    }catch(err){
      console.error(err)
    }

    this.loading = false;
  }

}
