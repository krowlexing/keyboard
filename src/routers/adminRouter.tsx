import {
    createBrowserRouter,
    Navigate,
    NavLink,
    RouteObject,
} from "react-router-dom";
import { KeyboardInputTest } from "../pages/KeyboardPage";
import { Exercises } from "../pages/Exercises";
import { Stats } from "../pages/Stats";
import { DifficultySettings } from "../pages/admin/DifficultySettings";
import { ExerciseCreation } from "../pages/admin/ExerciseCreation";
import { ExerciseEdit } from "../pages/admin/ExerciseEdit";
import { ExerciseEditor } from "../pages/admin/ExerciseEditor";
import { AdminStats } from "../pages/admin/AdminStats";

export const adminRouter: RouteObject[] = [
    {
        path: "",
        element: <Navigate to="difficulty" />,
    },
    {
        path: "difficulty",
        element: <DifficultySettings />,
    },
    {
        path: "create",
        element: <ExerciseCreation />,
    },
    {
        path: "edit",
        element: <ExerciseEdit />,
    },
    {
        path: "editor/:id",
        element: <ExerciseEditor />,
    },
    {
        path: "stats",
        element: <AdminStats />,
    },
];
