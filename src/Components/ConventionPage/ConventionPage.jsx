import React from "react";
import "./ConventionPage.css";
import testImage from '../Assets/SanDiegoCC/comic_con_logo.jpg'
import image1 from '../Assets/SanDiegoCC/ca-time.jpg'
import image2 from '../Assets/SanDiegoCC/san-diego-comic-con.jpg'
import image3 from '../Assets/SanDiegoCC/San_Diego_Convention_Center.jpg'
import TopNav from "../TopNav/TopNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const ConventionPage = () => {
    // let { conventionId } = useParams(); //the name of the variable has to match the name in the url (for now set in App.js)
    // console.log("Id: " + id);
    // const [convention, setConvention] = useState();
    //
    // useEffect(() => {
    //     axios.get(`http://localhost:8082/getConvention/${conventionId}`).then((res) => {
    //         const uploadedConvention = res.data;
    //         setConvention(uploadedConvention);
    //     })
    // })

    return (
        <div className='main-wrap'>

            <TopNav/>

            <div className='main-content-wrap'>
                <h2 className='name-header'>San Diego Comic-Con</h2>

                <div className='info-wrap'>
                    <FontAwesomeIcon icon={faCircle} className='status-icon'/>
                    <div className='info-content'>

                        <div className='first-row'>

                            <div className='image-wrap'>
                                <img src={testImage} alt='logo'/>
                            </div>

                            <div className='inner-row-wrap'>
                                <div className='inner-row-content'>
                                    <label>From:</label>
                                    <label className='purple-label'>12.05.2024</label>
                                    <label>To:</label>
                                    <label className='purple-label'>16.05.2024</label>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Address:</label>
                                    <label className='purple-label'>San Diego, USA</label>
                                    <label className='purple-label'>San Diego Convention Center</label>
                                    <label className='purple-label'>111 Harbor Dr</label>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Ticket Price(s):</label>
                                    <label className='purple-label'>24.99 (normal)</label>
                                    <label className='purple-label'>12.99 (0-3 y.o.)</label>
                                </div>
                                <div className='inner-row-content'>
                                    <label>Links:</label>
                                    <a href='https://www.comic-con.org/cc/' className='link-label'>Official Website</a>
                                    <a href='https://www.instagram.com/comic_con/' className='link-label'>Instagram</a>
                                </div>
                            </div>
                        </div>

                        <div className='second-row'>
                            <label>Description:</label>
                            <p className='description'>
                                San Diego Comic-Con International is a comic book convention and nonprofit
                                multi-genre entertainment event held annually in San Diego, California,
                                since 1970. The event's official name, as given on its website, is Comic-Con
                                International: San Diego, but is more commonly known as Comic-Con, the San Diego
                                Comic-Con, or the abbreviation SDCC.
                            </p>
                        </div>

                        <div className='third-row'>
                            <div className='tags-wrap'>
                                <label>Tags:</label>
                                <label className='purple-label'>Fantasy</label>
                                <label className='purple-label'>Comic Books</label>
                                <label className='purple-label'>Video Games</label>
                            </div>
                            <Link to="/Schedule/0" className='schedule-button'>Schedule</Link>
                        </div>

                    </div>
                </div>

                <div className='photos-wrap'>
                    <label>Photos:</label>
                    <div className='photos-content'>
                        <div className='photos-column'>
                            <img src={image1} alt='image1'/>
                            <img src={testImage} alt='image2'/>
                            <img src={image3} alt='image2'/>
                        </div>
                        <div className='photos-column'>
                            <img src={image2} alt='image1'/>
                            <img src={image3} alt='image2'/>
                            <img src={image1} alt='image1'/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ConventionPage;