
/* Declaring the needed variables for the slider */
let currentSlide = 1;
const slides = $('.main-carousel-item');
const slidesText = $('.slide-text');
const mainSection = $('main');
const nextButton = $('.carousel-next');
const prevButton = $('.carousel-prev');

/* Touch and mouse events that fires when the finger or the mouse clicks into the main section */
mainSection.on('mousedown touchstart', handleTouch)

let slideThrottle = throttle(changeSlide, 1500);

/* Mouse events for the carousel buttons to change the slide */
$('.carousel-next').click(() => slideThrottle('next'));
$('.carousel-prev').click(() => slideThrottle('prev'));

/* Function to make the slider slides automatically each 5 seconds */
let timeOutSlide;
startAutomaticSliding();
function startAutomaticSliding(){
  /* Clear the previous timer */
  clearTimeout(timeOutSlide);
  /* Starts a new timer for the slide changing */
  timeOutSlide = setTimeout(() => {
    slideThrottle('next');
    startAutomaticSliding();
  }, 5000);
}

/* Hide all the slides text except for the first one */
for(let i = 1; i < slidesText.length; i++) $(slidesText[i]).hide();
/* Function to change the slide to the left of right */
function changeSlide(dir){
  /* Clear the The time out of the slides changing */
  startAutomaticSliding();

  /* Storing the previous slide number */
  let prev = currentSlide;
  /* Change the value of the current slide based on the direction */
  currentSlide = (dir == 'next') ? currentSlide + 1 : currentSlide - 1;

  /* Check if the number of the current slides exceedes the slides count */
  if(currentSlide > 3) currentSlide = 1;
  else if(currentSlide < 1) currentSlide = 3;

  /* Get the current and previous slides and text from the arrays using the filter function */
  let currSlide = $(slides).filter(`[slide-id="${currentSlide}"]`);
  let prevSlide = $(slides).filter(`[slide-id="${prev}"]`);
  let currSlideText = $(slidesText).filter(`[slide-id="${currentSlide}"]`);
  let prevSlideText = $(slidesText).filter(`[slide-id="${prev}"]`);

  /* Hide the previous slide text */
  $(prevSlideText).children().fadeOut(() => {
    $(prevSlideText).hide();
  });
  /* Hide the Previous slide */
  $(prevSlide).fadeOut(() =>  
    /* show the next slide with some fade */
    $(currSlide).fadeIn(() => {
      $(currSlideText).show();
      $(currSlideText).children().show();
    })
  );
}
/* Main slider end */

/* Get courses info from the JSON File */
$.getJSON('Data/courses.json', (courses) => {
  /* Counter to make only 6 courses to appear */
  let cnt = 0;
  /* Loop over the courses to show 6 of them */
  $(courses).each((ind, course) => {
    cnt++;
    if(cnt > 6) return;
    /* Making the card that will contains all the course info */
    let card = document.createElement('div');
    $(card).addClass('col-12 col-md-6 col-lg-4 mt-4 fade-in');
    /* Put the course info into the card */
    $(card).append( 
    `
    <div class="card course-card border-0">
      <img data-src="${course.image}" class="card-img-top" alt="..." onclick="goToCourse(${course.id})">
      <div class="card-body">
        <h5 class="card-title">${course.title}</h5>
        <p class="card-text description-text">${course.description}</p>
        <div class="rate">
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"/></svg>
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"/></svg>
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"/></svg>
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"/></svg>
          <svg class="star" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.9199,11.8203 C15.6599,12.0703 15.5399,12.4393 15.6009,12.7903 L16.4899,17.7103 C16.5609,18.1303 16.3909,18.5493 16.0399,18.7903 C15.6999,19.0403 15.2499,19.0703 14.8699,18.8703 L10.4409,16.5603 C10.2799,16.4803 10.1099,16.4293 9.9409,16.4293 L9.6699,16.4293 C9.5699,16.4393 9.4809,16.4803 9.3999,16.5193 L4.9699,18.8403 C4.7499,18.9503 4.4999,18.9903 4.2599,18.9503 C3.6599,18.8303 3.2709,18.2693 3.3699,17.6793 L4.2599,12.7593 C4.3199,12.4003 4.1999,12.0403 3.9409,11.7803 L0.3299,8.2803 C0.0299,7.9803 -0.0801,7.5493 0.0609,7.1503 C0.1909,6.7593 0.5299,6.4693 0.9499,6.4003 L5.9199,5.6793 C6.2999,5.6393 6.6299,5.4103 6.7999,5.0703 L8.9899,0.5803 C9.0399,0.4803 9.1099,0.3893 9.1909,0.3103 L9.2799,0.2403 C9.3199,0.1893 9.3799,0.1503 9.4409,0.1103 L9.5499,0.0703 L9.7199,0.0003 L10.1409,0.0003 C10.5209,0.0403 10.8509,0.2693 11.0209,0.5993 L13.2399,5.0703 C13.3999,5.4003 13.7099,5.6203 14.0699,5.6793 L19.0399,6.4003 C19.4599,6.4603 19.8109,6.7503 19.9499,7.1503 C20.0799,7.5493 19.9699,7.9903 19.6599,8.2803 L15.9199,11.8203 Z" transform="translate(2 2.5)"/></svg>
        </div>
      </div>
      <div class="card-body border-top d-flex justify-content-between align-items-center">
        <div class="price alert alert-success m-0 py-2 px-3">${course.price}</div>
        <button class="btn btn-success" onclick="goToCourse(${course.id})">Learn More</button>
      </div>
    </div>
    `);
    /* Make observe to make an animation when the card be at the view port */
    observer.observe(card);
    /* Puting the ratting of the course */
    let stars = $(card).find('.star');
    for(let i = 0; i < course.rate; i++){
      $(stars[i]).addClass('filled');
    }
    /* Append the course card to the section */
    $('.courses-cont').append(card);
  });
})

