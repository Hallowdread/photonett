//* Global Variables
const auth = "OV7ELELUrqprjMFuTlo51RPitDn4svJpJX2z4J8UWmpr2Z3zOnEtPh02";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
const moreBtn = document.querySelector('.more-btn');
let fetchLink;
let searchValue;
let currentSearch;
let page = 1;

//* Event Listeners
searchInput.addEventListener('input', updateInput);
// 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchedPhotos(searchValue);
});
// 
moreBtn.addEventListener('click', loadMore);

//* Functions
async function fetchApi(url) {
    const dataFetch = await fetch(url, 
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth
            }
        }
    );

    const data = await dataFetch.json();
    return data; 
};

function generatePhotos(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML =
        `<img src =${photo.src.large}>
        <div class="dark-bg">
            <div class ="info">
                <p>${photo.photographer}</p>
                <p><a href=${photo.src.original}><i class="fa-solid fa-download"></i></a></p>
            </div>
        </div>`
        // 
        gallery.appendChild(galleryImg);
    });
};


async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/search?query=cats&per_page=15&page=1";
    const data  = await fetchApi(fetchLink);
    generatePhotos(data);
};

async function searchedPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data  = await fetchApi(fetchLink);
    generatePhotos(data);
};

function updateInput(e) {
    searchValue = e.target.value;
};

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
};

async function loadMore(){
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/search?query=cats&per_page=15&page=${page}`;
    }
    // 
    const data = await fetchApi(fetchLink);
    generatePhotos(data); 
};

curatedPhotos();