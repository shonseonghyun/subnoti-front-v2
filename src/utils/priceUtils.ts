// 숫자만 추출 (PLAN_4900 -> 4900)
export const extractPriceNumber = (planName: string): number => {
    const match = planName.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};
  
// 문자열로 변환 (PLAN_4900 -> "4,900원")
export const extractPriceString = (planName: string): string => {
    const number = extractPriceNumber(planName);
    return number.toLocaleString()+"원";
};

// 숫자 → "4,900원"
export const formatPriceWithWon = (price: number): string => {
    return `${price.toLocaleString()}원`;
  };