// Desc: Utility functions for file handling

// Receives a JSON object and a filename, and saves the JSON 
// object as a file with the given filename.
export const saveJSON = (data, filename = "default.json") => {
  if (!data) {
    console.error("No data to save");
    return;
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};