const url = 'http://localhost:4000/graphql';

export default function createHTTPClient(requestName, requestBody) {
  return {
    method: 'POST',
    url: url,
    body: {
      operationName: requestName,
      query: `query ${requestName} { ${requestBody} }`
    }
  };
}
