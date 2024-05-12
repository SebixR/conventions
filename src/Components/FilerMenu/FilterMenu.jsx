import React, {useEffect, useRef, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt, faQuestionCircle,
    faCheck, faCaretDown, faCircle} from "@fortawesome/free-solid-svg-icons";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import TagDropdown from "./TagDropdown";
import StatusDropdown from "./StatusDropdown";

const FilterMenu = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = [ //TODO get from the database
        { label: 'Tag 1'},
        { label: 'Tag 2'},
        { label: 'Tag 3'},
    ]
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

                <TagDropdown options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>

                <StatusDropdown options={statuses} selectedStatuses={selectedStatuses} onSelectStatus={handleSelectStatus}/>
        </div>
            <button className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
        </div>
    )
}

export default FilterMenu