/* Getting the info of the events from JSON file */
$.getJSON('Data/events.json', (events) => {
  /* Counter to make only 3 events to appear */
  let cnt = 0;
  $(events).each((ind, event) => {
    cnt++;
    if(cnt > 3) return;
    /* Creating the card that will contain the info of the event */
    let card = document.createElement('div');
    $(card).addClass('col-12 col-md-6 col-lg-4 mt-4 fade-in');
    card.innerHTML = 
    `
    <div class="card course-card border-0 h-100">
      <img data-src="${event.image}" class="card-img-top" alt="...">
      <div class="event-time-cont">
        <div class="event-date">
          <div class="event-day ft--20">${event.day}</div>
          <div class="event-month ft--15">${event.month}</div>
        </div>
        <div class="event-time">
          <div class="event-time-start ft--15">${event.fromHour}</div>
          <div class="event-time-end ft--15">${event.toHour}</div>
        </div>
      </div>
      <div class="card-content p-4">
        <div class="card-body p-0">
          <h5 class="card-title">${event.title}</h5>
          <p class="card-text description-text">${event.description}</p>
        </div>
        <div class="event-info d-flex">
          <div class="me-3">
            <i class="fa-solid fa-user me-1 text-warning"></i>
            <span class="info-text">${event.speaker}</span>
          </div>
          <div>
            <i class="fa-solid fa-location-dot me-1 text-success"></i>
            <span class="info-text">${event.location}</span>
          </div>
        </div>
      </div>
    </div>
    `;
    observer.observe(card);
    $('.events-cont').append(card);
  });
})

$.getJSON('Data/instructors.json', (instructors) => {
  let cnt = 0;
  $(instructors).each((ind, instructor) => {
    cnt++;
    if(cnt > 4) return;
    let card = document.createElement('div');
    $(card).addClass('col-12 col-sm-6 col-lg-3 mb-3 m-lg-0 fade-in');
    card.innerHTML = 
    `
    <div class="card text-left border-0 shadow h-100">
        <div class="instructor-image position-relative">
          <img class="card-img-top" data-src="assets/images/${instructor.image}"  alt="">
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
    observer.observe(card);
    $('.instructors-cont').append(card);
  });
});

const observeObj = document.querySelectorAll('.fade-in');
observeObj.forEach(ele => {
  observer.observe(ele);
})

const options = { threshold: .25 }
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      $(entry.target).addClass('appeared');
      $(entry.target).find('img').attr('src', $(entry.target).find('img').attr('data-src'));
    } else {
      return;
    }
  });
}, options);

function handleTouch(e){
  /* Declaring variable theat will record the inistial position of the touch or the click */
  let initialPos = e.offsetX || e.originalEvent.touches[0].pageX;
  let nowPos;
  /* 
    Touch event that fires when the finger slides on the screen 
    to change the last touch position
  */
  $(document).on("mousemove touchmove", (e) => nowPos = e.offsetX || e.originalEvent.touches[0].pageX);
  $(document).on("mouseup touchend", (e) => {
    /* Calculating if the touch move will make the slide go to the next one or not */
    if(nowPos - initialPos >= 100) changeSlide('prev');
    else if(initialPos - nowPos >= 100) changeSlide('next');
    $(document).off("mousemove touchmove mouseup touchend");
  });
}

$(document).ajaxStop(() => {
  $(document).ready(() => {
    $('.loading-screen').hide();
  })
})