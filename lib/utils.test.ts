import { describe, expect, it } from "vitest";
import { Caip2ByChainAlias, cn, formatGRT, formatPercent, resolveChainAlias } from "@/lib/utils";

describe("lib/utils", () => {
  describe("cn", () => {
    it("should merge classnames correctly", () => {
      expect(cn("px-2", "py-1")).toBe("px-2 py-1");
      expect(cn("px-2", "px-4")).toBe("px-4"); // tailwind-merge should handle conflicts
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("should handle conditional classes", () => {
      expect(cn("base", true && "conditional")).toBe("base conditional");
      expect(cn("base", false && "conditional")).toBe("base");
    });
  });

  describe("resolveChainAlias", () => {
    it("should resolve known chain IDs to aliases", () => {
      expect(resolveChainAlias("eip155:1")).toBe("mainnet");
      expect(resolveChainAlias("eip155:100")).toBe("gnosis");
      expect(resolveChainAlias("eip155:42161")).toBe("arbitrum-one");
    });

    it("should return the original ID for unknown chains", () => {
      expect(resolveChainAlias("eip155:999")).toBe("eip155:999");
      expect(resolveChainAlias("unknown")).toBe("unknown");
    });

    it("should handle edge cases", () => {
      expect(resolveChainAlias("")).toBe("");
    });
  });

  describe("formatGRT", () => {
    it("should format wei amounts correctly", () => {
      // 1 GRT = 10^18 wei
      expect(formatGRT("1000000000000000000")).toBe("1"); // 1 GRT
      expect(formatGRT("1000000000000000000", { withSymbol: true })).toBe("1 GRT");
    });

    it("should handle decimal places", () => {
      expect(formatGRT("1500000000000000000", { decimals: 2 })).toBe("1.5"); // 1.5 GRT
      expect(formatGRT("1230000000000000000", { decimals: 3 })).toBe("1.23"); // 1.23 GRT
    });

    it("should handle zero and invalid inputs", () => {
      expect(formatGRT("0")).toBe("0");
      expect(formatGRT("0", { withSymbol: true })).toBe("0 GRT");
      expect(formatGRT("invalid")).toBe("0");
    });

    it("should handle bigint input", () => {
      expect(formatGRT(BigInt("1000000000000000000"))).toBe("1");
    });

    it("should handle number input", () => {
      expect(formatGRT(1000000000000000000)).toBe("1");
    });
  });

  describe("formatPercent", () => {
    it("should format percentages correctly", () => {
      expect(formatPercent(50)).toBe("50%");
      expect(formatPercent(50.5)).toBe("50.5%");
      expect(formatPercent(50.567, 2)).toBe("50.57%");
    });

    it("should handle string input", () => {
      expect(formatPercent("50")).toBe("50%");
      expect(formatPercent("50.5")).toBe("50.5%");
    });

    it("should handle decimal places", () => {
      expect(formatPercent(50.123456, 0)).toBe("50%");
      expect(formatPercent(50.123456, 3)).toBe("50.123%");
    });

    it("should handle invalid inputs", () => {
      expect(formatPercent(Number.NaN)).toBe("0%");
      expect(formatPercent(Number.POSITIVE_INFINITY)).toBe("0%");
      expect(formatPercent("invalid")).toBe("0%");
    });
  });

  describe("Caip2ByChainAlias", () => {
    it("should have expected mainnet chains", () => {
      expect(Caip2ByChainAlias.mainnet).toBe("eip155:1");
      expect(Caip2ByChainAlias.gnosis).toBe("eip155:100");
      expect(Caip2ByChainAlias["arbitrum-one"]).toBe("eip155:42161");
    });

    it("should be a consistent mapping", () => {
      // Test that the reverse mapping works for all entries
      Object.entries(Caip2ByChainAlias).forEach(([alias, chainId]) => {
        expect(resolveChainAlias(chainId)).toBe(alias);
      });
    });
  });
});
