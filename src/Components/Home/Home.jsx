import React from "react";
import "./Home.css"
import TopNav from "../TopNav/TopNav";
import FilterMenu from "../FilerMenu/FilterMenu";
import Item from "../Item/Item";

const Home = () => {
    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu/>

            <Item/>

        </div>
    )
}

export default Home