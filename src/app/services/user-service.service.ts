import { Injectable } from '@angular/core';
import { College } from '../model/college';
import { Student } from '../model/student';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {



  colleges:College[] = [] 

  constructor(private httpClient:HttpClient) {
   }

  //  getColleges(){
  //   var college1 = new College("KU","Kerala")
  //   var college2 = new College("CU","Delhi")
  //   this.colleges.push(college1)
  //   this.colleges.push(college2)
  //   return this.colleges
  //  }
   // 127.0.0.1 or localhost

  baseUrl = "http://localhost:3001"
  //baseUrl = "http://www.nestjs.com/api/"

   // sync  <--->  async (ajax)
   // POST --update
   saveDataToServer(student:Student):Observable<Object>{
    return this.httpClient.post(this.baseUrl+"/create-stu",student)
   }

   //GET 
   getDatafromServer():Observable<Object>{
    // backend save ---> display
    return this.httpClient.get(this.baseUrl+"/get-stu")
   }

    // DELETE 
    deleteDataToServer(item:Student):Observable<Object>{
      console.log("deleting started for item " +item.id)
      return this.httpClient.delete(this.baseUrl+ "/remove-stu/"+item.id)
     }

     //UPDATE
     updateDataFromServer(item:Student):Observable<Object>{
      return this.httpClient.put(this.baseUrl+ "/update/"+item.id,item)
     }


}


// ng generate service services/task
// inject in the requiored components 
// eg: constructor(userService:UserServiceService) {

// 1) create a task model having below properties

// {
//   "id":1,
//   "name":"study nestjs",
//   "description":"chapter 1 and details",
//   "date":null,
//   "completedStatus":false
// }
    
// 2) create , update , delete ,view , viewAll Tasks
// 3) create a service name TaskService get 2 default task in task componet --- display in task component html 
       // 1. check your daily activity 
       // 2. mark your checkin time 


       