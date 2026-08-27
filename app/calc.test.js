const { soma, subtracao, multiplicacao, divisao } = require("./calc");

describe("Calculadora", () => {
  test("soma 2 + 3 = 5", () => expect(soma(2, 3)).toBe(5));
  test("subtração 10 - 4 = 6", () => expect(subtracao(10, 4)).toBe(6));
  test("multiplicação 3 * 7 = 21", () => expect(multiplicacao(3, 7)).toBe(21));
  test("divisão 10 / 2 = 5", () => expect(divisao(10, 2)).toBe(5));
  test("divisão por zero lança erro", () => {
    expect(() => divisao(10, 0)).toThrow("Divisão por zero");
  });
});
