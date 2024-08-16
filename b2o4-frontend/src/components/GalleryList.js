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
            </div>
            <div className='random-gallery-item'>
                <div className='card-body'>
                    {galleryItem && galleryItem.map(gallery => (
                        <div key={gallery.gbpostNo}>
                            <img src={gallery.gbiamges} alt='갤러리 사진' />
                            <p>{gallery.gbpostTitle}</p>
                            <Link to="/"><button>보러가기</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default GalleryList;