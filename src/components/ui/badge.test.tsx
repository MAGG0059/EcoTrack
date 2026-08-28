import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Transporte</Badge>);
    expect(screen.getByText("Transporte")).toBeInTheDocument();
  });
});
