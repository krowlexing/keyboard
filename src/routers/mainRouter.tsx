import { createBrowserRouter, Navigate, NavLink } from "react-router-dom";
import { KeyboardInputTest } from "../pages/KeyboardPage";
import { Exercises } from "../pages/Exercises";
import { Stats } from "../pages/Stats";
import { adminRouter } from "./adminRouter";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";

export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/auth/login"} />,
    },
    {
        path: "/keyboard/:id",
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
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Registration />,
            },
        ],
    },
]);
