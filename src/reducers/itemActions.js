const itemActions = (
  state = {
    favourites: [],
  },
  action
) => {
  switch (action.type) {
    case "MARK_FAVOURITE":
      return {
        ...state,
        favourites: [action.name],
      };
    case "REMOVE_FAVOURITE":
      const favourites = state.favourites.filter(
        (item) => item !== action.name
      );
      console.log(favourites);
      return {
        ...state,
        favourites,
      };
    default:
      return state;
  }
};

export default itemActions;
