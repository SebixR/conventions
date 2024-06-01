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
import {useSearchPagination} from "../TopNav/SearchPaginationContext";
import Footer from "../Footer/Footer";

const Home = () => {

    const [items, setItems] = useState([])

    const { conventionSearchResults, handleConventionSearch } = useContext(UserSearchContext);
    const { searchKeyword, pageNumber, totalPageNumber, setPage } = useSearchPagination();

    const performConventionSearch = () => {
        handleConventionSearch(searchKeyword, pageNumber);
    }

    const [conventionSearchResultsCopy, setConventionSearchResultsCopy] = useState(conventionSearchResults);
    useEffect(() => {
        setConventionSearchResultsCopy(conventionSearchResults);
    }, [conventionSearchResults])

    const [filteredData, setFilteredData] = useState(null);

    const handlePageChange = (newPage) => {
        if (filteredData === null) setPage(newPage);
        else setCurrentPageFiltered(newPage);
    }

    const handleFilter = (filteredData) => {
        setConventionSearchResultsCopy([]);
        setFilteredData(filteredData);
    };
    const resetFilterCurrentPage = (newCurrentPage) => {
        setCurrentPageFiltered(newCurrentPage);
    }


    const [currentPageFiltered, setCurrentPageFiltered] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const { token } = useAuth();
    useEffect(() => {
        try {
            if (token) {
                fetchAdmin(token, setIsAdmin);
            } else setIsAdmin(false);

            if (conventionSearchResultsCopy.length > 0) {
                performConventionSearch();
            } else {
                axios.get("public/getAllConventions", {params: {page: pageNumber}}).then((res) => {
                    let conventions = res.data.content;
                    if (!isAdmin && conventions.length > 0) {
                        conventions = conventions.filter(item => item.conventionStatus !== 'BLOCKED');
                    }
                    setItems(conventions);
                    setTotalPages(res.data.totalPages);
                });
            }
        } catch (error) {
            console.log(error)
        }
    }, [pageNumber, filteredData, isAdmin, token]);


    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu onFilter={handleFilter} currentPage={currentPageFiltered} setCurrentPage={resetFilterCurrentPage}/>
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

            <div className="pagination">
                {conventionSearchResultsCopy.length > 0 ? (
                    Array.from({ length: totalPageNumber }, (_, index) => (
                        <button className="page-button" key={index} onClick={() => handlePageChange(index)}
                                disabled={index === pageNumber} type="button">
                            {index + 1}
                        </button>
                    ))
                ) : (

                    filteredData === null ? (
                        Array.from({ length: totalPages }, (_, index) => (
                            <button className="page-button" key={index} onClick={() => handlePageChange(index)}
                                    disabled={index === pageNumber} type="button">
                                {index + 1}
                            </button>
                        ))
                    ) : (
                        Array.from({ length: totalPageNumber }, (_, index) => (
                            <button className="page-button" key={index} onClick={() => handlePageChange(index)}
                                    disabled={index === currentPageFiltered} type="button">
                                {index + 1}
                            </button>
                        ))
                    )

                )}

            </div>

            <Footer/>

        </div>
    )
}

export default Home