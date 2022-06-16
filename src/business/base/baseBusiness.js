import { NotImplementedExcepetion } from '../../util/exceptions.js';

export default class BaseBusiness {
	_validateRequiredFields(data) {
		throw new NotImplementedExcepetion(this._validateRequiredFields.name);
	}

	_create(data) {
		throw new NotImplementedExcepetion(this._create.name);
	}

	/**
	 *
	 * a proposta do padrão é garantir um fluxo de métodos, definindo uma sequência a ser executada
	 *
	 * esse create é a implementação efetiva do Template Method
	 */
	create(data) {
		const isValid = this._validateRequiredFields(data);
		if (!isValid) throw new Error(`invalid data!`);

		return this._create(data);
	}
}
