import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./components/Regester/Regester.component";

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, RegisterComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {}
