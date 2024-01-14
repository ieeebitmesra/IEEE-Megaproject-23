import React, { useState } from "react";
import "./Categories.css";

const Cat_list = ['Bicycle', 'calculator', 'clothing', 'Lab Coat', 'Study Table', 'Electronics', 'sports', 'Footwear', 'Stationary'];

function Categories(props) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const renderCategories = () => {
        if (isMobile) {
            return (
                <select onChange={(e) => props.handleCategory && props.handleCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {Cat_list.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            );
        } else {
            return (
                <>
                    <span>All Categories</span>
                    {Cat_list && Cat_list.length > 0 &&
                        Cat_list.map((item, index) => (
                            <span onClick={() => props.handleCategory && props.handleCategory(item)} key={index}>{item}</span>
                        ))}
                </>
            );
        }
    };

    return (
        <div className="cat">
            {renderCategories()}
        </div>
    );
}

export default Categories;
