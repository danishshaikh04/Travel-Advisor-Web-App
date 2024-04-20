// Myapikey
// const MyApiKey = "1ed0d64e1cmshe7f57a02b05aa47p1293bdjsn46758c11056e";
const MyApiKey = "7a930a5cfamsh649d6d51e8fde55p183153jsn66f6f9d07df2";

// Importing variables id
const form = document.getElementById("form");
const main = document.getElementById("main");

const hotel_btn = document.getElementById("hotels");
const rest_btn = document.getElementById("restaurants");
const attract_btn = document.getElementById("attractions");
const allsaved_btn = document.getElementById("allsaved");

const Explore = document.getElementById("explore");
const HRA = document.getElementById("HRA");
const moreDetails = document.getElementById("moredetails");
const searchTerm = document.getElementById("search");
const micbtn = document.getElementById("micbtn");

const _pop = document.getElementById("pop");
const popImg = document.getElementById("popimg");
const popReview = document.getElementById("popreview");
const loading_c = document.getElementById("loading_c");

const r1 = document.getElementById("R1");
const r2 = document.getElementById("R2");
const r3 = document.getElementById("R3");

const p1 = document.getElementById("P1");
const p2 = document.getElementById("P2");
const p3 = document.getElementById("P3");
const p4 = document.getElementById("P4");

const dropdown = document.getElementById("dropdown");
const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");

const textbox1 = document.getElementById("textbox1");
const textbox2 = document.getElementById("textbox2");
const textbox3 = document.getElementById("textbox3");

const popupCloseBtn = document.getElementById("popup-close");

const listOfHotel = [];
const listOfRestaurant = [];
const listOfAttraction = [];
let listOfToDisplay = [];

// speech to text----------------------------------------------------------------------

function searchEngine() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    SR.lang = "en-GB";
    var recognition = new SR();
    micbtn.addEventListener("click", function() {
        loadingBar();
        recognition.start();
        _pop.innerHTML = "";
        popImg.innerHTML = "";
        popReview.innerHTML = "";
        HRA.innerHTML = "";
        loading_c.innerHTML = "";
    });
    recognition.onresult = function(e) {
        console.log(e);
        var tscript = e.results[0][0].transcript;
        searchTerm.value = tscript;
        getPlacesBySearch(searchTerm.value);
    };
}

// APIURLS

const SearchUrl = (places) =>
    `https://travel-advisor.p.rapidapi.com/locations/search?query=${places}&limit=30&offset=0&units=km&location_id=1&currency=INR&sort=relevance&lang=en_US`;

const HotelUrl = (id) =>
    `https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${id}&adults=1&rooms=1&nights=2&offset=0&currency=INR&order=asc&limit=30&sort=recommended&lang=en_US`;

const RestaurantUrl = (id) =>
    `https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${id}&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=INR&lunit=km&limit=30&open_now=false&lang=en_US`;

const AttractionUrl = (id) =>
    `https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${id}&currency=INR&lang=en_US&lunit=km&sort=recommended`;

const PhotoUrl = (id) =>
    `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${id}&currency=INR&limit=50&lang=en_US`;

const ReviewUrl = (id) =>
    `https://travel-advisor.p.rapidapi.com/reviews/list?location_id=${id}&limit=20&currency=INR&lang=en_US`;

searchEngine();
searchValue();

// Fetching API

async function getPlacesBySearch(places) {
    const resp = await fetch(SearchUrl(places), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });
    const responseData = await resp.json();
    let dataId = responseData.data[0].result_object.location_id;

    getHotelsById(dataId);
    hrasBtn(dataId);
}

