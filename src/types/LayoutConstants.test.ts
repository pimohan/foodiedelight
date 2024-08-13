import { formItemLayout } from "./LayoutConstants";

describe("formItemLayout", () => {
  it("should have the correct labelCol configuration", () => {
    expect(formItemLayout.labelCol.xs.span).toBe(24);
    expect(formItemLayout.labelCol.sm.span).toBe(6);
  });

  it("should have the correct wrapperCol configuration", () => {
    expect(formItemLayout.wrapperCol.xs.span).toBe(24);
    expect(formItemLayout.wrapperCol.sm.span).toBe(14);
  });
});
