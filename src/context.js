import React, { createContext, useState } from 'react';

// Create Context
export const MessageContext = createContext();

// Create a Provider Component
export const MessageProvider = ({ children }) => {
    const [messageContent, setMessageContent] = useState(null);

    return (
        <MessageContext.Provider value={{ messageContent, setMessageContent }}>
            {children}
        </MessageContext.Provider>
    );
};
