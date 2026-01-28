import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ManageGifts } from '../gifts/components/manage-gifts/manage-gifts';

@Component({
  selector: 'app-management-wrapper',
  standalone: true,
  imports: [RouterOutlet,ManageGifts],
  templateUrl: './management-wrapper.html',
  styleUrl: './management-wrapper.scss',
})
export class ManagementWrapper {

}
