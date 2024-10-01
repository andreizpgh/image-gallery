let query = "autumn";
const clientID = "client_id=gclHdRNUn-az5qx_nHmjSH0l-T2-EFAgOSpEfvjhVjU";
const galleryContainer = document.querySelector(".gallery");

let count = 12;

function showData(data) {
    if (count === 12) {
        for (let i = 0; i < 12; i += 1) {
            const img = document.createElement('img');
            img.classList.add('gallery-img')
            img.src = data.results[i].urls.regular;
            img.alt = `image`;

            img.addEventListener("load", () => {
                img.classList.add("loaded");
            })

            img.onclick = function openImage() {
                window.open(`${img.src}`);
            }

            galleryContainer.append(img);
        }
    }
    else {
        for (let i = count; i < count + 4; i += 1) {
            const img = document.createElement('img');
            img.classList.add('gallery-img')
            img.src = data.results[i].urls.regular;
            img.alt = `image`;

            img.addEventListener("load", () => {
                img.classList.add("loaded");
            })

            img.onclick = function openImage() {
                window.open(`${img.src}`);
            }

            galleryContainer.append(img);
        }
    }
}

async function getData() {
      const url = `https://api.unsplash.com/search/photos?page=1&per_page=30&orientation=portrait&query=${query}&${clientID}`;
      const res = await fetch(url);
      const data = await res.json();
      showData(data)
}

getData();

const searchInput = document.querySelector(".search");

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        galleryContainer.innerHTML = '';
        query = searchInput.value;
        count = 12;
        moreButton.classList.remove("hidden");
        getData();
    }
});

galleryContainer.onload = () => {
    const images = document.querySelector("gallery-img");
    images.classList.add("loaded");
};

const clearButton = document.querySelector(".clear-button");

clearButton.addEventListener("click", () => {
    searchInput.value = "";
});

function hideKeyboard(event) {
    if (event.key === "Enter") {
        searchInput.blur();
    }
}

if (window.matchMedia("(max-width: 768px)").matches) {
  searchInput.addEventListener("keypress", hideKeyboard);
}

const moreButton = document.querySelector(".show-more");

moreButton.addEventListener("click", () => {
    if (count < 24) {
        count += 4;
        console.log(count);
        getData();
    }
    if (count === 24) {
        moreButton.classList.add("hidden");
    }
})

document.addEventListener("DOMContentLoaded", function () {
    count = 12;
});
