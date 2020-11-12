import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { NotifyService } from 'src/app/service/notification/notify.service';
import { UserService } from 'src/app/service/users/users.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @Output() addUserList = new EventEmitter<object>()

  constructor(private notify: NotifyService, private userService: UserService) { }

  ngOnInit() {
  }

  addUser(name: string): void{
    this.userService.addUser(name).subscribe({
      next: data => {
        this.addUserList.emit({text: name})
        console.log(data)
        this.notify.showSuccess(data, 'User')
      },
      error: err => {
        this.notify.showError("User not added. Please retry", "Error")
      }

    })
  }

}
