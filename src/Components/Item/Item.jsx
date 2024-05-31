import React, {useEffect, useState} from 'react'
import "./Item.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faLock, faPencilSquare, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "../../config/axios";

const Item = ( props ) => {

    const [logo, setLogo] = useState(null);
    useEffect(() => {
        try {
            axios.get(`public/loadLogo/${props.id}`, { responseType: 'blob' }).then((res) => {
                const logoImage = URL.createObjectURL(res.data);
                setLogo(logoImage);
            });
        } catch (error) {
            console.log(error)
        }
    }, []);


    return (

        <div className='item-main-wrap'>

            {props.isAdmin && (
                <div className='main-item-buttons-wrap'>
                    <Link to={"/AccountPage/" + props.userId} className="main-item-buttons-wrap-button">
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                    </Link>
                </div>
            )}

            {props.status === 'BLOCKED' && (
                <div className='blocked-cover'>
                    <FontAwesomeIcon icon={faLock} className="icon"/>
                </div>
            )}

            <div className='image-wrap'>
                {logo && (<img src={logo} alt='logo'/>)}
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
                {(props.status === 'OVER' || props.status === 'BLOCKED') &&
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