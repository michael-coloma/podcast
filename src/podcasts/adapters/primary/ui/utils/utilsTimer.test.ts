import { convertMilisecondstoFormatHoursMinutes, convertFormatZuluToFormatDateView } from "./utilsTimer";

describe("utilsTimer test", () => {
  it("checks function convertMilisecondstoFormatHoursMinutes", () => {
    const formatHourMinutes = convertMilisecondstoFormatHoursMinutes(52200000);
    expect(formatHourMinutes).toBe("14:30");
  });

  describe("function convertFormatZuluToFormatDateView test ", () => {
    it("checks value is converted correctly", () => {
      const formatDateView = convertFormatZuluToFormatDateView("2024-03-20T16:30:00Z");
      expect(formatDateView).toBe("20/03/2024 17:30");
    });
    it("checks value is incorrect and therefore it return the same value", () => {
      const formatDateView = convertFormatZuluToFormatDateView("2024-03-20TX_16:30:00Z");
      expect(formatDateView).toBe("2024-03-20TX_16:30:00Z");
    });
  });
});
