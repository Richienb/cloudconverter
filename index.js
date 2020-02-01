"use strict"

const path = require("path")
const fs = require("fs-extra")
const CloudConvert = require("cloudconvert")
const isStream = require("is-stream")
const { default: got } = require("got")
const { default: ow } = require("ow")

async function stream(input, output, format, { apiKey, sandbox = false } = {}) {
	ow(input, ow.object.is(isStream.readable))
	ow(output, ow.object.is(isStream.writable))
	ow(format, ow.string)
	ow(apiKey, ow.string)
	ow(sandbox, ow.boolean)

	const cloudConvert = new CloudConvert(apiKey, sandbox)

	let job = await cloudConvert.jobs.create({
		tasks: {
			"upload-my-file": {
				"operation": "import/upload",
			},
			"convert-my-file": {
				"operation": "convert",
				"input": "upload-my-file",
				"output_format": format,
			},
			"export-my-file": {
				"operation": "export/url",
				"input": "convert-my-file",
			},
		},
	})

	const uploadTask = job.tasks.filter((task) => task.name === "upload-my-file")[0]

	await cloudConvert.tasks.upload(uploadTask, input)

	job = await cloudConvert.jobs.wait(job.id)

	const exportTask = job.tasks.filter((task) => task.operation === "export/url" && task.status === "finished")[0]
	const file = exportTask.result.files[0]

	await got.stream(file.url).pipe(output)
}

module.exports = async (filename, output, options) => {
	const inputStream = fs.createReadStream(filename)
	const outputStream = fs.createWriteStream(output)
	const format = path.extname(output).slice(1)
	await stream(inputStream, outputStream, format, options)
}

module.exports.stream = stream
