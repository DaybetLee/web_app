export function removeDupByNric(arr) {
  return arr.reduce((acc, current) => {
    const x = acc.find((item) => item.nric === current.nric);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}

export function removeDupByCompany(arr) {
  return arr.reduce((acc, current) => {
    const x = acc.find((item) => item.company_name === current.company_name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}
