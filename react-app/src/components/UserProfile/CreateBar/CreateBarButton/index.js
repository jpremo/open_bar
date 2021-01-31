import React from "react"
import { NavLink } from "react-router-dom"

const CreateBarButton = () => {
    return (
        <div id="create-bar-button">
            <NavLink to={`/bars/create`}>
                <h4>Own a Bar?</h4>
            </NavLink>
        </div>
    )
}

export default CreateBarButton