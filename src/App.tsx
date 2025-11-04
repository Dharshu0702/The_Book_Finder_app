import { useState } from "react";

interface Book {
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 12));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">📚 Book Finder</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex mb-6">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4 hover:shadow-xl transition"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Cover"
              }
              alt={book.title}
              className="w-full h-64 object-cover mb-3 rounded"
            />
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-gray-600 text-sm">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              First Published: {book.first_publish_year || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
