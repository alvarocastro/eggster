/* global document window */
const test = require('ava');
const delay = require('delay');
const eggster = require('..');

const press = async function (code, target = document) {
	const event = new window.KeyboardEvent('keyup', {which: code});
	await delay(10);
	target.dispatchEvent(event);
	await delay(20);
};

test('Should work with the correct registered code', async t => {
	t.plan(1);
	eggster.add('69,71,71,83,84,69,82', t.pass);// Code: eggster

	await press(69);
	await press(71);
	await press(71);
	await press(83);
	await press(84);
	await press(69);
	await press(82);

	eggster.remove('69,71,71,83,84,69,82');
});

test('Should work if more keys where pressed before', async t => {
	t.plan(1);
	eggster.add('69,71,71', t.pass);// Code: egg

	await press(84);
	await press(83);

	await press(69);
	await press(71);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should break after delaying the ca key for more than 2000ms', async t => {
	t.plan(0);
	eggster.add('69,71,71', t.pass);// Code: egg

	await press(69);
	await press(71);
	await delay(2500);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should support a configurable timeout between keys', async t => {
	t.plan(1);
	eggster.add('69,71,71', t.pass, {
		timeout: 4000
	});// Code: egg

	await press(69);
	await press(71);
	await delay(2500);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should be able to remove the timeout between keys', async t => {
	t.plan(1);
	eggster.add('69,71,71', t.pass, {
		timeout: 0
	});// Code: egg

	await press(69);
	await press(71);
	await delay(5000);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should trigger the code any time it\'s pressed', async t => {
	t.plan(3);
	eggster.add('69,71,71', t.pass);// Code: egg

	await press(69);
	await press(71);
	await press(71);

	await press(69);
	await press(71);
	await press(71);

	await press(69);
	await press(71);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should support a the option to run the code once', async t => {
	t.plan(1);
	eggster.add('69,71,71', t.pass, {
		once: true
	});// Code: egg

	await press(69);
	await press(71);
	await press(71);

	await press(69);
	await press(71);
	await press(71);

	eggster.remove('69,71,71');
});

test('Should provide a way to remove a code', async t => {
	t.plan(0);
	eggster.add('69,71,71', t.pass);// Code: egg
	eggster.remove('69,71,71');

	await press(69);
	await press(71);
	await press(71);
});

test('Should work (integration)', async t => {
	t.plan(1);
	eggster.add('69,71,71', t.pass, {
		timeout: 1000,
		once: true
	});// Code: egg

	await press(65);
	await press(66);

	await press(69);
	await press(71);
	await delay(1500);
	await press(71);

	await press(65);
	await press(66);

	await press(69);
	await delay(500);
	await press(71);
	await press(71);

	await press(69);
	await press(71);
	await press(71);

	eggster.remove('69,71,71');
});

// This test must be last because the document instance is shared between all the tests.
test('Should provide a way to remove Eggster', async t => {
	t.plan(0);
	eggster.add('69,71,71', t.pass);// Code: egg
	eggster.add('83,84,69,82', t.pass);// Code: ster

	eggster.teardown();

	await press(69);
	await press(71);
	await press(71);

	await press(83);
	await press(83);
	await press(69);
	await press(82);
});
