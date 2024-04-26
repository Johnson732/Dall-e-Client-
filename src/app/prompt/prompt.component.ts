import { HttpRequestService } from './../http-request.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { initializeApp } from "firebase/app";
import { getAnalytics ,logEvent} from "firebase/analytics";

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  prompt: string = '';
  imageSrc: string = '';
  messages:string[]=[];
  analytics: any;
  constructor(private service: HttpRequestService) {
    const firebaseConfig ={
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
      projectId: environment.projectId,
      storageBucket: environment.storageBucket,
      messagingSenderId: environment.messagingSenderId,
      appId: environment.appId,
      measurementId: environment.measurementId
    };
    const app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(app);
  }
  getUrl() {
    //console.log('get url');
    this.service.getData(this.prompt).subscribe((response: any) => {
      //console.log(response);
      this.imageSrc = response.data[0].url;
      logEvent(this.analytics, 'dalle_called', {
        prompt: this.prompt
      });
      //console.log(this.imageSrc);
    });
  }

  getChats() {
    //console.log('get url');
    this.service.getChat(this.prompt).subscribe((response: any) => {
      const messageString = response.choices[0].message.content;
        const messagesArray = messageString.split("\n").map((message:any) => message.trim());
        this.messages = messagesArray.filter((message:any) => message !== ''); // Remove empty strings

      //console.log(this.messages);
    });
  }
  selectMessage(selectedMessage: string) {
    this.prompt = selectedMessage; // Set the prompt variable to the selected message
    //this.getUrl();
  }
}
