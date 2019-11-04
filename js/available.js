window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }

    const availableAds = (car) => {
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
                                <a href=""><i class="fa fa-car"></i>Status: ${car.status}</a>
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

    // Fetch available ads
    fetch('https://auto-mart-api.herokuapp.com/api/v1/car/status/available', {
        method: 'get',
        headers: {
            'Authorization': token
        },
    }).then((response) => {
        return response.json();
    }).then((data) => {
        const ads = data.available_cars;
        if (ads) {
            document.getElementById('unsold-count').innerHTML = `${ads.length} Ads found`;
            const adsCard = document.getElementById('prod-card');
            adsCard.innerHTML = `${ads.map(availableAds).join('')}`;
        } else {
            adsCard.innerHTML = data.error;
        }
    }).catch(err => console.log(err));

});

const carSelected = (id) => {
    event.preventDefault();
    localStorage.setItem('car_id', id);
    window.location = 'car.html';
    return false;
}

document.getElementById('search-btn2').addEventListener('click', () => {
    search();
});

