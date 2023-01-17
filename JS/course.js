$(document).ready(function(){
  let urlParams = new URLSearchParams(window.location.search);
  let cardId = urlParams.get('cardId');
  $.getJSON('Data/courses.json', (courses) => {
    for(course of courses){
      if(cardId != course.id) continue;
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
      console.log($('.single-course'));
      console.log(course.rate);
      break;
    }
  })
});