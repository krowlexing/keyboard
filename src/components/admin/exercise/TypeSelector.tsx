import { Button, Stack } from "@mui/material";

interface Props {
    manual: boolean;
    onChange: (manual: boolean) => void;
}

export function TypeSelector(props: Props) {
    const { manual, onChange } = props;
    return (
        <Stack direction="row">
            <Blob
                text="Ручной режим"
                selected={manual}
                onClick={() => onChange(true)}
            />
            <Blob
                text="Автоматический режим"
                selected={!manual}
                onClick={() => onChange(false)}
            />
        </Stack>
    );
}

type BlobProps = {
    text: string;
    onClick: () => void;
    selected?: boolean;
};

function Blob(props: BlobProps) {
    return (
        <Button
            variant="outlined"
            onClick={props.onClick}
            sx={{
                color: "black",
                width: 300,
                borderColor: props.selected ? "blue" : "black",
                borderWidth: props.selected ? 2 : 1,
                borderStyle: "solid",
                borderRadius: 100,
                margin: 5,
                ":hover": {
                    borderColor: props.selected ? "blue" : "black",
                    borderWidth: props.selected ? 2 : 1,
                },
            }}
        >
            {props.text}
        </Button>
    );
}
