const login = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "vinguyen" && password === "123") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};

export { login };
