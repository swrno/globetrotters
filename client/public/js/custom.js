
document.querySelector('.navbar-toggler').addEventListener("click", menubtn);
function menubtn(){
  document.querySelector('body').classList.toggle('menuOpen')
}

document.querySelector('.closebtn').addEventListener("click", closemenu);
function closemenu(){
  document.querySelector('body').classList.remove('menuOpen');
  document.querySelector('.navbar-toggler').classList.add('collapsed');
  document.querySelector('.navbar-collapse').classList.remove('show');
}
$(document).ready(function () {


  $(window).on('scroll', function(){
    var scroll = $(window).scrollTop();
    if(scroll > 10){
      $('header').addClass('headerMoveDown')
    }else{
      $('header').removeClass('headerMoveDown')
    }
   });

  
  Fancybox.bind('[data-fancybox="gallery"]', {});
  Fancybox.bind('[data-fancybox="overviewVideo"]', {});
  Fancybox.bind('[data-fancybox="gallery-a"]', {

  });
  $('#parentHorizontalTab').easyResponsiveTabs({
    type: 'default', //Types: default, vertical, accordion
    width: 'auto', //auto or any width like 600px
    fit: true, // 100% fit in a container
    tabidentify: 'hor_1', // The tab groups identifier
   
});

 function getContainer(){
  // Function disabled to prevent zoom issues on page load
  console.log('getContainer disabled to prevent layout shifts');
  return;
 }
 
 // Disable resize event listener that calls getContainer
 // $(window).on('resize', function(){
 //   getContainer()
 // });
 // getContainer();



});

const swiper = new Swiper('.destinationSlider', {
  loop: true,
  slidesPerView: 2.2,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
  },
   breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 2.2,
          spaceBetween: 30,
        },
       
      },
});
const swiper1 = new Swiper('.tourCateSlider', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
  },
   breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
       
      },
});
const swiper2 = new Swiper(".testimonialSlider .swiper", {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});