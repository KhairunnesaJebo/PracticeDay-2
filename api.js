function search(){

   const searchValue = document.getElementById("search").value;

   document.getElementById("search").value = "";


    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res)=>res.json())
    .then((data) => {
        displayData(data.meals);
    })
    .catch((err) => {
        console.log(err);
    })
}

const displayData = (foodData) => {
    const container = document.getElementById("card-container");

    document.getElementById("fooddetails").innerHTML = "";

    container.innerHTML = "";

    if (foodData == null) {
        const h2 = document.createElement("h2")
        h2.innerText = "Not Found!";
        container.appendChild(h2);

    }
    else {
        foodData.forEach(food => {
            const div = document.createElement("div");
            div.classList.add("cardfood");
    
            div.innerHTML = `
            <img onclick="foodDescription('${food.idMeal}')" class = "card-img" src=${food.strMealThumb} alt="" />
            <h2 class = "card-title">${food.strMeal}</h2>
            `;
    
            container.appendChild(div);
    
            });
    }

}

const foodDescription = (id) => {

    const detailsContainer = document.getElementById("fooddetails");

    detailsContainer.innerHTML = "";

    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=> {
        data.meals.forEach(meal => {
            const div = document.createElement("div");
            div.classList.add("cardfood");
    
            div.innerHTML = `
            <img class = "card-img" src=${meal.strMealThumb} alt="" />
            <h2 class = "card-title">${meal.strMeal}</h2>
            <h4 class = "card-title2">Ingredients</h4>         
            `;

            for (let i = 1; i <= 20; i++)
            {   const key = `strIngredient${i}`;
                const ingred = `<li class="list-item">${meal[key]}</li>`;
                if (meal[key] != null && meal[key] != "") {
                    div.innerHTML = div.innerHTML + ingred;
                    console.log(ingred);
                }
            }
            detailsContainer.appendChild(div);

            })
        detailsContainer.scrollIntoView({behavior: "smooth"} );
    });

    
};