function hrasBtn(dataId) {
    allsaved_btn.addEventListener("click", () => {
        _pop.innerHTML = "";
        popImg.innerHTML = "";
        popReview.innerHTML = "";
        HRA.innerHTML = "";
        fetchSavedData();
    });
    attract_btn.addEventListener("click", () => {
        _pop.innerHTML = "";
        popImg.innerHTML = "";
        popReview.innerHTML = "";
        HRA.innerHTML = "";
        loading_c.innerHTML = "";
        loadingBar();
        getAttractionsById(dataId);
    });
    rest_btn.addEventListener("click", () => {
        _pop.innerHTML = "";
        popImg.innerHTML = "";
        popReview.innerHTML = "";
        HRA.innerHTML = "";
        loading_c.innerHTML = "";
        loadingBar();
        getRestaurantsById(dataId);
    });
    hotel_btn.addEventListener("click", () => {
        _pop.innerHTML = "";
        popImg.innerHTML = "";
        popReview.innerHTML = "";
        HRA.innerHTML = "";
        loading_c.innerHTML = "";
        loadingBar();
        getHotelsById(dataId);
    });
    return dataId;
}

async function getHotelsById(id) {
    const resp = await fetch(HotelUrl(id), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });
    const responseData = await resp.json();
    HRA.innerHTML = "";

    for (let i = 0; i <= 32; i++) {
        const hotels = responseData.data[i];

        if (i == 6 || i == 15 || i == 24) {
            continue;
        } else {
            listOfHotel.push(hotels);
            listOfToDisplay.push(hotels);
            addHotel(hotels);
        }
    }
    return id;
}

async function getRestaurantsById(id) {
    const resp = await fetch(RestaurantUrl(id), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });
    const responseData = await resp.json();
    HRA.innerHTML = "";


    for (let i = 0; i <= 32; i++) {
        const restaurants = responseData.data[i];

        if (i == 4 || i == 11 || i == 18) {
            continue;
        } else {
          listOfRestaurant.push(restaurants);
          listOfToDisplay.push(restaurants);
          addRestaurant(restaurants);
        }
    }
    return id;
}

async function getAttractionsById(id) {
    const resp = await fetch(AttractionUrl(id), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });
    const responseData = await resp.json();
    HRA.innerHTML = "";


    for (let i = 0; i <= 32; i++) {
        const attractions = responseData.data[i];

        if (i == 6 || i == 15 || i == 24) {
            continue;
        } else {
          listOfAttraction.push(attractions);
          listOfToDisplay.push(attractions);
          addAttraction(attractions);
        }
    }
    return id;
}

async function getPhotoById(id) {
    const resp = await fetch(PhotoUrl(id), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });

    const responseData = await resp.json();

    const pics = responseData.data;
    addPhoto(pics);

    return id;
}

async function getReviewById(id) {
    const resp = await fetch(ReviewUrl(id), {
        method: "GET",
        headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key": MyApiKey,
        },
    });

    const responseData = await resp.json();

    const review = responseData.data;
    addReview(review);

    return id;
}

function searchValue() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const searchTerm = search.value;

        if (searchTerm) {
            Explore.innerHTML = "";
            _pop.innerHTML = "";
            popImg.innerHTML = "";
            popReview.innerHTML = "";
            HRA.innerHTML = "";
            getPlacesBySearch(searchTerm);

            search.value = "";
            loadingBar();
        }
    });
}

function show(anything1) {
    textbox1.value = anything1;
    tt1 = textbox1.value;
    Explore.innerHTML = "";
    _pop.innerHTML = "";
    popImg.innerHTML = "";
    popReview.innerHTML = "";
    HRA.innerHTML = "";
    switch (tt1) {
        case "All":
          listOfToDisplay = listOfHotel;
          listOfToDisplay.forEach((e) => addHotel(e));
          break;
        case "Below 3.0":
          listOfToDisplay = listOfHotel.filter(
              (hotel) => parseFloat(hotel.rating) < 3.0
          );
          listOfToDisplay.forEach((e) => addHotel(e));
          console.log(listOfToDisplay);
          break;
        case "3.0 - 4.0":
          listOfToDisplay = listOfHotel.filter(
              (hotel) => (parseFloat(hotel.rating) >= 3.0) || (parseFloat(hotel.rating) <= 4.0)
          );
          listOfToDisplay.forEach((e) => addHotel(e));
          console.log(listOfToDisplay);
          break;
        case "Above 4.0":
          listOfToDisplay = listOfHotel.filter(
            (hotel) => parseFloat(hotel.rating) > 4.0
          );
          listOfToDisplay.forEach((e) => addHotel(e));
          console.log(listOfToDisplay);
          break;
        default:
          infoEL.innerHTML =`
            <h1 class="error">There is no such Results.</h1>
          `;
          HRA.appendChild(infoEL);
          break;
    }
    console.log(tt1);
}

