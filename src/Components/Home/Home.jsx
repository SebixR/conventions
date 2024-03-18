import React from "react";
import "./Home.css"
import TopNav from "../TopNav/TopNav";
import FilterMenu from "../FilerMenu/FilterMenu";

const Home = () => {
    return (
        <div className='main-wrap'>
            <TopNav/>

            <FilterMenu/>

        </div>
    )
}

export default Home