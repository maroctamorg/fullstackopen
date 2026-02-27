export const calculateExercises = (exerciseHours: number[], target: number) => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((h) => h > 0).length;
  const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "good job, you've met your target";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you can do better, keep trying";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  const parseArgumentsExerciseCalculator = (
    args: string[],
  ): { exerciseHours: number[]; target: number } => {
    if (args.length < 4) {
      throw new Error("not enough arguments");
    }

    const target = Number(args[2]);
    const exerciseHours = args.slice(3).map(Number);

    if (isNaN(target) || exerciseHours.some(isNaN)) {
      throw new Error("provided arguments were not numbers");
    }

    return { exerciseHours, target };
  };

  const { exerciseHours, target } = parseArgumentsExerciseCalculator(
    process.argv,
  );
  console.log(calculateExercises(exerciseHours, target));
}
