import React, {useEffect, useRef, useState} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCircle, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

const StatusDropdown = ({ options, selectedStatuses, onSelectStatus }) => {
    const [statusOpen, setStatusOpen] = useState(false)
    const statusRef = useRef(null);
    const statusButtonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (statusRef.current
                && !statusRef.current.contains(event.target)
                && !statusButtonRef.current.contains(event.target)) {
                setStatusOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [statusRef])

    const handleSelect = (status) => {
        const newSelectedStatuses = selectedStatuses.includes(status)
            ? selectedStatuses.filter((selectedStatus) => selectedStatus !== status)
            : [...selectedStatuses, status];
        onSelectStatus(newSelectedStatuses);
    };

    const handleStatusMenu = () => {
        setStatusOpen(!statusOpen)
    }

    return (
        <div className='filter-field'>
            <FontAwesomeIcon icon={faQuestionCircle} className='filter-icon'/>
            <div ref={statusButtonRef} onClick={handleStatusMenu} className='filter-dropdown-button'>
                Status
                <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
            </div>

            { statusOpen &&
                <div ref={statusRef} className='tag-dropdown'>
                    <div className='tag-dropdown-content'>
                        {options.map((option) => (
                            <div key={option.value} className='tag-wrap'>
                                <FontAwesomeIcon icon={faCircle} className={option.icon}/>
                                <CustomCheckbox checked={selectedStatuses.includes(option.value)} onChange={() => handleSelect(option.value)} label={option.label}/>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
};

export default StatusDropdown;