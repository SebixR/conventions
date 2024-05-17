import React from 'react'
import "./Item.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Item = ( props ) => {
    const logoPath = '/Assets/' + props.logo;

    return (
        <div className='item-main-wrap'>
            <div className='image-wrap'>
                <img src={logoPath} alt='logo'/>
            </div>
            <div className='item-content-wrap'>
                <label className='event-name-label'>{props.eventName}</label>
                <div className='first-row'>
                    <label className='city-label'>{props.city + ', ' + props.country}</label>
                    <label>{props.startDate.replace(/-/g, ".")}</label>
                    <label>{props.endDate.replace(/-/g, ".")}</label>
                </div>
                <div className='second-row'>
                    {props.tags.map((tag) => (
                        <label key={tag} className='tag-label'>{tag}</label>
                    ))}
                </div>
                <div className='third-row'>
                    <p className='short-description'>
                        {props.description}
                    </p>
                </div>
            </div>
            <div className='item-right-pane'>
                {props.status === 'UPCOMING' &&
                    <FontAwesomeIcon icon={faCircle} className='status-icon-upcoming'/>
                }
                {props.status === 'OVER' &&
                    <FontAwesomeIcon icon={faCircle} className='status-icon-over'/>
                }
                {props.status === 'ONGOING' &&
                    <FontAwesomeIcon icon={faCircle} className='status-icon-ongoing'/>
                }
                <Link to={"/ConventionPage/" + props.id} className='more-button'>More</Link>
            </div>

        </div>
    )
}

export default Item