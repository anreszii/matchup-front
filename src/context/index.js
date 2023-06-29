import { createContext } from "react";

export const RelationContext = createContext({
  friends: null,
  setFriends: () => {},
  subscribers: null,
  setSubscribers: () => {},
});
