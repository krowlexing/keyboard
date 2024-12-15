type Props = {
    time: string;
};

export function Timer(props: Props) {
    const { time } = props;
    return <div>{time}</div>;
}
