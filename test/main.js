import expect from 'unexpected';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-single-price-mocha-unexpected/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;

			const isSectionTitleExist = (name) => {
				if (!name) {
					return;
				}

				const titleElements = document.querySelectorAll('.card__title');

				let isTitleExist = false;

				for (let i = 0; i < titleElements.length; i++) {
					const text = titleElements[i].textContent;

					if (text.indexOf(name) !== -1) {
						isTitleExist = true;
						break;
					}
				}

				return isTitleExist;
			};
			global.isSectionTitleExist = isSectionTitleExist;
		} catch (err) {
			console.log(err);
		}
	});

	it("should return undefined if 'isSectionTitleExist' function called with no argument", () => {
		const result = isSectionTitleExist();
		expect(result, 'to be', undefined);
	});

	it("should have 'Join our community' text in the 'card__title' class element", () => {
		const isTitleExist = isSectionTitleExist('Join our community');
		expect(isTitleExist, 'to be', true);
	});

	it("should have 'Monthly Subscription' text in the 'card__title' class element", () => {
		const isTitleExist = isSectionTitleExist('Monthly Subscription');
		expect(isTitleExist, 'to be', true);
	});

	it("should have 'Why Us' text in the 'card__title' class element", () => {
		const isTitleExist = isSectionTitleExist('Why Us');
		expect(isTitleExist, 'to be', true);
	});
});
