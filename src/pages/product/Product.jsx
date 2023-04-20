import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateMovies } from "../../reducers/movieSlice";
import storage from "../../firebase";

export default function Product() {
    const location = useLocation()
    const movie = location.state.movie
    
    const dispatch = useDispatch();


    
const [theMovie, setTheMovie] = useState(null);
const [img, setImg] = useState(null);
const [imgTitle, setImgTitle] = useState(null);
const [imgSm, setImgSm] = useState(null);
const [trailer, setTrailer] = useState(null);
const [video, setVideo] = useState(null);
const [uploaded, setUploaded] = useState(0);

   

    const handleChange = (e) => {
        setTheMovie({ ...theMovie, [e.target.name]: e.target.value }
        )
    }

    const upload = (items) => {
        
            
            items.forEach((item) => {
                const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setTheMovie((prev) => {
                  return { ...prev, [item.label]: url };
                });
                setUploaded((prev) => prev + 1);
              });
            }
          );
        });
    
      };

    
    const handleUpload = (e) => {
        e.preventDefault();
        upload([
          { file: img, label: "img" },
          { file: imgTitle, label: "imgTitle" },
          { file: imgSm, label: "imgSm" },
          { file: trailer, label: "trailer" },
          { file: video, label: "video" },
        ]);
        console.log(e.target.files)
    };
    
    const handleClick = (_id) => {
        dispatch(updateMovies({ _id,theMovie }))
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">movie</h1>
                <Link to="/newMovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
          
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.imgSm} alt={movie.imgTitle} className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{movie.isSeries ? "series" : "movie"}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">desc:</span>
                            <span className="productInfoValue">{movie.desc}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>image Title</label>
                        <input
                            type="file"
                            placeholder={movie.title}
                            name="imgTitle"
                            onChange={(e) => setImgTitle(e.target.files[0])}
                        />
                        <label>Year</label>
                        <input
                            type="text"
                            placeholder="Year"
                            name="year"
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input
                            type="text"
                            placeholder="Genre"
                            name="genre"
                            onChange={handleChange}
                        />
                        <label>Limit</label>
                        <input
                            type="text"
                            placeholder="limit"
                            name="limit"
                            onChange={handleChange}
                        />
                        <label>Trailer</label>
                        <input
                            type="file"
                            name="trailer"
                            onChange={(e) => setTrailer(e.target.files[0])}
                        />
                        <label>Video</label>
                        <input
                            type="file"
                            name="video"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                        <label>img</label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        <label>movie title</label>
                        <input
                            type="text"
                            placeholder="John Wick"
                            name="title"
                            onChange={handleChange}
                        />
                        <label>desc</label>
                        <input
                            type="text"
                            placeholder="description"
                            name="desc"
                            onChange={handleChange}
                        />
                        <label>imgSmall</label>
                        <input
                            type="file"
                            id="imgSm"
                            name="imgSm"
                            onChange={(e) => setImgSm(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={movie.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        
                        <button className="productButton" type="button" onClick={() => handleClick(movie._id)}>Update</button>
                        {uploaded === 5 ? (
                            <div>done</div>
                            ) : (
                                <button className="productButton" type="button" onClick={handleUpload}>upload</button>
                                )}
                    </div>
                </form>
            </div>
        </div>
    );
}