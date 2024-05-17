import React from "react"
import TopNav from "../TopNav/TopNav";
import "./AccountPage.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPencilSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import Item from "../Item/Item";

const AccountPage = () => {
    return (

        <div className="main-wrap">

            <TopNav/>

            <div className="account-main-content-wrap">

                <div className="account-info-pane">
                    <div className="account-info-content">
                        <div className="single-info-wrap">
                            <label>First Name</label>
                            <input type="text"/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Last Name</label>
                            <input type="text"/>
                        </div>
                        <div className="single-info-wrap">
                            <label>Email</label>
                            <input type="text"/>
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

                <div className='account-item-wrap'>

                    <Item key={1}
                          id={1}
                          status={'ONGOING'}
                          eventName={'Test'}
                          logo={'logo.png'}
                          city={'Test'}
                          country={'Test'}
                          startDate={'Test'}
                          endDate={'Test'}
                          tags={['Test']}
                          description={'Test'}/>

                    <div className='account-item-buttons-wrap'>
                        <button>
                            <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faTrash} className="icon"/>
                        </button>
                    </div>
                </div>

                <div className='account-item-wrap'>

                    <Item key={1}
                          id={1}
                          status={'ONGOING'}
                          eventName={'Test'}
                          logo={'logo.png'}
                          city={'Test'}
                          country={'Test'}
                          startDate={'Test'}
                          endDate={'Test'}
                          tags={['Test']}
                          description={'Test'}/>

                    <div className='account-item-buttons-wrap'>
                        <button>
                            <FontAwesomeIcon icon={faPencilSquare} className="icon"/>
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faTrash} className="icon"/>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AccountPage