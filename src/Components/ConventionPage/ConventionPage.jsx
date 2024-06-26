import React, {useEffect, useState} from "react";
import "./ConventionPage.css";
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from "../../config/axios";
import {useAuth} from "../../provider/AuthProvider";
import {fetchAdmin} from "../../fetchAdmin";
import Footer from "../Footer/Footer";

const ConventionPage = () => {
    let { conventionId } = useParams(); //the name of the variable has to match the name in the url
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

    const [isAdmin, setIsAdmin] = useState(false);
    const { token } = useAuth();
    useEffect(() => {
        if (token) {
            fetchAdmin(token, setIsAdmin);
        }
    }, [token])

    const [uploader, setUploader] = useState({
        id: null,
        firstName: '',
        lastName: '',
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
    
    useEffect(() => {
        if (isAdmin && convention.userId) {
            try {
                axios.get(`auth/getAppUserById/${convention.userId}`).then((res) => {
                    const receivedUser = res.data;
                    setUploader(receivedUser);
                    console.log(receivedUser);
                })
            } catch (error) {
                console.log("Error fetching uploader");
            }
        }
    }, [convention, isAdmin])

    const [photoFiles, setPhotoFiles] = useState([]);
    useEffect(() => {
        const fetchPhoto = async (photoId) => {
            try {
                const res = await axios.get(`public/loadPhoto/${photoId}`, { responseType: 'blob' });
                const newPhotoFile = URL.createObjectURL(res.data);
                setPhotoFiles(prevPhotoFiles => [...prevPhotoFiles, newPhotoFile]);
            } catch (error) {
                console.error("Error fetching photo:", error);
            }
        };

        for (let i = 0; i < convention.photos.length; i++)
        {
            fetchPhoto(convention.photos[i].id);
        }
    }, [convention]);

    const [logo, setLogo] = useState(null);
    const [status, setStatus] = useState('OVER');
    useEffect(() => {
        try {
            axios.get(`public/loadLogo/${conventionId}`, { responseType: 'blob' }).then((res) => {
                const logoImage = URL.createObjectURL(res.data);
                setLogo(logoImage);
            });
        } catch (error) {
            console.log(error)
        }

        setStatus(getStatus);
    }, [convention]);
    const getStatus = () => {
        const today = new Date();
        const selectedStartDateTime = new Date(convention.selectedStartDate);
        const selectedEndDateTime = new Date(convention.selectedEndDate);

        if (selectedStartDateTime <= today && selectedEndDateTime >= today) return 'ONGOING'
        else if (selectedStartDateTime > today && selectedEndDateTime > today) return 'UPCOMING';
        else return 'OVER'
    };

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className='main-content-wrap'>

                <div className='convention-page-top-wrap'>
                    <h2 className='name-header'>{convention.eventName}</h2>

                    {isAdmin && (
                        <Link to={"/AccountPage/" + uploader.id} className='uploader-label'>
                            {"Uploaded by: " + uploader.firstName + " " + uploader.lastName}
                        </Link>
                    )}
                </div>

                <div className='info-wrap'>
                    {status === 'UPCOMING' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-upcoming'/>
                    }
                    {status === 'OVER' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-over'/>
                    }
                    {status === 'ONGOING' &&
                        <FontAwesomeIcon icon={faCircle} className='status-icon-ongoing'/>
                    }

                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                <img src={logo} alt='logo'/>
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
                                {convention.links.length > 0 && (
                                    <div className='inner-row-content'>
                                        <label>Links:</label>
                                        {convention.links.map((link) => (
                                            <a key={link.id} href={link.address} className='link-label' target="_blank" rel={"noreferrer"}>{link.name}</a>
                                        ))}
                                    </div>
                                )}
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
                            {/*<Link to="/Schedule/0" className='schedule-button'>Schedule</Link>*/}
                        </div>

                    </div>
                </div>

                {convention.photos.length > 0 &&

                    <div className='photos-wrap'>
                        <label>Photos:</label>
                        <div className='photos-content'>
                            <div className='photos-column'>
                                {photoFiles.map((photo, index) => {
                                    if (index % 2 === 0) {
                                        return <img key={index} src={photo} alt={'image' + index} />;
                                    }
                                    return null;
                                })}
                            </div>
                            <div className='photos-column'>
                                {photoFiles.map((photo, index) => {
                                    if (index % 2 !== 0) {
                                        return <img key={index} src={photo} alt={'image' + index} />;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                }

            </div>

            <Footer/>

        </div>
    )
}

export default ConventionPage;