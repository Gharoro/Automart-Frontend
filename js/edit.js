window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const price = localStorage.getItem('car_price');
    const car_id = localStorage.getItem('edit_car_id');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }
    document.getElementById("old-price").value = `$${price}`;

    const updatePriceForm = document.getElementById('price-form');
    updatePriceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch(`https://auto-mart-api.herokuapp.com/api/v1/car/${car_id}/price`, {
            method: 'PATCH',
            headers: {
                'Authorization': token
            },
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.status === 200) {
                Swal.fire(
                    'Done!',
                    `${data.message}`,
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
});

