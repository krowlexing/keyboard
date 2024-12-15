import styled from "@emotion/styled";

type Props = {
    disabled?: boolean;
};

export const TextInputContainer = styled.div((props: Props) => ({
    border: props.disabled ? "1px solid red" : "1px solid gray",
    borderRadius: "5px",
    padding: "5px",
    margin: "5px",
}));

export const Placeholder = styled.span`
    color: gray;
`;

export const WrongInput = styled.span`
    color: black;
    background-color: red;
    white-space: pre;
    display: inline-block;
    min-width: 10px;
`;

export const InvisibleInput = styled.input`
    position: absolute;
    opacity: 0;
`;
