import { FormMode, LogoSize } from "./Types";

describe("Enums", () => {
  it("should have correct values for FormMode enum", () => {
    expect(FormMode.Add).toBe("ADD");
    expect(FormMode.Edit).toBe("EDIT");
  });

  it("should have correct values for LogoSize enum", () => {
    expect(LogoSize.Medium).toBe("logo-medium");
    expect(LogoSize.Small).toBe("logo-small");
  });
});
