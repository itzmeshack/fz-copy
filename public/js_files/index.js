/** pleae this file is very important its holds the 
 * fuctionality to register, slide button etc you can find more in the code  */

let allmenu = document.getElementById("sidemenu");



document.addEventListener('DOMContentLoaded', (event) => {
  function favmenuside() {
    let barcolor = document.querySelector('.fa-bars-staggered');
    let userinfo = document.getElementById('usercontent');//this is to handle the toggle for the movies and tv bars on desktop


    if (userinfo.style.left === '2000px' || userinfo.style.left === '') {
      userinfo.style.left = '88%';
      barcolor.style.color = 'red';
    } else {
      userinfo.style.left = '2000px';
      barcolor.style.color = '';
    }
  }

  // Initialize the click event
  document.querySelector('.fav').addEventListener('click', favmenuside);
});

function openmenu() {
  allmenu.style.right = "-30px";
  let coolor = document.querySelector("#mycolor");
  coolor.style.display = 'none';
  
}

function closemenu() {
  allmenu.style.right = "1000px";
  let coolor = document.querySelector("#mycolor");
  coolor.style.display = 'block';

}

function searchbar() {
  let searching = document.getElementById("search-incoming");
  let coolor = document.querySelector("#mycolor");
  let display = searching.style.display;
 

  if (display == "none") {
    searching.style.display = "block";
    coolor.style.color = "red";
  } else {
    searching.style.display = "none";
    coolor.style.color = "white";
  }
}



/** This function is for the slider */

/** fuction for treading */

function treadingmoveLeft() {

  treadingmoveSlide(-1)
};

function treadingmoveRight() {

  treadingmoveSlide(1)
};

/** fuction for new realease movies */
function realeasemoveLeft(){
    releasemoveSlide(-1)
};

function realeasemoveRight(){
    releasemoveSlide(1)
};



/** fuction for Action movies */

function actionmoveLeft(){
    actionmoveSlide(-1);
}

function actionmoveRight(){
    actionmoveSlide(1);

}


/** fuction for  tv shows */



function moviesmoveLeft(){
    moviesmoveSlide(-1);
}


function moviesmoveRight(){
    moviesmoveSlide(1);
}




//function for latestest movies


function latestmoveLeft(){
    latetestmoveSlide(-1);
}


function latestmoveRight(){
    latetestmoveSlide(1);
};


//function for latest shows;


function showmoveLeft(){
    showmoveSlide(-1);
}

function showmoveRight(){
    showmoveSlide(1);
};


// function for anime control.
function animemoveLeft(){
    animemoveSlide(-1)
}

function animemoveRight(){
    animemoveSlide(1)
}
















let slideIndex = 0;


function treadingmoveSlide(direction) {

    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
  
    let slider = document.querySelector('.treading-control');

    let sliderWidth = slides[0].clientHeight;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }

 


};


function releasemoveSlide(move) {

    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += move // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-2');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }

   


};


function actionmoveSlide(direction){
    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-3');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }

  
};



function moviesmoveSlide(direction){
    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-4');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }


}



function latetestmoveSlide(direction){

    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-5');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }

};


function  showmoveSlide(direction){

    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-6');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }

  

};


function animemoveSlide(direction){
    let slides = document.querySelectorAll('.scroll-img2'); // getting the div clas by using querySelectorAll
    let totalSlides = slides.length; // getting the legth or the numbers of div class


    slideIndex += direction // which is either right or left;

    if (slideIndex >=  totalSlides) {
        slideIndex = totalSlides - 1; 
    }
   else if (slideIndex < 0) {
    slideIndex = 0
    }
    let slider = document.querySelector('.treading-control-7');

    let sliderWidth = slides[0].clientWidth;

    let newX = -slideIndex * sliderWidth;
    
       if (newX <= -5270) {
      // If the new position exceeds a certain threshold, reset to 0
      slider.style.transform = 'translateX(0)';
      slideIndex = 0; // Reset slide index
    } else {
      slider.style.transform = `translateX(${newX}px)`;
    }



}


document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.anchor-links');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});


//fuction for favourite mark




/*

function moveSlide(direction) {
  let slides = document.querySelectorAll(".scroll-img"); // getting the div clas by using querySelectorAll
  let totalSlides = slides.length; // getting the legth or the numbers of div class

  console.log(totalSlides);

  //this for the right arrow
  if (direction === 1 && slideIndex === totalSlides - 1) {
    return;
  }
  //and this the left arrow
  if (direction === -1 && slideIndex === 0) {
    return;
  }

  slideIndex += direction;

  if (slideIndex >= totalSlides) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  }

  let slider = document.querySelector(".treading-control");

  let sliderWidth = slides[0].clientWidth;

  slider.style.transform = `translateX(${-slideIndex * sliderWidth}px)`;

  console.log(slider.style.transform);
}

*/


