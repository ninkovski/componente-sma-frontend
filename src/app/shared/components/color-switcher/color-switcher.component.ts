import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.scss']
})
export class ColorSwitcherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      theme9();
      $("html").addClass("color-header headercolor9"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8")
      
    $(".switcher-btn").on("click", function() {
      $(".switcher-wrapper").toggleClass("switcher-toggled")
    }), $(".close-switcher").on("click", function() {
      $(".switcher-wrapper").removeClass("switcher-toggled")
    }), $("#lightmode").on("click", function() {
      $("html").attr("class", "light-theme")
    }), $("#darkmode").on("click", function() {
      $("html").attr("class", "dark-theme")
    }), $("#semidark").on("click", function() {
      $("html").attr("class", "semi-dark")
    }), $("#minimaltheme").on("click", function() {
      $("html").attr("class", "minimal-theme")
    }), $("#headercolor1").on("click", function() {
      $("html").addClass("color-header headercolor1"), $("html").removeClass("headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor2").on("click", function() {
      $("html").addClass("color-header headercolor2"), $("html").removeClass("headercolor1 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor3").on("click", function() {
      $("html").addClass("color-header headercolor3"), $("html").removeClass("headercolor1 headercolor2 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor4").on("click", function() {
      $("html").addClass("color-header headercolor4"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor5 headercolor6 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor5").on("click", function() {
      $("html").addClass("color-header headercolor5"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor6 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor6").on("click", function() {
      $("html").addClass("color-header headercolor6"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor7 headercolor8 headercolor9")
    }), $("#headercolor7").on("click", function() {
      $("html").addClass("color-header headercolor7"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor8 headercolor9")
    }), $("#headercolor8").on("click", function() {
      $("html").addClass("color-header headercolor8"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor9")
    }), $("#headercolor9").on("click", function() {
      $("html").addClass("color-header headercolor9"), $("html").removeClass("headercolor1 headercolor2 headercolor3 headercolor4 headercolor5 headercolor6 headercolor7 headercolor8")
    })
    
    // sidebar colors
    $('#sidebarcolor1').click(theme1);
    $('#sidebarcolor2').click(theme2);
    $('#sidebarcolor3').click(theme3);
    $('#sidebarcolor4').click(theme4);
    $('#sidebarcolor5').click(theme5);
    $('#sidebarcolor6').click(theme6);
    $('#sidebarcolor7').click(theme7);
    $('#sidebarcolor8').click(theme8);
    $('#sidebarcolor9').click(theme9);

    function theme1() {
      $('html').attr('class', 'color-sidebar sidebarcolor1');
    }

    function theme2() {
      $('html').attr('class', 'color-sidebar sidebarcolor2');
    }

    function theme3() {
      $('html').attr('class', 'color-sidebar sidebarcolor3');
    }

    function theme4() {
      $('html').attr('class', 'color-sidebar sidebarcolor4');
    }
	
	function theme5() {
      $('html').attr('class', 'color-sidebar sidebarcolor5');
    }
	
	function theme6() {
      $('html').attr('class', 'color-sidebar sidebarcolor6');
    }

    function theme7() {
      $('html').attr('class', 'color-sidebar sidebarcolor7');
    }

    function theme8() {
      $('html').attr('class', 'color-sidebar sidebarcolor8');
    }

    function theme9() {
      $('html').attr('class', 'color-sidebar sidebarcolor9');
    }
	
	  
  }

}
