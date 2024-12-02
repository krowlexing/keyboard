import { Skeleton } from "../Skeleton";
import { SkeletonProps } from "../Skeleton/Skeleton";
import { MenuHeader, MenuItems } from "./MenuHeader";

export const AdminSkeleton = (props: SkeletonProps<MenuItems>) => (
    <Skeleton {...props} header={MenuHeader} />
);
