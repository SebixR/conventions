import React, {useEffect, useRef, useState} from "react"
import TopNav from "../TopNav/TopNav";
import "./AccountPage.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPencilSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Item from "../Item/Item";
import axios from "../../config/axios";
import {useAuth} from "../../provider/AuthProvider";

const AccountPage = () => {

    const [userId, setUserId] = useState(null)
    const [inputValues, setInputValues] = useState({
        firstNameInput: '',
        lastNameInput: '',
        emailInput: ''
    })
    const { token } = useAuth();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/getAppUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userDataResponse = response.data;
                setUserId(userDataResponse.id);
                setInputValues({
                    firstNameInput: userDataResponse.firstName,
                    lastNameInput: userDataResponse.lastName,
                    emailInput: userDataResponse.email
                })
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token])

    useEffect(() => {
        try {
            if (userId !== null) {
                axios.get(`auth/getConventionsByUser/${userId}`).then((res) => {
                    const conventions = res.data;
                    setItems(conventions);
                });
            }
        } catch (error) {
            console.log(error)
        }

    }, [userId]);


    const [isReadOnly, setIsReadOnly] = useState(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const toggleReadOnly = () => {
        setIsReadOnly((prevReadOnly) => !prevReadOnly);
    };


    const [visibleNotifications, setVisibleNotifications] = useState({});
    const handleDeleteClick = (id) => {
        setVisibleNotifications((prevNotifications) => ({
            ...prevNotifications, [id]: true,
        }));
    };
    const handleCancelClick = (id) => {
        setVisibleNotifications((prevNotifications) => ({
            ...prevNotifications, [id]: false,
        }));
    };

    return (

        <div className="account-main-wrap">

            <TopNav/>

            <div className="account-main-content-wrap">

                <div className="account-info-pane">
                    <div className="account-info-content">
                        <div className="single-info-wrap">
                            <label>First Name</label>
                            <input disabled={isReadOnly} type="text" name="firstNameInput" onChange={handleInputChange} value={inputValues.firstNameInput} readOnly={isReadOnly}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Last Name</label>
                            <input disabled={isReadOnly} type="text" name="lastNameInput" onChange={handleInputChange} value={inputValues.lastNameInput} readOnly={isReadOnly}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Email</label>
                            <input disabled={isReadOnly} type="text" name="emailInput" onChange={handleInputChange} value={inputValues.emailInput} readOnly={isReadOnly}/>
                        </div>
                    </div>

                    <div className="account-info-buttons-wrap">
                        <button type="button" onClick={toggleReadOnly}
                                style={{ backgroundColor: isReadOnly ? '#F3E156FF' : '#6540B0FF' }}>
                            <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                        </button>

                        <button type="submit">
                            <FontAwesomeIcon icon={faCheck} className="icon"/>
                        </button>
                    </div>
                </div>

                <button type="button">Change Password</button>

            </div>

            <div className="items-wrap">

                {items.map((item) =>(
                    <div key={item.id} className='account-item-wrap'>
                        {visibleNotifications[item.id] &&
                            <div className='delete-notification-wrap'>
                                <label>Are you sure you want to delete this entry?</label>
                                <div className='delete-notification-buttons-wrap'>
                                    <button>Yes</button>
                                    <button type="button" onClick={() => handleCancelClick(item.id)}>No</button>
                                </div>
                            </div>
                        }

                        <Item id={item.id}
                              status={item.conventionStatus}
                              eventName={item.eventName}
                              logo={item.logo}
                              city={item.city}
                              country={item.country}
                              startDate={item.selectedStartDate}
                              endDate={item.selectedEndDate}
                              tags={item.selectedTags}
                              description={item.description}/>

                        <div className='account-item-buttons-wrap'>
                            <button>
                                <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                            </button>
                            <button onClick={() => handleDeleteClick(item.id)}>
                                <FontAwesomeIcon icon={faTrash} className="icon"/>
                            </button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default AccountPage