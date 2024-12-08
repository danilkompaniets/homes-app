import {Injectable} from '@angular/core';
import {HousingLocation} from "./housing-location";

@Injectable({
    providedIn: 'root'
})
export class HousingService {
    protected housingLocationList: HousingLocation[] = []
    url = "http://localhost:3000/locations"

    constructor() {
    }

    async getAllHousingLocations(): Promise<HousingLocation[]> {
        const data = await fetch(this.url);
        return await data.json() ?? [];
    }

    getHousingLocationById = async (id: Number): Promise<HousingLocation | undefined> => {
        const data = await fetch(`${this.url}/${id}`);
        return await data.json() ?? {};
    };

    submitApplication(firstName: string, lastname: string, email: string) {
        console.log(firstName, lastname, email);
    }
}
