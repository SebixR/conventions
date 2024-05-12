import React from 'react'
import './CustomCheckbox.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const CustomCheckbox = ({label, checked, onChange}) => {

    return (
        <div className='checkbox-wrap'>
            <label>{label}
                <input type='checkbox' checked={checked} onChange={onChange}/>
                <div className='checkmark'>
                    <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                </div>
            </label>
        </div>
    )
}

export default CustomCheckbox