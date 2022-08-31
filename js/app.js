const loadPhones = async (name) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    phones = phones.slice(0, 20); //display 20 phones only
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-5">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    /* stop spinner */
    // spinner.classList.add('d-none');
    toggleSpinner(false);
}


// const spinner = document.getElementById('spinner');
const searchPhone = () => {
    /* start spinner */
    // spinner.classList.remove('d-none');
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const value = searchField.value;
    loadPhones(value);
    searchField.value = '';
}

const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

// loadPhones('iphone');