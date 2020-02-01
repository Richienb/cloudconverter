const fs = require("fs-extra")
const test = require("ava")
const cloudConverter = require(".")

const requestOptions = { apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkYmYwZWRiNDg5YmQ3YmFlMWMxMWUyODkxNmQ3OWE0YmJkNWJhNGE5OTdlMGJkNmY5ODg1Y2MwYWNiNDQzOWM3YzgwYzdmMzZlYmZiNDhmIn0.eyJhdWQiOiIxIiwianRpIjoiZGRiZjBlZGI0ODliZDdiYWUxYzExZTI4OTE2ZDc5YTRiYmQ1YmE0YTk5N2UwYmQ2Zjk4ODVjYzBhY2I0NDM5YzdjODBjN2YzNmViZmI0OGYiLCJpYXQiOjE1ODA1NjAwMzUsIm5iZiI6MTU4MDU2MDAzNSwiZXhwIjo0NzM2MjMzNjM1LCJzdWIiOiIxMjMwMzQ2MSIsInNjb3BlcyI6WyJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIl19.Ao-hh6_jp1rwqMEqD_-pK_0QyXzmZo_cB1-dmCo6z5WqdQFy5OBZjraXT1NoGfH4fwNaFD9cRDYFPtE9yOI2n4khZqSC9_01-CZjx8eGV-xnEcwqAMMtbobnPUne-XMjY8gVhbFmahc8o23z-z2JqZ0oaeYDW91cbK4Gv1YJiMdyT3FWV2RESWYnvh0C4PSH7ot5mIX6eLd64jQAGNXpAnQAXkySLjGKDZJQlAC-TjbCZVwsJqUv05ShX54ykGc3UXyeGQ8gDGGX_MLdqjTbiAOlINFQgiW2lZYlCG8L9v2_dNNLi95rqezSnw7XeRU1oi9lz1cYNRkWQGLlHseun0MFODe38Tqq7-c9vlnIXmn4TlX8FUeROKEUGG2a1KJ3ci0YK9zHU5q3GTL6QBNldv2fEP9Y0oqj11u8tuT5ZALLfczz_cS6vHEZWBwnXXXH69S0M4UNJ3x-M4o01-wHQENhsXAt3z3bd9R9uTY9CaaW0ygwaL-1TR3jQ-bY_xkoRIkeSTs2LreWyacWbvuWs99R-Y5lh-_5Ng8OeGgvt6BObpejX94DHhlg4hZBupY-Y1jfnpM5fzbR9Ht4DTzfJv_FphvzHC9NxUEVvbuufpdLUOz8bVcoEtq-jKl748eijNAAt4qCldETx9aJQelfdzFNnVTcDEPUva-d8LNNXOc", sandbox: true }

test("main", async (t) => {
	await fs.remove("fixtures/file1.jpg")

	await cloudConverter("fixtures/file.png", "fixtures/file1.jpg", requestOptions)
	t.snapshot(await fs.readFile("fixtures/file1.jpg"))
})

test("stream", async (t) => {
	await fs.remove("fixtures/file2.jpg")

	await cloudConverter.stream(fs.createReadStream("fixtures/file.png"), fs.createWriteStream("fixtures/file2.jpg"), "jpg", requestOptions)
	t.snapshot(await fs.readFile("fixtures/file2.jpg"))
})
