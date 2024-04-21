import React, { useState } from 'react';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ImageUploader = ({ onImageUpload, className }) => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const fileList = e.target.files;
        const newImages = Array.from(fileList).map((file) => ({
            id: Date.now(),
            file: file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);
        onImageUpload(newImages); // Notify parent component
    };

    const handleDeleteImage = (id) => {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
    };

    return (
        <div>
            <input className={className} type="file" accept="image/*" multiple onChange={handleImageChange} />
            <div>
                <div className="photos-content">
                    <div className='photos-column'>
                    {images.map((image, index) => (
                        <div key={index} className="image-preview">
                            {index % 2 === 0 &&
                                <div className="delete-image-button-wrap">
                                    <img src={image.preview} alt={`Uploaded ${index}`} />
                                    <button onClick={() => handleDeleteImage(image.id)} className="delete-button-img">
                                        <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
                                    </button>
                                </div>}
                        </div>
                    ))}
                    </div>
                    <div className='photos-column'>
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                {index % 2 !== 0 &&
                                    <div className="delete-image-button-wrap">
                                        <img src={image.preview} alt={`Uploaded ${index}`} />
                                <button onClick={() => handleDeleteImage(image.id)} className="delete-button-img">
                                    <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
                                </button>
                                    </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;