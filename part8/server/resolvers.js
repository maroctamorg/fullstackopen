const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Author = require("./models/author");
const Book = require("./models/book");

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments();
    },
    authorCount: async () => {
      return await Author.countDocuments();
    },
    allBooks: async (root, args) => {
      let query = Book.find().populate("author");

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query = query.where("author").equals(author._id);
        } else {
          return [];
        }
      }

      const books = await query.exec();

      if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      }

      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find();
      return await Promise.all(
        authors.map(async (author) => {
          const bookCount = await Book.countDocuments({
            author: author._id,
          });
          return {
            id: author._id,
            name: author.name,
            born: author.born,
            bookCount,
          };
        }),
      );
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("you must be authenticated to add a new book", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        });
        await book.save();
        await book.populate("author");
        return book;
      } catch (error) {
        throw new GraphQLError("Failed to add book", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error: error.message,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("you must be authenticated to edit an author", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;
        await author.save();
        const bookCount = await Book.countDocuments({ author: author._id });
        return {
          id: author._id,
          name: author.name,
          born: author.born,
          bookCount,
        };
      } catch (error) {
        throw new GraphQLError("Failed to update author", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error: error.message,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = { resolvers };
