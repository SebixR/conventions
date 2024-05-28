import React, {useEffect, useRef, useState} from "react";
import "./AddConventionPage.css";
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ImageUploader from "./ImageUploader";
import TagDropdown from "../FilerMenu/TagDropdown";
import axios from '../../config/axios'
import TagService from "../../Services/TagService";
import {useAuth} from "../../provider/AuthProvider";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import SuccessNotification from "../SuccessNotification/SuccessNotification";

const AddConventionPage = ( {convention} ) => {

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const handleStartDateChange = (e) => {
        setSelectedStartDate(e.target.value);
    };
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const handleEndDateChange = (e) => {
        setSelectedEndDate(e.target.value);
    };
    const getIconColor = () => {
        const today = new Date();
        const selectedStartDateTime = new Date(selectedStartDate);
        const selectedEndDateTime = new Date(selectedEndDate);
        if (selectedStartDateTime > selectedEndDateTime) return '#ef5f5f';

        if (selectedStartDateTime <= today && selectedEndDateTime >= today) return '#69ee70'
        else if (selectedStartDateTime > today && selectedEndDateTime > today) return '#f3e156';
        else return '#ef5f5f'
    };


    const [tickets, setTickets] = useState([]);
    const [ticketPrice, setTicketPrice] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const handleAddTicket = () => {
        if (tickets.length >= 6) return;

        if (ticketPrice.trim() !== '' && !isNaN(ticketPrice)) {
            const newTicket = {
                id: Date.now(),
                price: ticketPrice,
                description: ticketDescription.trim() !== '' ? `(${ticketDescription})` : ''};
            setTickets([...tickets, newTicket]);
            setTicketPrice('');
            setTicketDescription('');
        }
    }
    const handleDeleteTicket = (id) => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id);
        setTickets(updatedTickets);
    };


    const [links, setLinks] = useState([]);
    const [linkAddress, setLinkAddress] = useState('');
    const [linkName, setLinkName] = useState('');
    const handleAddLink = () => {
        if (links.length >= 4) return;

        if (linkAddress.trim() !== '' && linkName.trim() !== '') {
            const newLink = {
                id: Date.now(),
                address: linkAddress,
                name: linkName };
            setLinks([...links, newLink]);
            setLinkAddress('');
            setLinkName('');
            }
    };
    const handleDeleteLink = (id) => {
        const updatedLinks = links.filter(link => link.id !== id);
        setLinks(updatedLinks);
    };


    const [description, setDescription] = useState('');
    const maxDescriptionLength = 800;
    const handleDescription = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= maxDescriptionLength) {
            setDescription(inputValue);
        }
    };
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [description])


    const [uploadedImages, setUploadedImages] = useState([]);
    const handleImageUpload = (newImages) => {
        setUploadedImages(newImages);
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const fetchedTags = await TagService.getAllTags();
                setTags(fetchedTags);
            } catch (error) {}
        }

        fetchTags();
    }, []);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([])
    const handleSelectTag = (tags) => {
        setSelectedTags(tags);
    }

    const [eventName, setEventName] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const [userId, setUserId] = useState(null)
    const { token } = useAuth();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/getAppUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userDataResponse = response.data;
                setUserId(userDataResponse.id);
            } catch (error) {

            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token, userId])

    const [errors, setErrors] = useState([]);
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!eventName.trim()) errors.eventName = 'The event\'s name is required!';
        if (logoFile === null) errors.logo = 'The Logo is required!';

        if (selectedStartDate === '') errors.startDate = 'A Start date is required!';
        if (selectedEndDate === '') errors.endDate = 'An End date is required!';
        if (selectedStartDate > selectedEndDate) errors.date = 'Date is incorrect!';

        if (!city.trim()) errors.city = 'The city is required!';
        if (!country.trim()) errors.country = 'The country is required!';
        if (!address1.trim()) errors.address = 'At least one address field is required!';
        if (tickets.length === 0) errors.tickets = 'At least one ticket price is required!';
        if (!description.trim()) errors.description = 'A description is required!';
        if (selectedTags.length === 0) errors.tags = 'At least one tag is required!';

        if (Object.keys(errors).length !== 0) isValid = false;

        setErrors(errors);
        return isValid;
    }

    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = validateForm();
        if (!isValid) return;

        if (convention) {
            try {
                await axios.delete(`auth/deleteConvention/${convention.id}`);
                addConvention();
            } catch (error) {
                console.log(error);
            }
        } else {
            addConvention();
        }
    }
    const addConvention = async () => {
        let logoFinal;
        if (convention) {
            logoFinal = convention.logo;
        } else {
            logoFinal = logoFile.name;
        }
        const uploadedImagesFiltered = uploadedImages.filter(item => !item.hasOwnProperty('file'));
        const fetchedPhotoNames = uploadedImagesFiltered.map(item => item.fileName);
        console.log("To send");
        console.log(fetchedPhotoNames);
        const formData = { userId , eventName, logo: logoFinal, selectedStartDate, selectedEndDate, city, country, address1, address2,
            tickets, links, description, selectedTags, photos: uploadedImages, fetchedPhotoNames };

        try {
            const response = await axios.post('auth/addConvention', formData);

            for (let i = 0; i < uploadedImages.length; i++)
            {
                if (uploadedImages[i].file) {
                    const photoData = new FormData();
                    photoData.append('file', uploadedImages[i].file)
                    photoData.append('conventionId', response.data.id)
                    await axios.post('auth/uploadPhoto', photoData)
                }
            }

            if (logoFile.hasOwnProperty('name')) { // just to check if logoFile is a file object or just a Url
                const logoData = new FormData();
                logoData.append('file', logoFile);
                logoData.append('conventionId', response.data.id)
                await axios.post('auth/uploadLogo', logoData);
            }

            setSuccess(true)
        } catch (error) {
            console.log(error);
        }
    }


    const [fetchedPhotos, setFetchedPhotos] = useState([]);
    useEffect(() => {
        const fetchLogoFile = async () => {
            try {
                const response = await axios.get(`public/loadLogo/${convention.id}`, { responseType: 'blob' });
                const logoImage = URL.createObjectURL(response.data);
                setLogoFile(logoImage);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchPhotoFiles = async () => {
            let tempFetchedPhotos = [];
            for (let i = 0; i < convention.photos.length; i++) {
                try {
                    const response = await axios.get(`public/loadPhoto/${convention.photos[i].id}`, { responseType: 'blob' });
                    const photo = {
                        id: convention.photos[i].id,
                        preview: URL.createObjectURL(response.data),
                        fileName: convention.photos[i].fileName,
                    };
                    tempFetchedPhotos = [...tempFetchedPhotos, photo];
                } catch (error) {
                    console.log(error);
                }
            }
            setFetchedPhotos(prevImages => [...prevImages, ...tempFetchedPhotos]);
        }

        if (convention !== null && convention !== undefined) {
            if (convention.eventName !== null && convention.eventName !== undefined) setEventName(convention.eventName);
            if (convention.logo !== null && convention.logo !== undefined) fetchLogoFile();
            setSelectedStartDate(convention.selectedStartDate);
            setSelectedEndDate(convention.selectedEndDate);
            setTickets(convention.tickets);
            setLinks(convention.links);
            setDescription(convention.description);
            if (convention.photos.length > 0) fetchPhotoFiles();
            if (convention.city !== null && convention.city !== undefined) setCity(convention.city)
            if (convention.country !== null && convention.country !== undefined) setCountry(convention.country)
            if (convention.address1 !== null && convention.address1 !== undefined) setAddress1(convention.address1)
            if (convention.address2 !== null && convention.address2 !== undefined) setAddress2(convention.address2)
            setSelectedTags(convention.selectedTags)
        }
    }, [convention]);


    return (
        <div className='main-wrap'>

            <TopNav/>

            {success && <SuccessNotification text="Successfully added the convention!"/>}

            {Object.keys(errors).map((errorKey) => (
                <ErrorNotification key={errorKey} text={errors[errorKey]} />
            ))}

            <form onSubmit={handleSubmit} className='main-content-wrap'>
                <div className='top-row'>
                    <input maxLength="60" type="text" id="event_name" placeholder="Event Name"
                           className='name-header' value={eventName} onChange={(ev) => setEventName(ev.target.value)}/>

                    {convention ? (
                        <button type="submit" className='submit-convention-button'>Confirm</button>
                    ) : (
                        <button type="submit" className='submit-convention-button'>Create</button>
                    )}

                </div>

                <div className='info-wrap'>
                    <FontAwesomeIcon icon={faCircle} style={{ color: getIconColor() }} className='status-icon'/>
                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                {convention && (<img src={logoFile} alt='logo'/>)}
                                <input className="logo-input" type="file" onChange={(ev) => setLogoFile(ev.target.files[0])}/>
                            </div>

                            <div className='inner-row-wrap'>
                                <div className='inner-row-content'>
                                    <label>From:</label>
                                    <input type="date" value={selectedStartDate} onChange={handleStartDateChange} className='text-input'/>
                                    <label>To:</label>
                                    <input type="date" value={selectedEndDate} onChange={handleEndDateChange} className='text-input'/>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Address:</label>
                                    <input type="text" placeholder="City" value={city} onChange={(ev) => setCity(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Country" value={country} onChange={(ev) => setCountry(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Address 1" value={address1} onChange={(ev) => setAddress1(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Address 2 (optional)" value={address2} onChange={(ev) => setAddress2(ev.target.value)} className='text-input'/>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Ticket Price(s) (1-6):</label>
                                    <input maxLength="10" type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Price (EUR)" className='text-input'/>
                                    <input maxLength="40" type="text" value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} placeholder="Description (optional)" className='text-input'/>
                                    <button type="button" onClick={handleAddTicket} className="add-button">Add</button>
                                </div>
                                <div className="inner-row-content">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.id} className="deletable-item-wrap">
                                            <label className="purple-label">{ticket.price}€ {ticket.description}
                                                <button type="button" onClick={() => handleDeleteTicket(ticket.id)} className="delete-button">
                                                    <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
                                                </button>
                                            </label>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='inner-row-content'>
                            <label>Links (0 - 4):</label>
                            <input maxLength="200" value={linkAddress} onChange={(e) => setLinkAddress(e.target.value)} type="text" placeholder="Link" className="text-input"/>
                            <input maxLength="40" value={linkName} onChange={(e) => setLinkName(e.target.value)} type="text" placeholder="Link Name" className="text-input"/>
                            <button type="button" onClick={handleAddLink} className="add-button">Add</button>
                        </div>
                        <div className="inner-row-content">
                            {links.map((link) => (
                                <div key={link.id} className="deletable-item-wrap">
                                    <label className="purple-label">
                                        <a  href={link.address} target="_blank" className="link-label" rel="noreferrer">{link.name}</a>
                                        <button type="button" onClick={() => handleDeleteLink(link.id)} className="delete-button">
                                            <FontAwesomeIcon icon={faTrash} className="trash-icon"/>
                                        </button>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className='second-row'>
                            <label>Description:</label>
                            <textarea value={description} onChange={handleDescription} ref={textAreaRef} maxLength={maxDescriptionLength} className='description'/>
                            <p>{description.length} / {maxDescriptionLength}</p>
                        </div>

                        <div className='third-row'>
                            <div className='tags-wrap'>
                                <label>Tags (1-4):</label>
                                <div className='tag-dropdown-button'>
                                    <TagDropdown maxTags={4} options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>
                                </div>
                            </div>
                            <Link to="/AddSchedule/0" className='schedule-button'>Create Schedule</Link>
                        </div>

                    </div>
                </div>

                <div className='photos-wrap'>
                    <label>Photos:</label>
                    <ImageUploader onImageUpload={handleImageUpload} fetchedImages={fetchedPhotos} className="photos-button" />
                </div>
            </form>

        </div>
    )
}

export default AddConventionPage;