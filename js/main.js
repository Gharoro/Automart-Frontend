window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }
    const product_row = document.getElementById('ads-row');
    const cars_head = document.getElementById('cars-head');
    // viewOrder();
    const adTemplate = (car) => {
        const date = new Date(car.date);
        const carDate = date.toDateString();
        const carTime = date.toLocaleTimeString();
        return `
            <div class="col-sm-12 col-lg-4 d-flex align-items-stretch">
                <div class="product-item bg-light">
                    <div class="card">
                        <div class="thumb-content">
                            <div class="price">$${car.price}</div>
                            <a href="">
                                <img class="card-img-top img img-fluid car-ads" src="${car.image[0].public_url}"
                                    alt="Card image cap">
                            </a>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title"><a onclick="carSelected('${car._id}')" id="single-car" href="">${car.name} </a></h4>
                            <ul class="list-inline product-meta">
                                <li class="list-inline-item">
                                    <a href=""><i class="fa fa-car"></i>Manufacturer: ${car.manufacturer.toUpperCase()}</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href=""><i class="fa fa-car"></i>${car.model} model</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href=""><i class="fa fa-calendar"></i>Listed on ${carDate} at ${carTime}</a>
                                </li>
                            </ul>
                            <p class="card-text">${car.description}!</p>
                            <div class="product-ratings">
                                <ul class="list-inline">
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    fetch('https://auto-mart-api.herokuapp.com/api/v1/car')
        .then((response) => {
            return response.json();
        }).then((data) => {
            const cars = data.cars;
            if (cars) {
                product_row.innerHTML = `${cars.map(adTemplate).join('')}`;
            } else {
                const error = data.error;
                cars_head.innerHTML = `<h2>${error}</h2>`;
                document.getElementById('more-btn').style.display = 'none';
            }
        }).catch(err => console.log(err));
});

const search = () => {
    event.preventDefault();
    const manufacturer = document.getElementById('manufacturer').value;
    const state = document.getElementById('state').value;
    const body_type = document.getElementById('body-type').value;
    const min_price = document.getElementById('min-price').value;
    const max_price = document.getElementById('max-price').value;
    const url = 'https://auto-mart-api.herokuapp.com/api/v1/car/search/q?'
    fetch(`${url}manufacturer=${manufacturer}&state=${state}&body_type=${body_type}&min_price=${min_price}&max_price=${max_price}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            // console.log(data.result);
            sessionStorage.setItem('search-results', data.result);
            window.location = 'search.html';
            return false;
        }).catch(err => console.log(err));
}

const carSelected = (id) => {
    event.preventDefault();
    localStorage.setItem('car_id', id);
    window.location = 'car.html';
    return false;
}

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
        }).catch(err => console.log(err));
}

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

// const viewOrder = () => {
//     const car_id = localStorage.getItem('car_id');
//     fetch(`https://auto-mart-api.herokuapp.com/api/v1/order/car/${car_id}`)
//         .then((response) => {
//             return response.json();
//         }).then((data) => {
//             const orders = data.car_orders;
//             if (orders.length > 0) {
//                 console.log(orders[0]);
//             } else {
//                 alert('no orders');
//             }
//         }).catch(err => console.log(err));
// }
