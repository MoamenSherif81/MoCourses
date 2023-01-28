const contactCont = document.querySelector('.contact-form');

const corr = {lat: 30.041395126095086, lng: 31.209324147137483};

const map = new google.maps.Map(contactCont.querySelector('.map'), {
  zoom: 18,
  center: corr,
  disableDefaultUI: true,
});
const marker = new google.maps.Marker({
  position: corr,
  map: map,
  title: "Mo Courses"
});