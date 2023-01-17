$(document).ready(() => {
  //nav bar start
  $(document).scroll(() => {
    $('nav').toggleClass('nav-down', $(this).scrollTop() > $('nav').height())
  });
  $('.side-nav-btn').click(() => {
    //$('.nav-items-cont').toggleClass('expand');
    if($('.nav-items-cont').attr('expanded') == 'false'){
      $('.nav-items-cont').height($('.nav-items-cont').prop("scrollHeight") + 'px');
      $('.nav-items-cont').attr('expanded', 'true');
    } else {
      $('.nav-items-cont').height('0');
      $('.nav-items-cont').attr('expanded', 'false');
    }
  })
  $(window).on('resize', () => {
    if($(window).width() > 768){
      $('.nav-items-cont').height('auto');
    } else {
      $('.nav-items-cont').height(0);
      if($('.nav-items-cont').attr('expanded') == 'true'){
        console.log('Here');
        $('.nav-items-cont').height($('.nav-items-cont').prop("scrollHeight") + 'px');
      }
    }
  });
  //nav bar end
  const date = new Date();
  const dateCont = document.getElementById('date');
  dateCont.innerHTML = date.getFullYear();
});

function goToCourse(id){
  window.location.href = 'single-course.html?cardId=' + id;
}