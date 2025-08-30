import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/button";

describe("components/ui/Button", () => {
  it("should render with default variant and size", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("should render with different variants", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("bg-destructive", "text-destructive-foreground");
  });

  it("should render with different sizes", () => {
    render(<Button size="sm">Small button</Button>);
    const button = screen.getByRole("button", { name: /small button/i });
    expect(button).toHaveClass("h-8", "rounded-md", "px-3", "text-xs");
  });

  it("should render with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: /outline/i });
    expect(button).toHaveClass("border", "border-input", "bg-background");
  });

  it("should render with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("bg-secondary", "text-secondary-foreground");
  });

  it("should render with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: /ghost/i });
    expect(button).toHaveClass("hover:bg-accent", "hover:text-accent-foreground");
  });

  it("should render with link variant", () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole("button", { name: /link/i });
    expect(button).toHaveClass("text-primary", "underline-offset-4", "hover:underline");
  });

  it("should render with large size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });
    expect(button).toHaveClass("h-10", "rounded-md", "px-8");
  });

  it("should render with icon size", () => {
    render(<Button size="icon">🔥</Button>);
    const button = screen.getByRole("button", { name: /🔥/i });
    expect(button).toHaveClass("h-9", "w-9");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
  });

  it("should accept custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  it("should forward additional props", () => {
    render(
      <Button data-testid="custom-button" type="submit">
        Submit
      </Button>,
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("inline-flex", "items-center", "justify-center");
  });
});
