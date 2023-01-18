$(document).ready(function(){
  const options = { threshold: .25 }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        $(entry.target).addClass('appeared');
      } else {
        return;
      }
    });
  }, options);

  //Main slider start
  let currentSlide = 1, slides = $('.main-carousel-item'), slidesText = $('.slide-text');
  $('main').on('mousedown touchstart', (e) => {
    let initialPos = e.offsetX || e.originalEvent.touches[0].pageX;
    let nowPos;
    $(document).on("mousemove touchmove", (e) => nowPos = e.offsetX || e.originalEvent.touches[0].pageX);
    $(document).on("mouseup touchend", (e) => {
      console.log('Here');
      if(nowPos - initialPos >= 100) changeSlide('prev');
      else if(initialPos - nowPos >= 100) changeSlide('next');
      $(document).off("mousemove touchmove mouseup touchend");
    });
  })
  $('.carousel-next').click(() => changeSlide('next'));
  $('.carousel-prev').click(() => changeSlide('prev'));
  for(let i = 1; i < slidesText.length; i++) $(slidesText[i]).hide();
  function changeSlide(dir){
    let prev = currentSlide;
    let currSlide, currSlideText;
    let prevSlide, prevSlideText;
    (dir == 'next') ? currentSlide++ : currentSlide--;
    if(currentSlide > 3) currentSlide = 1;
    else if(currentSlide < 1) currentSlide = 3;
    for(let i = 0; i < slides.length; i++){
      if($(slides[i]).attr('slide-id') == prev) prevSlide = slides[i];
      else if($(slides[i]).attr('slide-id') == currentSlide) currSlide = slides[i];
    }
    for(let i = 0; i < slidesText.length; i++){
      if($(slidesText[i]).attr('slide-id') == currentSlide)
        currSlideText = slidesText[i];
      $(slidesText[i]).children().fadeOut(() => $(slidesText[i]).hide());
    }
    $(prevSlideText).children().fadeOut();
    $(prevSlide).fadeOut(() =>  
      $(currSlide).fadeIn(() => {
        $(currSlideText).show();
        $(currSlideText).children().fadeIn();
      })
    );
  }
  //Main slider end
  //Courses Section start
  $.getJSON('Data/courses.json', (courses) => {
    let cnt = 0;
    for(course of courses){
      cnt++;
      if(cnt > 6) break;
      let card = document.createElement('div');
      $(card).addClass('col-12 col-md-6 col-lg-4 mt-4 fade-in');
      card.innerHTML = 
      `
      <div class="card course-card border-0">
        <img src="${course.image}" class="card-img-top" alt="...">
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
      `
      observer.observe(card);
      let stars = $(card).find('.star');
      for(let i = 0; i < course.rate; i++){
        $(stars[i]).addClass('filled');
      }
      $('.courses-cont').append(card);
    }
  })
  
  //Courses Section end
  
  //Events Section start
  $.getJSON('Data/events.json', (events) => {
    let cnt = 0;
    for(event of events){
      cnt++;
      if(cnt > 3) break;
      let card = document.createElement('div');
      $(card).addClass('col-12 col-md-6 col-lg-4 mt-4 fade-in');
      observer.observe(card);
      card.innerHTML = 
      `
      <div class="card course-card border-0 h-100">
        <img src="${event.image}" class="card-img-top" alt="...">
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
      observer.observe(card.querySelector('.card'));
      $('.events-cont').append(card);
    }
  })

  const observeObj = document.querySelectorAll('.fade-in');
  observeObj.forEach(ele => {
    observer.observe(ele);
  })
});