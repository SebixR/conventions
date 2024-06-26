import React, {useEffect, useRef, useState} from "react";
import "./FilterMenu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faMapMarkerAlt, faCalendarAlt,
    faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import TagDropdown from "./TagDropdown";
import StatusDropdown from "./StatusDropdown";
import TagService from "../../Services/TagService";
import axios from "../../config/axios";
import {useSearchPagination} from "../TopNav/SearchPaginationContext";

const FilterMenu = ( { onFilter, currentPage, setCurrentPage } ) => {
    const { setPage, setTotalPage } = useSearchPagination();

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
            const response = await axios.post('public/filterConventions', formData, {params: {page: 0}});
            onFilter(response.data.content);
            setCurrentPage(0);

            setTotalPage(response.data.totalPages);
            setPage(0);
        } catch (error)  {
            console.log(error);
        }
    }
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const formData = { name, city, date, selectedTags, selectedStatuses };
            try {
                axios.post('public/filterConventions', formData, {params: {page: currentPage}}).then(response => {
                    onFilter(response.data.content);
                    setTotalPage(response.data.totalPages);
                    setPage(currentPage);
                });
            } catch (error)  {
                console.log(error);
            }
        }
    }, [currentPage])

    const clearFilters = () => {
        setName('');
        setCity('');
        setDate('');
        setSelectedTags([]);
        setSelectedStatuses([]);
    }

    return (
        <form onSubmit={handleSubmit} className='filter-wrap'>
            <div className='filter-content'>
                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='Name' value={name}
                           onChange={(ev) => setName(ev.target.value)}/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className='filter-icon'/>
                    <input className='filter-input' type='text' placeholder='City' value={city}
                           onChange={(ev) => setCity(ev.target.value)}/>
                </div>

                <div className='filter-field'>
                    <FontAwesomeIcon icon={faCalendarAlt} className='filter-icon'/>
                    <input className='filter-input' type='date' placeholder='Date' value={date}
                           onChange={(ev) => setDate(ev.target.value)}/>
                </div>

                <TagDropdown maxTags={tags.length} options={tags} selectedTags={selectedTags} onSelectTag={handleSelectTag}/>

                <StatusDropdown options={statuses} selectedStatuses={selectedStatuses} onSelectStatus={handleSelectStatus}/>
        </div>
            <button type="submit" className='accept-filter'>
                <FontAwesomeIcon icon={faCheck} className='accept-icon'/>
            </button>
            <button type="button" className='accept-filter' onClick={() => clearFilters()}>
                <FontAwesomeIcon icon={faTrash} className='accept-icon'/>
            </button>
        </form>
    )
}

export default FilterMenu