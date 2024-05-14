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

const AddConventionPage = () => {

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
        setUploadedImages((prevImages) => [...prevImages, ...newImages]);
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
        if (selectedTags.length >= 4) return;
        setSelectedTags(tags);
    }

    const [eventName, setEventName] = useState('');
    const [logo, setLogo] = useState('');
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
        if (!logo.trim()) errors.logo = 'The Logo is required!';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = validateForm();
        if (!isValid) return;

        const photos = uploadedImages;
        const formData = { userId , eventName, logo, selectedStartDate, selectedEndDate, city, country, address1, address2,
        tickets, links, description, selectedTags, photos};
        try {
            const response = await axios.post('auth/addConvention', formData);
            console.log(response.data);
        } catch (error) {

        }
    }


    return (
        <div className='main-wrap'>

            <TopNav/>

            {Object.keys(errors).map((errorKey) => (
                <ErrorNotification key={errorKey} text={errors[errorKey]} />
            ))}

            <form onSubmit={handleSubmit} className='main-content-wrap'>
                <div className='top-row'>
                    <input maxLength="60" type="text" id="event_name" placeholder="Event Name"
                           className='name-header' onChange={(ev) => setEventName(ev.target.value)}/>

                    <button type="submit" className='submit-convention-button'>Create</button>
                </div>

                <div className='info-wrap'>
                    <FontAwesomeIcon icon={faCircle} style={{ color: getIconColor() }} className='status-icon'/>
                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                <input type="file" onChange={(ev) => setLogo(ev.target.files[0].name)}/>
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
                                    <input type="text" placeholder="City" onChange={(ev) => setCity(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Country" onChange={(ev) => setCountry(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Address 1" onChange={(ev) => setAddress1(ev.target.value)} className='text-input'/>
                                    <input type="text" placeholder="Address 2 (optional)" onChange={(ev) => setAddress2(ev.target.value)} className='text-input'/>
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
                                    <TagDropdown options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>
                                </div>
                            </div>
                            <Link to="/AddSchedule/0" className='schedule-button'>Create Schedule</Link>
                        </div>

                    </div>
                </div>

                <div className='photos-wrap'>
                    <label>Photos:</label>
                    <ImageUploader onImageUpload={handleImageUpload} className="photos-button" />
                </div>
            </form>

        </div>
    )
}

export default AddConventionPage;