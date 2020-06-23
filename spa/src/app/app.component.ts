import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public credentials: any;
  public response: any;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient) { }

  async callApiRecaptcha() {
    const token = await this.recaptchaV3Service.execute('callApi').toPromise()

    this.response = null;
    try {
      const url = `https://ta2z36rme6.execute-api.eu-west-1.amazonaws.com/sandbox/hello`;
      const headers = {
        'x-recaptcha-token': token
      }

      this.response = await this.http.get(url, { headers }).toPromise()
    } catch (error) {
      console.log(error);
    }
  }
}
