const search = () => {
    event.preventDefault();
    const manufacturer = document.getElementById('manufacturer').value;
    const state = document.getElementById('state').value;
    const body_type = document.getElementById('body-type').value;
    const min_price = document.getElementById('min-price').value;
    const max_price = document.getElementById('max-price').value;
    sessionStorage.setItem('manufacturer', manufacturer);
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('body-type', body_type);
    sessionStorage.setItem('min-price', min_price);
    sessionStorage.setItem('max-price', max_price);
    window.location = 'search.html';
    return false;
}