import Game from "./Game";
import { render } from "@testing-library/react-native";

describe("Game component", () => {
  it("Check text Restart Game", () => {
    const { getByText } = render(<Game />);

    const gameHeaderText = getByText("Restart Game");

    expect(gameHeaderText).toBeTruthy();
  });
});
