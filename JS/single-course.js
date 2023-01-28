$(document).ready(function(){
  let urlParams = new URLSearchParams(window.location.search);
  let cardId = urlParams.get('cardId');
  if(cardId == null) window.location.href = 'index.html';
  $.getJSON('Data/courses.json', (courses) => {
    for(course of courses){
      if(cardId == course.id){
        $('.single-course').find('.single-course-title').text(course.title);
        $('.single-course').find('.single-course-instructor').text(course.instructor);
        $('.single-course').find('.single-course-instructor-img img').attr('src', course.instructorImg);
        $('.single-course').find('.single-course-image img').attr('src', course.image);
        $('.single-course').find('.single-course-stud-num').text(course.students);
        $('.single-course').find('.single-course-categories').text(course.categories.join(', '));
        $('.single-course').find('.overview-text').text(course.description);
        let stars = $('.single-course').find('.star');
        for(let i = 0; i < course.rate; i++){
          $(stars[i]).addClass('filled');
        }
        break;
      }
    }
    let cnt = 0;
    courses.reverse();
    for(course of courses){
      if(course.id == cardId) continue;
      cnt++;
      if(cnt > 3) break;
      let card = document.createElement('div');
      card.className = 'small-card d-flex gap-2 mb-3 text-start';
      card.innerHTML = 
      `
        <!-- Course image -->
        <div class="small-card-img">
          <img src="${course.image}" class="w-100 h-100" alt="">
        </div>
        <!-- Course image Ending -->
        <!-- Course info -->
        <div class="small-card-text d-flex flex-column justify-content-between py-1">
          <p class="small-card-title m-0 ft--15"><a class="site-link" href="single-course.html?cardId=${course.id}">${course.title}</a></p>
          <p class="small-card-price m-0 text-success ft--12">${course.price}</p>
        </div>
        <!-- Course info Ending -->
      `;
      $('.latest-courses').append(card);
    }
  })
});

$(document).ajaxStop(() => {
  $(document).ready(() => {
    $('.loading-screen').hide();
  })
})