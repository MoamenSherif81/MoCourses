let profileCont = $('.profile-cont');
let sideNavBtn = $('.side-nav-btn');
let sideNavBCont = $('.nav-items-cont');

function throttle(func, delay = 1000){
  let last = 0;
  return (...args) => {
    const now = new Date().getTime();
    if(now - last < delay) return;
    last = now;
    return func(...args);
  }
}

$(document).ready(() => {
  //nav bar start
  checkScroll();
  $(document).scroll(checkScroll);
  /* Event listner for the navbar button */
  $('.side-nav-btn-cont').click(swapNav)
  $('.profile-icon').click(swapProfile)
  $('.log-out').click(logout);
  /* Event listner for the window resize to adjust the nav layout */
  $(window).on('resize', () => {
    if($(window).width() > 753)
      sideNavBCont.height('auto');
    else {
      sideNavBCont.height(0);
      if(sideNavBtn.hasClass('active')){
        swapNav();
      }
    }
  });
  //Close navbar if clicked outside
  $(document).click((e) => {
    if(!($(e.target).is('.nav-content')) && !$(e.target).parents().is('.nav-content')){
      if(sideNavBtn.hasClass('active')){
        swapNav();
      }
    }
    if(!($(e.target).is('.profile')) && !$(e.target).parents().is('.profile')){
      if(profileCont.hasClass('active')){
        swapProfile();
      }
    }
  })
  //function to swap the condition of the navbar
  
  //nav bar end
  const date = new Date();
  $('#date').text(date.getFullYear())
});

/* Check if the logged in user is a student or not */
if(localStorage.getItem('role') != 'student'){
  $('.tasks-link').hide();
}

/* Check if the user is logged in or not to change the drop down content */
if(localStorage.getItem('email')) {
  $('.not-logged-in').hide();
  $('.profile-name').text(localStorage.getItem('name'));
}
else 
$('.logged-in').hide();

/* Function to logout */
function logout(){
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  window.location.href = 'login.html';
}

/* Function to swap the Nav dropdown menu */
function swapNav(){
  if(sideNavBtn.hasClass('active')){
    sideNavBCont.height('0');
  } else {
    sideNavBCont.height(sideNavBCont.prop("scrollHeight") + 'px');
  }
  sideNavBtn.toggleClass('active');
  $('body').toggleClass('nav-expanded');
}

/* Function to swap the profile dropdown menu */
function swapProfile(){
  if(profileCont.hasClass('active')){
    profileCont.css({'height':'0'});
  } else {
    profileCont.css({'height':$('.profile-list').prop("scrollHeight") + 'px'});
  }
  profileCont.toggleClass('active');
}

/* Function to change the background color of the navbar based on the scroll */
function checkScroll(){
  $('nav').toggleClass('nav-down', $(this).scrollTop() > $('nav').height())
}

/* Function that go to the single course page */
function goToCourse(id){
  window.location.href = 'single-course.html?cardId=' + id;
}