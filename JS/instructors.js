let instructorsArr = [];
let length;
let active = 1;
let slidesCount;
let selectedInstructors = [];
let navBtns = [];
$(document).ready(function(){
  //Instructors Section start
  function getInstructors(){
    return $.getJSON('Data/instructors.json', (instructors) => {
      for(instructor of instructors){
        let card = document.createElement('div');
        $(card).addClass('col-12 col-sm-6 col-lg-3 mb-4');
        instructorsArr.push(card);
        card.innerHTML = 
        `
        <div class="card text-left border-0 shadow h-100">
            <div class="instructor-image position-relative">
              <img class="card-img-top" src="assets/images/${instructor.image}" alt="">
              <div class="instructor-social d-flex justify-content-center align-items-center 
                          gap-4 position-absolute top-0 start-0 h-100 w-100">
                <a class="social-icon" href=""><i class="fa-brands fa-facebook"></i></a>
                <a class="social-icon" href=""><i class="fa-brands fa-twitter"></i></a>
                <a class="social-icon" href=""><i class="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
            <div class="card-body">
              <h4 class="card-title ft--18"><a class="site-link" href="single-instructor.html?instId=${instructor.id}">${instructor.name}</a></h4>
              <h4 class="card-description ft--15 text-secondary">${instructor.work}</h4>
            </div>
          </div>
        `
        $('.instructors-cont').append(card);
      }
    });
  }
  getInstructors().then(() => {
    length = instructorsArr.length;
    slidesCount = Math.ceil(length / 8);
    for(let i = 0; i < slidesCount; i++){
      let btn = document.createElement('button');
      $(btn).addClass('navigation-btn slide-btn content--center');
      $(btn).attr('slideId', i + 1);
      $(btn).text(i + 1);
      $('.slide-next').before(btn);
      navBtns.push(btn);
    }
    toggleNav();
    console.log('Here');
    $('.slide-btn').click((e) => {
      console.log('Here');
      active = $(e.target).attr('slideId');
      toggleNav();
    })
    $('.slide-next').click(() => {active++, toggleNav()});
    $('.slide-prev').click(() => {active--, toggleNav()});
    function toggleNav(){
      if(active < 1) active = slidesCount;
      else if(active > slidesCount) active = 1;
      $('.slide-btn').removeClass('active');
      $(navBtns[active - 1]).addClass('active');
      changeSlide();
    }
  });
  //Instructors Section end
});


function changeSlide(){
  let first = Number((active - 1) * 8);
  let last = Number(first + 8);
  if(selectedInstructors.length){
    $(selectedInstructors).fadeOut(() => {
      showInstructors();
    });
  } else {
    $(instructorsArr).hide();
    showInstructors();
  }
  function showInstructors(){
    selectedInstructors = instructorsArr.slice(Number(first), last);
    $(selectedInstructors).fadeIn(() =>  {
      $(('.inst')).height($('.instructors-cont').prop('scrollHeight'));
    });
  }
}

$(window).resize(() => {
  $(('.inst')).height($('.instructors-cont').prop('scrollHeight'));
})

$(document).ajaxStop(() => {
  $(document).ready(() => {
    $('.loading-screen').hide();
  })
})