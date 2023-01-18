$(document).ready(function(){
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