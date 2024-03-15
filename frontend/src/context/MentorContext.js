import { createContext,useState } from "react";

export const FeedbackProvider = ({ children })=>{
    const [mentor,setMentor] = useState({});

   

    return <FeedbackContext.Provider
        value = {{
            items,
            FeedbackUpdate,
            DeleteItem,
            addFeedback,
            EditItems,
            UpdateItems,
            }
        }
    >
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;