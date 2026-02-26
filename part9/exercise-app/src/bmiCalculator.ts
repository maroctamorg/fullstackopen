const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) {
    return "Underweight";
  }

  if (bmi >= 30) {
    return "Obese";
  }

  if (bmi >= 25) {
    return "Overweight";
  }

  return "Normal range";
};

const parseArgumentsBmiCalculator = (
  args: string[],
): { height: number; weight: number } => {
  if (args.length < 4) {
    throw new Error("not enough arguments");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("provided arguments were not numbers");
  }

  return { height, weight };
};

const { height, weight } = parseArgumentsBmiCalculator(process.argv);
console.log(calculateBmi(height, weight));
