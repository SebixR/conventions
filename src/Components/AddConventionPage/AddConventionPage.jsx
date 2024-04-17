import React, {useEffect, useRef, useState} from "react";
import "./AddConventionPage.css";
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
const AddConventionPage = () => {

    const [tickets, setTickets] = useState([]);
    const [ticketPrice, setTicketPrice] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const handleAddTicket = () => {
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

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className='main-content-wrap'>
                <input type="text" placeholder="Event Name" className='name-header'/>

                <div className='info-wrap'>
                    <FontAwesomeIcon icon={faCircle} className='status-icon'/> {/*TODO status should update dynamically*/}
                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                <input type="file"/>
                            </div>

                            <div className='inner-row-wrap'>
                                <div className='inner-row-content'>
                                    <label>From:</label>
                                    <input type="date" className='text-input'/>
                                    <label>To:</label>
                                    <input type="date" className='text-input'/>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Address:</label>
                                    <input type="text" placeholder="City, Country" className='text-input'/>
                                    <input type="text" placeholder="Address 1" className='text-input'/>
                                    <input type="text" placeholder="Address 2 (optional)" className='text-input'/>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Ticket Price(s):</label>
                                    <input type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Price (EUR)" className='text-input'/>
                                    <input type="text" value={ticketDescription} onChange={(e) => setTicketDescription(e.target.value)} placeholder="Description (optional)" className='text-input'/>
                                    <button onClick={handleAddTicket} className="add-button">Add</button>
                                </div>
                                <div className="inner-row-content">
                                    {tickets.map((ticket, index) => (
                                        <div className="deletable-item-wrap">
                                            <label key={index} className="purple-label">{ticket.price} {ticket.description}
                                                <button onClick={() => handleDeleteTicket(ticket.id)} className="delete-button">
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
                            <label>Links:</label>
                            <input value={linkAddress} onChange={(e) => setLinkAddress(e.target.value)} type="text" placeholder="Link" className="text-input"/>
                            <input value={linkName} onChange={(e) => setLinkName(e.target.value)} type="text" placeholder="Link Name" className="text-input"/>
                            <button onClick={handleAddLink} className="add-button">Add</button>
                        </div>
                        <div className="inner-row-content">
                            {links.map((link, index) => (
                                <div className="deletable-item-wrap">
                                    <label className="purple-label">
                                        <a key={index} href={link.address} className="link-label">{link.name}</a>
                                        <button onClick={() => handleDeleteLink(link.id)} className="delete-button">
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
                                <label>Tags:</label>
                                <div className='tag-dropdown-button'>
                                    Choose Tags (1-4)
                                    <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
                                </div>
                            </div>
                            <Link to="/AddSchedule/0" className='schedule-button'>Create Schedule</Link>
                        </div>

                    </div>
                </div>

                <div className='photos-wrap'>
                    <label>Photos:</label>
                    <input type="file" className="photos-button"/>
                    <div className='photos-content'>
                        <div className='photos-column'>
                        </div>
                        <div className='photos-column'>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddConventionPage;