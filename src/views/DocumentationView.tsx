import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";

// Import components from their respective directories
import Button from "../components/button/Button";
import DisplayTime from "../components/displayTime/DisplayTime";
import DisplayRounds from "../components/displayRounds/DisplayRounds";
import ThemeToggle from "../components/themeToggle/ThemeToggle";
import Loading from "../components/generic/Loading"; // Include this if needed in documentation

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Documentation = () => {
    return (
        <Container>
            <Title>Component Documentation</Title>

            {/* Documenting each component using DocumentComponent */}

            {/* Button Documentation */}
            <DocumentComponent
                title="Button"
                component={<Button label="Click me" onClick={() => alert("Button clicked!")} />}
                propDocs={[
                    { prop: "label", description: "Text displayed on the button", type: "string", defaultValue: "''" },
                    { prop: "onClick", description: "Function called when the button is clicked", type: "function", defaultValue: "undefined" },
                    { prop: "disabled", description: "Disables the button if true", type: "boolean", defaultValue: "false" },
                ]}
            />

            {/* DisplayTime Documentation */}
            <DocumentComponent
                title="DisplayTime"
                component={<DisplayTime time={120} />}
                propDocs={[
                    { prop: "time", description: "Time in seconds to be displayed", type: "number", defaultValue: "0" },
                ]}
            />

            {/* DisplayRounds Documentation */}
            <DocumentComponent
                title="DisplayRounds"
                component={<DisplayRounds currentRound={3} totalRounds={10} />}
                propDocs={[
                    { prop: "currentRound", description: "Current round number", type: "number", defaultValue: "1" },
                    { prop: "totalRounds", description: "Total number of rounds", type: "number", defaultValue: "1" },
                ]}
            />


            {/* ThemeToggle Documentation */}
            <DocumentComponent
                title="ThemeToggle"
                component={<ThemeToggle />}
                propDocs={[
                    { prop: "N/A", description: "This component has no props", type: "N/A", defaultValue: "N/A" },
                ]}
            />

            {/* Loading Component Documentation if applicable */}
            <DocumentComponent
                title="Loading Spinner"
                component={<Loading size="medium" color="#ffa2bf" />}
                propDocs={[
                    { prop: "size", description: "Changes the size of the loading spinner", type: "string", defaultValue: "medium" },
                    { prop: "color", description: "Sets the color of the spinner", type: "string", defaultValue: "#000" },
                ]}
            />
        </Container>
    );
};

export default Documentation;