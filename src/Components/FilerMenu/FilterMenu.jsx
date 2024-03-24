import React, {useEffect, useRef, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt, faTag, faQuestionCircle,
    faCheck, faCaretDown, faCircle} from "@fortawesome/free-solid-svg-icons";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

const FilterMenu = () => {
    const [tagOpen, setTagOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const tagRef = useRef(null);
    const statusRef = useRef(null);
    const tagButtonRef = useRef(null);
    const statusButtonRef = useRef(null);

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


    useEffect(() => {
        function handleClickOutside(event) {
            if (statusRef.current
                && !statusRef.current.contains(event.target)
                && !statusButtonRef.current.contains(event.target)) {
                setStatusOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [statusRef])

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
                                    <CustomCheckbox label={'Tag 1'}/>
                                </div>
                                <div className='tag-wrap'>
                                    <CustomCheckbox label={'Tag 2'}/>
                                </div>
                                <div className='tag-wrap'>
                                    <CustomCheckbox label={'Tag 3'}/>
                                </div>
                            </div>
                        </div>
                    }

                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faQuestionCircle} className='filter-icon'/>
                    <div ref={statusButtonRef} onClick={handleStatusMenu} className='filter-dropdown-button'>
                        Status
                        <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
                    </div>

                    { statusOpen &&
                        <div ref={statusRef} className='tag-dropdown'>
                            <div className='tag-dropdown-content'>
                                <div className='tag-wrap'>
                                    <FontAwesomeIcon icon={faCircle} className='icon-upcoming'/>
                                    <CustomCheckbox label={'Upcoming'}/>
                                </div>
                                <div className='tag-wrap'>
                                    <FontAwesomeIcon icon={faCircle} className='icon-ongoing'/>
                                    <CustomCheckbox label={'Ongoing'}/>
                                </div>
                                <div className='tag-wrap'>
                                    <FontAwesomeIcon icon={faCircle} className='icon-over'/>
                                    <CustomCheckbox label={'Over'}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
        </div>
            <button className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
        </div>
    )
}

export default FilterMenu