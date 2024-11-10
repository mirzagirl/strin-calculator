import { Add } from "./Add.js";

describe('String Calculator - Add Function', () => {

    test('returns 0 for an empty string', () => {
        expect(Add("")).toBe(0);
    });

    test('returns the number itself for a single number', () => {
        expect(Add("1")).toBe(1);
        expect(Add("99")).toBe(99);
    });

    test('returns the sum of two numbers separated by a comma', () => {
        expect(Add("1,2")).toBe(3);
    });

    test('handles an unknown amount of numbers', () => {
        expect(Add("1,2,3,4,5")).toBe(15);
    });

    test('handles new lines between numbers as valid delimiters', () => {
        expect(Add("1\n2,3")).toBe(6);
    });

    test('supports custom delimiters specified at the beginning', () => {
        expect(Add("//;\n1;2")).toBe(3);
    });

    test('throws an exception for negative numbers', () => {
        expect(() => Add("1,-2,3")).toThrow("Negatives not allowed: -2");
        expect(() => Add("1,-2,-3")).toThrow("Negatives not allowed: -2, -3");
    });

    test('ignores numbers greater than 1000', () => {
        expect(Add("2,1001")).toBe(2);
        expect(Add("1000,1001,3")).toBe(1003);
    });

    test('supports delimiters of any length', () => {
        expect(Add("//[***]\n1***2***3")).toBe(6);
    });

    test('supports multiple delimiters', () => {
        expect(Add("//[*][%]\n1*2%3")).toBe(6);
    });

    test('supports multiple delimiters of varying lengths', () => {
        expect(Add("//[***][%%]\n1***2%%3")).toBe(6);
    });

    test('throws an error for invalid input format', () => {
        expect(() => Add("1,\n")).toThrow("Invalid input format");
        expect(() => Add("1,2,\n3")).toThrow("Invalid input format");
        expect(() => Add("1\n,2")).toThrow("Invalid input format");
    });
});
