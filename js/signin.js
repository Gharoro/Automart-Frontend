window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        window.location = 'profile.html';
        return false;
    }
});

const signinForm = document.getElementById('signin-form');
signinForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/auth/signin`, {
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
        } else if (data.status === 404) {
            Swal.fire({
                type: 'error',
                text: `${data.error}`
            })
        } else {
            localStorage.setItem('token', data.token);
            window.location = 'profile.html';
        }
    }).catch(err => console.log(err));
});
