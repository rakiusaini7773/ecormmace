// 🔹 Store or Retrieve Data
export const setLocalData = (key, data) => {
    if (data) {
      sessionStorage.setItem(key, data);
    }
  };
  
  // 🔹 Retrieve Data
  export const getLocalData = (key) => {
    return sessionStorage.getItem(key) || null; // Returns `null` if key doesn't exist
  };
  
  // 🔹 Clear Specific or All Data
  export const clearLocalData = (key) => {
    if (key) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  };
  