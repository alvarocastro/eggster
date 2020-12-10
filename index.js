/* global document */

const Eggster = function (options = {}) {
	this.event = options.event || 'keyup';
	this.target = options.target || document;

	this.eggs = [];
	this.handler = event => {
		for (const egg of this.eggs) {
			const code = String(event.which);

			egg.step(code);
		}
	};

	this.target.addEventListener(this.event, this.handler);
};

Eggster.prototype.add = function (sequence, fn, options = {}) {
	this.eggs.push(new EggsterEgg(sequence, fn, options));
};

Eggster.prototype.remove = function (sequence) {
	this.eggs = this.eggs.filter(egg => {
		return egg.sequence !== sequence;
	});
};

Eggster.prototype.teardown = function () {
	this.eggs = [];
	this.target.removeEventListener(this.event, this.handler);
};

/* istanbul ignore next */
const EggsterEgg = function (sequence, fn, options = {}) {
	this.enabled = true;
	this.sequence = sequence;
	this.fn = fn;
	this.options = {
		timeout: options.timeout === undefined ? 2000 : options.timeout,
		once: options.once || false
	};
	this.reset();
};

EggsterEgg.prototype.reset = function () {
	this.pending = this.sequence.split(',');
};

EggsterEgg.prototype.run = function () {
	this.fn();
	this.reset();
	clearTimeout(this.timeoutRef);
	if (this.options.once) {
		this.enabled = false;
	}
};

EggsterEgg.prototype.step = function (code) {
	if (!this.enabled) {
		return;
	}

	const next = this.pending.shift();

	if (code !== next) {
		this.reset();
		return;
	}

	if (this.options.timeout) {
		clearTimeout(this.timeoutRef);
		this.timeoutRef = setTimeout(() => {
			this.reset();
		}, this.options.timeout);
	}

	if (this.pending.length === 0) {
		this.run();
	}
};

module.exports = new Eggster();
