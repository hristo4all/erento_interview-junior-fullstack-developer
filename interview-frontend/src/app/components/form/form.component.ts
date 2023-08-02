import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';

import { FormService } from './form.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntlService } from './paginator-intl.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntlService}]

})
export class FormComponent implements OnInit {

  myForm: FormGroup;
  onlyAnyLettersPattern = '^[a-zA-Za-zA-ZäöüÄÖÜß ]*$';
  errorMessage: string;

  // Form state
  loading: boolean = false;
  success: boolean = false;

  noSearchResults: boolean = false;

  searchResults: any = [];

  default_page_size = 5;

  pageSlice: any[] = [];

  constructor(private fb: FormBuilder, private formService: FormService ){}

  ngOnInit() {
    this.myForm = this.fb.group({
      searchString: ['', [Validators.required, Validators.pattern(this.onlyAnyLettersPattern)]],
    });

  }

  get searchString(){
    return this.myForm.get('searchString');
  }

  async submitHandler(){
    this.loading = true;

    const formValue = this.myForm.value;
    try {
      const res = this.formService.getSearchResult(formValue.searchString)
      .subscribe(
        (response) => {

          this.searchResults = response;

          if (this.searchResults.length <= 0) {
            this.noSearchResults = true;
          }
          else{
            this.noSearchResults = false;
          }
          this.pageSlice = this.searchResults.slice(0,this.default_page_size);
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

handlePageEvent(pageEvent: PageEvent) {

  const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
  let endIndex = startIndex + pageEvent.pageSize;

  if (endIndex > this.searchResults.length){
    endIndex = this.searchResults.length;
  }
  this.pageSlice = this.searchResults.slice(startIndex,endIndex);

}

}
