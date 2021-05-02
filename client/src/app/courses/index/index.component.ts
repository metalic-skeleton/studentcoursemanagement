import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { CourseService } from '../course.service';
import { Course } from '../course';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  courses: Course[] = [];
  item: Course;
  errorMessage;
  isLoggedIn = false;
  loading: boolean = false;
  
  constructor(public courseService: CourseService, private modalService: NgbModal, private router: Router) { }
  
  ngOnInit(): void {
    this.isLoggedIn = !!window.sessionStorage.getItem('auth-token');
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }

    this.courseService.getAll().subscribe((data: Course[])=>{
      this.courses = data;
      // console.log(this.courses);
    }, err => {
      this.errorMessage = err;
    })  
  }

  openModel(content, item) {
    this.item = item;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }
  
}