function show1(anything2) {
  textbox2.value = anything2;
  tt2 = textbox2.value;

  console.log(tt2);
}

function show2(anything3) {
    textbox3.value = anything3;
}

dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});
dropdown1.addEventListener("click", () => {
    dropdown1.classList.toggle("active");
});
dropdown2.addEventListener("click", () => {
    dropdown2.classList.toggle("active");
});

// Loader
function loadingBar() {
    Explore.innerHTML = "";
    _pop.innerHTML = "";
    popImg.innerHTML = "";
    popReview.innerHTML = "";
    HRA.innerHTML = "";

    const load = document.createElement("div");

    load.innerHTML = `
		<div class="loader">
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</div>
	`;

    loading_c.appendChild(load);

    loading_c.classList.remove("hidden");
}

// async function fetchSavedData(){
// 	const placeIds = getPlaceLS();

// 	for(let i = 0; i < placeIds.length; i++){
// 		const placeId = placeIds[i];
// 		const resp1 = await fetch(HotelUrl(placeId), {
// 			"method": "GET",
// 			"headers": {
// 				"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
// 				"x-rapidapi-key": MyApiKey
// 			}
// 		});
// 		const responseData1 = await resp1.json();

// 		const hotel = responseData1.data[i];
// 		if (i == 0){
// 			addSaved_Hotel(hotel);
// 		} else {
// 			const resp2 = await fetch(RestaurantUrl(placeId), {
// 				"method": "GET",
// 				"headers": {
// 					"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
// 					"x-rapidapi-key": MyApiKey
// 				}
// 			});
// 			const responseData2 = await resp2.json();

// 			const restaurant = responseData2.data[i];
// 			if (i == 0){
// 				addSaved_Restaurant(restaurant);
// 			} else {
// 				const resp3 = await fetch(AttractionUrl(placeId), {
// 					"method": "GET",
// 					"headers": {
// 						"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
// 						"x-rapidapi-key": MyApiKey
// 					}
// 				});
// 				const responseData3 = await resp3.json();

// 				const attraction = responseData3.data[i];
// 				if (i == 0){
// 					addSaved_Attraction(attraction);

// 				} else {
// 					continue;
// 				}
// 			}
// 		}
// 	}
// }

// function addSaved_Hotel(_data){
// 	console.log(_data.location_id);
// }

// function addSaved_Restaurant(_data){
// 	console.log(_data.location_id);
// }

// function addSaved_Attraction(_data){
// 	console.log(_data.location_id);
// }

