import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { deletelists, fetchlists } from "../../reducers/listSlice";
import { useNavigate } from "react-router-dom";

export default function ListList() {
    const lists = useSelector(store=>store.lists)
    const dispatch = useDispatch()
  
    const navigate = useNavigate()
    useEffect(() => {
      if (localStorage.getItem("user") == "undefined" || !localStorage.getItem("user")) {
        navigate('/login')
      }
      
    },[navigate])

  useEffect(() => {
    dispatch(fetchlists())
  }, [dispatch]);

  const handleDelete = (id) => {
      dispatch(deletelists(id))
      window.location.reload()
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/list/" + params.row._id} state={{ list: params.row }}
            >
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
        rows={lists.lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}