import { useEffect, useState } from 'react';
import Diary from './components/Diary';
import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import diaryService from './services/diaryService';
import type { DiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async (): Promise<void> => {
      const diaryEntries = await diaryService.getAll();
      setDiaries(diaryEntries);
    };

    void fetchDiaries();
  }, []);

  const handleDiaryAdded = (diary: DiaryEntry): void => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <div>
      <NewDiaryEntryForm onDiaryAdded={handleDiaryAdded} />

      <h2>Diary entries</h2>

      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
}

export default App;
