import {  useEffect, useState } from "react";
import "./newList.css";
import { fetchMovies } from "../../reducers/movieSlice";

import { useDispatch, useSelector } from "react-redux";
import { createlists } from "../../reducers/listSlice";
import {  useNavigate } from "react-router-dom";

export default function NewList() {
    const movies = useSelector(store => store.movies)
    const [allMovies,setAllMovies] = useState('')
    const [list, setList] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    
  
  useEffect(() => {
      dispatch(fetchMovies()) 
      setAllMovies(movies)
    },[dispatch,movies])
    
    
   
  const handleChange = (e) => {
      const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };
  
  const handleSelect = (e) => {
      let value = Array.from(e.target.selectedOptions, (option) => option.value);
      setList({ ...list, [e.target.name]: value });
    };
    

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createlists(list))
    navigate("/lists")
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}