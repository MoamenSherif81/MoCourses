$(document).ready(function(){
  $('.code-area').keyup(() => {changeOutput()});
  function changeOutput(){
    console.log($('#html-code').value);
    $('#code-output').contents().find('body').html($('#html-code').val())
  }
})