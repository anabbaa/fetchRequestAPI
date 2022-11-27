import React, { useState, useEffect, useCallback} from 'react';
import MoviesList from './components/MovieList';
import AddMovieWrapper from './components/AddMovieWrapper';
import './App.css';

function App(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


/*another way to add async to functio then wait for both reponses and data for wxample
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json()
*/
/*forr error handler in then method pass it to catch but inasync wait 
you need to use try and catch
*/
//fetchibg data using fetch without async await

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //       setIsLoading(false);
  //     }).catch((error)=> console.log(error));
  // }

  //-fetch async with es6
  /*
  const fetchMoviesHandler = async () => {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
 
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  };
  */
 /*here you need to useeffect to directly loading data and you will put the same function
 as dependency but we will have infinite loop because every time the component evaluate
 the function will be reexecute so the best solutin us using callback and because dependency
 should be variable and because it is variable then put it after the function
 */


const fetchMoviesHandler= useCallback(async () =>{
  try{
    const response = await fetch("'https://swapi.dev/api/films/");
    //you shpuld check for error befor parsing json
    if(!response.ok){
      throw new Error ("something wrong");
    };
    // const data = await response.json();
    // const transformedMovies = data.map((movieData)=>{
    //   return {
    //     id: movieData.episode_id,
    //     title: movieData.title,
    //     openingText: movieData.opening_crawl,
    //     releaseDate: movieData.release_date,
    //   };
    // });
    // setMovies(transformedMovies);
    setIsLoading(false);
    //catch method throw erro according to what eroor has thrown in throw method
  }catch(error){
setError(error.message);
}});
  
useEffect(()=>{
  fetchMoviesHandler();
}, [fetchMoviesHandler]);


const addtoCart = (addMovie)=>{
const valueSent = addMovie;
console.log(valueSent);
setMovies(valueSent);
};
console.log(movies);

let content = <p>Found no movies.</p>;
if (movies.length > 0) {
  content = <MoviesList movies={movies} />;
}

if (error) {
  content = <p>{error}</p>;
}

if (isLoading) {
  content = <p>Loading...</p>;
}
return (
  <React.Fragment>
    <section>
      <AddMovieWrapper onAdd={addtoCart} onMovies={setMovies} setError={setError} error={error}/>
    </section>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>{content}</section>
  </React.Fragment>
);
}
export default App;