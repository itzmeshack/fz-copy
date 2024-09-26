/** @_kingmeshack code boss */
/** yes */
























if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const fetch = require("node-fetch");
const multer = require("multer");
const helmet = require("helmet");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

/* we coming back to cache so we can see how we can efficiently use it through out the server/*/


// Apply cache middleware to routes


const apicache = require('apicache');


const cacheDuration = '1 minutes';

const  cache = apicache.middleware;

/** for redis application */
/*
const redisClient = redis.createClient({
  host: 'localhost', // or your Redis server address
  port: 6379,        // default Redis port
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Set up session with Redis store
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
*/






/*
const limiter = rateLimit({
const rateLimit = require('express-rate-limit');
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
*/




const serveStatic = require('serve-static');
app.use(serveStatic(path.join(__dirname, 'public')));


const compression = require('compression');
app.use(compression());





// Example error handling
app.use((err, req, res, next) => {
  if (err instanceof apicache.Error) {
      // Handle apicache-specific errors
      res.status(500).send('Apicache error: ' + err.message);
  } else {
      // Handle other errors
      res.status(500).send('Internal Server Error');
  }
});









const initializePassport = require("./api/passport-config");

const User = require('./api/user');
const Favourite = require('./api/favourite');






//for geting movies details
//const  fetchmovies = require('./movieServer');

const { name } = require("ejs");
initializePassport(
  passport,
  (email) => user.find((user) => user.email === email),
  (id) => user.find((user) => user.id === id)
);

const PORT = process.env.PORT || 3000;



const user = [];


/** storage of file for uploading user profile */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


/** multer usage  */

const upload = multer({ storage: storage });

app.listen(PORT, () => {
  console.log(`server running successfully on ${PORT}`);
});

app.set("view-engine", "ejs");
app.set('views', path.join(__dirname, 'views'));




//static
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheet', express.static(path.join(__dirname, 'public', 'stylesheet')));
app.use('/js_files', express.static(path.join(__dirname, 'public', 'js_files')));
app.use('/images_files', express.static(path.join(__dirname, 'public', 'images_files')));






app.use(express.urlencoded({ extended: false }));

app.use(flash());

// Connect to MongoDB


mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://elsawilom:Omonzogbe2004.@cluster0.byvppgq.mongodb.net/', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true/** no need for this because it has already been updated in later version */


}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});



app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb+srv://elsawilom:Omonzogbe2004.@cluster0.byvppgq.mongodb.net/',
      collectionName: 'sessions',
      ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days in milliseconds
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());


//Please be careful when touching this links bellow  
















//universal url for main movies in home link
const API_KEY = "46affb6ad79782ea4c251824edd9edb6"; //try to hide the api key on .env file
const Base_URL = "https://api.themoviedb.org/3";
const url = `${Base_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`; //url for main movie
const urlTrending_movies = `${Base_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`; //url for trending movies
const urlLatestMovies = `${Base_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`; //url for latest movies
const urlActionMovies = `${Base_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`; // url for action movies this for the home link.
const urlTvseries = `${Base_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US&page=1`; // url for tv series
const urlHorrorMovies = `${Base_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`;
const urlRatedMovies = `${Base_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
//const urlBestAnime = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&with_genres=16`;
const urlBestAnime = `${Base_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`;







