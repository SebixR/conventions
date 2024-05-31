import React, {useEffect, useState} from "react"
import TopNav from "../TopNav/TopNav";
import "./AccountPage.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faLock, faPencilSquare, faTrash, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import Item from "../Item/Item";
import axios from "../../config/axios";
import {useAuth} from "../../provider/AuthProvider";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import SuccessNotification from "../SuccessNotification/SuccessNotification";
import {Link, useParams} from "react-router-dom";
import {fetchAdmin} from "../../fetchAdmin";

const AccountPage = () => {
    const { userIdAdmin } = useParams();

    const { token } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (userIdAdmin) fetchAdmin(token, setIsAdmin);
    }, [token, userIdAdmin])

    const [userId, setUserId] = useState(null)
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: 'USER'
    })
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAdmin) {
                try {
                    const response = await axios.get("/getAppUser", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userDataResponse = response.data;
                    setUserId(userDataResponse.id);
                    setInputValues({
                        firstName: userDataResponse.firstName,
                        lastName: userDataResponse.lastName,
                        email: userDataResponse.email,
                        role: userDataResponse.role
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                axios.get(`auth/getAppUserById/${userIdAdmin}`).then((res) => {
                    const receivedUser = res.data;
                    setUserId(receivedUser.id);
                    setInputValues({
                        firstName: receivedUser.firstName,
                        lastName: receivedUser.lastName,
                        email: receivedUser.email,
                        role: receivedUser.role
                    })
                })
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [isAdmin, token, userIdAdmin])

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


    const [errors, setErrors] = useState([]);
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!inputValues.firstName.trim()) errors.firstName = 'First name is required!';
        if (!/^[a-zA-Z]+$/.test(inputValues.firstName)) errors.firstName = 'First name can only contain letters';
        if (!inputValues.lastName.trim()) errors.lastName = 'Last name is required!';
        if (!/^[a-zA-Z]+$/.test(inputValues.lastName)) errors.lastName = 'Last name can only contain letters';
        if (!inputValues.email.trim()) errors.email = 'Email is required!';
        if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValues.email)) {
            errors.email = 'Incorrect email!';
        }

        if (Object.keys(errors).length !== 0) isValid = false;

        setErrors(errors);
        return isValid;
    }
    const [success, setSuccess] = useState(false);
    const handleSubmitUserInfo = async (e) => {
        e.preventDefault();

        let isValid = validateForm();
        if (!isValid) return;

        const firstName = inputValues.firstName;
        const lastName = inputValues.lastName;
        const email = inputValues.email;
        const formData = { firstName, lastName, email};
        try {
            const response = await axios.post('/updateAppUser', formData);
            console.log(response.data);
            showSuccessNotification();
            toggleReadOnly();
        } catch (error) {

        }
    }
    const showSuccessNotification = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };


    const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
    const [deletedError, setDeletedError] = useState(false);
    const handleDeleteEntry = async (id) => {
        try {
            const data = new FormData();
            data.append('id', id);
            data.append('photos', []);
            const response = await axios.post(`auth/deleteConvention`, data);
            if (response.status === 200) {
                showDeletedSuccessfullyNotification();
                const updatedItems = items.filter(item => item.id !== id);
                setItems(updatedItems);
            }
            else showDeletedErrorNotification();
        } catch (error) {console.log(error)}
    }
    const showDeletedSuccessfullyNotification = () => {
        setDeletedSuccessfully(true);
        setTimeout(() => {
            setDeletedSuccessfully(false);
        }, 3000);
    };
    const showDeletedErrorNotification = () => {
        setDeletedError(true);
        setTimeout(() => {
            setDeletedError(false);
        }, 3000);
    };


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


    const handleBlockConventionClick = (id, status) => {
        if (status === 'BLOCKED') {
            try {
                axios.post(`auth/unblockConvention/${id}`).then((res) => {
                    const index = items.findIndex(item => item.id === id);
                    if (index !== -1) {
                        const updatedList = [...items];
                        updatedList[index] = { ...updatedList[index], conventionStatus: res.data.conventionStatus };
                        setItems(updatedList);
                    }
                    console.log("Blocked convention");
                });
            } catch (error) {
                console.log("Error unblocking convention");
            }
        } else {
            try {
                axios.post(`auth/blockConvention/${id}`).then(() => {
                    const index = items.findIndex(item => item.id === id);
                    if (index !== -1) {
                        const updatedList = [...items];
                        updatedList[index] = { ...updatedList[index], conventionStatus: 'BLOCKED' };
                        setItems(updatedList);
                    }
                    console.log("Blocked convention");
                });
            } catch (error) {
                console.log("Error blocking convention");
            }
        }
    }
    const handleBlockUserClick = () => {
        if (inputValues.role === 'BLOCKED') {
            try {
                axios.post(`auth/unblockAppUser/${userId}`).then(() => {
                    setInputValues({ ...inputValues, role: 'USER'});

                    axios.get(`auth/getConventionsByUser/${userId}`).then(result => {
                        setItems(result.data);
                    })

                    console.log("Unblocked user");
                })
            } catch (error) {
                console.log("Error unblocking user");
            }
        } else {
            try {
                axios.post(`auth/blockAppUser/${userId}`).then(() => {
                    setInputValues({ ...inputValues, role: 'BLOCKED'});
                    const updatedItems = items.map(item => {
                        return { ...item, conventionStatus: 'BLOCKED'};
                    })
                    setItems(updatedItems);
                    console.log("Blocked user");
                })
            } catch (error) {
                console.log("Error unblocking user");
            }
        }
    }


    return (

        <div className="main-wrap">

            <TopNav/>

            {Object.keys(errors).map((errorKey) => (
                <ErrorNotification key={errorKey} text={errors[errorKey]} />
            ))}

            {success && <SuccessNotification text="Successfully changed user information." />}
            {deletedSuccessfully && <SuccessNotification text="Successfully deleted entry." />}
            {deletedError && <ErrorNotification text="Failed to delete the entry." />}

            {inputValues.role === 'BLOCKED' && (<ErrorNotification text="Your account has been blocked."/>)}

            <div className="account-main-content-wrap">
                <form onSubmit={handleSubmitUserInfo} className="account-info-pane">
                    <div className="account-info-content">
                        <div className="single-info-wrap">
                            <label>First Name</label>
                            <input disabled={isReadOnly} type="text" name="firstName" onChange={handleInputChange} value={inputValues.firstName} readOnly={isReadOnly}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Last Name</label>
                            <input disabled={isReadOnly} type="text" name="lastName" onChange={handleInputChange} value={inputValues.lastName} readOnly={isReadOnly}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Email</label>
                            <input disabled={true} type="text" name="email" onChange={handleInputChange} value={inputValues.email} readOnly={isReadOnly}/>
                        </div>
                    </div>

                    {!isAdmin && (
                        <div className="account-info-buttons-wrap">
                            <button className="account-page-button" type="button" onClick={toggleReadOnly}
                                    style={{ backgroundColor: isReadOnly ? '#F3E156FF' : '#6540B0FF' }}>
                                <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                            </button>

                            <button className="account-page-button" type="submit">
                                <FontAwesomeIcon icon={faCheck} className="icon"/>
                            </button>
                        </div>
                    )}

                </form>

                {!isAdmin ? (
                    <Link className="change-password-link" to={"/ChangePassword"} state={{ userEmail: inputValues.email }}>Change Password</Link>
                ) : (
                    <button className="change-password-link" onClick={() => handleBlockUserClick()}>
                        {inputValues.role === 'BLOCKED' ? (
                            <FontAwesomeIcon className='block-user-icon' icon={faUnlockAlt}/>
                        ) : (
                            <FontAwesomeIcon className='block-user-icon' icon={faLock}/>
                        )}
                    </button>
                )}

            </div>

            <div className="items-wrap">

                {items.length > 0 && items.map((item) =>(
                    <div key={item.id} className='account-item-wrap'>
                        {visibleNotifications[item.id] &&
                            <div onSubmit={handleDeleteEntry} className='delete-notification-wrap'>
                                <label>Are you sure you want to delete this entry?</label>
                                <div className='delete-notification-buttons-wrap'>
                                    <button className="account-page-button" type="submit" onClick={() => handleDeleteEntry(item.id)}>Yes</button>
                                    <button className="account-page-button" type="button" onClick={() => handleCancelClick(item.id)}>No</button>
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

                        {isAdmin ? (
                            <div className='account-item-buttons-wrap'>
                                <button className="account-item-buttons-wrap-button" onClick={() => handleBlockConventionClick(item.id, item.conventionStatus)}>
                                    {item.conventionStatus === 'BLOCKED' ? (
                                        <FontAwesomeIcon icon={faUnlockAlt} className="icon"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faLock} className="icon"/>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className='account-item-buttons-wrap'>
                                <Link to={"/EditConventionPage/" + item.id} className="account-item-buttons-wrap-button">
                                    <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                                </Link>
                                <button className="account-item-buttons-wrap-button" onClick={() => handleDeleteClick(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} className="icon"/>
                                </button>
                            </div>
                        )}

                    </div>
                ))}

            </div>

        </div>
    )
}

export default AccountPage