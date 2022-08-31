import autocannon from "autocannon"

const main = async () => {
  const result = await autocannon({
    title: "controller-test",
    url: "http://localhost:3000/test",
    connections: 10,
    duration: 2,
  })

  console.log(result)
}

main()
