import { AppHeader } from "../AppHeader";

export interface SkeletonProps<T extends string> {
    selected: T;
    header?: (props: { selected: T }) => React.ReactNode;
    children?: React.ReactNode;
}

export function Skeleton<T extends string>(props: SkeletonProps<T>) {
    const { selected, children } = props;
    const Header = props.header ?? AppHeader;
    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "#999",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header selected={selected as any} />
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    margin: 20,
                    marginBottom: 0,
                    background: "white",
                    borderRadius: 10,
                }}
            >
                {children}
            </div>
        </div>
    );
}
