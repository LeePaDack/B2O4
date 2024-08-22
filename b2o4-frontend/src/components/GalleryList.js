import { useEffect, useState } from "react";
import '../css/MainPage.css';
import { Link } from "react-router-dom";
import axios from "axios";


const GalleryList = () => {

    const [galleryItem, setGalleryItem] = useState([]);

    const getGalleryList = () => {
        axios.get("/main/gallery")
            .then(res => {
                console.log(res.data);
                setGalleryItem(res.data);
            })
    }

    useEffect(() => {
        getGalleryList();
    }, []);

    return (
        <div className='gallery-list-container'>
            <div className='section-title'>
                <h1>Gallery</h1>
                <hr />
            </div>
            <div className='random-gallery-item'>
                <div className='card-container'>
                    {galleryItem && galleryItem.map(gallery => (
                        <div key={gallery.gbpostNo} className="card-body">
                            <img src={gallery.gbiamges} alt='갤러리 사진' />
                            <div className="gallery-desc">
                                <p className="gbpostTitle">{gallery.gbpostTitle}</p>
                                <p className="memberName">{gallery.memberName}</p>
                            </div>
                            <Link to="/"><button className="btn btn-outline-success">보러가기</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default GalleryList;