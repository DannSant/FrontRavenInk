import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { LanguageConfigService } from '../../services/language-config.service';
import { EmailService } from '../../services/email.service';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styles: []
})
export class ContactComponent implements OnInit {

  emailBody:any = {};

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor(
    public _alert: AlertService,  
    public _languageService:LanguageConfigService,
    public _emailService:EmailService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  sendContactMessage(f:NgForm){

    let token = this.captcha.getResponse();
    
    if(token==undefined||token==''){
      let errorMsg=this._languageService.currentLanguage==this._languageService.SPANISH ? "Favor de verificar el captcha (No soy un robot)" : "Please complete the captcha field";
      this._alert.showAlert("Error", errorMsg, "error");
      return;
    }

    if(f.invalid){
      let errorMsg = this._languageService.currentLanguage==this._languageService.SPANISH ? "Faltan campos obligatorios" : "Mandatory fields are missing";
      this._alert.showAlert("Error",errorMsg, "error");
      return;
    }

    this._emailService.sendEmail(this.emailBody).subscribe((resp:any)=>{
      if(resp.ok){
        
        let msg = this._languageService.currentLanguage==this._languageService.SPANISH ? "El mensaje ha sido enviado, gracias por ponerte en contacto con nosotros" : "Your message has been sent. Thank you for contacting us";
        let alertTitle = this._languageService.currentLanguage==this._languageService.SPANISH ? "Exito" : "Success";
        this._alert.showAlert(alertTitle,msg, "success");
        this.router.navigate(["/home"]);
      }else {
        console.log(resp);
        let errorMsg = this._languageService.currentLanguage==this._languageService.SPANISH ? "Ocurrió un error al enviar el mensaje, intenta de nuevo mas tarde" : "Something went wrong, try again later";
        this._alert.showAlert("Error",errorMsg, "error");
      }
    });

  }

}
