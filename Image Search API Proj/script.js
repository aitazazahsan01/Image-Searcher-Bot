const apiKey = "ZlxIMCkQskjVzcO4oVejX2UlXVx_yflxal_IEoe1uM0";

// Declaring All variables

const form = document.querySelector("form");
const input = document.querySelector('.search');
const search_results = document.querySelector(".search-results");
const showMore = document.querySelector('.show-more');

// Storing Input Data From User
let inputData = "";
let page = 1;

// Function for SearchImages response and fetch

async function searchImages(){
    inputData = input.value;     // storing data enter by user

    // Dynamic Link for Particular Search
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    // Fetching Data from URL
    const response = await fetch(URL);

    // data stored in variable data
    const data = await response.json();


    const results = data.results;  // storing Pics given by Website in results variable

    if(page === 1)
    {
        search_results.innerHTML = "";
    }


    results.map((result)=>{
        const imageWrapper = document.createElement("div"); // creating a div
        imageWrapper.classList.add("search-result");      // adding div in search-result
        const image = document.createElement("img");    // creating img variable

        image.src = result.urls.small;        // getting src(link) of image
        image.alt = result.alt_description;   //getting text / Title of image

        const imageLink = document.createElement('a');     // creating anchor tag
        imageLink.href = result.links.html;          
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        // Adding Data on Website
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        search_results.appendChild(imageWrapper);

    });
    page++;
    if(page > 1)
    {
        showMore.style.display = "block";
    }
} 

// When Form is Submitted or Search Key is Hit This Function will work
form.addEventListener("submit",(event)=>{
    event.preventDefault();  // removing default pics
    page = 1;
    searchImages();
});

// Calling function Again By Clicking Show More
showMore.addEventListener("click",(event)=>{
    searchImages();
});







