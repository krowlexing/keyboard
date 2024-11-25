import { createBrowserRouter, NavLink } from "react-router-dom";
import { KeyboardInputTest } from "../pages/KeyboardInputTest";
import { Exercises } from "../pages/Exercises";

export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <NavLink to="/keyboard">Keyboard</NavLink>
                <br />
                <NavLink to="/exercises">Exercises</NavLink>
            </div>
        ),
    },
    {
        path: "/keyboard",
        element: <KeyboardInputTest />,
    },
    {
        path: "/exercises",
        element: <Exercises />,
    },
]);
