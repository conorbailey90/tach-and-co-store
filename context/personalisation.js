import { createContext, useContext,  useState} from "react";

const PersonalisationContext = createContext();

export const PersonalisationProvider = ({children}) => {

    const [state, setState] = useState('No Personalisation added.');

    const setPersonalisation = (state) => {
        setState(state)
    }

    return (
        <PersonalisationContext.Provider value={{state, setPersonalisation} }>
                {children}
        </ PersonalisationContext.Provider >
    )
}

export const usePersonalisationState = () => useContext(PersonalisationContext);
