const categoryContainer = document.getElementById("categoryContainer");
const plantsContainer = document.getElementById("plantsContainer");
const detailsContainer = document.getElementById("detailsContainer");
const cartContainer = document.getElementById("cart");
const priceTotal = document.getElementById("total");

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plantsContainer").classList.add("hidden");
  } else {
    document.getElementById("plantsContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  manageSpinner(true);
  try {
    const res = await fetch(url);
    const details = await res.json();
    displayPlantDetails(details.plants);
  } catch (err) {
    console.error(err);
  }
  manageSpinner(false);
};

const displayPlantDetails = (plant) => {
  detailsContainer.innerHTML = `
  <div class="space-y-5">
    <h2 class="font-bold text-xl">${plant.name}</h2>
    <img class="rounded-md w-full h-60 lg:h-80" src="${plant.image}" />
    <p class="font-bold text-sm">Category: 
      <span class="font-normal text-sm"> ${plant.category}</span>
    </p>
    <p class="font-bold text-sm">Price: 
      <span class="font-normal text-sm"> ৳ ${plant.price} </span>
    </p>
    <p class="font-bold text-sm">Description: 
      <span class="font-normal text-sm"> ${plant.description}</span>
    </p>
  </div>
  `;
  document.getElementById("plant_modal").showModal();
};

const loadAllTrees = () => {
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const allTrees = data.plants;
      plantsContainer.innerHTML = "";
      showAllTrees(allTrees);
      manageSpinner(false);
    })
    .catch((err) => {
      console.log(err);
      manageSpinner(false);
    });
};

const showAllTrees = (allPlants) => {
  allPlants.forEach((allPlant) => {
    plantsContainer.innerHTML += `
    <div class="bg-white rounded-md shadow h-full flex flex-col">
      <div class="space-y-5 p-3 flex flex-col h-full">
        <div class="rounded-md">
          <img class="rounded-md w-full h-48 object-cover" src="${allPlant.image}" />
        </div>
        <h2 onclick="loadPlantDetail(${allPlant.id})" class="font-semibold">
          ${allPlant.name}
        </h2>
        <p class="text-xs flex-grow">${allPlant.description}</p>
        <div class="flex justify-between items-center text-xs">
          <span class="font-medium text-sm bg-[#DCFCE7] text-[#15803D] p-2 rounded-3xl">
            ${allPlant.category}
          </span>
          <span class="font-semibold">৳${allPlant.price}</span>
        </div>
        <button onclick="addToCart('${allPlant.name}', ${allPlant.price})"
          class="bg-[#15803D] rounded-3xl w-full text-white p-2 mt-2">
          Add to Cart
        </button>
      </div>
    </div>
    `;
  });
};

loadAllTrees();

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      showCategory(categories);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" 
        class="p-1 rounded-sm hover:bg-[#15803D] hover:text-white">
        ${cat.category_name}
      </li>
    `;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803D]");
      li.classList.remove("text-white");
    });

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803D]");
      e.target.classList.add("text-white");
      loadPlantsByCategory(e.target.id);
    }
  });
};

const loadPlantsByCategory = (categoryId) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      plantsContainer.innerHTML = "";
      showPlantsByCategory(data.plants);
      manageSpinner(false);
    })
    .catch((err) => {
      console.log(err);
      manageSpinner(false);
    });
};

const showPlantsByCategory = (plants) => {
  plantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    plantsContainer.innerHTML += `
    <div class="bg-white rounded-md shadow h-full flex flex-col">
      <div class="space-y-5 p-3 flex flex-col h-full">
        <div class="rounded-md">
          <img class="rounded-md w-full h-48 object-cover" src="${plant.image}" />
        </div>
        <h2 onclick="loadPlantDetail(${plant.id})" class="font-semibold">
          ${plant.name}
        </h2>
        <p class="text-xs flex-grow">${plant.description}</p>
        <div class="flex justify-between items-center text-xs">
          <span class="font-medium text-sm bg-[#DCFCE7] text-[#15803D] p-2 rounded-3xl">
            ${plant.category}
          </span>
          <span class="font-semibold">৳${plant.price}</span>
        </div>
        <button onclick="addToCart('${plant.name}', ${plant.price})"
          class="bg-[#15803D] rounded-3xl w-full text-white p-2 mt-2">
          Add to Cart
        </button>
      </div>
    </div>
    `;
  });
};

let cart = [];

function addToCart(name, price) {
  const existingItem = cart.find((data) => data.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter((data) => data.name !== name);
  updateCart();
}

function updateCart() {
  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((data) => {
    totalPrice += data.price * data.quantity;
    cartContainer.innerHTML += `
    
    <div class="flex justify-between items-center bg-[#E6F9ED] p-3 rounded-md mb-3">
      <div >
        <p class="font-semibold">${data.name}</p>
        <p class="text-sm">৳${data.price} × ${data.quantity}</p>
      </div>
      <button onclick="removeFromCart('${data.name}')"
        class="text-gray-600 hover:text-red-500 font-bold">×</button>
    </div>
    
    `;
  });

  priceTotal.textContent = totalPrice;
}

loadCategory();
