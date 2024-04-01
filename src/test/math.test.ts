import { getRandomNumberBetween } from "../utils/math.util";

describe("랜덤 숫자 뽑기", () => {
  test("랜덤 숫자 테스트 (0~10)", () => {
    const num = getRandomNumberBetween(0, 10);
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThanOrEqual(10);
  });

  test("랜덤 숫자 테스트 (11~30)", () => {
    const num = getRandomNumberBetween(11, 30);
    expect(num).toBeGreaterThanOrEqual(11);
    expect(num).toBeLessThanOrEqual(30);
  });
});
