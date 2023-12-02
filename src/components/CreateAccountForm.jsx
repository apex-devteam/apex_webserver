import { useReducer } from "react";

// COMPONENT NOT IN ANY OF THE RENDERED PAGES
// USES REDUCER METHOD FOR FORMS. 
const initialForm = {
    firstName: "",
    lastName: "",
    middleInitials: "",
    username: "",
    password: "",
    passwordConfirm: "",
}

const formReducer = (state, action) => {
    // console.log("state", state)
    switch (action.type) {
        case "TEXT-INPUT":
            return {...state, [action.field]: action.payload}
        case 'RESET-INPUTS': {
            console.log('action', action)
            return {...state, state: ""}
        }
        default: 
            return state
    }
}
const CreateAccountForm = () => {
    const [state, dispatch] = useReducer(formReducer, initialForm)
    
    const handleTextInput = (event) => {
        dispatch({
            type: 'TEXT-INPUT',
            field: event.target.name,
            payload: event.target.value
        })
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        console.log(state)
        dispatch({
            type: 'RESET-INPUTS',
            payload: state
        })
    }


    return (
        <div>
            <fieldset>
                <form onSubmit={(event) => handleCreateAccount(event, state)}>
                    <fieldset>
                        <h3 className="form-title">Create new User for Location</h3>
                        <div>
                            <label className="form-label">
                                First Name: 
                            </label>
                            <input type="text" name="firstName" value={state.firstName} onChange={(event) => handleTextInput(event)} required className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Last Name: 
                            </label>
                            <input type="text" name="lastName" value={state.lastName}  onChange={(event) => handleTextInput(event)} required className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Middle Initials: 
                            </label>
                            <input type="text" maxLength={1} name="middleInitials"value={state.middleInitials} onChange={(event) => handleTextInput(event)} className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Username: 
                            </label>
                            <input type="text" name="username" value={state.username} onChange={(event) => handleTextInput(event)} required className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Password: 
                            </label>
                            <input type="password" name="password" value={state.password} onChange={(event) => handleTextInput(event)} required className="form-input"/>
                        </div>
                        <div>
                            <label className="form-label">
                                Confirm Password: 
                            </label>
                            <input type="password" name="passwordConfirm" value={state.passwordConfirm} onChange={(event) => handleTextInput(event)} required className="form-input"/>
                        </div>
                        <button className="btn"type="submit">Create</button>
                    </fieldset>
                </form>
            </fieldset>
        </div>
    );
};

export default CreateAccountForm;