export function toHTML(policyholder, policies) {
  let head = `
  <!DOCTYPE html>
  <html>
  <head>
  <style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  </style>
  </head>
  <body>
  
  <h3>Policyholder</h3>
    `;

  let policholderInfo = `
  <ul>
      <li>Name: ${policyholder.name}</li>
      <li>NRIC: ${policyholder.nric}</li>
      <li>email: ${policyholder.email}</li>
      <li>Mobile: ${policyholder.mobile}</li>
      <li>Number of Policy: ${policies.length}</li>
  </ul>
  `;

  let policiesInfo = `
    <table>
    <tr>
      <th>Name</th>
      <th>Company</th>
      <th>Date</th>
      <th>Amount</th>
      <th>Inforce</th>
    </tr>
    `;

  for (let i = 0; i < policies.length; i++) {
    let policyInfo = `
      <tr>
      <td>${policies[i].name}</td>
      <td>${policies[i].company_name}</td>
      <td>${policies[i].modify_date}</td>
      <td>${policies[i].amount}</td>
      <td>${policies[i].inforce}</td>
    </tr>
      `;
    policiesInfo = policiesInfo + policyInfo;
  }

  let tail = `
    </table>
  
  </body>
  </html>
    `;

  const output = head + policholderInfo + policiesInfo + tail;

  return output;
}
