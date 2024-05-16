import React, {useEffect, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt,
    faCheck} from "@fortawesome/free-solid-svg-icons";
import TagDropdown from "./TagDropdown";
import StatusDropdown from "./StatusDropdown";
import TagService from "../../Services/TagService";
import axios from "../../config/axios";

const FilterMenu = ( { onFilter } ) => {
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


    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [statuses] = useState([
        { label: 'Upcoming', icon: 'icon-upcoming', value: 'UPCOMING' },
        { label: 'Ongoing', icon: 'icon-ongoing', value: 'ONGOING' },
        { label: 'Over', icon: 'icon-over', value: 'OVER' },
    ])
    const handleSelectStatus = (statuses) => {
        setSelectedStatuses(statuses);
    }

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, city, date, selectedTags, selectedStatuses };
        try {
            const response = await axios.post('public/filterConventions', formData);
            onFilter(response.data);
            console.log(response.data);
        } catch (error)  {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='filter-wrap'>
            <div className='filter-content'>
                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='Name'
                           onChange={(ev) => setName(ev.target.value)}/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='City'
                           onChange={(ev) => setCity(ev.target.value)}/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faCalendarAlt} className='filter-icon'/>
                    <input className='filter-input' type='date' placeholder='Date'
                           onChange={(ev) => setDate(ev.target.value)}/>
                </div>

                <TagDropdown maxTags={tags.length} options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>

                <StatusDropdown options={statuses} selectedStatuses={selectedStatuses} onSelectStatus={handleSelectStatus}/>
        </div>
            <button type="submit" className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
        </form>
    )
}

export default FilterMenu