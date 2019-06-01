import styled from "styled-components";

// If a component is here, then it is used in more than one place
export const SimpleBorderedList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 2px solid black;
  padding: 10px;
  > * {
    margin: 5px;
  }
`;

const statusColorMap: { [x: string]: string } = {
  error: "red",
  success: "green",
  loading: "orange",
  ready: "blue"
};

export const StatusLabel = styled.span<{ status: string }>`
  font-weight: bold;
  color: ${props => statusColorMap[props.status] || "black"};
`;

export const FlexList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  > * {
    margin: 5px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  > * {
    margin: 5px;
  }
`;
