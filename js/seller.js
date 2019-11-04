window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const seller_id = localStorage.getItem('seller_id');
    const first_name = localStorage.getItem('seller_fname');
    const last_name = localStorage.getItem('seller_lname');
    if (token) {
        document.getElementById('signup-btn').style.display = 'none';
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('profile-btn').style.removeProperty('display');
    }

    const sellerAds = (car) => {
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

    // Fetch used ads
    fetch(`https://auto-mart-api.herokuapp.com/api/v1/car/seller/${seller_id}`, {
        method: 'get',
        headers: {
            'Authorization': token
        },
    }).then((response) => {
        return response.json();
    }).then((data) => {
        const ads = data.seller_ads;
        if (ads) {
            document.getElementById('seller-name').innerHTML = `All Ads by ${first_name} ${last_name}`;
            document.getElementById('seller-count').innerHTML = `${ads.length} Ads found`;
            const sellerAdsCard = document.getElementById('prod-card');
            sellerAdsCard.innerHTML = `${ads.map(sellerAds).join('')}`;
        } else {
            sellerAdsCard.innerHTML = data.error;
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