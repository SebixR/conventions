import React, {useEffect, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt,
    faCheck} from "@fortawesome/free-solid-svg-icons";
import TagDropdown from "./TagDropdown";
import StatusDropdown from "./StatusDropdown";
import TagService from "../../Services/TagService";

const FilterMenu = () => {
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
    const statuses = [
        { label: 'Upcoming', icon: 'icon-upcoming' },
        { label: 'Ongoing', icon: 'icon-ongoing' },
        { label: 'Over', icon: 'icon-over' },
    ]
    const handleSelectStatus = (statuses) => {
        setSelectedStatuses(statuses);
    }

    return (
        <div className='filter-wrap'>
            <div className='filter-content'>
                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='Name'/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='City'/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faCalendarAlt} className='filter-icon'/>
                    <input className='filter-input' type='date' placeholder='Date'/>
                </div>

                <TagDropdown maxTags={tags.length} options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>

                <StatusDropdown options={statuses} selectedStatuses={selectedStatuses} onSelectStatus={handleSelectStatus}/>
        </div>
            <button className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
        </div>
    )
}

export default FilterMenu