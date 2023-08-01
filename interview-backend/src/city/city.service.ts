import { Injectable } from '@nestjs/common';

import { readFileSync } from 'fs';

@Injectable({})
export class CityService {
  searchCity(searchString: string) {
    let resultcities = [];
    const cities = JSON.parse(readFileSync('../cities.json', 'utf-8'));

    if (cities === undefined || cities.length == 0) {
      resultcities = [];
      return resultcities;
    }

    cities.filter((value) => {
      if (value.cityName.toLocaleLowerCase().includes(searchString)) {
        resultcities.push(value);
      }
    });

    resultcities.sort((a, b) => a.cityName.localeCompare(b.cityName));
    return resultcities;
  }
}
