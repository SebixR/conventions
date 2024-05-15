import React, {useEffect, useState} from "react";
import "./ConventionPage.css";
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from "../../config/axios";

const ConventionPage = () => {
    let { conventionId } = useParams(); //the name of the variable has to match the name in the url (for now set in App.js)
    const [convention, setConvention] = useState({
        eventName: '',
        conventionStatus: '',
        logo: '',
        selectedStartDate: '',
        selectedEndDate: '',
        tickets: [],
        links: [],
        selectedTags: [],
        photos: [],
    });

    useEffect(() => {
        try {
            axios.get(`public/getConvention/${conventionId}`).then((res) => {
                const receivedConvention = res.data;
                setConvention(receivedConvention);
                console.log(receivedConvention);
            })
        } catch (error) {}
    }, [conventionId])


    const logoImage = '/Assets/' + convention.logo;

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className='main-content-wrap'>
                <h2 className='name-header'>{convention.eventName}</h2>

                <div className='info-wrap'>
                    {convention.conventionStatus === 'UPCOMING' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-upcoming'/>
                    }
                    {convention.conventionStatus === 'OVER' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-over'/>
                    }
                    {convention.conventionStatus === 'ONGOING' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-ongoing'/>
                    }

                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                <img src={logoImage} alt='logo'/>
                            </div>

                            <div className='inner-row-wrap'>
                                <div className='inner-row-content'>
                                    <label>From:</label>
                                    <label className='purple-label'>{convention.selectedStartDate.replace(/-/g, ".")}</label>
                                    <label>To:</label>
                                    <label className='purple-label'>{convention.selectedEndDate.replace(/-/g, ".")}</label>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Address:</label>
                                    <label className='purple-label'>{convention.city + ', ' + convention.country}</label>
                                    <label className='purple-label'>{convention.address1}</label>
                                    {convention.address2 &&
                                        <label className='purple-label'>{convention.address2}</label>
                                    }
                                </div>
                                <div className='inner-row-content'>
                                    <label>Ticket Price(s):</label>
                                    {convention.tickets.map((ticket) => {

                                        if (!ticket.price.toString().includes(".")) {
                                            ticket.price = ticket.price.toString() + ".00";
                                        }

                                        return (
                                                <label key={ticket.id} className='purple-label'>{ticket.price + '€ ' + ticket.description}</label>
                                            )
                                    })}
                                </div>
                                <div className='inner-row-content'>
                                    <label>Links:</label>
                                    {convention.links.map((link) => (
                                        <a key={link.id} href={link.address} className='link-label' target="_blank" rel={"noreferrer"}>{link.name}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='second-row'>
                            <label>Description:</label>
                            <p className='description'>
                                {convention.description}
                            </p>
                        </div>

                        <div className='third-row'>
                            <div className='tags-wrap'>
                                <label>Tags:</label>
                                {convention.selectedTags.map((tag) => (
                                    <label key={tag} className='purple-label'>{tag}</label>
                                ))}
                            </div>
                            <Link to="/Schedule/0" className='schedule-button'>Schedule</Link>
                        </div>

                    </div>
                </div>

                <div className='photos-wrap'>
                    <label>Photos:</label>
                    <div className='photos-content'>
                        <div className='photos-column'>
                            {convention.photos.map((photo, index) => {
                                if (index % 2 === 0) {
                                    return <img key={photo.id} src={'/Assets/' + photo.fileName} alt='image1' />;
                                }
                                return null;
                            })}
                        </div>
                        <div className='photos-column'>
                            {convention.photos.map((photo, index) => {
                                if (index % 2 !== 0) {
                                    return <img key={photo.id} src={'/Assets/' + photo.fileName} alt='image1' />;
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConventionPage;