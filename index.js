const categoryContainer = document.getElementById("categoryContainer");

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

loadCategory();

const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
        <li id="${cat.id}" class="p-1  rounded-sm hover:bg-[#15803D] hover:text-white">
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
    }
  });
};
