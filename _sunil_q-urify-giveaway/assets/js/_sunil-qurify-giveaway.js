const emailInput = document.getElementById('g_email');
const emailLabel = document.querySelector('.textfield__label');

emailInput.addEventListener('blur', function () {
    if (emailInput.value.trim() !== '') {
        emailLabel.classList.add('error');
    } else {
        emailLabel.classList.remove('error');
    }
});