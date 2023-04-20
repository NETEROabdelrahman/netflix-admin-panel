import "./userlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchAllUsers } from "../../reducers/usersSlice";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const allUsers = useSelector(store=>store.users)
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user") == "undefined" || !localStorage.getItem("user")) {
      navigate('/login')
    }
    
  },[navigate])

  useEffect(() => {
    dispatch(fetchAllUsers())
  },[dispatch])



  const handleDelete = (_id) => {
    allUsers.users.filter((user) => user.id !== _id)
    dispatch(deleteUser(_id))
    window.location.reload()
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row?.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id} state={{ user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={allUsers.users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}