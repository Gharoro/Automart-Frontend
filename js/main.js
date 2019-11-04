window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }
    const product_row = document.getElementById('ads-row');
    const cars_head = document.getElementById('cars-head');
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
                //document.getElementById('more-btn').style.display = 'none';
            }
        }).catch(err => console.log(err));
});

const carSelected = (id) => {
    event.preventDefault();
    localStorage.setItem('car_id', id);
    window.location = 'car.html';
    return false;
}

