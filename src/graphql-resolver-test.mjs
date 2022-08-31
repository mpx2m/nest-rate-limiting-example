import autocannon from "autocannon"

const main = async () => {
  const result = await autocannon({
    title: "graphql-resolver-test",
    url: "http://localhost:3000/graphql",
    connections: 10,
    duration: 2,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "test",
      query: `query test { 
				test
			}`,
    }),
  })

  console.log(result)
}

main()
