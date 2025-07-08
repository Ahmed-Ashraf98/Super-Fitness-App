import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HomeComponent } from "../home/home.component";
import { HorizonbarComponent } from "../horizonbar/horizonbar.component";
import { AboutUsComponent } from "../about-us/about-us.component";
import { WhyUsComponent } from "../why-us/why-us.component";
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-main-page',
  imports: [NavbarComponent, HomeComponent, HorizonbarComponent, AboutUsComponent, WhyUsComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {



}
