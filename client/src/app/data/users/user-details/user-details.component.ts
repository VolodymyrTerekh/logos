import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../core/services/login.service";
import {UsersService} from "../../../core/services/users.service";
import {NotifyService} from "../../../shared/notify.service";
import {IUser} from "../../../core/services/user";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Output() userDetailsEdit = new EventEmitter<object>();

  userDetailsForm: FormGroup;
  roleDetailsForm: FormGroup;

  currentUser: IUser;
  currentDetailsUser: IUser;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private loginService: LoginService,
              private usersService: UsersService, private notifyService: NotifyService) { }

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.roleDetailsForm = this.formBuilder.group({
      roles: ['', [Validators.required]],
      entitlements: this.formBuilder.array([]),
    });
    this.activatedRoute.params.subscribe( data => {
      this.usersService.getUserById(data['id']).subscribe( (user: IUser) => {
          this.currentDetailsUser = user['data'][0];
          console.log(this.currentDetailsUser.roles);
          this.userDetailsForm.get('name').setValue(this.currentDetailsUser.name);
          this.userDetailsForm.get('email').setValue(this.currentDetailsUser.email);
          this.userDetailsForm.get('password').setValue(this.currentDetailsUser.password);
          this.roleDetailsForm.get('roles').setValue(this.currentDetailsUser.roles);
          this.roleDetailsForm.setControl('entitlements', this.formBuilder.array(this.currentDetailsUser.entitlements || []));
      });
    });
  }

  editUser() {
    this.usersService.editUser(this.userDetailsForm.value).subscribe({
      next: data => {
        this.userDetailsEdit.emit({text: this.userDetailsForm.value})
        this.notifyService.showSuccess(data, 'User');
      },
      error: err => {
        this.notifyService.showError('User not edited', 'Error');
      }
    });
  }

}
