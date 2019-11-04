window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const userAds = (car) => {
        const date = new Date(car.date);
        const carDate = date.toDateString();
        return `
            <tr>
                <td class="product-thumb">
                    <img class="ads-pic img-thumbnail" src="${car.image[0].public_url}" alt="image description">
                </td>
                <td class="product-details">
                    <h3 class="title">${car.name}</h3>
                    <span class="add-id"><strong>Model:</strong> ${car.model}</span>
                    <span><strong>Posted on: </strong><time>${carDate}</time> </span>
                    <span class=""><strong>Price: </strong>$${car.price}</span>
                    <span class="location"><strong>Condition: </strong>${car.state}</span>
                    <span class="location"><strong>Status: </strong>${car.status}</span>
                </td>
                <td class="product-category"><span class="categories">${car.manufacturer.toUpperCase()}</span></td>
                <td class="action" data-title="Action">
                    <div class="">
                        <ul class="list-inline justify-content-center">
                            <li class="list-inline-item">
                                <a onclick="carSelected('${car._id}')" data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                                    class="view" href="">
                                    <i class="fa fa-eye"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a onclick="carEdit('${car._id}', '${car.price}')" class="edit" href="">
                                    <i class="fa fa-pencil"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a onclick="carDelete('${car._id}')" class="delete"
                                    href="">
                                    <i class="fa fa-trash"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        `
    }
    const name = document.getElementById('name');
    const joined = document.getElementById('joined');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const profilePic = document.getElementById('profile-pic');

    fetch('https://auto-mart-api.herokuapp.com/api/v1/profile', {
        method: 'get',
        headers: {
            'Authorization': token
        },
    }).then((response) => {
        return response.json();
    }).then((data) => {
        const profile = data.current_user;
        const userDate = new Date(profile.joined);
        const joinDate = userDate.toDateString();
        name.innerHTML = `${profile.first_name} ${profile.last_name}`;
        joined.innerHTML = `Joined: ${joinDate}`;
        email.innerHTML = `Email: ${profile.email}`;
        phone.innerHTML = `Phone: ${profile.phone}`;
        profilePic.src = `${profile.profile_pic[0].public_url}`;
    }).catch(err => console.log(err));

    // Fetch user ads
    fetch('https://auto-mart-api.herokuapp.com/api/v1/car/user/user_cars', {
        method: 'get',
        headers: {
            'Authorization': token
        },
    }).then((response) => {
        return response.json();
    }).then((data) => {
        const ads = data.user_cars;
        if (ads) {
            const tbody = document.getElementById('user-ads');
            tbody.innerHTML = `${ads.map(userAds).join('')}`;
        } else {
            tbody.innerHTML = data.error;
        }
    }).catch(err => console.log(err));

})

const carSelected = (id) => {
    event.preventDefault();
    localStorage.setItem('car_id', id);
    window.location = 'car.html';
    return false;
}

const carEdit = (id, price) => {
    event.preventDefault();
    localStorage.setItem('edit_car_id', id);
    localStorage.setItem('car_price', price);
    window.location = 'edit-listing.html';
    return false;
}

const carDelete = (id) => {
    event.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            const token = localStorage.getItem('token');
            fetch(`https://auto-mart-api.herokuapp.com/api/v1/car/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your ad has been deleted. Please refresh your page.',
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
        }
    }).catch((err) => console.log(err));
}

