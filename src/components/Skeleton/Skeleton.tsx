import { AppHeader } from "../AppHeader";

interface Props {
    children?: React.ReactNode;
}

export function Skeleton(props: Props) {
    const { children } = props;
    return (
        <div>
            <AppHeader selected="exercises" />
            {children}
        </div>
    );
}
