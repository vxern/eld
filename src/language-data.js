/*
Copyright 2023 Nito T.M.
License https://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
Author Nito T.M. (https://github.com/nitotm)
Package npmjs.com/package/eld
*/

import { avgScore } from "./avg-score.js";

export const languageData = {
	langCodes: {},
	langScore: [],
	ngrams: {},
	type: "",
	avgScore: avgScore,
};

/**
 * @param {string} file File inside /ngrams/, with ELD ngrams data format
 * @returns {boolean|undefined} true if file was loaded
 */
export async function loadNgrams(file) {
	return await import("./ngrams/" + file).then((module) => {
		setNgrams(module.ngramsData);
		if (languageData.type) {
			return true;
		}
	});
}

/**
 * @param {Object} data
 */
function setNgrams(data) {
	languageData.langCodes = data.languages;
	languageData.langScore = Array(Object.keys(data.languages).length).fill(0);
	languageData.ngrams = data.ngrams;
	languageData.type = data.type;
}
