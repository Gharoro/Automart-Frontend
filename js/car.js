const getCar = () => {
    let car_id = localStorage.getItem('car_id');
    const name = document.getElementById('name');
    const carManufacturer = document.getElementById('manufacturer');
    const carStatus = document.getElementById('status');
    const carListingDate = document.getElementById('car-date');
    const carImage = document.getElementById('image');
    const carDesc = document.getElementById('car-desc');
    const carPrice = document.getElementById('car-price');
    const carModel = document.getElementById('model');
    const carType = document.getElementById('body-type');
    const carState = document.getElementById('state');
    const sellerPic = document.getElementById('seller-pic');
    const sellerName = document.getElementById('seller-name');
    const sellerJoinDate = document.getElementById('member-date');
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/car/${car_id}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            const car = data.car;
            const listdate = new Date(car.date);
            const carDate = listdate.toDateString();
            let memberDate = new Date(data.member_since);
            memberDate = memberDate.toDateString();
            name.innerHTML = `${car.name}`;
            carManufacturer.innerHTML = `${car.manufacturer}`;
            carStatus.innerHTML = `${car.status}`;
            carListingDate.innerHTML = `${carDate}`;
            carImage.src = `${car.image[0].public_url}`;
            carDesc.innerHTML = `${car.description}`;
            carPrice.innerHTML = `N${car.price}`;
            carModel.innerHTML = `${car.model}`;
            carType.innerHTML = `${car.body_type}`;
            carState.innerHTML = `${car.state}`;
            sellerPic.src = `${data.pic_url}`;
            sellerName.innerHTML = `${data.seller_first_name} ${data.seller_last_name}`;
            sellerJoinDate.innerHTML = `Member since ${memberDate}`;
            localStorage.setItem('seller_id', car.owner_id);
            localStorage.setItem('seller_fname', data.seller_first_name);
            localStorage.setItem('seller_lname', data.seller_last_name);
        }).catch(err => console.log(err));
}

window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }
    viewOrder();
});

const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const car_id = localStorage.getItem('car_id');
    const token = localStorage.getItem('token');
    const formData = new FormData(this);
    const formParams = new URLSearchParams();
    for (const pair of formData) {
        formParams.append(pair[0], pair[1]);
    }
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/order?car_id=${car_id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        body: formParams
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.status === 200) {
            Swal.fire(
                'Thank You!',
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


const viewOrder = () => {
    const car_id = localStorage.getItem('car_id');
    const carOrders = (order) => {
        const date = new Date(order.date);
        const orderDate = date.toDateString();
        return `
            <tr>
                <th scope="row">${order._id}</th>
                <td>${order.amount}</td>
                <td>${orderDate}</td>
                <td>${order.status}</td>
            </tr>
        `
    }
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/order/car/${car_id}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            const orders = data.car_orders;
            if (orders) {
                const tbody = document.getElementById('order-table');
                tbody.innerHTML = `${orders.map(carOrders).join('')}`;
            } else {
                document.getElementById('table').style.display = 'none';
            }
        }).catch(err => console.log(err));
}