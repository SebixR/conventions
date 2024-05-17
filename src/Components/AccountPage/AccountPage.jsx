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
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
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
                setUserFirstName(userDataResponse.firstName);
                setUserLastName(userDataResponse.lastName);
                setUserEmail(userDataResponse.email);
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token, userId])

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

    return (

        <div className="account-main-wrap">

            <TopNav/>

            <div className="account-main-content-wrap">

                <div className="account-info-pane">
                    <div className="account-info-content">
                        <div className="single-info-wrap">
                            <label>First Name</label>
                            <input type="text" value={userFirstName} readOnly={true}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Last Name</label>
                            <input type="text" value={userLastName} readOnly={true}/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Email</label>
                            <input type="text" value={userEmail} readOnly={true}/>
                        </div>
                    </div>

                    <div className="account-info-buttons-wrap">
                        <button type="submit">
                            <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faCheck} className="icon"/>
                        </button>
                    </div>
                </div>

                <button type="button">Change Password</button>

            </div>

            <div className="items-wrap">

                {items.map((item) =>(
                    <div key={item.id} className='account-item-wrap'>
                        <div className='delete-notification-wrap'>
                            <label>Are you sure you want to delete this entry?</label>
                            <div className='delete-notification-buttons-wrap'>
                                <button>Yes</button>
                                <button type="button">No</button>
                            </div>
                        </div>

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
                            <button>
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