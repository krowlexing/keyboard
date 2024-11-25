import { AppHeader } from "../AppHeader";

interface Props {
    children?: React.ReactNode;
}

export function Skeleton(props: Props) {
    const { children } = props;
    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "#999",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppHeader selected="exercises" />
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    margin: 20,
                    background: "white",
                    borderRadius: 10,
                }}
            >
                {children}
            </div>
        </div>
    );
}