function addHotel(hotels) {
    hotel_btn.classList.add("active");
    rest_btn.classList.remove("active");
    attract_btn.classList.remove("active");

    Explore.innerHTML = "";
    loading_c.innerHTML = "";

    const infoEL = document.createElement("div");
    infoEL.classList.add("HRA-details");

    infoEL.innerHTML = `
		<div class="search-container" id="search-container">
			<div class="search-col">
				${
          hotels.photo
            ? `<img 
				src = "${hotels.photo.images.original.url}" 
				alt = "${hotels.name}">`
            : `<img src="./images/hotelimg.jpg" alt="Hotelimage">`
        }
				<div class="main-info">
					<h2>${hotels.name}</h2>
					<h4>Address :
						<span> ${hotels.location_string}</span>
					</h4>
					<ul class="details-info">
						<li>Rating : ${
              hotels.rating
                ? `<span class="${getRating(hotels.rating)}"> ${
                    hotels.rating
                  }</span>`
                : `NA`
            } </li>
						<li><button id="moredetails">more details</button>
						</li>
					</ul>
					<ul class="price-saved">
						${hotels.price ? `<li>${hotels.price}</li>` : `NA`}
						<li>
							<button class="save-btn">
								<i class="fas fa-bookmark"></i>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`;

  const detailbtn = infoEL.querySelector(".details-info #moredetails");

  detailbtn.addEventListener("click", () => {
    _pop.innerHTML = "";
    showDetailsInfo(hotels);
  });

  const btn = infoEL.querySelector(".price-saved .save-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removePlaceLS(hotels.location_id);
      btn.classList.remove("active");
    } else {
      addPlaceLS(hotels.location_id);
      btn.classList.add("active");
    }
  });

  HRA.appendChild(infoEL);

  console.log(hotels);
}

function addRestaurant(restaurants) {
  rest_btn.classList.add("active");
  attract_btn.classList.remove("active");
  hotel_btn.classList.remove("active");

  Explore.innerHTML = "";
  loading_c.innerHTML = "";

  const infoEL = document.createElement("div");
  infoEL.classList.add("HRA-details");

  infoEL.innerHTML = `
		<div class="search-container" id="search-container">
			<div class="search-col">
				${
          restaurants.photo
            ? `<img 
				src = "${restaurants.photo.images.original.url}" 
				alt = "${restaurants.name}">`
            : `<img src="./images/restaurantimg.jpg" alt="Restaurantimage">`
        }
				<div class="main-info">
					<h2>${restaurants.name}</h2>
					<h4>Address :
						<span> ${restaurants.address}</span>
					</h4>
					<ul class="details-info">
						<li>Rating : ${
              restaurants.rating
                ? `<span class="${getRating(restaurants.rating)}"> ${
                    restaurants.rating
                  }</span>`
                : `NA`
            } </li>
						<li><button id="moredetails">more details</button>
						</li>
					</ul>
					<ul class="price-saved">
						${restaurants.price ? `<li>${restaurants.price}</li>` : `NA`}
						<li>
							<button class="save-btn">
								<i class="fas fa-bookmark"></i>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`;

  const detailbtn = infoEL.querySelector(".details-info #moredetails");

  detailbtn.addEventListener("click", () => {
    _pop.innerHTML = "";
    showDetailsInfo(restaurants);
  });

  const btn = infoEL.querySelector(".price-saved .save-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removePlaceLS(restaurants.location_id);
      btn.classList.remove("active");
    } else {
      addPlaceLS(restaurants.location_id);
      btn.classList.add("active");
    }
  });

  HRA.appendChild(infoEL);

  console.log(restaurants);
}

