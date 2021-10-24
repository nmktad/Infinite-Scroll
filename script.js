const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imgloaded = 0;
let totalImages = 0;
let photosArray = [];

const forSetAttributes = (ele, att) => {
    for (const key in att) {
        ele.setAttribute(key, att[key]);
    }
}

const displayPhotos = () => {
    totalImages = photosArray.length;
    imgloaded = 0;

    photosArray.forEach(photo => {
        const item = document.createElement('a');
        forSetAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        forSetAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API 
let count = 5;
const apiKEY = 'Ql9JcTQMkoXa5lOnBWOP79A3txljy7yyRjy9QpfyVXo';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

// Fetch from API
const getPhotos = async function() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch(err) {
        console.log(err);
    }
}

const imageLoaded = () => {
    imgloaded++;

    if (imgloaded < 15) {
        loader.hidden = true;
    }

    if(imgloaded === totalImages) {
        ready = true;
        count = 30;
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= (document.body.offsetHeight - 1000) && ready) { 
        ready = false;
        getPhotos();
    }
})

getPhotos();
