let form = document.querySelector('.contact-form form');
let phoneInput = document.querySelector('.contact-form .phone-input');
form.addEventListener('submit', (e) => {
  let phoneRegex = /^(01)[0125][0-9]{8}$/;
  if(phoneRegex.test(phoneInput.value)){
    e.preventDefault();
    fetch("https://sheetdb.io/api/v1/du21kg9jg2q3o", {
      method: "POST",
      body: new FormData(form),
    }).then(
      response => response.json()
    ).then(() => {
      form.value = "";
      Swal.fire({
        title: 'Done',
        text: 'Your message have been send',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      form.reset();
    })
  } else {
    Swal.fire({
      title: 'Invalid Number',
      text: 'Enter a valid phone number',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
})



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