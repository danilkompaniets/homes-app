import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {HousingLocation} from "../housing-location";
import {HousingService} from "../housing.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    template: `
        <section>
            <form>
                <input type="text" placeholder="filter by city" #filter>
                <button class="primary" type="button" (click)="filterResult(filter.value)">Search</button>
            </form>
        </section>
        <section class="results">
            <app-housing-location *ngFor="let housingLocation of filteredLocationList"
                                  [housingLocation]="housingLocation"/>
        </section>
    `,
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    housingLocationList: HousingLocation[] = []
    housingService: HousingService = inject(HousingService);
    filteredLocationList: HousingLocation[] = []

    constructor() {
        this.housingService.getAllHousingLocations().then(housingLocations => {
            this.housingLocationList = housingLocations;
            this.filteredLocationList = housingLocations;
        })
    }

    filterResult(text: string) {
        console.log(text)
        if (!text) {
            this.filteredLocationList = this.housingLocationList
        } else {
            this.filteredLocationList = this.filteredLocationList.filter(housingLocation => {
                return housingLocation?.city.toLowerCase().includes(text.toLowerCase()) || housingLocation?.name.toLowerCase().includes(text.toLowerCase())
            })
            console.log(this.filteredLocationList)
        }
    }

}
