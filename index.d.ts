import { Readable, Writable } from "stream"

interface Options {
	/** The CloudConvert API key. */
	apiKey: string

	/**
	 * Use sandbox mode.
	 * @default false
	*/
	sandbox?: boolean
}

declare const cloudConverter: {
	/**
	 * Convert a file to another file.
	 * @param filename The input filename.
	 * @param output The output filename.
	 * @param options Options.
	 * @example
	 * ```
	 * const cloudConverter = require("cloud-converter");
	 *
	 * (async () => {
	 * 	await cloudConverter("input.png", "output.jpg", { apiKey: ... }); // Convert PNG to JPG
	 * })();
	 * ```
	*/
	(filename: string, output: string, options: Options): Promise<void>

	/**
	 * Pipe the conversion output from a Readable Stream into a Writable stream.
	 * @param input The input stream.
	 * @param output The output stream.
	 * @param format The format to convert to.
	 * @param options Options.
	 * @example
	 * ```
	 * const cloudConverter = require("cloud-converter");
	 * const fs = require("fs");
	 *
	 * (async () => {
	 * 	await cloudConverter.stream(fs.createReadStream("input.png"), fs.createWriteStream("output.jpg"), "jpg", { apiKey: ... }); // Convert PNG to JPG
	 * })();
	 * ```
	*/
	stream(input: Readable, output: Writable, format: string, options: Options): Promise<void>
}

export = cloudConverter
