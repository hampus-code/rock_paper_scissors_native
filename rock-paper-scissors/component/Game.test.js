import Game from "./Game";
import { render } from "@testing-library/react-native";

describe("Game component", () => {
  it("Renders 'Rock, Paper & Scissors' text", () => {
    const { getByText } = render(<Game />);

    const gameHeaderText = getByText("Rock, Paper & Scissors");

    expect(gameHeaderText).toBeTruthy();
  });
});
