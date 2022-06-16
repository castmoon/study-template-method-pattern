class NotImplementedExcepetion extends Error {
	constructor(message) {
		super(`${message} as called without an implementation`);

		this.name = 'NotImplementedExcepetion';
	}
}

export { NotImplementedExcepetion };
