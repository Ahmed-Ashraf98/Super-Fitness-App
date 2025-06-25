import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegesterComponent } from "./components/Regester/Regester.component";

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RegesterComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {}
