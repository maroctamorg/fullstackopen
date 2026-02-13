import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const {
    loading: loadingBooks,
    error: errorBooks,
    data: dataBooks,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });
  const { data: dataGenres } = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loadingBooks) {
    return <div>Loading...</div>;
  }

  if (errorBooks) {
    return <div>Error: {errorBooks.message}</div>;
  }

  const books = dataBooks?.allBooks ?? [];
  const allBooksForGenres = dataGenres?.allBooks ?? [];
  const genres = [...new Set(allBooksForGenres.flatMap((b) => b.genres))];

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
          {books.map((a) => (
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
