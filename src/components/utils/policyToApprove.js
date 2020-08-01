export function policyToApprove(array) {
  let polices = [];
  for (let i = 0; i < array.length; i++) {
    if (!array[i].viewable) polices.push(array[i]);
  }
  return polices;
}
