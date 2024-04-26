import { HttpRequestService } from './../http-request.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  prompt: string = '';
  imageSrc: string = '';
  messages:string[]=[];
  constructor(private service: HttpRequestService) {}
  getUrl() {
    //console.log('get url');
    this.service.getData(this.prompt).subscribe((response: any) => {
      //console.log(response);
      this.imageSrc = response.data[0].url;
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
    this.getUrl();
  }
}
