import { eld } from "../src/languageDetector.js";
import runTests from "./testRunner.js";

const txtFile =
	(typeof window !== "undefined" ? ".." : "https://github.com/nitotm/efficient-language-detector-js/raw/main") +
	"/benchmarks/big-test.txt"; // Node or Web
const bigTest = await fetch(txtFile).then((response) => response.text());

// Mostly functional testing, when functions are more mature I will add some more unit tests
const testCases = [
	{
		name: "Load ELD",
		assert: "===",
		compare: "object",
		func: () => typeof eld,
	},

	{
		name: "Language detection",
		assert: "===",
		compare: "es",
		func: () => eld.detect("Hola, cómo te llamas?").language,
	},

	{
		name: "Get scores",
		assert: ">",
		compare: 1,
		func: () => {
			const scores = eld.detect("Hola, cómo te llamas?").getScores();
			return Object.keys(scores).length;
		},
	},

	{
		name: "Detect, small text",
		assert: "===",
		compare: "en",
		func: () => eld.detect("To").language,
	} /* Not available for now
  { name: 'Clean Text', assert: '===', compare: '', func: function() {
	    let text = "https://www.google.com/\n"+
        "mail@gmail.com\n"+
        "google.com/search?q=search&source=hp\n"+ // this line fails, to be fixed
        "12345 A12345\n";
	  return eld.cleanText(text).trim();
	  } 
  },*/,

	{
		name: "Check minimum confidence",
		assert: "===",
		compare: false,
		func: () => eld.detect("zxz zcz zvz zbz znz zmz zlz zsz zdz zkz zjz pelo").isReliable(),
	},

	{
		name: "Create dynamicLangSubset, detect",
		assert: "===",
		compare: '["en"]',
		func: () => {
			eld.dynamicLangSubset(["en"]);
			const scores = JSON.stringify(Object.keys(eld.detect("How are you? Bien, gracias").getScores()));
			eld.dynamicLangSubset(false);
			return scores;
		},
	},

	{
		name: "Disable dynamicLangSubset, detect",
		assert: ">",
		compare: 1,
		func: () => {
			eld.dynamicLangSubset(["en"]);
			eld.dynamicLangSubset(false);
			const scores = eld.detect("How are you? Bien, gracias").getScores();
			return Object.keys(scores).length;
		},
	},

	{
		name: "Accuracy test: ngrams-m.js + big-test.txt",
		assert: ">",
		compare: 99.4,
		func: () => {
			let correct = 0;
			let fails = 0;
			const lines = bigTest.split("\n");
			lines.forEach((line) => {
				const parts = line.split("\t");
				if (eld.detect(parts[1]).language === parts[0]) {
					correct++;
				} else {
					fails++;
				}
			});

			if (correct + fails < 60000) {
				throw "Could not load big-test.txt correctly. Not an ELD error.";
			}

			return (correct / (correct + fails)) * 100;
		},
	},
];

runTests(testCases);
