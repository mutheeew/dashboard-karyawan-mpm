export default function getBonusRecipients(data: any[]) {
  return data.filter((item) => {
    const score =
      item.performance.performanceScore !== undefined ? item.performance.performanceScore : null;

    return typeof score === "number" && score > 90;
  });
}