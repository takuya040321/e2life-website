// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const valuesGet = vi.fn();
vi.mock("googleapis", () => ({
  google: {
    auth: { GoogleAuth: class MockGoogleAuth {} },
    sheets: vi.fn(() => ({ spreadsheets: { values: { get: valuesGet } } })),
  },
}));

describe("fetchSkillRows", () => {
  const original = { ...process.env };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({
      client_email: "sa@example.iam.gserviceaccount.com",
      private_key: "dummy",
    });
    process.env.SKILL_SHEET_SPREADSHEET_ID = "sheet-123";
  });

  afterEach(() => {
    process.env = { ...original };
  });

  it("returns the values matrix from the Sheets API", async () => {
    valuesGet.mockResolvedValue({ data: { values: [["言語", "C/C++"]] } });
    const { fetchSkillRows } = await import("./fetch");
    expect(await fetchSkillRows()).toEqual([["言語", "C/C++"]]);
  });

  it("returns an empty array when the sheet has no values", async () => {
    valuesGet.mockResolvedValue({ data: {} });
    const { fetchSkillRows } = await import("./fetch");
    expect(await fetchSkillRows()).toEqual([]);
  });

  it("throws when no credentials are configured", async () => {
    delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    delete process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
    const { fetchSkillRows } = await import("./fetch");
    await expect(fetchSkillRows()).rejects.toThrow();
  });
});
