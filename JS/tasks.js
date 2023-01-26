$('.course-details').click((e) => {
  let id = $(e.target).closest('.course-details').attr('targetid');
  let tasks = $('.tasks');
  for(let i = 0; i < tasks.length; i++){
    if($(tasks[i]).attr('id') == id){
      if($(tasks[i]).attr('expanded') == 'false'){
        showTask(tasks[i], e);
      } else {
        hideTask(tasks[i]);
      }
    }else{
      hideTask(tasks[i]);
    }
  }
});

function showTask(task, e){
  $(task).show();
  let height = $(task).prop('scrollHeight');
  $(task).css({'height': height + 'px', 'padding':'10px 10px'});
  $(task).attr('expanded', 'true');
  $(e.target).closest('.course-details').find('.task-expand').css('transform', 'rotate(180deg)');
}
function hideTask(task){
  $(task).css({'height': 0, 'padding':'0px 10px'});
  $(task).attr('expanded', 'false');
  $(task).closest('.course').find('.task-expand').css('transform', 'rotate(0deg)');
}

$('.task').click((e) => {
  let target = $(e.target).attr('target');
  window.location.href = target;
})