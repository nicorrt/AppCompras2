import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/servicios/autentication.service'; 
import { Router, ActivatedRoute } from '@angular/router';
//import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {


  constructor(public authS:AutenticationService, private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
