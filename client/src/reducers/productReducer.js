export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id, // Assuming userId is not fetched from localStorage in this context
    title: "",
    desc: "",
    category: "",
    price: 0,
    images: [],
    state: "nowy",
  };
  
  export const productReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES":
        return {
          ...state,
          images: action.payload,
        };
      default:
        return state;
    }
  };
  