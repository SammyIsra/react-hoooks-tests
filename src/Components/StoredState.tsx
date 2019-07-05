import React, { useEffect } from "react";
import { SimpleBorderedList } from "../Styles/BasicStyles";

/**
 * Hook to use either localStorage or sessionStorage.
 * I got the idea from a talk by Michael Jackson about composability in React
 */
function usePersistentState(
  storage: Storage,
  key: string,
  initialValue: string = ""
) {
  // create store by fetching from store or using default
  const [state, setState] = React.useState<string>(
    storage.getItem(key) || initialValue
  );

  // -Save to storage whenever the state changes
  // -key and storage are listed as dependencies since they are used in the effect, 
  //  but in reality only the state will change at any time UNLESS the user changes the key,
  //  which... not cool bro 
  useEffect(() => storage.setItem(key, state), [state, key, storage]);

  // Return the same stuff you get from useState
  return [state, setState] as const;
}

function useLocalStorageState(key: string, initialValue: string = "") {
  return usePersistentState(localStorage, key, initialValue);
}

function useSessionStorageState(key: string, initialValue: string = "") {
  return usePersistentState(sessionStorage, key, initialValue);
}

const StoredState: React.FunctionComponent<{}> = function(props) {
  const [lreminder, setLReminder] = useLocalStorageState("local-reminder");
  const [sreminder, setSReminder] = useSessionStorageState("session-reminder");
  return (
    <SimpleBorderedList>
      <h2>Use the browser's Store to keep the state for a longer term. </h2>
      <p>
        Using <code>localStorage</code>, kept after closing the tab
      </p>
      <input
        type="text"
        value={lreminder}
        onChange={e => setLReminder(e.target.value)}
      />
      <br />
      <p>
        Using <code>sessionStorage</code>, kept between refreshes but not after
        closing the tab
      </p>
      <input
        type="text"
        value={sreminder}
        onChange={e => setSReminder(e.target.value)}
      />
    </SimpleBorderedList>
  );
};

export default StoredState;
