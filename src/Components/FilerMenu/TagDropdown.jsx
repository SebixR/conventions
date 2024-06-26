import React, {useEffect, useRef, useState} from 'react';
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faTag} from "@fortawesome/free-solid-svg-icons";

const TagDropdown = ({ options, selectedTags, onSelectTag, maxTags }) => {
    const [tagOpen, setTagOpen] = useState(false)
    const tagRef = useRef(null);
    const tagButtonRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (tagRef.current
                && !tagRef.current.contains(event.target)
                && !tagButtonRef.current.contains(event.target)) {
                setTagOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [tagRef])

    const handleSelect = (tag) => {
        const isTagSelected = selectedTags.includes(tag);

        if (!isTagSelected && selectedTags.length >= maxTags) return;

        const newSelectedTags = isTagSelected
            ? selectedTags.filter((selectedTag) => selectedTag !== tag)
            : [...selectedTags, tag];
        onSelectTag(newSelectedTags);
    };

    const handleTagMenu = () => {
        setTagOpen(!tagOpen)
    }

    return (
        <div className='filter-field'>
            <FontAwesomeIcon icon={faTag} className='filter-icon'/>
            <div ref={tagButtonRef} onClick={handleTagMenu} className='filter-dropdown-button'>
                Tags
                <FontAwesomeIcon icon={faCaretDown} className='down-icon'/>
            </div>

            { tagOpen &&
                <div ref={tagRef} className='tag-dropdown'>
                    <div className='tag-dropdown-content'>
                        {options.map((option) => (
                            <div key={option.id} className='tag-wrap'>
                                <CustomCheckbox checked={selectedTags.includes(option.tag)} onChange={() => handleSelect(option.tag)} label={option.tag}/>
                            </div>
                            ))}
                    </div>
                </div>
            }
        </div>
    )
};

export default TagDropdown;