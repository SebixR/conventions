import React from 'react'
import "./Item.css"
import testImage from '../Assets/comic_con_logo.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

const Item = () => {
    return (
        <div className='item-main-wrap'>
            <div className='image-wrap'>
                <img src={testImage} alt='logo'/>
            </div>
            <div className='item-content-wrap'>
                <div className='first-row'>
                    <label className='city-label'>San Diego</label>
                    <label>12.05.2024</label>
                    <label>16.05.2024</label>
                </div>
                <div className='second-row'>
                    <label className='tag-label'>Comic books</label>
                    <label className='tag-label'>Video Games</label>
                    <label className='tag-label'>Fantasy</label>
                </div>
                <div className='third-row'>
                    <p className='short-description'>
                        San Diego Comic-Con International is a comic book convention and nonprofit
                        multi-genre entertainment event held annually in San Diego, California,
                        since 1970. The event's official name, as given on its website, is Comic-Con
                        International: San Diego, but is more commonly known as Comic-Con, the San Diego
                        Comic-Con, or the abbreviation SDCC.
                    </p>
                </div>
            </div>
            <div className='item-right-pane'>
                <FontAwesomeIcon icon={faCircle} className='status-icon'/>
                <button className='more-button'>More</button>
            </div>

        </div>
    )
}

export default Item