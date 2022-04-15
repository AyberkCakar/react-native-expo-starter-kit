export const name: RegExp = /[a-zA-Z\ ]{3,15}/;

export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

export const password: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;


export const notification: RegExp = /[a-zA-Z\ ]{6,15}/;
