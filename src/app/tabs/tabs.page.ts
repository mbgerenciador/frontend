import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private actionSheetController: ActionSheetController
  ) {}

  // Select action
  async selectAction() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha uma ação',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Adicione uma conta',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Adicione uma transação',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          }
        },
        /*
        {
          text: 'Set budget',
          icon: 'calculator',
          handler: () => {
            // Put in logic ...
          }
        }
        ,*/ {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }
}
