import { Component, Input } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { User, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavModule,
    MatNavList,
    RouterLink,
    MatIcon,
    LanguageSwitcherComponent,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() menu: Array<any> = [];

  user!: User;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }


}
