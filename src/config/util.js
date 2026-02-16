export const formatMoney = (value) => {
    if (!value || value === 0) return "N/A";

    const formatter = new Intl.NumberFormat(
        "en-US",
        {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1
        }
    );

    return `$${formatter.format(value)}`;
};
