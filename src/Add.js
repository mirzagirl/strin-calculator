export function Add(numbers) {
    if (!numbers) return 0;

    let delimiters = [",", "\n"];
    let negatives = [];

    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        const delimiterSection = numbers.slice(2, delimiterEndIndex);

        if (delimiterSection.startsWith("[")) {
            let regex = /\[(.*?)\]/g;
            let match;
            while ((match = regex.exec(delimiterSection)) !== null) {
                delimiters.push(match[1]);
            }
        } else {
            delimiters.push(delimiterSection);
        }
        numbers = numbers.slice(delimiterEndIndex + 1);
    }

    const delimiterRegex = new RegExp(
        `^(-?\\d+(${delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})?)*-?\\d+$`
    );

    if (!delimiterRegex.test(numbers)) {
        throw new Error("Invalid input format");
    }

    const splitRegex = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|"));
    const numbersArray = numbers.split(splitRegex);

    let sum = 0;
    for (const numStr of numbersArray) {
        if (numStr === '') continue;

        const num = parseInt(numStr, 10);
        if (isNaN(num)) continue;

        if (num < 0) negatives.push(num);
        if (num <= 1000) sum += num;
    }

    if (negatives.length > 0) {
        throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
    }

    return sum;
}
