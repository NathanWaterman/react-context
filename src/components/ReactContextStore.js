import React from 'react'

const UserContext = React.createContext(null);

export const Provider = UserContext.Provider;
export const Consumer = UserContext.Consumer;
export default UserContext;