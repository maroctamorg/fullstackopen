import type { DiaryEntry } from "../types";

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
      {diary.comment && <div>comment: {diary.comment}</div>}
    </div>
  );
};

export default Diary;
