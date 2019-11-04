window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        window.location = 'profile.html';
        return false;
    }
});

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/auth/signup`, {
        method: 'post',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status === 400) {
            Swal.fire({
                type: 'error',
                text: `${data.error}`
            })
        } else {
            localStorage.setItem('profile-info', data.user);
            window.location = 'signin.html';
        }
    }).catch(err => console.log(err));
});



