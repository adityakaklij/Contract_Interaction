import React from "react";

export const VotingContext = React.createContext();

export const VotingProvider = ({children}) => {
    const votingTitle = "First contract";
    const m = 5
    return(
        <VotingContext.Provider value={{votingTitle, m}}>
            {children}
        </VotingContext.Provider>
    )
}