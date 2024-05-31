import React, {createContext, useContext, useState} from "react";

const SearchPaginationContext = createContext();

export const useSearchPagination = () => useContext(SearchPaginationContext);

export const SearchPaginationProvider = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPageNumber, setTotalPageNumber] = useState(0);

    const setSearch = (keyword) => setSearchKeyword(keyword);
    const setPage = (page) => setPageNumber(page);
    const setTotalPage = (number) => setTotalPageNumber(number);

    return (
        <SearchPaginationContext.Provider value={{ searchKeyword, pageNumber, totalPageNumber, setSearch, setTotalPage, setPage }}>
            {children}
        </SearchPaginationContext.Provider>
    );
};