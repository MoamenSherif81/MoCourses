$(document).ready(() => {
  //nav bar start
  $(document).scroll(() => {
    $('nav').toggleClass('nav-down', $(this).scrollTop() > $('nav').height())
  });
  /* Event listner for the navbar button */
  $('.side-nav-btn-cont').click(swapNav)
  /* Event listner for the window resize to adjust the nav layout */
  $(window).on('resize', () => {
    if($(window).width() > 753)
      $('.nav-items-cont').height('auto');
    else {
      $('.nav-items-cont').height(0);
      if($('.side-nav-btn').hasClass('active')){
        swapNav();
      }
    }
  });
  //Close navbar if clicked outside
  $(document).click((e) => {
    if(!($(e.target).is('.nav-content')) && !$(e.target).parents().is('.nav-content')){
      if($('.side-nav-btn').hasClass('active')){
        swapNav();
      }
    }
  })
  //function to swap the condition of the navbar
  function swapNav(){
    if($('.side-nav-btn').hasClass('active')){
      $('.nav-items-cont').height('0');
    } else {
      $('.nav-items-cont').height($('.nav-items-cont').prop("scrollHeight") + 'px');
    }
    $('.side-nav-btn').toggleClass('active');
    $('body').toggleClass('nav-expanded');
  }
  //nav bar end
  const date = new Date();
  const dateCont = document.getElementById('date');
  dateCont.innerHTML = date.getFullYear();
});

function goToCourse(id){
  window.location.href = 'single-course.html?cardId=' + id;
}