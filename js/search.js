window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }
    const manufacturer = sessionStorage.getItem('manufacturer');
    const state = sessionStorage.getItem('state');
    const body_type = sessionStorage.getItem('body-type');
    const min_price = sessionStorage.getItem('min-price');
    const max_price = sessionStorage.getItem('max-price');

    const foundAds = (car) => {
        const date = new Date(car.date);
        const carDate = date.toDateString();
        return `
        <div class="col-sm-12 col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="product-item bg-light">
                <div class="card">
                    <div class="thumb-content">
                        <!-- <div class="price">$${car.price}</div> -->
                        <a href="">
                            <img class="card-img-top img-fluid img" src="${car.image[0].public_url}"
                                alt="Card image cap">
                        </a>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title"><a onclick="carSelected('${car._id}')" href="">${car.name}</a></h4>
                        <ul class="list-inline product-meta">
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-car"></i>Manufacturer: ${car.manufacturer}</a>
                            </li>
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-calendar"></i>Listed on ${carDate}</a>
                            </li>
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-car"></i>Condition: ${car.state}</a>
                            </li>
                        </ul>
                        <p class="card-text">${car.description}</p>
                        <div class="product-ratings">
                            <ul class="list-inline">
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    const url = 'https://auto-mart-api.herokuapp.com/api/v1/car/search/q?'
    fetch(`${url}manufacturer=${manufacturer}&state=${state}&body_type=${body_type}&min_price=${min_price}&max_price=${max_price}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            const found_cars = data.result;
            if (found_cars) {
                document.getElementById('search-count').innerHTML = `${found_cars.length} Ads found`;
                const adsCard = document.getElementById('prod-card');
                adsCard.innerHTML = `${found_cars.map(foundAds).join('')}`;
            } else {
                document.getElementById('search-count').innerHTML = `${data.error}`;
            }
        }).catch(err => console.log(err));

});

document.getElementById('search-btn2').addEventListener('click', () => {
    event.preventDefault();
    const manufacturer = document.getElementById('manufacturer').value;
    const state = document.getElementById('state').value;
    const body_type = document.getElementById('body-type').value;
    const min_price = document.getElementById('min-price').value;
    const max_price = document.getElementById('max-price').value;

    const searchedAds = (car) => {
        const date = new Date(car.date);
        const carDate = date.toDateString();
        return `
        <div class="col-sm-12 col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="product-item bg-light">
                <div class="card" id="card-ad">
                    <div class="thumb-content">
                        <!-- <div class="price">$${car.price}</div> -->
                        <a href="">
                            <img class="card-img-top img-fluid img" src="${car.image[0].public_url}"
                                alt="Card image cap">
                        </a>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title"><a onclick="carSelected('${car._id}')" href="">${car.name}</a></h4>
                        <ul class="list-inline product-meta">
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-car"></i>Manufacturer: ${car.manufacturer}</a>
                            </li>
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-calendar"></i>Listed on ${carDate}</a>
                            </li>
                            <li class="list-inline-item">
                                <a href=""><i class="fa fa-car"></i>Condition: ${car.state}</a>
                            </li>
                        </ul>
                        <p class="card-text">${car.description}</p>
                        <div class="product-ratings">
                            <ul class="list-inline">
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item selected"><i class="fa fa-star"></i>
                                </li>
                                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    const url = 'https://auto-mart-api.herokuapp.com/api/v1/car/search/q?'
    fetch(`${url}manufacturer=${manufacturer}&state=${state}&body_type=${body_type}&min_price=${min_price}&max_price=${max_price}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            const search_cars = data.result;
            if (search_cars) {
                document.getElementById('search-count').innerHTML = `${search_cars.length} Ads found`;
                const adsCard = document.getElementById('prod-card');
                adsCard.innerHTML = `${search_cars.map(searchedAds).join('')}`;
            } else {
                document.getElementById('search-count').innerHTML = `${data.error}`;
                Swal.fire({
                    type: 'error',
                    title: 'Sorry...',
                    text: `${data.error}. Please search again.`
                })
            }
        }).catch(err => console.log(err));
});