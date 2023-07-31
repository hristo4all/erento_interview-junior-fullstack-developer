/* eslint-disable prettier/prettier */
import { Controller, Get, Query} from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private cityService: CityService) {}

    @Get('search')
    searchCity(@Query() q: string){ 

        return this.cityService.searchCity(q['q'])
    }
}