/*async function searchMoviesAndTVShows() {
  const searchQuery = document.getElementById("search-incoming").value;
  const Base_URL = "https://api.themoviedb.org/3";
  const API_KEY = "46affb6ad79782ea4c251824edd9edb6"; //try to hide the api key on .env file

  const searchUrl = `${Base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json()

    if(data.results && data.results.length > 0){
      const firstResult = data.results[0];
      const mediaType = firstResult.media_type;
      const id = firstResult.id;



    

    if(mediaType=='movie'){
      window.location.href = `/movie/${id}`; 
    }
    else if (mediaType == 'tv'){
      window.location.href = `/tv/${id}`; 

    }else{
      console.log('Search result type not supported');
    }

  }else{
    console.log('no search results found ')
  }


  } catch (error) {
    console.error('Error occurred while searching:', error);
  }
}

*/






const searchInput = document.querySelector('#search-incoming');
const searchSuggestions = document.getElementById('search-suggestions');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();


    function toggleSearchBar() {
      let searching = document.querySelector("#search-incoming");
      let display = searching.style.display;

      if (display == "none") {
          searching.style.display = "block";
      } else {
          searching.style.display = "none";
      }
  }

    function hideSearchSuggestions() {
      searchSuggestions.style.display = 'none';
  }
  
  // Function to show the search suggestions div
  function showSearchSuggestions() {
      searchSuggestions.style.display = 'block';
     
  }
  
  // Add event listener to the document to detect clicks outside the search suggestions div
  document.addEventListener('click', (event) => {
      const isClickInsideSuggestions = searchSuggestions.contains(event.target);
      if (!isClickInsideSuggestions) {
          hideSearchSuggestions();
      }
  });

    if (query === '') {
      hideSearchSuggestions();// Clear search suggestions if input is empty
        return;
    }

    try {
      showSearchSuggestions();

        const Base_URL = "https://api.themoviedb.org/3";
        const API_KEY = "46affb6ad79782ea4c251824edd9edb6";
  
        const searchUrl = `${Base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`;
        const response = await fetch(searchUrl);
        const searchData = await response.json();

        // Display search suggestions in the search suggestions container
        searchSuggestions.innerHTML = '';

        if (searchData && searchData.results && searchData.results.length > 0) {
            searchData.results.forEach(item => {



                const suggestion = document.createElement('div');

                //styling

            

              
              




                
                const link = document.createElement('a');
              // Assuming search results have 'title' or 'name' property
                link.href = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`; // Link to specific movie or TV show
                link.classList.add('search-suggestion');
              

                suggestion.appendChild(link);
                

          


                const backdropImg = document.createElement('img');
            backdropImg.src = 'https://image.tmdb.org/t/p/original/' + item.poster_path;
            backdropImg.alt = item.title || item.name; // Set alt text to title or name


            
        

            suggestion.appendChild(backdropImg);

            link.appendChild(backdropImg);

 


          
            
 
               
                searchSuggestions.appendChild(suggestion);
                searchSuggestions.style.display = 'block'; 
            });
        } else {
            searchSuggestions.innerHTML = '<p>No search suggestions found.</p>';
        }
    } catch (error) {
        console.error('Error fetching search suggestions:', error);
    }

 


  
});



/** for file upload */
document.getElementById('file-input').addEventListener('change', function() {
  var fileName = this.files[0].name;
  document.getElementById('file-name').textContent = fileName;
});



/*
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const output = document.getElementById('imagePreview');
    output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

*/
function previewImage(event) {

  
  const input = event.target;
  const preview = document.getElementById('image-preview');
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    preview.src = e.target.result;
    preview.style.display = 'inline';
    preview.style.textAlign = 'center';
    preview.style.width = '100px';
    preview.style.border = '1px red solid';
    preview.style.borderRadius = '100px';
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}


document.getElementById('logoutLink').addEventListener('click', function(event) {
  event.preventDefault();
  fetch('/logout', {
      method: 'DELETE'
  }).then(response => {
      if (response.ok) {
          window.location.href = '/login';
      } else {
          alert('Logout failed.');
      }
  }).catch(error => {
      console.error('Error:', error);
  });
});


document.getElementById("chillflixLink").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  document.getElementById("chillflixForm").submit(); // Submit the form
});
/*

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();

  if (query === '') {
      searchSuggestions.innerHTML = ''; // Clear search suggestions if input is empty
      return;
  }

  try {
      const Base_URL = "https://api.themoviedb.org/3";
      const API_KEY = "46affb6ad79782ea4c251824edd9edb6";

      const searchUrl = `${Base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`;
      const response = await fetch(searchUrl);
      const searchData = await response.json();

      // Display search suggestions in the search suggestions container
      searchSuggestions.innerHTML = '';

      if (searchData && searchData.results && searchData.results.length > 0) {
          searchData.results.forEach(item => {
              const suggestion = document.createElement('div');

              // Create clickable link for image
              if (item.backdrop_path) {
                  const link = document.createElement('a');
                  link.href = item.media_type === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;
                  link.target = "_blank"; // Open link in new tab

                  const backdropImg = document.createElement('img');
                  backdropImg.src = 'https://image.tmdb.org/t/p/original/' + item.backdrop_path;
                  backdropImg.alt = item.title || item.name;

                  link.appendChild(backdropImg);
                  suggestion.appendChild(link);
              }

              searchSuggestions.appendChild(suggestion);
              searchSuggestions.style.display = 'block'; 
          });
      } else {
          searchSuggestions.innerHTML = '<p>No search suggestions found.</p>';
      }
  } catch (error) {
      console.error('Error fetching search suggestions:', error);
  }
});

*/