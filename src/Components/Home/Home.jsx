import React, {useContext, useEffect, useState} from "react";
import "./Home.css"
import TopNav from "../TopNav/TopNav";
import FilterMenu from "../FilerMenu/FilterMenu";
import Item from "../Item/Item";
import axios from "../../config/axios";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import {fetchAdmin} from "../../fetchAdmin";
import {useAuth} from "../../provider/AuthProvider";
import {UserSearchContext} from "../TopNav/UserSearchContext";

const Home = () => {

    const [items, setItems] = useState([])

    const { conventionSearchResults } = useContext(UserSearchContext);
    const [conventionSearchResultsCopy, setConventionSearchResultsCopy] = useState(conventionSearchResults);
    useEffect(() => {
        setConventionSearchResultsCopy(conventionSearchResults);
    }, [conventionSearchResults])

    const [isAdmin, setIsAdmin] = useState(false);
    const { token } = useAuth();
    useEffect(() => {
        try {
            if (token) {
                fetchAdmin(token, setIsAdmin);
            } else setIsAdmin(false);

            axios.get("public/getAllConventions").then((res) => {
                let conventions = res.data;
                if (!isAdmin) {
                    conventions = conventions.filter(item => item.conventionStatus !== 'BLOCKED');
                }
                setItems(conventions);
            });
        } catch (error) {
            console.log(error)
        }
    }, [isAdmin, token]);

    const [filteredData, setFilteredData] = useState(null);

    const handleFilter = (filteredData) => {
        setConventionSearchResultsCopy([]);
        setFilteredData(filteredData);
        console.log(filteredData);
    };

    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu onFilter={handleFilter}/>
            {conventionSearchResultsCopy.length !== 0 ? (
                conventionSearchResults.map((item) => (
                    <Item key={item.id}
                          id={item.id}
                          userId={item.userId}
                          status={item.conventionStatus}
                          eventName={item.eventName}
                          logo={item.logo}
                          city={item.city}
                          country={item.country}
                          startDate={item.selectedStartDate}
                          endDate={item.selectedEndDate}
                          tags={item.selectedTags}
                          description={item.description}
                          isAdmin={isAdmin}/>
                ))
            ) : (
                filteredData !== null ? (
                    filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Item key={item.id}
                                  id={item.id}
                                  userId={item.userId}
                                  status={item.conventionStatus}
                                  eventName={item.eventName}
                                  logo={item.logo}
                                  city={item.city}
                                  country={item.country}
                                  startDate={item.selectedStartDate}
                                  endDate={item.selectedEndDate}
                                  tags={item.selectedTags}
                                  description={item.description}
                                  isAdmin={isAdmin}/>
                        ))
                    ) : (
                        <ErrorNotification text="No conventions found"/>
                    )
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <Item key={item.id}
                              id={item.id}
                              userId={item.userId}
                              status={item.conventionStatus}
                              eventName={item.eventName}
                              logo={item.logo}
                              city={item.city}
                              country={item.country}
                              startDate={item.selectedStartDate}
                              endDate={item.selectedEndDate}
                              tags={item.selectedTags}
                              description={item.description}
                              isAdmin={isAdmin}/>
                    ))
                ) : (
                    <ErrorNotification text="No conventions found"/>
                )
            )}

        </div>
    )
}

export default Home