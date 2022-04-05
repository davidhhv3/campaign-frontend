import { Component, OnInit ,ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  arrowLeft = true;

  constructor(private render2:Renderer2) { }

  ngOnInit(): void {
  }
  @ViewChild('main__content') main__content!: ElementRef;   
  @ViewChild('main__aside') main__aside!: ElementRef; 
  @ViewChild('btn__deploy') btn__deploy!: ElementRef; 
  @ViewChild('sidebar__main__container') sidebar__main__container!: ElementRef;
  

  deploySideBar(){

    if(this.main__content.nativeElement.offsetWidth > 780){   
        
        if(this.main__content.nativeElement.className== 'mostrar'){
          this.arrowLeft = true;
          this.render2.removeClass(this.main__content.nativeElement, 'mostrar');
          this.render2.setStyle(this.main__content.nativeElement,'width','85%');
          this.render2.setStyle(this.main__aside.nativeElement,'width','15%');
          this.render2.setStyle(this.btn__deploy.nativeElement,'left','14%');
          this.render2.setStyle(this.sidebar__main__container.nativeElement,'clip-path','polygon(0 0, 100% 0, 100% 100%, 0 100%)');
   
        }else{
          this.arrowLeft = false;
          this.render2.addClass(this.main__content.nativeElement, 'mostrar');
          this.render2.setStyle(this.main__content.nativeElement,'width','98%');
          this.render2.setStyle(this.main__aside.nativeElement,'width','2%');
          this.render2.setStyle(this.btn__deploy.nativeElement,'left','1%');          
          this.render2.setStyle(this.sidebar__main__container.nativeElement,'clip-path','polygon(0 0, 0 0, 0 100%, 0% 100%)');
        }
     }else{
      if(this.main__content.nativeElement.className== 'mostrar'){
        this.arrowLeft = true;
        this.render2.removeClass(this.main__content.nativeElement, 'mostrar');
        this.render2.setStyle(this.main__aside.nativeElement,'clip-path','polygon(0 0, 0 0, 0 0, 0 0)');
      }else{
        this.arrowLeft = false;
        this.render2.setStyle(this.main__aside.nativeElement,'clip-path','polygon(0 0, 100% 0, 100% 100%, 0 100%)');
        this.render2.setStyle(this.btn__deploy.nativeElement,'left','50%');
        this.render2.addClass(this.main__content.nativeElement, 'mostrar');
      }
                
     }

            
  }

}
