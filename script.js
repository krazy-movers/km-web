let submitted = false;
function onRecaptchaSuccess(token) {
  document.getElementById('submit-button').style.display = 'block';
}

function onRecaptchaExpired() {
  document.getElementById('submit-button').style.display = 'none';
}

function onSubmit(token) {
  document.getElementById('inquiry-form').submit();
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit-button').style.display = 'none';
});
