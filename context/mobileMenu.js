import { createContext, useContext,  useState} from "react";

const MobileMenuStateContext = createContext();

export const MobileMenuProvider = ({children}) => {

    const [state, setState] = useState(false);

    const setMobileMenu = (state) => {
        setState(state)
    }

    return (
        <MobileMenuStateContext.Provider value={{state, setMobileMenu} }>
                {children}
         </ MobileMenuStateContext.Provider >
         
    )
}

export const useMobileMenuState = () => useContext(MobileMenuStateContext);
