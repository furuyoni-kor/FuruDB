import { convertCodeToImage } from "@/utils/card.util";

describe("카드의 코드를 이미지로 변환", () => {
  test("몇몇 통상패 및 비장패 변환 테스트", () => {
    expect(convertCodeToImage("NA-01-yurina-O-N-1")).toEqual("01-O-N-1");
    expect(convertCodeToImage("NA-01-yurina-O-S-1")).toEqual("01-O-S-1");
    expect(convertCodeToImage("NA-02-saine-O-N-1")).toEqual("02-O-N-1");
    expect(convertCodeToImage("NA-02-saine-O-S-1")).toEqual("02-O-S-1");
  });

  test("예외 테스트 1. 미츠루기 키리코의 무녀신악", () => {
    expect(convertCodeToImage("NA-22-kiriko-O-S-4")).toEqual("22-kiriko-O-S-4");
  });
});
