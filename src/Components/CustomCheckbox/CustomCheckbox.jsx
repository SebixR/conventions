import React, {useState} from 'react'
import './CustomCheckbox.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const CustomCheckbox = ({label}) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className='checkbox-wrap'>
            <label>{label}
                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
                <div className='checkmark'>
                    <FontAwesomeIcon icon={faCheck} className='check-icon'/>
                </div>
            </label>
        </div>
    )
}

export default CustomCheckbox