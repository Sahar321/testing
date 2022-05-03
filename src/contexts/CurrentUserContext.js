
import React, { createContext, useState, useEffect } from "react";
import { api } from "../utils/Api";

const CurrentUserContext = createContext();

const CurrentUserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api
            .getUserInfo()
            .then((res) => setCurrentUser(res))
            .catch((error) => console.log(error));
    }, []);
    return (

        <CurrentUserContext.Provider value={currentUser}>
            {currentUser && children}
        </CurrentUserContext.Provider>
    );
};

export { CurrentUserContext, CurrentUserContextProvider };