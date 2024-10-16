


export const handleLoginFunc = async (username: string, password: string) => {

  if (username === "" && password === "") {
    return true;
  } 

  return false;
}