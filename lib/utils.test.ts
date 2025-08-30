import { describe, expect, it } from "vitest";
import { Caip2ByChainAlias, cn, formatPercent, resolveChainAlias } from "@/lib/utils";

describe("lib/utils", () => {
  describe("cn", () => {
    it("should merge classes correctly", () => {
      expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    });

    it("should handle conditional classes", () => {
      expect(cn("px-2", true && "py-1", false && "py-2")).toBe("px-2 py-1");
    });

    it("should handle tailwind class conflicts", () => {
      expect(cn("px-2", "px-4")).toBe("px-4");
    });
  });

  describe("resolveChainAlias", () => {
    it("should resolve mainnet correctly", () => {
      expect(resolveChainAlias("eip155:1")).toBe("mainnet");
    });

    it("should resolve arbitrum-one correctly", () => {
      expect(resolveChainAlias("eip155:42161")).toBe("arbitrum-one");
    });

    it("should return original id for unknown chains", () => {
      expect(resolveChainAlias("eip155:999999")).toBe("eip155:999999");
    });

    it("should handle multiple matches by returning original id", () => {
      // This tests the edge case where multiple aliases might match the same CAIP-2 id
      expect(resolveChainAlias("eip155:1")).toBe("mainnet");
    });
  });

  describe("formatPercent", () => {
    it("should format number as percentage", () => {
      expect(formatPercent(0.1234)).toBe("0.12%");
    });

    it("should format string as percentage", () => {
      expect(formatPercent("0.1234")).toBe("0.12%");
    });

    it("should handle custom decimal places", () => {
      expect(formatPercent(0.1234, 4)).toBe("0.1234%");
    });

    it("should handle invalid numbers", () => {
      expect(formatPercent(Number.NaN)).toBe("0%");
      expect(formatPercent(Number.POSITIVE_INFINITY)).toBe("0%");
    });

    it("should handle zero", () => {
      expect(formatPercent(0)).toBe("0%");
    });

    it("should handle large numbers", () => {
      expect(formatPercent(100)).toBe("100%");
    });
  });

  describe("Caip2ByChainAlias", () => {
    it("should contain expected chain mappings", () => {
      expect(Caip2ByChainAlias.mainnet).toBe("eip155:1");
      expect(Caip2ByChainAlias.gnosis).toBe("eip155:100");
      expect(Caip2ByChainAlias["arbitrum-one"]).toBe("eip155:42161");
    });

    it("should have consistent keys and values", () => {
      // Ensure all values are in CAIP-2 format
      for (const [alias, caip2] of Object.entries(Caip2ByChainAlias)) {
        expect(caip2).toMatch(/^eip155:\d+$/);
        expect(alias).toBeTruthy();
      }
    });
  });
});
