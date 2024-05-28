import React, {useEffect, useState} from "react"
import AddConventionPage from "../AddConventionPage/AddConventionPage";
import {useParams} from "react-router-dom";
import axios from "../../config/axios";

const EditConventionPage = () => {

    let { conventionId } = useParams();
    const [convention, setConvention] = useState({
        id: conventionId,
        eventName: '',
        conventionStatus: '',
        logo: '',
        selectedStartDate: '',
        selectedEndDate: '',
        city: '',
        country: '',
        address1: '',
        address2: '',
        description: '',
        tickets: [],
        links: [],
        selectedTags: [],
        photos: [],
    });

    useEffect(() => {
        try {
            axios.get(`public/getConvention/${conventionId}`).then((res) => {
                const receivedConvention = res.data;
                setConvention(receivedConvention);
            })
        } catch (error) {}
    }, [conventionId])

    return (
        <div className="main-wrap">

            <AddConventionPage convention={convention}/>

        </div>
    )
}

export default EditConventionPage;