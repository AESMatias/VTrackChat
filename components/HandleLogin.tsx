


export const handleLoginFunc = async (username: string, password: string) => {
  if (username === "admin" && password === "admin") {
    return true;
  } 
  return false;}