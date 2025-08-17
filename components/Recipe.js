/*
   
  <main class="card">
            

         <div class="container">
            <img src="vagan_chocolate_cake.jpg" class="food-image" alt="Picture">
            <div class="Recipe-container">
                <div class="flex items-center gap-2 mb-4">
                    <span class="type">Seafood</span>
                    <span class="country">Jamaican</span>
                </div>
                <h2>Vegan chocolate</h2>
                <div class="recipe-ingredients">
                    <h3>Ingredients</h3>
                    <div class="recipe">
                        <ul>
                            <li>1/4 cup - self raising flour</li>
                            <li>1/3 cup raw - cacao</li>
                            <li>2 flax eggs</li>
                            <li>1 tsp - vanilla</li>
                        </ul>
                        <ul>
                            <li>1/2 cup - coco sugar</li>
                            <li>1 tsp - baking powder</li>
                            <li>1/2 cup - almond milk</li>
                            <li>1/2 cup - boiling water</li>
                        </ul>
                    </div>
                </div>
                <div class="Instructions-list">
                <h3>Instructions</h3>
                <p>1. Simply mix all dry ingredients with ingredients and blend altogether.
                    <br>Bake for 45 min on 180 degrees. Decorare with some melted vegan chocolate.
                </p>
                </div>
                <div class="vedio-list">
                <div id="video-post">
                  <img src="play.png" class="youtbe-icon" alt=" Video Tutorial">
                  <h3>Video tutorial</h3>
                </div>  
                <div class="Video">
                    <iframe width="455" height="290" src="https://www.youtube.com/embed/FZq-w1t9lyw?si=n5DmVFecT4deCMTZ"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                </div>
            </div>
        </div>
        
    </div>
</main>
*/

function recipeCard(food) {
  const mainCard=document.createElement("main")
  mainCard.className="card"
  const mainDIV = document.createElement("div");
  mainDIV.className = "container";

  const image = document.createElement("img");
  image.src = food.strMealThumb;
  image.className = "food-image";
  image.alt = food.strMeal;

  const secondDIV = document.createElement("div");
  secondDIV.className = "Recipe-container";

  const thirDIV = document.createElement("div");
  thirDIV.className = "items-flex";

  const spani = document.createElement("span");
  spani.className = "type";
  spani.textContent = food.strCategory;

  const spanos = document.createElement("span");
  spanos.className = "country";
  spanos.textContent = food.strArea;

  const title = document.createElement("h2");
  title.textContent = food.strMeal;

  const fourDIV = document.createElement("div");
  fourDIV.className = "recipe-ingredients";

  const titlee = document.createElement("h3");
  titlee.textContent = "Ingredients";

  const fivDIV = document.createElement("div");
  fivDIV.className = "recipe";

  const list = document.createElement("ul");
  list.className = "lis";

  
  for (let i = 1; i <= 8; i++) {
    const ingredient = food[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const li = document.createElement("li");
      li.className = `ingr${i}`;
      li.textContent = ingredient;
      list.appendChild(li);
    }
  }

  const Instruct = document.createElement("h3");
  Instruct.className = "inst";
  Instruct.textContent = "Instructions";

  const instTitle=document.createElement("h4");
  instTitle.className="VideTitile";
  instTitle.textContent="Video tutorial";

  const instructionsText = document.createElement("p");
  instructionsText.textContent = food.strInstructions;


  //   <iframe width="560" height="315" src="https://www.youtube.com/embed/4ASaCxnTqAI?si=DSdPKy96Y9YG_Vrb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  
  mainCard.append(mainDIV)
  mainDIV.append(image);
  mainDIV.append(secondDIV);
  secondDIV.append(thirDIV);
  thirDIV.append(spanos);
  thirDIV.append(spani);
  secondDIV.append(title);
  secondDIV.append(fourDIV);
  fourDIV.append(titlee);
  fourDIV.append(fivDIV);
  fivDIV.append(list);
  secondDIV.append(Instruct);
  secondDIV.append(instructionsText);
  secondDIV.append(instTitle)

  if (food.strYoutube) {
    const videoID = food.strYoutube.split("v=")[1]?.split("&")[0]; 
    if (videoID) {
      const iframe = document.createElement("iframe");
      iframe.width = "560";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoID}`;
      iframe.title = "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      const videoWrapper = document.createElement("div");
      videoWrapper.className = "video-container";
      videoWrapper.appendChild(iframe);

      secondDIV.appendChild(videoWrapper);
    }
  } 
  
  return mainDIV;
}

function fetchFood() {
  return axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => { return response.data.meals[0] })
    .catch((error) => {
      console.log(error);
    });
}

function displayfood() {
  const foodContainer = document.querySelector(".container");

  foodContainer.innerHTML = ""

  fetchFood().then((meal) => {
    if (meal) {
      foodContainer.append(recipeCard(meal));
    }
  });
}



const bt=document.querySelector("#mealSuggestion")
bt.addEventListener("click", displayfood)
displayfood();