import { useReducer } from "react";

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
                        <h3>Create new User for Location</h3>
                        <div>
                            First Name: 
                            <input type="text" name="firstName" value={state.firstName} onChange={(event) => handleTextInput(event)} required/>
                        </div>
                        <div>
                            Last Name: 
                            <input type="text" name="lastName" value={state.lastName}  onChange={(event) => handleTextInput(event)} required/>
                        </div>
                        <div>
                            Middle Initials: 
                            <input type="text" maxLength={1} name="middleInitials"value={state.middleInitials} onChange={(event) => handleTextInput(event)}/>
                        </div>
                        <div>
                            Username: 
                            <input type="text" name="username" value={state.username} onChange={(event) => handleTextInput(event)} required/>
                        </div>
                        <div>
                            Password: 
                            <input type="password" name="password" value={state.password} onChange={(event) => handleTextInput(event)} required/>
                        </div>
                        <div>
                            Confirm Password: 
                            <input type="password" name="passwordConfirm" value={state.passwordConfirm} onChange={(event) => handleTextInput(event)} required/>
                        </div>
                        <button type="submit">Create</button>
                    </fieldset>
                </form>
            </fieldset>
        </div>
    );
};

export default CreateAccountForm;