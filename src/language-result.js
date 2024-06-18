/*
Copyright 2023 Nito T.M.
License https://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
Author Nito T.M. (https://github.com/nitotm)
Package npmjs.com/package/eld
*/

import { avgScore } from "./avg-score.js";

export class LanguageResult {
	/**
	 * Creates an instance of LanguageResult.
	 *
	 * @param {string} language
	 * @param {Object} results
	 * @param {number} numNgrams
	 * @param {Object} langCodes
	 * @memberof LanguageResult
	 */
	constructor(language, results, numNgrams, langCodes) {
		this.language = language;
		this.results = results;
		this.numNgrams = numNgrams;
		this.langCodes = langCodes;
	}

	/**
	 * Converts internal multi-array results, with integer language codes, to final object with ISO 639-1 codes
	 *
	 * @returns {Object}
	 */
	getScores() {
		const scores = {};
		let key;
		for (key in this.results) {
			const score = this.results[key][1];
			if (score === 0) {
				break;
			}
			scores[this.langCodes[this.results[key][0]]] = score;
		}
		return scores;
	}

	/**
	 * @returns {boolean}
	 */
	isReliable() {
		if (this.results.length === 0 || this.numNgrams < 3) {
			return false;
		}
		const nextScore = this.results.length > 1 ? this.results[1][0] : 0;
		// A minimum of a 24% per ngram score from average
		return !(avgScore[this.language] * 0.24 > this.results[0][1] / this.numNgrams || Math.abs(this.results[0][1] - nextScore) < 0.01);
	}
}
