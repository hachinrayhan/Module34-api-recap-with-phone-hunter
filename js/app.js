const loadPhones = async (name, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${name}`);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    /* Show all button display */
    const allBtnSection = document.getElementById('all-btn-section');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10); //display 20 phones only
        allBtnSection.classList.remove('d-none');
    }
    else {
        allBtnSection.classList.add('d-none');
    }
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    /* No phone found */
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
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    /* stop spinner */
    // spinner.classList.add('d-none');
    toggleSpinner(false);
}

const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const value = searchField.value;
    loadPhones(value, dataLimit);
}


// const spinner = document.getElementById('spinner');
const searchPhone = () => {
    /* start spinner */
    // spinner.classList.remove('d-none');
    searchProcess(10);
}

/* Show all button */
document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})

/* Search by Enter key */
const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchProcess(10);
    }
})

const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const loadPhoneDetails = async id => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const title = document.getElementById('phoneDetailsModalLabel');
    title.innerText = phone.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <p>Chipset: ${phone.mainFeatures.chipSet} <br> Display Size: ${phone.mainFeatures.displaySize} <br> Memory: ${phone.mainFeatures.memory} <br> Release Date: ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
    `;
}

loadPhones('iphone');