import { Component } from '@angular/core';
import { Student } from './model/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = 'school';
  x1 = 'Hello world ,this is a sample template data';

  sample ="this is dummy"
  

  student:Student 
  
  constructor(){
    this.student = new Student()
    this.student.name=""
    this.student.age=0
    this.student.mark=0

  }

  save(){
    console.log( this.student.name)
    console.log( "Saved")
  }

}
