export function extractPolicies(obj) {
  let temp = [];
  for (let i = 0; i < obj.length; i++) {
    for (let o = 0; o < obj[i].policy.length; o++) {
      temp.push(obj[i].policy[o]);
    }
  }

  return temp;
}
