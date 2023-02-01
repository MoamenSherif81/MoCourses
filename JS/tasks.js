/* Check if the user have premission to enter this page or not */
if(localStorage.getItem('role') != 'student'){
  window.location.href = 'index.html';
}

let userTasks = [], coursesTasks;
$.getJSON('Data/users.json', (users) => {
  $(users).each((ind, user) => {
    if(user.email == localStorage.getItem('email')){
      userTasks = user.courses;
      return;
    }
  })
}).then(() => {
  $.getJSON('Data/tasks.json', (tasks) => {
    coursesTasks = tasks;
  }).then(() => {
    $.getJSON('Data/courses.json', (courses) => {
      $(courses).each((ind, course) => {
        if($.inArray(course.id, userTasks) !== -1){
          let courseCard = document.createElement('div');
          $(courseCard).addClass('course rounded-5')
          $(courseCard).append(
          `
          <div class="course-details d-flex align-items-center justify-content-between bg-white rounded-5" targetId="${course.id}">
            <div class="d-flex align-items-center">
              <h5 class="course-details-title my-0">${course.title + ' ' + course.id}</h5>
              ${course.status == 'Finished' ? 
              `
              <div class="course-done alert alert-success m-0 py-2 px-3">
                Finished
              </div>
              ` : ''}
            </div>
            <div class="task-expand p-2 content--center">
              <i class="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <div class="tasks mx-3 mx-md-4 my-3" expanded="false" id="${course.id}"></div>
          `
          );
          $('.my-courses').append(courseCard);
          addTasks(courseCard, course.id, course.title);
        }
      })
    }).then(() => {
      $('.course-details').click(courseClick);
      $('.task').click((e) => {
        let target = $(e.target).attr('target');
        window.location.href = target;
      })
    })
  })
})

function addTasks(card, id, title){
  let tasksCont = $(card).find('.tasks');
  if(title == 'Front end Diploma'){
    addSingleTask('front-end-editor.html', 'editor', 'Code Editor', tasksCont)
  }
  $(coursesTasks).each((ind, courseTasks) => {
    if(courseTasks.courseId == id){
      let tasks = courseTasks.tasks;
      $(tasks).each((index, task) => {
        addSingleTask(task.link, task.type, task.taskName, tasksCont);
      })
    }
  })
}

function addSingleTask(link, type, name, tasksCont){
  let color = (type == 'task' ? 'bg-warning' : (type == 'video' ? 'bg-info' : 'bg-black'));
  let icon = (type == 'task' ? '<i class="fa-regular fa-file"></i>' 
              :(type == 'video' ? '<i class="fa-solid fa-play"></i>' : 
                '<i class="fa-solid fa-code"></i>'));
  tasksCont.append(
  `
    <div class="task d-flex align-items-center bg-white" target="${link}">
      <div class="task-icon task-icon-text content--center ${color} ${color == 'bg-black' ? 'text-white' : ''} rounded-circle">
        ${icon}
      </div>
      <h5 class="m-0 ms-2 task-title">${name}</h5>
    </div>
  `
  )
}

/*
<div class="course rounded-5">
  <div class="course-details d-flex align-items-center justify-content-between bg-white rounded-5" targetId="marketing-1002">
    <h5 class="course-details-title my-0">Marketing 1002</h5>
    <div class="task-expand p-2 content--center">
      <i class="fa-solid fa-angle-down"></i>
    </div>
  </div>
  <div class="tasks mx-3 mx-md-4 my-3" expanded="false" id="marketing-1002">
    <div class="task d-flex align-items-center bg-white" target="Data/task.pdf">
      <div class="task-icon task-icon-text content--center bg-warning rounded-circle">
        <i class="fa-regular fa-file"></i>
      </div>
      <h5 class="m-0 ms-2 task-title">Task 1</h5>
    </div>
  </div>
</div>
*/

function courseClick(e){
  let id = $(e.target).closest('.course-details').attr('targetid');
  let tasks = $('.tasks');
  for(let i = 0; i < tasks.length; i++){
    if($(tasks[i]).attr('id') == id){
      if($(tasks[i]).attr('expanded') == 'false'){
        expandTask(tasks[i], e);
      } else {
        collapseTask(tasks[i]);
      }
    }else{
      collapseTask(tasks[i]);
    }
  }
}

function expandTask(task, e){
  $(task).show();
  let height = $(task).prop('scrollHeight');
  $(task).css({'height': height + 'px', 'padding':'10px 10px'});
  $(task).attr('expanded', 'true');
  $(e.target).closest('.course-details').find('.task-expand').css('transform', 'rotate(180deg)');
}
function collapseTask(task){
  $(task).css({'height': 0, 'padding':'0px 10px'});
  $(task).attr('expanded', 'false');
  $(task).closest('.course').find('.task-expand').css('transform', 'rotate(0deg)');
}

$(document).ready(() => {
  $('.loading-screen').hide();
})