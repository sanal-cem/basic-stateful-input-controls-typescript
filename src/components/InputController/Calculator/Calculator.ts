export default class Calculator {
  calculateExpression = (string: string): string | null => {
    // Equation parsed into an array.
    let parsedEquations = string.match(/([0-9]+)|\+|-|\*|\//g);

    if (!parsedEquations) return null;
    else {
      let index = 0;
      let calcResult;
      while (index++ < parsedEquations.length - 1) {
        if (
          parsedEquations[index - 1] && parsedEquations[index + 1] &&
          (isNaN(Number(parsedEquations[index - 1])) || isNaN(Number(parsedEquations[index + 1])))
        ) return null;

        switch (parsedEquations[index]) { // perform the calculation
          case "*":
            calcResult =
              parseFloat(parsedEquations[index - 1]) *
              parseFloat(parsedEquations[index + 1]);
            break;
          case "/":
            calcResult =
              parseFloat(parsedEquations[index - 1]) /
              parseFloat(parsedEquations[index + 1]);
            break;
          case "+":
            calcResult =
              parseFloat(parsedEquations[index - 1]) +
              parseFloat(parsedEquations[index + 1]);
            break;
          case "-":
            calcResult =
              parseFloat(parsedEquations[index - 1]) -
              parseFloat(parsedEquations[index + 1]);
            break;
        }
        parsedEquations = this.removeRemainingItems(
          index,
          parsedEquations,
          calcResult
        );
        index--;
      }
      return parsedEquations[0];
    }
  };

  removeRemainingItems = (
    index: number,
    tempArr: any[],
    calcResult: number | undefined
  ) => {
    let remainingItemsRemovedArr = [];
    let k = 0;
    while (k <= tempArr.length) {
      if (k === index - 1) remainingItemsRemovedArr.push(calcResult);
      else if (k !== index && k !== index + 1)
        remainingItemsRemovedArr.push(tempArr[k]);
      k++;
    }
    return remainingItemsRemovedArr;
  };
}
