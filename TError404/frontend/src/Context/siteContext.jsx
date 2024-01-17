import { createContext, useState } from "react";

export const SiteContext=createContext();


const SideContextProvider=({children})=>{

    const [toggle,setToggle]=useState(false);
    const [Post,setPost]=useState("");
    const [nav,setnav]=useState("Home");


    return(
        <SiteContext.Provider value={{toggle,setToggle,Post,setPost,nav,setnav}}>
            {children}
        </SiteContext.Provider>
    )
}

export default SideContextProvider;