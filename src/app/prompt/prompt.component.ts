import { HttpRequestService } from './../http-request.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  prompt:string='';
  imageSrc:string='';
  constructor(private service : HttpRequestService){}
  getUrl(){
    console.log("get url");
    this.service.getData(this.prompt).subscribe(
      (response:any)=>{
        console.log(response);
        this.imageSrc=response.data[0].url;
        console.log(this.imageSrc);
      }
    );

  }

}
