import React, {useEffect, useState} from "react";
import "./Home.css"
import TopNav from "../TopNav/TopNav";
import FilterMenu from "../FilerMenu/FilterMenu";
import Item from "../Item/Item";
import axios from "../../config/axios";
import ErrorNotification from "../ErrorNotification/ErrorNotification";

const Home = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        try {
            axios.get("public/getAllConventions").then((res) => {
                const conventions = res.data;
                setItems(conventions);
            });
        } catch (error) {
            console.log(error)
        }

    }, []);

    const [filteredData, setFilteredData] = useState(null);

    const handleFilter = (filteredData) => {
        setFilteredData(filteredData);
        console.log(filteredData);
    };

    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu onFilter={handleFilter}/>
            {filteredData !== null ? (
                filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Item key={item.id}
                                  id={item.id}
                                  status={item.conventionStatus}
                                  logo={item.logo}
                                  city={item.city}
                                  country={item.country}
                                  startDate={item.selectedStartDate}
                                  endDate={item.selectedEndDate}
                                  tags={item.selectedTags}
                                  description={item.description}/>
                        ))
                    ) : (
                    <ErrorNotification text="No conventions found"/>
                )
            ) : items.length > 0 ? (
                items.map((item) => (
                    <Item key={item.id}
                          id={item.id}
                          status={item.conventionStatus}
                          logo={item.logo}
                          city={item.city}
                          country={item.country}
                          startDate={item.selectedStartDate}
                          endDate={item.selectedEndDate}
                          tags={item.selectedTags}
                          description={item.description}/>
                ))
            ) : (
                <ErrorNotification text="No conventions found"/>
            )}

        </div>
    )
}

export default Home