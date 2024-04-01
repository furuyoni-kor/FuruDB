import { createQueryString } from "../utils/service.util";

describe("쿼리스트링 생성 테스트", () => {
  test("언어 쿼리스트링 생성 테스트", () => {
    expect(createQueryString([["lang", "eng"]])).toEqual("lang=eng");
  });

  test("모드 쿼리스트링 생성 테스트", () => {
    expect(createQueryString([["mode", "A1"]])).toEqual("mode=A1");
  });

  test("2개 이상 쿼리스트링 생성 테스트", () => {
    expect(
      createQueryString([
        ["lang", "eng"],
        ["mode", "A1"],
      ])
    ).toEqual("lang=eng&mode=A1");
  });

  test("순서에 따른 쿼리스트링 생성 테스트", () => {
    expect(
      createQueryString([
        ["mode", "A1"],
        ["lang", "eng"],
      ])
    ).toEqual("lang=eng&mode=A1");
  });
});
