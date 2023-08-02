import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;
  let httpMock: HttpTestingController;
  const MOCK_SEARCH_STRING  = 'berlin'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be returning a city record', () => {
    service.getSearchResult(MOCK_SEARCH_STRING).subscribe( result => {
      expect(result).toBeTruthy();
    })

    const req = httpMock.expectOne('http://localhost:3000/city/search?q='+MOCK_SEARCH_STRING);
    expect(req.request.method).toBe('GET');

    req.flush({
      "uuid": "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f",
      "cityName": "Berlin",
      "count": 523
    });
  });
});
