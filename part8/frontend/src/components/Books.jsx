import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data?.allBooks ?? [];

  const genres = [...new Set(books.flatMap((b) => b.genres))];

  const filteredBooks = selectedGenre
    ? books.filter((b) => b.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setSelectedGenre(null)}
          style={{
            fontWeight: selectedGenre === null ? "bold" : "normal",
          }}
        >
          all
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{
              fontWeight: selectedGenre === genre ? "bold" : "normal",
              marginLeft: "5px",
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
