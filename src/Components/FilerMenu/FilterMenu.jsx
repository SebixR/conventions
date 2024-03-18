import React, {useEffect, useRef, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt, faTag, faQuestionCircle,
    faCheck, faCaretDown} from "@fortawesome/free-solid-svg-icons";

const FilterMenu = () => {
    const [tagOpen, setTagOpen] = useState(false)
    const tagRef = useRef(null);
    const tagButtonRef = useRef(null);
    const [statusOpen, setStatusOpen] = useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
            if (tagRef.current
                && !tagRef.current.contains(event.target)
                && !tagButtonRef.current.contains(event.target)) {
                setTagOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tagRef])

    const handleTagMenu = () => {
        setTagOpen(!tagOpen)
    }

    const handleStatusMenu = () => {
        setStatusOpen(!statusOpen)
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

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faTag} className='filter-icon'/>
                    <div ref={tagButtonRef} onClick={handleTagMenu} className='filter-dropdown-button'>
                        Tags
                        <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
                    </div>

                    { tagOpen &&
                        <div ref={tagRef} className='tag-dropdown'>
                            <div className='tag-dropdown-content'>
                                <div className='tag-wrap'>
                                    <label className='tag-label'>Tag 1</label>
                                    <button className='tag-checkmark'>
                                        <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                                    </button>
                                </div>
                                <div className='tag-wrap'>
                                    <label className='tag-label'>Tag 1</label>
                                    <button className='tag-checkmark'>
                                        <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                                    </button>
                                </div>
                                <div className='tag-wrap'>
                                    <label className='tag-label'>Tag 1</label>
                                    <button className='tag-checkmark'>
                                        <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faQuestionCircle} className='filter-icon'/>
                    <div onClick={handleStatusMenu} className='filter-dropdown-button'>
                        Status
                        <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
                    </div>
                </div>
        </div>
            <button className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
        </div>
    )
}

export default FilterMenu