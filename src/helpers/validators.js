export const requiredValidator = (value) => {
  return !!value;
};

export const minMaxValidator = (min, max) => {
  const maxV = maxValidator(max);
  const minV = minValidator(min);
  return (value) => {
    return maxV(value) && minV(value);
  };
};

export const maxValidator = (max) => {
  return (value) => {
    return value && value.length <= max;
  };
};

export const minValidator = (min) => {
  return (value) => {
    return value && value.length >= min;
  };
};

export const passwordValidator = (value) => {
  const passwordRegexp = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/
  return value && passwordRegexp.test(value);
};

export const emailValidator = (value) => {
  const emailRegexp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return value && emailRegexp.test(value);
};

export const intValidator = (value) => {
  return value && /^\d+$/.test(value);
};
