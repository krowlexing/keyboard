import { createBrowserRouter, NavLink } from "react-router-dom";
import { KeyboardInputTest } from "../pages/KeyboardInputTest";
import { Exercises } from "../pages/Exercises";
import { Stats } from "../pages/Stats";
import { adminRouter } from "./adminRouter";

export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <NavLink to="/keyboard">Keyboard</NavLink>
                <br />
                <NavLink to="/exercises">Exercises</NavLink>
                <br />
                <NavLink to="/stats">Stats</NavLink>
                <br />
                <NavLink to="/admin">Admin</NavLink>
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
    {
        path: "/stats",
        element: <Stats />,
    },
    {
        path: "/admin",
        children: adminRouter,
    },
]);