app.get('/watch/movie/:movieId', checkAuthenticated, async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movieUrl = `${Base_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(movieUrl);
    const movieData = await response.json();

    res.render('watch-movies.ejs', { movie: movieData,  user: req.user  });
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/watch/tv/:tvId', checkAuthenticated, async (req, res) => {
  try {
    const tvId = req.params.tvId;
    const seasonNumber = req.query.season || 1; // Default to season 1 if not provided
    const episodeNumber = req.query.episode || null; // Default to null if not provided

    const tvUrl = `${Base_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`;
    const seasonUrl = `${Base_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`;

    const tvResponse = await fetch(tvUrl);
    const seasonResponse = await fetch(seasonUrl);

    const tvData = await tvResponse.json();
    const seasonData = await seasonResponse.json();

    // Default to the first episode of the season if no episode is specified
    let episodeData = null;
    if (!episodeNumber && seasonData.episodes.length > 0) {
      episodeData = seasonData.episodes[0];
    } else if (episodeNumber) {
      const episodeUrl = `${Base_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=en-US`;
      const episodeResponse = await fetch(episodeUrl);
      episodeData = await episodeResponse.json();
    }

    res.render('watch-tv.ejs', {
      tvshow: tvData,
      seasons: tvData.seasons,  // Extract the seasons from the tvData
      season: seasonData,
      episode: episodeData,     // Pass the episode data
      user: req.user,
    });
  } catch (error) {
    console.error('Error fetching TV show data:', error);
    res.status(500).send('Internal Server Error');
  }
});






let movies = [];

app.get("/home",   checkAuthenticated, cache(cacheDuration), async (req, res) => {
  try {
    const [
      response,
      trendingResponse,
      latestResponse,
      actionResponse,
      tvResponse,
      horrorResponse,
      ratedResponse,
      animeResponse,
    ] = await Promise.all([
      fetch(url),
      fetch(urlTrending_movies),
      fetch(urlLatestMovies),
      fetch(urlActionMovies),
      fetch(urlTvseries),
      fetch(urlHorrorMovies),
      fetch(urlRatedMovies),
      fetch(urlBestAnime),
    ]);

    const [
      data,
      trendingData,
      latestData,
      actionData,
      tvData,
      horrorData,
      ratedData,
      animeData,
    ] = await Promise.all([
      response.json(),
      trendingResponse.json(),
      latestResponse.json(),
      actionResponse.json(),
      tvResponse.json(),
      horrorResponse.json(),
      ratedResponse.json(),
      animeResponse.json(),
    ]);

    const shuffledMovies = actionData.results.sort(() => 0.5 - Math.random());
    const randomMovie = shuffledMovies.slice(0, 19);

    // Function to determine movie quality
    const determineQuality = (movie) => {
      const releaseDate = new Date(movie.release_date);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - releaseDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays < 30 ? 'Cam' : 'HD';
    };

    // Apply quality to all movie datasets
    const applyQuality = (movies) => movies.map(movie => ({
      ...movie,
      quality: determineQuality(movie)
    }));

    const moviesWithQuality = applyQuality(data.results);
    const trendingMoviesWithQuality = applyQuality(trendingData.results);
    const latestMoviesWithQuality = applyQuality(latestData.results);
    const actionMoviesWithQuality = applyQuality(actionData.results);
    const tvSeriesWithQuality = applyQuality(tvData.results);
    const horrorMoviesWithQuality = applyQuality(horrorData.results);
    const ratedMoviesWithQuality = applyQuality(ratedData.results);
    const animeMoviesWithQuality = applyQuality(animeData.results);

    if (data.results.length > 0) {
      movies = moviesWithQuality[0];
      const releaseYear = data.results[1].release_date.split("-");
      res.render("home.ejs", {
        releaseYear,
        randomMovie,
        movies,
        trendingMovies: trendingMoviesWithQuality,
        latestMovies: latestMoviesWithQuality,
        tvseriesMovies: tvSeriesWithQuality,
        horrorMovies: horrorMoviesWithQuality,
        ratedMovies: ratedMoviesWithQuality,
        animeMovies: animeMoviesWithQuality,
        user: req.user 
      });
    } 
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

//renders routes

/*
  app.get('/home', (req, res) =>{
    res.render('home.ejs',// {trending: trending});

    /*try {
        //const trending = await fetchmovies()
        // Pass the movie object to the template when rendering 'home.ejs'
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).send('Internal Server Error');
    }


});    
*/

app.get("/movie/:movieId", checkAuthenticated,  async (req, res) => {
  const movieId = req.params.movieId;
  const url = `${Base_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Function to determine movie quality
    const determineQuality = (movie) => {
      const releaseDate = new Date(movie.release_date);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - releaseDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays < 30 ? 'Cam' : 'HD';
    };

    // Set the quality for the movie
    data.quality = determineQuality(data);

    // Fetching cast & credits
    const castUrl = `${Base_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const castResponse = await fetch(castUrl);
    const castData = await castResponse.json();
    const cast = castData.cast;

    // Fetching genres
    const genresUrl = `${Base_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const genresResponse = await fetch(genresUrl);
    const genresData = await genresResponse.json();
    const genres = genresData.genres;

    // Fetching production countries and spoken languages
    const countries = data.production_countries;
    const languages = data.spoken_languages;
    const userId = req.user.id;
    const isFavorite = await Favourite.exists({ userId, movieId });



    // Fetching recommendations
    const recommendationsUrl = `${Base_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`;
    const recommendationsResponse = await fetch(recommendationsUrl);
    const recommendationsData = await recommendationsResponse.json();
    const recommendations = recommendationsData.results;


    res.render("movies_info.ejs", {
      movie: data,
      movieCast: cast,
      movieGenres: genres,
      duration: data.runtime,
      countries: countries,
      languages: languages,
      user: req.user,
      recommendations,
      isFavorite
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).send("Error fetching movie details");
  }
});


app.get("/tv/:tvId", checkAuthenticated,  async (req, res) => {
  const tvId = req.params.tvId;
  //const url = `${Base_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const tvUrl = `${Base_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`;

  //getting the tv season
  const tvSeasonsUrl = `${Base_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=seasons`;

  //fetching the url of the tv season
  const tvSeason_response = await fetch(tvSeasonsUrl);

  //converting the response into json
  const tvSeason_data = await tvSeason_response.json();

  const response = await fetch(tvUrl);
  const data = await response.json();

  //for cast
  const castUrl = `${Base_URL}/tv/${tvId}/credits?api_key=${API_KEY}`;
  const castResponse = await fetch(castUrl);
  const castData = await castResponse.json();
  const cast = castData.cast;



  const genresUrl = `${Base_URL}/tv/${tvId}?api_key=${API_KEY}`;
  const genresResponse = await fetch(genresUrl);
  const genresData = await genresResponse.json();
 

  // Extract genres from the response
  const genres = genresData.genres;



  
  const tvSeasonsResponse = await fetch(tvSeasonsUrl);
  const tvSeasonsData = await tvSeasonsResponse.json();


  let totalDuration = 45;
    if (tvSeasonsData.seasons) {
        tvSeasonsData.seasons.forEach(season => {
            if (season.episodes) {
                season.episodes.forEach(episode => {
                    totalDuration += episode.runtime || 0;
                });
            }
        });
    }


      // Fetching production countries and spoken languages
      const countries = data.production_countries;
      const languages = data.spoken_languages;



  // Fetching recommendations
  const recommendationsUrl = `${Base_URL}/tv/${tvId}/recommendations?api_key=${API_KEY}&language=en-US`;
  const recommendationsResponse = await fetch(recommendationsUrl);
  const recommendationsData = await recommendationsResponse.json();

  //const animeResponse = await fetch(animeurl);
  //const animeData = animeResponse.json()

  //for trending movies

  //const trendingResponse = await fetch(urlTrending_movies);
  //const trendingData = await trendingResponse.json();

  //const movies = data.results[12];
  // const image = `https://image.tmdb.org/t/p/original${movies.backdrop_path}`
  //collecting year from auth.js
  //const releaseYear = data.results[1].release_date.split('-');
  res.render("tv.ejs", {
    /*releaseYear*/ movie: data,
    tvCast: cast,
    tvsereies: tvSeason_data,
    tvgenres:genres,
    totalDuration: totalDuration,
    countries: countries,
    languages: languages, 
    recommendations: recommendationsData.results,
    user: req.user
    //anime: animeData

    /*trendingMovies:trendingData.results*/
  });
});


app.get("/search", checkAuthenticated, async (req, res) => {

 

    const searchQuery = req.query.query; // Assuming the search query is passed as a query parameter named 'query'
        
    const Base_URL = "https://api.themoviedb.org/3";
    const API_KEY = "46affb6ad79782ea4c251824edd9edb6";

    const searchUrl = `${Base_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;
    
    const response = await fetch(searchUrl);
    const searchData = await response.json();
      


        res.render('search.ejs', { searchResults: searchData.results});


})

/*
    const contentBaseUrl = `${Base_URL}/`; // Base URL for all content types
    
    app.get('/watch/:contentType/:contentId', async (req, res) => {
        try {
            const contentType = req.params.contentType;
            const contentId = req.params.contentId;
    
            // Construct the URL by appending the content ID to the base URL
            const url = `${contentBaseUrl}${contentType}/${contentId}?api_key=${API_KEY}&language=en-US`;
    
            const response = await fetch(url);
            const data = await response.json();
    
            res.render('movies_info.ejs', { movie: data });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    */

app.get("/",  (req, res) => {
  res.render("index.ejs"); //{//name: req.user.name => this is to get the name of the user if you have one }
});



app.post("/",(req, res) => {
  req.logout(err => {
    if (err) {
        console.error("Logout error:", err);
        res.status(500).send("Error logging out");
        return;
    }
    res.redirect('/'); // Redirect to home page after login
});
});


app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});




//for movies link
const urlActionMovies2 = `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28,878,53&primary_release_date.gte=2015-01-01&primary_release_date.lte=2023-12-31`;//this for the main action movies
const urlSciFiMovies =  `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=878&primary_release_date.gte=2015-01-01&primary_release_date.lte=2022-12-31`;
;
const urlRomanticMovies = `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`;
const urlDramaMovies = `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18&primary_release_date.gte=2018-01-01&primary_release_date.lte=2020-12-31`;
;
const urlAwardWinningMovies = `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28,12,878,14`;
const urlComedyMovies =  `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35&primary_release_date.gte=2015-01-01&primary_release_date.lte=2022-12-31`;
;
const urlAdventureMovies =  `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=12&primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-12-31`;
;;
const urlThrillerMovies =  `${Base_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=53&primary_release_date.gte=2015-01-01&primary_release_date.lte=2019-12-31`;
;
app.get("/movies", checkAuthenticated, cache(cacheDuration), async (req, res) => {
  try {
    const response = await fetch(urlActionMovies2);
    const actionData = await response.json();

    const allMovies = actionData.results;

    // Shuffle all movies
    const shuffleMovies = allMovies.sort(() => 0.5- Math.random());

    // Select only the first movie from the shuffled array
    const randomMovie = shuffleMovies[0];

    const [
      AwardWining, 
      ScifiMovies,
      RomanticMovies,
      DramaMovies, 
      ComedyMovies,
      AdventureMovies,
      ThrillerMovies
    ] = await  Promise.all([
      fetch(urlAwardWinningMovies),
      fetch(urlSciFiMovies),
      fetch(urlRomanticMovies),
      fetch(urlDramaMovies),
      fetch(urlComedyMovies),
      fetch(urlAdventureMovies),
      fetch(urlThrillerMovies)
    ])


    const [
      AwardResponse,
      ScifiResponse,
      RomanticResponse,
      DramaResponse, 
      ComedyResponse,
      AdventureResponse,
      ThrillerResponse

    ] = await Promise.all([
      AwardWining.json(),
      ScifiMovies.json(),
      RomanticMovies.json(),
      DramaMovies.json(),
      ComedyMovies.json(),
      AdventureMovies.json(),
      ThrillerMovies.json()

    ])

    res.render("movies.ejs", {
      randomMovie, 
      awardmovies: AwardResponse.results,
      scifimovies: ScifiResponse.results,
      romanticmovies: RomanticResponse.results,
      dramamovies: DramaResponse.results,
      comedymovies: ComedyResponse.results,
      adventuremovies: AdventureResponse.results,
      thrillermovies: ThrillerResponse.results,
      user: req.user 

    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});


const urlActionTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10759&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;
const urlActionAdventureTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10759&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;
const urlMysteryTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=9648&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;
const urlSciFiHorrorTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10768&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;
const urlKDramaTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=18&with_original_language=ko&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;
const urlAfricaTVShows = `${Base_URL}/search/tv?api_key=${API_KEY}&query=Africa`;
const urlDarkDramaTVShows = `${Base_URL}/search/tv?api_key=${API_KEY}&query=Dark`;
const urlKidsTVShows = `${Base_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10762&first_air_date.gte=2015-01-01&first_air_date.lte=2023-12-31`;



app.get("/tvseries", checkAuthenticated, cache(cacheDuration), async (req, res) => {

try{

const ActionTvshows = await fetch(urlActionTVShows);
const ActiontvData = await ActionTvshows.json();

const allActiondtvData = ActiontvData.results;

const shuffle_actionTv = allActiondtvData.sort(()=> 0.5 - Math.random());
const randomActionTv = shuffle_actionTv[0];

  const [
   
    Adventuretvshows,
    Mysterytvshows,
    Scifitvshows,
    Kdramatvshows,
    Africantvshows,
    Darktvshows,
    Kidtvshows
  ]= await Promise.all([
     fetch(urlActionAdventureTVShows),
     fetch(urlMysteryTVShows),
     fetch(urlSciFiHorrorTVShows),
     fetch(urlKDramaTVShows),
     fetch(urlAfricaTVShows),
     fetch(urlDarkDramaTVShows),
     fetch(urlKidsTVShows)

  ])


  const [
    AdventureTvResponse,
    MyTvResponse,
    ScifiTvResponse,
    KTvResponse,
    AfricanTvResponse,
    DarkTvRsponse,
    KidTvResponse
  ] = await Promise.all([
    Adventuretvshows.json(),
    Mysterytvshows.json(),
    Scifitvshows.json(),
    Kdramatvshows.json(),
    Africantvshows.json(),
    Darktvshows.json(),
    Kidtvshows.json()




  ]
  

)
 
res.render("tvseries.ejs",{
  randomActionTv,
  adventuretv : AdventureTvResponse.results,
  mysterytv: MyTvResponse.results,
  scifitv: ScifiTvResponse.results,
  kdramatv: KTvResponse.results, 
  africantv: AfricanTvResponse.results,
  darktv: DarkTvRsponse.results,
  kidstv: KidTvResponse.results,
  user: req.user 


}




);


}catch(error){
  console.error("Error fetching data:", error);
  res.status(500).send("Internal Server Error");
}



 
});

/** we are coming bck to this server */
app.get("/topimdb",  (req, res) => {
  res.render("topimdb.ejs");
});





app.get('/change-profile', checkAuthenticated, (req, res) =>{
  res.render("change-profile.ejs", { user: req.user });
})

app.get('/profile', checkAuthenticated,  cache(cacheDuration),  (req, res) => {
  res.render('profile.ejs', { user: req.user });
})


//post

app.post("/register", checkNotAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '/default.jpg'; // Set a default image if none is uploaded

       // Create a new user instance
       const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        image: imagePath
      });


// Save the user to MongoDB
await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

  }
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })
);





app.post('/logout', (req, res) => {
  req.logout(err => {
      if (err) {
          console.error("Logout error:", err);
          res.status(500).send("Error logging out");
          return;
      }
      res.redirect('/login'); // Redirect to login page after logout
  });
});



app.post('/change-profile', upload.single('image'), checkAuthenticated, async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.user.image;

    await User.findByIdAndUpdate(req.user.id, {
      image: imagePath
    });

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating profile");
  }
});


/** this server is where the favourite movies of users are stored */

/*
app.get('/favourite', checkAuthenticated, (req, res) => {
  res.render('favourite.ejs', );
})

*/
app.get('/favourite', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user.id
    const favorites = await Favourite.find({ userId });// Populate if needed

    res.render('favourite.ejs', { 
      favorites: favorites, // Directly use the favorites
      user: req.user 
    
    });
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.get('/is-favorite/movie/:movieId', checkAuthenticated, async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.user.id;

  try {
    const favorite = await Favourite.findOne({ userId, movieId });
    res.json({ isFavorite: !!favorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/add-to-favorites/movie/:movieId', checkAuthenticated, async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.user.id;

  try {
    // Check if the movie is already in the user's favorites
    const existingFavorite = await Favourite.findOne({ userId, movieId });
    if (existingFavorite) {
      return res.status(400).send('Movie is already in favorites');
    }

    // Fetch movie details
    const movieUrl = `${Base_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(movieUrl);
    if (!response.ok) throw new Error('Failed to fetch movie data');

    const movieData = await response.json();

    // Validate movieData
    if (!movieData.title || !movieData.poster_path) {
      return res.status(500).send('Movie data incomplete');
    }

    // Add the movie to favorites
    const newFavorite = new Favourite({
      userId,
      movieId,
      type: 'movie', 
      title: movieData.title,
      poster_path: movieData.poster_path
    });
    await newFavorite.save();

    res.status(200).send('Movie added to favorites');
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.delete('/remove-from-favorites/movie/:movieId', checkAuthenticated, async (req, res) => {
  const movieId = req.params.movieId;
  const userId = req.user.id;

  try {
    const result = await Favourite.deleteOne({ userId, movieId });
    if (result.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Favorite not found' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});






app.delete('/remove-from-favorites/tv/:tvId', checkAuthenticated, async (req, res) => {
  const tvId = req.params.tvId;
  const userId = req.user.id;

  try {
    const result = await Favourite.deleteOne({ userId, tvId });
    if (result.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Favorite not found' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).send('Internal Server Error');
  }
});


/*
app.delete('/remove-from-favorites/:type/:id', checkAuthenticated, async (req, res) => {
  const { type, id } = req.params;
  const userId = req.user.id;
  const query = { userId };

  if (type === 'movie') {
    query.movieId = id;
  } else if (type === 'tv') {
    query.tvId = id;
  } else {
    return res.status(400).send('Invalid type');
  }

  try {
    const result = await Favourite.deleteOne(query);
    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: 'Item removed from favorites' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in favorites' });
    }
  } catch (error) {
    console.error('Error removing item from favorites:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
*/








app.post('/add-to-favorites/tv/:tvId', checkAuthenticated, async (req, res) => {
  const tvId = req.params.tvId;
  const userId = req.user.id;
  
  try {
    // Check if the TV show is already in the user's favorites
    const existingFavorite = await Favourite.findOne({ userId, tvId });
    if (existingFavorite) {
      return res.status(400).send('TV show is already in favorites');
    }

    // Fetch TV show details
    const tvUrl = `${Base_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(tvUrl);
    if (!response.ok) throw new Error('Failed to fetch TV show data');

    const tvData = await response.json();

    // Add the TV show to favorites
    const newFavorite = new Favourite({
      userId,
      tvId,
      type: 'tv', 
      title: tvData.name,
      poster_path: tvData.poster_path
    });
    await newFavorite.save();

    res.status(200).send('TV show added to favorites');
  } catch (error) {
    console.error('Error adding TV show to favorites:', error);
    res.status(500).send('Internal Server Error');
  }
});











function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } 
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  }
 next();
}
