import { useState } from "react";
import diaryService from "../services/diaryService";
import type { DiaryEntry, NewDiaryEntry } from "../types";
import { Visibility, Weather } from "../types";
import { getErrorMessage } from "../utils/errorHandling";

interface NewDiaryEntryFormProps {
  onDiaryAdded: (diary: DiaryEntry) => void;
}

const NewDiaryEntryForm = ({ onDiaryAdded }: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addDiary = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const diaryToAdd: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const createdDiary = await diaryService.create(diaryToAdd);
      onDiaryAdded(createdDiary);
      setDate("");
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Great);
      setComment("");
      setErrorMessage(null);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>

      {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          weather:{"\t"}
          {Object.values(Weather).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
            </label>
          ))}
        </div>

        <div>
          visibility:{"\t"}
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
            </label>
          ))}
        </div>

        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;