function addAttraction(attractions) {
  attract_btn.classList.add("active");
  hotel_btn.classList.remove("active");
  rest_btn.classList.remove("active");

  Explore.innerHTML = "";
  loading_c.innerHTML = "";

  const infoEL = document.createElement("div");
  infoEL.classList.add("HRA-details");

  infoEL.innerHTML = `
		<div class="search-container" id="search-container">
			<div class="search-col">
				${
          attractions.photo
            ? `<img 
				src = "${attractions.photo.images.original.url}" 
				alt = "${attractions.name}">`
            : `<img src="./images/attractionimg.jpg" alt="Attractionimage">`
        }
				<div class="main-info">
					<h2>${attractions.name}</h2>
					<h4>Address :
						<span> ${attractions.address}</span>
					</h4>
					<ul class="details-info">
						<li>Rating : ${
              attractions.rating
                ? `<span class="${getRating(attractions.rating)}"> ${
                    attractions.rating
                  }</span>`
                : `NA`
            } </li>
						<li><button id="moredetails">more details</button>
						</li>
					</ul>
					<ul class="price-saved">
						${
              attractions.num_reviews
                ? `<li>Reviews : ${attractions.num_reviews}</li>`
                : `NA`
            }
						<li>
							<button class="save-btn">
								<i class="fas fa-bookmark"></i>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	`;

  const detailbtn = infoEL.querySelector(".details-info #moredetails");

  detailbtn.addEventListener("click", () => {
    _pop.innerHTML = "";
    showDetailsInfo(attractions);
  });

  const btn = infoEL.querySelector(".price-saved .save-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removePlaceLS(attractions.location_id);
      btn.classList.remove("active");
    } else {
      addPlaceLS(attractions.location_id);
      btn.classList.add("active");
    }
  });

  HRA.appendChild(infoEL);

  console.log(attractions);
}

function getRating(rate) {
  if (rate >= 4) {
    return "green";
  } else if (rate >= 3) {
    return "orange";
  } else {
    return "red";
  }
}

function addPlaceLS(placeId) {
  const placeIds = getPlaceLS();

  localStorage.setItem("placeIds", JSON.stringify([...placeIds, placeId]));
}

function removePlaceLS(placeId) {
  const placeIds = getPlaceLS();

  localStorage.setItem(
    "placeIds",
    JSON.stringify(placeIds.filter((id) => id !== placeId))
  );
}

function getPlaceLS() {
  const placeIds = JSON.parse(localStorage.getItem("placeIds"));

  return placeIds === null ? [] : placeIds;
}

function showDetailsInfo(fullInfo) {
  // clean it up
  HRA.innerHTML = "";

  const dataPopup = document.createElement("div");

  dataPopup.innerHTML = `
		<div class="popup-container" id="details-popup">
			<div class="popup">
				<nav class="nav-popup">
					<ul>
						<li><button id="allphotos">All Photos</button></li>
						<li><button id="allreviews">All Reviews</button></li>
						<li><i class="fas fa-times" id="popup-close"></i></li>
					</ul>
				</nav>
			</div>
			<div class="popup-row">
				<div class="popup-col-1">
					<h2>${fullInfo.name}</h2>
					${
            fullInfo.address
              ? `<p>${fullInfo.address}</p>`
              : `<p>${fullInfo.location_string}</p>`
          }
					<h3 class="Rank">${fullInfo.ranking}</h3>
					${fullInfo.rating ? `<h4>Rating : ${fullInfo.rating}</h4>` : ``}
					${fullInfo.price ? `<h4 class="INR">${fullInfo.price}</h4>` : ``}
					${
            fullInfo.subcategory_type
              ? `<h4 class="category">( ${fullInfo.subcategory_type} )`
              : ``
          }${
    fullInfo.num_reviews
      ? `<i class="fa-solid fa-eye"></i> ${fullInfo.num_reviews}</h4>`
      : ``
  }
				</div>
				<div class="popup-col-2">
					${
            fullInfo.photo
              ? `<img src="${fullInfo.photo.images.original.url}" class="popupcol-img">`
              : `<img src="./images/hotelimg.jpg" alt="Hotelimage" class="defaultimg">`
          }
				</div>
			</div>
		</div>
	`;

  _pop.appendChild(dataPopup);

  // show the poppup
  _pop.classList.remove("hidden");

  // photos button
  const allPhotos = document.querySelector(".popup .nav-popup #allphotos");
  allPhotos.addEventListener("click", () => {
    loadingBar();
    _pop.classList.add("hidden");
    popImg.innerHTML = "";
    getPhotoById(fullInfo.location_id);
  });

  // reviews button
  const allReviews = document.querySelector(".popup .nav-popup #allreviews");
  allReviews.addEventListener("click", () => {
    loadingBar();
    _pop.classList.add("hidden");
    popReview.innerHTML = "";
    getReviewById(fullInfo.location_id);
  });

  // cancel button
  const cancelBtn = document.querySelector(".popup .nav-popup #popup-close");
  cancelBtn.addEventListener("click", () => {
    _pop.classList.add("hidden");
  });
  console.log(fullInfo);
}

