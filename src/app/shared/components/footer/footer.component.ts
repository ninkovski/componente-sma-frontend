import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit{
    year = moment().format('YYYY');

    ngOnInit() {
       /* Back To Top */

        $(document).ready(function(){ 
            $(window).on("scroll", function(){ 
                if ($(this).scrollTop() > 300) { 
                    $('.back-to-top').fadeIn(); 
                } else { 
                    $('.back-to-top').fadeOut(); 
                } 
            }); 

            $('.back-to-top').on("click", function(){ 
                $("html, body").animate({ scrollTop: 0 }, 600); 
                return false; 
            }); 
        });	   
            
    }
	
    
}
