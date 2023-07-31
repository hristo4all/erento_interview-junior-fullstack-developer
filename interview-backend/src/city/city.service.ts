import { Injectable } from '@nestjs/common';

import { readFileSync } from 'fs';

@Injectable({})
export class CityService {
  searchCity(searchString: string) {
    //console.log(searchString);
    let city = [];
    const cities = JSON.parse(readFileSync('../cities.json', 'utf-8'));

    if (cities === undefined || cities.length == 0) {
      city = [{ error: 'Error reading from database. Not Found' }];
      return city;
    }

    // cities.map((value) => {
    //   console.log(`comparing: ${value.cityName} === ${searchString}`)
    //   if (value.cityName === searchString) {
    //     city.push(value);
    //   }
    // });
    const filtered = cities.filter((value) => {
      //console.log(`comparing: ${value.cityName} === ${searchString}`);
      if (value.cityName.toLocaleLowerCase().includes(searchString)) {
        city.push(value);
      }
    });

    if (city === undefined || city.length == 0) {
      city = [{ error: 'No match found' }];
    }
    console.log(city);

    return city;
  }
}
