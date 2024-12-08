import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";
import {HousingLocation} from "../housing-location";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <article>
            <img class="listing-photo" [src]="housingLocation?.photo">
            <section class="listing-description">
                <h2 class="listing-heading">
                    {{ housingLocation?.name }}
                </h2>
                <p class="listing-location">
                    {{ housingLocation?.city }} {{ housingLocation?.state }}
                </p>
            </section>
            <section class="listing-features">
                <h2 class="section-heading">
                    About this housing location
                </h2>
                <ul>
                    <li>
                        Units available: {{ housingLocation?.availableUnits }}
                    </li>
                    <li>
                        Does this location have wifi: {{ housingLocation?.wifi }}
                    </li>
                    <li>
                        Does this location have laundry: {{ housingLocation?.laundry }}
                    </li>
                </ul>
            </section>
            <section class="listing-apply">
                <h2 class="section-heading">
                    Apply now to live here
                </h2>
                <form [formGroup]="applyForm" (submit)="submitApplication()">
                    <label for="first-name">First Name</label>
                    <input id="first-name" type="text" formControlName="firstname">

                    <label for="last-name">First Name</label>
                    <input id="last-name" type="text" formControlName="lastname">

                    <label for="email">First Name</label>
                    <input id="email" type="text" formControlName="email">
                </form>
            </section>
        </article>
    `,
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingLocationId = 0
    housingLocation: HousingLocation | undefined;
    housingService: HousingService = inject(HousingService);

    applyForm = new FormGroup({
        firstname: new FormControl(""),
        lastname: new FormControl(""),
        email: new FormControl("")
    })

    constructor() {
        this.housingLocationId = Number(this.route.snapshot.params['id'])
        this.housingService.getHousingLocationById(this.housingLocationId).then((housingLocation: HousingLocation | undefined) => {
            this.housingLocation = housingLocation;
        })
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstname ?? "",
            this.applyForm.value.lastname ?? "",
            this.applyForm.value.email ?? "",
        )
    }
}
