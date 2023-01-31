$(document).ready(() => {
  //nav bar start
  $(document).scroll(() => {
    $('nav').toggleClass('nav-down', $(this).scrollTop() > $('nav').height())
  });
  /* Event listner for the navbar button */
  $('.side-nav-btn-cont').click(swapNav)
  $('.profile-icon').click(swapProfile)
  $('.log-out').click(logout);
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
  
  //nav bar end
  const date = new Date();
  const dateCont = document.getElementById('date');
  dateCont.innerHTML = date.getFullYear();
});

if(localStorage.getItem('role') == 'instructor'){
  $('.tasks-link').hide();
}
console.log(localStorage.getItem('email'));
if(localStorage.getItem('email')) $('.not-logged-in').hide();
else $('.logged-in').hide();

function logout(){
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  window.location.href = 'login.html';
}

function swapNav(){
  if($('.side-nav-btn').hasClass('active')){
    $('.nav-items-cont').height('0');
  } else {
    $('.nav-items-cont').height($('.nav-items-cont').prop("scrollHeight") + 'px');
  }
  $('.side-nav-btn').toggleClass('active');
  $('body').toggleClass('nav-expanded');
}

function swapProfile(){
  if($('.profile-cont').hasClass('active')){
    $('.profile-cont').css({'height':'0'});
  } else {
    console.log($('.profile-list').prop("scrollHeight"));
    $('.profile-cont').css({'height':$('.profile-list').prop("scrollHeight") + 'px'});
  }
  $('.profile-cont').toggleClass('active');
}

  function goToCourse(id){
    window.location.href = 'single-course.html?cardId=' + id;
  }