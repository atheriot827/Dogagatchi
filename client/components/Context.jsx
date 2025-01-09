import { useState, useEffect, createContext, useContext} from 'react';

const UserContext = createContext();

export function Context({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
    if (storedUser && storedUser !== 'null') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    }, [])

    const setUserContext = (userData) => {
        setUser(userData);
        setIsAuthenticated(!!userData);
        const userString = JSON.stringify(userData)
        sessionStorage.setItem('user', userString);
    };

    return(
        <UserContext.Provider value={{ 
            user, 
            setUserContext, 
            isAuthenticated 
          }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useAuth must be used within a Context Provider');
    }
    return context;
  };