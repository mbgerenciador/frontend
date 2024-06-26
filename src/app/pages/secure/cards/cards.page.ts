import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { AlertController, IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AddPage } from './add/add.page';
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;

  // Swiper config
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: false },
    allowTouchMove: true
  }

  card_details_visible: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastService: ToastService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngAfterContentChecked(): void {

    if (this.swiper) {
      this.swiper.updateSwiper({});
    }

  }

  // Sync
  async sync() {
    // Loading overlay
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: '<p>Syncing card...</p><span>Aguarde por favor.</span>',
      spinner: 'crescent'
    });
    await loading.present();

    // Fake timeout
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  // Add card
  async addCard() {

    // Open filter modal
    const modal = await this.modalController.create({
      component: AddPage,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  // Delete card
  async deleteCard() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Deseja excluir essa conta permanentemente?',
      message: 'Essa ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Excluir Conta',
          cssClass: 'danger',
          handler: async () => {
            this.toastService.presentToast('Success', 'Conta excluida com sucesso', 'top', 'success', 2000);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel'
        }
      ]
    });

    await alert.present();
  }

}
