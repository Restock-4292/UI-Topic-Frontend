import { Component, inject } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionsCardsComponent } from '../../components/subscriptions-cards/subscriptions-cards.component';
import { Subscription } from '../../model/subscription.entity';
import { TranslatePipe } from '@ngx-translate/core';
import {Profile} from '../../../profiles/model/profile.entity';
import {ProfileService} from '../../../profiles/services/profile.service';
import {SessionService} from '../../../../shared/services/session.service';

@Component({
  selector: 'app-subscription-overview',
  imports: [
    SubscriptionsCardsComponent,
    TranslatePipe
  ],
  templateUrl: './subscription-overview.component.html',
  styleUrl: './subscription-overview.component.css'
})
export class SubscriptionOverviewComponent {

  subscriptions: Array<Subscription> = [];

  profile: Profile | null = null;

  //fake api
  private subscriptionApi: SubscriptionService = inject(SubscriptionService);
  private profileService: ProfileService = inject(ProfileService);
  private sessionService: SessionService = inject(SessionService);


  ngOnInit(): void {

    const profileId = this.sessionService.getProfileId();
    if (!profileId){
      console.log("ProfileId is not in session.");
      return;
    }
    // // Continuar con lógica normal si todo está bien
    // this.subscriptionApi.getAll().subscribe(subs => this.subscriptions = subs);
    //aca se valida porque no hay backend aun, esto deberia estar en backend

    this.profileService.getProfileById(profileId).then(profile =>{
      this.profile = profile;
      console.log("profile: ", profile);

      this.subscriptionApi.getAll().subscribe(subs => {
        console.log("subs: ", subs);
        this.subscriptions = subs.filter(
          s => s.rol_id === String(this.profile?.user?.role_id)
        );
        console.log("subscriptions:", this.subscriptions);
      });

    }).catch(error =>{
      console.log("Error al obtener el perfil: ", error);
    })


  }

}
