import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFaculty, IStudent, IUser, Permission, UserType } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  pageTitle = "Edit Profile";
  titles = ['Dr.', 'Professor', 'Assistant Professor', 'Adjunct', 'Teaching Assistant', 'Secretary', 'Staff'];
  editProfileData:any = {
    title: "",
  };

  
  // @Output() 
  user!: IUser;
  studentInfo?: IStudent;
  facultyInfo?: IFaculty;
  userSub?: Subscription; // subscription for user data
  userInfoSub?: Subscription;
  updateUserSub?: Subscription;
  updateUserInfoSub?: Subscription;

  ngOnInit(): void {
    this.userSub = this.userService.getUser(this.authService.getNetID()).subscribe(
      data => {
        this.user = data;
        if (this.isStudent()) {
          this.getStudentInfo();
        } else if (this.isFaculty()) {
          this.getFacultyInfo();
        }
        this.editProfileData.bio = this.user?.Bio;
        this.editProfileData.preferredName = this.user?.PName;
        this.editProfileData.pronouns = this.user?.Pronouns;
        
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.userInfoSub?.unsubscribe();
    this.updateUserSub?.unsubscribe();
    this.updateUserInfoSub?.unsubscribe();
  }

  getStudentInfo() {
    this.userInfoSub = this.userService.getStudent(this.user.Id).subscribe(
      data => {
        this.studentInfo = data;
        this.editProfileData.major = this.studentInfo?.Major;
        this.editProfileData.minor = this.studentInfo?.Minor,
        this.editProfileData.track = this.studentInfo?.Track,
        this.editProfileData.gradYear = this.studentInfo?.GradYear;
      },
      err => console.log(err)
    );
  }

  getFacultyInfo() {
    this.userInfoSub = this.userService.getFaculty(this.user.Id).subscribe(
      data => {
        this.facultyInfo = data;
        this.editProfileData.title = this.facultyInfo?.Title;
        this.editProfileData.department = this.facultyInfo?.Department;
      },
      err => console.log(err)
    );
  }

  isStudent(): boolean {
    return this.user?.UserType === UserType.Student;
  }

  isFaculty(): boolean {
    return this.user?.UserType === UserType.Faculty;
  }
  
  isModerator(): boolean {
    return this.user?.Permission === Permission.Moderator;
  }

  getEditUserData(): IUser {
    return {
      Id: this.user?.Id, // netID
      FirstName: this.user?.FirstName,
      LastName: this.user?.LastName,
      Email: this.user?.Email,
      UserType: this.user?.UserType,
      Permission: this.user?.Permission,
      Bio: this.editProfileData.bio,
      PName: this.editProfileData.preferredName,
      Pronouns: this.editProfileData.pronouns
    }
  }

  getEditStudentData(): IStudent {
    return {
      UserId: this.user?.Id, // netID
      Major: this.editProfileData?.major,
      Minor: this.editProfileData?.minor,
      Track: this.editProfileData?.track,
      GradYear: this.editProfileData?.gradYear
    }
  }

  getEditFacultyData(): IFaculty {
    return {
      UserId: this.user?.Id, // netID
      Title: this.editProfileData?.title,
      Department: this.editProfileData?.department
    }
  }

  onSubmit() {
    let user: IUser = this.getEditUserData();
    this.updateUserSub = this.userService.updateUser(user).subscribe(
      data => {
        if (this.isStudent()) {
          let student: IStudent = this.getEditStudentData();
          this.updateUserInfoSub = this.userService.updateStudent(student).subscribe(
            data => {
              this.router.navigate(['profile']);
            },
            err => console.log(err)
          );
        } else if (this.isFaculty()) {
          let faculty: IFaculty = this.getEditFacultyData();
          console.log(faculty);
          this.updateUserInfoSub = this.userService.updateFaculty(faculty).subscribe(
            data => {
              this.router.navigate(['profile']);
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
    
  }
}
