window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location = 'signin.html';
        return false;
    }
});

const addCarForm = document.getElementById('addCarForm');
addCarForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData(this);
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/car`, {
        method: 'post',
        headers: {
            'Authorization': token
        },
        body: formData
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status === 200) {
            Swal.fire(
                'Thank You!',
                `${data.message} successfuly`,
                'success'
            )
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${data.error}`
            })
        }
    }).catch(err => console.log(err));
});






