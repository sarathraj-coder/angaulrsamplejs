import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { UserServiceService } from 'src/app/services/user-service.service';
import { error } from 'protractor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  hello="welcome to angularjs"

  student:Student
  students:Student[] = [] 
  colleges = [] 
  stuentForm
  errormessage

  constructor(private userService:UserServiceService,
    private fb:FormBuilder) {
      this.student =new Student()
      this.buildForm()
     // this.colleges =  userService.getColleges()
   }

   buildForm(){
    this.stuentForm = this.fb.group({
      id:new FormControl(),
      name:[null,[Validators.required]],
      age:[null,[Validators.required,Validators.max(50)]],
      mark:[null,[Validators.required,Validators.min(25),Validators.max(50)]]
    })


   }

  ngOnInit(): void {
    this.loadStudents()
  }

  loadStudents(){
    this.userService.getDatafromServer().subscribe(
      data=>{ 
        var response = <Student[]> data
        this.bulkarrayAdd(response) },
      error=>{  this.error(error) }
    )
  }

  bulkarrayAdd(stus:Student[]){
    this.students= stus
  }
 

  save(){


    console.log(this.stuentForm.get('age'))
    console.log(this.stuentForm.get('age').value)
    console.log(this.stuentForm)
    if(this.stuentForm.valid){
    //console.log("Saved")
   var x = this.student
   var found =  this.students.find(item => item.id==x.id)
   if(!found){
    //this.students.push(x)
   // this.userService.
   this.userService.saveDataToServer(x).subscribe(
     data=> { 
       var response = <Student>data
       this.arrayAdd(response) 
      },
     error=> {
      this.error(error)
     }
   )
   }else{
   this.update(this.student)
   }
   this.student =new Student()
  }else{
    this.errormessage="not a valid item"
    //this.stuentForm.valid =false
    this.stuentForm.patchValue({name: 'Sarath'}); 



  }
  }

  arrayAdd(stu:Student){
    this.students.push(stu)
  }

  error(error){
    console.log(error)
    console.log("Error"+ error)
  }

  delete(i){
    console.log(i)
    //this.students =  this.students.filter(item => item.id!=i.id)
    this.userService.deleteDataToServer(i).subscribe(
      data=>{
        console.log(data)
        this.loadStudents()
      },
      error=> {
        this.error(error)
       }
    )
  }

view(i){
    this.student = i
  }

update(i){
  console.log(i)
  //this.student = i
  this.userService.updateDataFromServer(i).subscribe(
    data => { 
      this.loadStudents()
    } ,
    error=> {
      this.error(error)
     }
  )

}

  // 1. Print 3 students details (name ,age adress)

  // print 1 to 10 

  // print hello world 100 times 

  // print a Person Deails (name,age) 



  //1)  create a componet named school
  //2)  create a form to save name and age of student 
  //3)  display in the UI 


}
