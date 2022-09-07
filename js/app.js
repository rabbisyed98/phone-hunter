// loadphones function
const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url); // fetching data
  const data = await res.json();
  displayPhones(data.data, dataLimit); // calling display phone function
};

// display phone function
const displayPhones = (phones, dataLimit) => {
//   console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = ""; // Reseting previous search element

  //   Disply 10 phone only and load more button
  const loadMoreBtn = document.getElementById("load-more-container"); // load more btn
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    loadMoreBtn.classList.remove("d-none");
  }
  else{
    loadMoreBtn.classList.add("d-none");
  }

  //   no phone found messeage
  if (phones.length == 0) {
    document.getElementById("not-found-container").classList.remove("d-none");
  } else {
    document.getElementById("not-found-container").classList.add("d-none");
  }
  //   looping the data and displaying on UI
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="">
                <div class="card-body p-4">
                    <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a href="#" class="btn btn-primary">Show details</a>
                </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv); // pushing data to ui
  });
  // stop loader
  toggleSpinner(false);
};

// search process function

const searchProcess = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// Search btn click function
document.getElementById("search-btn").addEventListener("click", function () {
  // start loader
 searchProcess(10);
});
// loader function
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("spinner");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// show all button NB: this is not the best way
document.getElementById('load-more').addEventListener('click', function () { 
    searchProcess();
})