import { Component, OnInit } from '@angular/core';
import { LanguageConfigService } from '../../services/language-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _languageService:LanguageConfigService) { }

  ngOnInit() {
  }

}
