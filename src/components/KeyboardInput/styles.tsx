import styled from "@emotion/styled";

type Props = {
    disabled?: boolean;
};

export const TextInputContainer = styled.div((props: Props) => ({
    border: props.disabled ? "1px solid red" : "1px solid gray",
    borderRadius: "5px",
    height: "200px",
    padding: "5px",
    margin: "5px",
    fontSize: "2rem",
}));

export const Placeholder = styled.span`
    color: gray;
`;

export const WrongInput = styled.span`
    color: black;
    background-color: red;
    white-space: pre;
    display: inline-block;
`;

export const InvisibleInput = styled.input`
    position: absolute;
    opacity: 0;
`;
