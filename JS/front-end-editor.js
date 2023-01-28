//Starting the ace editors (HTML, CSS, JS) Editors
/* HTML Editor Setup */
let editorHtml = ace.edit("html-code");
editorHtml.setTheme("ace/theme/chrome");
editorHtml.session.setMode("ace/mode/html");  
editorHtml.session.setUseSoftTabs(true);

/* CSS Editor Setup */
let editorCSS = ace.edit("css-code");
editorCSS.setTheme("ace/theme/chrome");
editorCSS.session.setMode("ace/mode/css");  

/* JS Editor Setup */
let editorJS = ace.edit("js-code");
editorJS.setTheme("ace/theme/chrome");
editorJS.session.setMode("ace/mode/javascript");  

/* Defining global variables */
let code = document.getElementById('html-code')
let codecss = document.getElementById('css-code')
let codejs = document.getElementById('js-code')
let output = document.getElementById('code-output');
let tabBtns = $('.tab-btn');
let timeout;

editorHtml.focus();

/* Add editors event linteners to change ifram content */
code.addEventListener('keyup', change);
codecss.addEventListener('keyup', change);
codejs.addEventListener('keyup', change);

/* fuction that apply the changes made in the editors to the i frame */
function change() {
  let js = document.createElement('script');
  js.innerHTML = editorJS.getSession().getValue();
  output.contentWindow.document.body.innerHTML = editorHtml.getSession().getValue();
  output.contentWindow.document.body.innerHTML += '<style>' + editorCSS.getSession().getValue() + '</style>';
  //setting a timer to apply the js code (for preventing appearing of alot of errors while typing)
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    output.contentWindow.eval(editorJS.getSession().getValue());
  }, 1000);
}

/* Adjusting the page layout based on the width of the window */
checkWidth();
/* Checking the resizing to adjust the laybout */
$(window).resize(checkWidth)
/* Function to apply layput changes */
function checkWidth(){
  if($(window).width() < 977){
    changeTab();
  } else {
    $('.code-area-cont').show();
  }
}

/* Event listners for the tab buttons */
$('.tab-btn').click((e) => {
  $('.tab-btn').removeClass('active');
  $(e.target).addClass('active');
  changeTab();
})

/* function to change the tab after clicking a tab button */
function changeTab(){
  $('.code-area-cont').hide();
  /* Searching for the active one */
  for(let i = 0; i < tabBtns.length; i++){
    let id = $(tabBtns[i]).attr('data-id');
    if($(tabBtns[i]).hasClass('active')){
      $('#' + id).show();
    } else {
      $('#' + id).hide();
    }
  }
}

$(document).ready(() => {
  $('.loading-screen').hide();
})