export const fetchGridData = async (
  modifier: string,
  columns: number,
  rows: number
) => {
  try {
    console.log(modifier);
    const response = await fetch(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/generator`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modifier: modifier,
          columns: columns,
          rows: rows,
        }),
      }
    );
    return response;
  } catch (error) {
    throw new Error("Error fetching grid data from the API");
  }
};
