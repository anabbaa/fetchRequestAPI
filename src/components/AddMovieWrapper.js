import React ,{Fragment} from "react";
import AddMovie from "./AddMovie"

const AddMovieWrapper = (props)=>{

   async function addMovieHandler(movie){ 
    try{
    
 //word movie is according to me and json should be json headers is only 
        // description for body
        const response =  await fetch("https://fetchrequestapi-default-rtdb.firebaseio.com/movies.json", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "applicatiob json"
            }
        });
        if(!response.ok){
            throw new Error ("something wrong");
          };
        const data = await response.json();
        const loadedMovies = [];
        for (const key in data){
            loadedMovies.push({
                id: key,
                title: data[key].title,
                openingText: data[key].openingText,
                releaseDate: data[key].releaseDate,
            });
            props.onMovies(loadedMovies);
            props.onAdd(loadedMovies);
        };
}catch (error){
        props.setError(props.error.message);
    }};
       

      return (
        <Fragment>
            <AddMovie onAddMovie={addMovieHandler}/>
        </Fragment>

      )
};
export default AddMovieWrapper;