import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { deleteMovies, fetchMovies } from "../../reducers/movieSlice";

export default function ProductList() {
const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("user") == "undefined" || !localStorage.getItem("user")) {
      navigate('/login')
    }
    
  },[navigate])

  const movies = useSelector(store=>store.movies)
  const dispatch = useDispatch()
  const [data, setData] = useState(movies.movies);
  
  
  useEffect(() => {
    dispatch(fetchMovies())
    setData(movies.movies)
  },[dispatch])
  
  
  const handleDelete = (_id) => {
    
    movies.movies.filter(movie=>movie._id == _id)
    dispatch(deleteMovies(_id))
    window.location.reload()
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row?.img} alt={params.row?.imgTitle} />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 90 },
    { field: "year", headerName: "year", width: 90 },
    { field: "limit", headerName: "limit", width: 90 },
    { field: "isSeries", headerName: "isSeries", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id} state={{ movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={Array.isArray(movies.movies) && movies.movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={80}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}