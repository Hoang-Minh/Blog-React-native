import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id != action.payload);
    case "edit_blogpost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        }

        return blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => async () => {
  const response = await jsonServer.get("/blogposts");
  dispatch({ type: "get_blogposts", payload: response.data });
};

const addBlogPost = (dispatch) => async (title, content, callback) => {
  const resonse = await jsonServer.post("/blogposts", { title, content });

  dispatch({ type: "add_blogpost", payload: resonse.data });

  if (callback) {
    callback();
  }
};

const deleteBlogPost = (dispatch) => async (id) => {
  await jsonServer.delete(`/blogposts/${id}`);
  dispatch({ type: "delete_blogpost", payload: id });
};

const editBlogPost = (dispatch) => async (id, title, content, callback) => {
  await jsonServer.put(`/blogposts/${id}`, { title, content });

  dispatch({ type: "edit_blogpost", payload: { id, title, content } });

  if (callback) {
    callback();
  }
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
