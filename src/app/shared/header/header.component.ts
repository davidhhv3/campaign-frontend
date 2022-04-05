import { Component, OnInit ,Renderer2, ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('btn__menu__deploy') btn__menu__deploy!: ElementRef;
  @ViewChild('main__menu') main__menu!: ElementRef; 

  constructor(private render2:Renderer2) { }

  ngOnInit(): void {
  }
  deployMenu(){
    if(this.main__menu.nativeElement.className== 'mostrar'){
      this.render2.removeClass(this.main__menu.nativeElement, 'mostrar');
      this.render2.setStyle(this.main__menu.nativeElement,'clip-path','polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'); 
    }else{
      this.render2.addClass(this.main__menu.nativeElement, 'mostrar');
      this.render2.setStyle(this.main__menu.nativeElement,'clip-path','polygon(100% 0, 0 0, 0 100%, 100% 100%)');
    }
    
  }

}
