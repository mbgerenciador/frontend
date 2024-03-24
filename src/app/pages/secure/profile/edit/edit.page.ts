import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  edit_profile_form: UntypedFormGroup;
  submit_attempt: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastService: ToastService,
    private navController: NavController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {

    // Setup form
    this.edit_profile_form = this.formBuilder.group({
      name_first: ['', Validators.required],
      name_last: ['', Validators.required]
    });

    // DEBUG: Prefill inputs
    this.edit_profile_form.get('name_first').setValue('Fulano');
    this.edit_profile_form.get('name_last').setValue('Silva');
  }

  // Update profile picture
  async updateProfilePicture() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha uma foto ou tire uma nova',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Da sua galeria',
          icon: 'images',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Tire uma foto',
          icon: 'camera',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  // Submit form
  submit() {

    this.submit_attempt = true;

    // If form valid
    if (this.edit_profile_form.valid) {

      // Save form ...

      // Display success message and go back
      this.toastService.presentToast('Sucesso', 'Perfil salvo', 'top', 'success', 2000);
      this.navController.back();

    } else {

      // Display error message
      this.toastService.presentToast('Error', 'Por favor preencha os campos obrigatórios', 'top', 'danger', 2000);
    }
  }

}
