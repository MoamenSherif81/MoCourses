$(document).ready(function(){
  let urlParams = new URLSearchParams(window.location.search);
  let cardId = urlParams.get('instId');
  if(cardId == null) window.location.href = 'index.html';
  $.getJSON('Data/instructors.json', (instructors) => {
    for(instructor of instructors){
      if(cardId != instructor.id) continue;
      $('.instructor-name').text(instructor.name);
      $('.instructor-work').text(instructor.work);
      $('.instructor-img').attr('src', `assets/images/${instructor.image}`);
      $('.instructor-address').text(instructor.address);
      $('.instructor-email').text(instructor.email);
      $('.instructor-phone').text(instructor.phone);
      $('.instructor-about').text(instructor.about);
      $('.instructor-education').text(instructor.education);
      $('.instructor-exp').text(instructor.experience);
      $('.instructor-field').text(instructor.FieldOfSpecialInterest);
      break;
    }
  })

  //Accordions click function
  $('.exp-title').click((e) => {
    let id = $(e.target).attr('targetId');
    let expTxt = $('.exp-datails');
    for(let i = 0; i < expTxt.length; i++){
      if($(expTxt[i]).attr('id') == id){
        if($(expTxt[i]).attr('expanded') == 'false'){
          $(expTxt[i]).show();
          let height = $(expTxt[i]).find('.exp-datails-content').prop('scrollHeight') + 48;
          $(expTxt[i]).css({'height': height + 'px', 'padding': '24px 24px'});
          $(expTxt[i]).attr('expanded', 'true');
          $(e.target).find('.arrow').css('transform', 'rotate(0deg)');
        } else {
          $(expTxt[i]).css({'height': 0, 'padding': '0 24px'});
          $(expTxt[i]).on('transitionend', () => {
            $(expTxt[i]).hide();
            $(expTxt[i]).off('transitionend');
          })
          $(expTxt[i]).attr('expanded', 'false')
          $(e.target).find('.arrow').css('transform', 'rotate(180deg)');
        }
      }
    }
  });
});