$(document).ready(() => {
  //nav bar start
  $(document).scroll(() => {
    $('nav').toggleClass('nav-down', $(this).scrollTop() > $('nav').height())
  });
  $('.side-nav-btn').click(swapNav)
  $(window).on('resize', () => {
    if($(window).width() > 768){
      $('.nav-items-cont').height('auto');
    } else {
      $('.nav-items-cont').height(0);
      if($('.side-nav-btn').hasClass('active')){
        swapNav();
      }
    }
  });
  //function to swap the condition of the navbar
  function swapNav(){
    if(!$('.side-nav-btn').hasClass('active')){
      $('.nav-items-cont').height($('.nav-items-cont').prop("scrollHeight") + 'px');
    } else {
      $('.nav-items-cont').height('0');
    }
    $('.side-nav-btn').toggleClass('active');
    $('body').toggleClass('nav-expanded');
  }
  //Close navbar if clicked outside
  $(document).click((e) => {
    if(!($(e.target).is('.nav-content')) && !$(e.target).parents().is('.nav-content')){
      if($('.side-nav-btn').hasClass('active')){
        $('.side-nav-btn').toggleClass('active');
        $('body').toggleClass('nav-expanded');
        $('.nav-items-cont').height('0');
      }
    }
  })
  //nav bar end
  const date = new Date();
  const dateCont = document.getElementById('date');
  dateCont.innerHTML = date.getFullYear();
});

function goToCourse(id){
  window.location.href = 'single-course.html?cardId=' + id;
}