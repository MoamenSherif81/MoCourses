let loginForm = document.querySelector('.login-form');
let registerForm = document.querySelector('.register-form');
let loginEmail = $('.login-email-inp');
let loginPass = $('.login-pass-inp');
let registerName = $('.register-name-inp');
let registerEmail = $('.register-email-inp');
let registerPass = $('.register-pass-inp');
let registerConfPass = $('.register-conf-pass-inp');
let registerNumber = $('.register-number-inp');

let accounts = [];
if(localStorage.getItem('accounts') != null){
  accounts = JSON.parse(localStorage.getItem('accounts'));
  $('.loading-screen').hide();
}else{
  $.getJSON('Data/users.json', (data) => {accounts = data});
  $(document).ajaxStop(() => {
    console.log(accounts);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    $('.loading-screen').hide();
  })
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let found = false;
  $(accounts).each((ind, account) => {
    if(account.email == loginEmail.val() && account.password == loginPass.val()){
      localStorage.setItem('name', account.name);
      localStorage.setItem('email', account.email);
      localStorage.setItem('role', account.role);
      found = true;
      window.location.href = 'index.html';
    }
  })
  if(!found){
    Swal.fire({
      title: 'Wrong',
      text: 'Email and password doesn\'t match',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    $(loginPass).val('');
  }
})

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/;
  console.log(passwordRegex.test(registerPass.val()));
  if(!passwordRegex.test(registerPass.val())){
    Swal.fire({
      title: 'Passwords',
      text: 'Enter a valid password The password need at least one number and at least one letter and 8 characters or more',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else if(registerPass.val() != registerConfPass.val()){
    Swal.fire({
      title: 'Passwords',
      text: 'Passwords not match',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    let found = false;
    $(accounts).each((ind, account) => {
      if(account.email == $(registerEmail).val()){
        Swal.fire({
          title: 'Email',
          text: 'Email is already registered',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        found = true;
      }
    })
    if(!found){
      accounts.push({name: registerName.val(), email: registerEmail.val(), password: registerPass.val(),
                    phoneNumber: registerNumber.val(), role: 'student'});
      localStorage.setItem('accounts', JSON.stringify(accounts));
      window.location.href = 'index.html';
    }
  }
})

$('.register-go-btn').click(() => {
  $('.login-cont').hide();
  console.log($('.register-cont'));
  $('.register-cont').css({'display': 'flex'});
})