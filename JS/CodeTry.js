let editorHtml = ace.edit("html-code");
editorHtml.setTheme("ace/theme/chrome");
editorHtml.session.setMode("ace/mode/html");  
let editorCSS = ace.edit("css-code");
editorCSS.setTheme("ace/theme/chrome");
editorCSS.session.setMode("ace/mode/css");  
let editorJS = ace.edit("js-code");
editorJS.setTheme("ace/theme/chrome");
editorJS.session.setMode("ace/mode/javascript");  

// $('.code-area').keyup(() => {changeOutput()});
// function changeOutput(){
//   $('#code-output').contents().find('body').html(editorHtml.getSession().getValue());
//   $('#code-output').contents().find('body').append('<style>' + (editorCSS.getSession().getValue()) + '</style>');
//   $('#code-output').contents().find('body').append('<script>' + (editorJS.getSession().getValue()) + '<\/script>');

// }

let code = document.getElementById('html-code')
let codecss = document.getElementById('css-code')
let codejs = document.getElementById('js-code')
let output = document.getElementById('code-output');
code.addEventListener('keyup', change);
codecss.addEventListener('keyup', change);
codejs.addEventListener('keyup', change);

let timeout;

function change() {
  let js = document.createElement('script');
  js.innerHTML = editorJS.getSession().getValue();
  output.contentWindow.document.body.innerHTML = editorHtml.getSession().getValue();
  output.contentWindow.document.body.innerHTML += '<style>' + editorCSS.getSession().getValue() + '</style>';
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    output.contentWindow.eval(editorJS.getSession().getValue());
  }, 1000);
}