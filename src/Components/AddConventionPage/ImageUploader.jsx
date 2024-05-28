import React, {useEffect, useState} from 'react';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ImageUploader = ({ onImageUpload, className, fetchedImages }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(fetchedImages);
    }, [fetchedImages])

    const handleImageChange = (e) => {
        const fileList = e.target.files;
        let newImages = Array.from(fileList).map((file) => ({
            id: Date.now(),
            file: file,
            fileName: file.name,
            preview: URL.createObjectURL(file),
        }));
        console.log("New images przed");
        console.log(newImages);
        setImages((prevImages) => [...prevImages, ...newImages]);

        let newImagesToBeAdded = [...images, ...newImages];

        // console.log("new images");
        // console.log(newImagesToBeAdded);
        //
        // console.log("images");
        // console.log(images);

        onImageUpload(newImagesToBeAdded); // Notify parent component
    };

    const handleDeleteImage = (id) => {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
        onImageUpload(updatedImages);
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
                                    <button type="button" onClick={() => handleDeleteImage(image.id)} className="delete-button-img">
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
                                <button type="button" onClick={() => handleDeleteImage(image.id)} className="delete-button-img">
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