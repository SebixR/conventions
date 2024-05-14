import React, {useEffect, useState} from "react";
import "./Home.css"
import TopNav from "../TopNav/TopNav";
import FilterMenu from "../FilerMenu/FilterMenu";
import Item from "../Item/Item";
import axios from "../../config/axios";

const Home = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get("public/getAllConventions").then((res) => {
           const conventions = res.data;
           setItems(conventions);
        });
    }, []);

    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu/>

            {items.map((item) => (
                <Item key={item.id}
                      id={item.id}
                      logo={item.logo}
                      city={item.city}
                      country={item.country}
                      startDate={item.selectedStartDate}
                      endDate={item.selectedEndDate}
                      tags={item.selectedTags}
                      description={item.description}/>
            ))}

        </div>
    )
}

export default Home