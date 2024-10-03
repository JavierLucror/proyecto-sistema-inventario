import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  value?: string;

  ngOnInit(): void {
    this.value = localStorage.getItem('item') || 'Usuario';
  }
}