function addPhoto(pics) {
  // clean it up
  HRA.innerHTML = "";
  _pop.innerHTML = "";
  loading_c.innerHTML = "";

  const picGallery = document.createElement("div");

  const allImg = [];
  for (let i = 0; i <= 49; i++) {
    if (pics[i]) {
      allImg.push(pics[i]);
    } else {
      break;
    }
  }

  picGallery.innerHTML = `
		<div class="image-gallery" id="image-gallery">
			<nav class="nav-img-g">
				<h2>All Photos</h2>
				<i class="fas fa-times" id="popup-close"></i>
			</nav>
			<div class="box">
				${allImg
          .map(
            (img) => `${
              img.images
                ? `<a href="${img.images.original.url}" data-lightbox="images" data-title=""><img src="${img.images.original.url}">`
                : `Na`
            }
				</a>`
          )
          .join("")}
			</div>
		</div>
	`;

  popImg.appendChild(picGallery);

  popImg.classList.remove("hidden");

  // cancel button
  const cancelBtn = document.querySelector(
    ".image-gallery .nav-img-g #popup-close"
  );
  cancel(cancelBtn);
}

function addReview(review) {
  // clean it up
  HRA.innerHTML = "";
  _pop.innerHTML = "";
  loading_c.innerHTML = "";

  const _reviews = document.createElement("div");

  const allReviews = [];
  for (let i = 0; i <= 19; i++) {
    if (review[i]) {
      allReviews.push(review[i]);
    } else {
      break;
    }
  }

  _reviews.innerHTML = `
		<div class="review-container">
			<div class="cross">
				<li><i class="fas fa-times" id="popup-close"></i></li>
			</div>
			<div class="hero">
				<h1>Customer Reviews</h1>
				<div class="review-box">
					<div id="slide">
						${allReviews
              .map(
                (view) => `<div class="card">
							<div class="profile">
								${
                  view.user.avatar
                    ? `<img src="${view.user.avatar.large.url}">`
                    : `<img src="./images/0.png">`
                }
								<div>
									${view.user.username ? `<h3>${view.user.username}</h3>` : ``}
									${view.title ? `<p>${view.title}</p>` : ``}
								</div>
							</div>
							${view.text ? `<p>"${view.text}"</p>` : ``}
						</div>`
              )
              .join("")}
					</div>
					<div class="sidebar">
						<i class="fas fa-chevron-circle-up" id="up-arrow"></i>
						<i class="fas fa-chevron-circle-down" id="down-arrow"></i>
					</div>
				</div>
			</div>
		</div>
	`;

  popReview.appendChild(_reviews);

  popReview.classList.remove("hidden");

  let x = 0;

  // upparrow button
  const upArrow = document.querySelector(
    ".review-container .hero .review-box .sidebar #up-arrow"
  );
  upArrow.addEventListener("click", () => {
    if (x > "-5700") {
      x = x - 300;
      slide.style.top = `${x}px`;
    }
  });

  // downarrow buuton
  const downArrow = document.querySelector(
    ".review-container .hero .review-box .sidebar #down-arrow"
  );
  downArrow.addEventListener("click", () => {
    if (x < "0") {
      x = x + 300;
      slide.style.top = `${x}px`;
    }
  });

  // cancel button
  const cancelBtn = document.querySelector(
    ".review-container .cross #popup-close"
  );
  cancel(cancelBtn);
}

function cancel(cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    popReview.classList.add("hidden");
    popImg.classList.add("hidden");
    _pop.classList.add("hidden");
  });
}