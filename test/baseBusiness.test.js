import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness';
import { NotImplementedExcepetion } from '../src/util/exceptions';

describe('#BaseBusiness', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	test("should throw an error when child class does'nt implement _validateRequiredFields function", () => {
		class ConcreteClass extends BaseBusiness {}
		const concreteClass = new ConcreteClass();

		const validationError = new NotImplementedExcepetion(
			concreteClass._validateRequiredFields.name
		);

		expect(() => concreteClass.create({})).toThrow(validationError);
	});

	test('should throw an error when _validateRequiredFields returns false', () => {
		const validation_doesnt_succeeded = false;
		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest
				.fn()
				.mockReturnValue(validation_doesnt_succeeded);
		}
		const concreteClass = new ConcreteClass();

		const validationError = new Error('invalid data!');

		expect(() => concreteClass.create({})).toThrow(validationError);
	});
	test("should throw an error when child class does'nt implement _create function", () => {
		const validation_succeeded = true;
		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest
				.fn()
				.mockReturnValue(validation_succeeded);
		}
		const concreteClass = new ConcreteClass();

		const validationError = new NotImplementedExcepetion(
			concreteClass._create.name
		);

		expect(() => concreteClass.create({})).toThrow(validationError);
	});
	test('should call _create and _validateRequiredFields on create', () => {
		const validation_succeeded = true;
		const create_succeeded = true;
		class ConcreteClass extends BaseBusiness {
			_validateRequiredFields = jest
				.fn()
				.mockReturnValue(validation_succeeded);

			_create = jest.fn().mockReturnValue(create_succeeded);
		}
		const concreteClass = new ConcreteClass();
		const createFromBaseClass = jest.spyOn(
			BaseBusiness.prototype,
			BaseBusiness.prototype.create.name
		);
		const result = concreteClass.create();

		expect(result).toBeTruthy();
		expect(createFromBaseClass).toHaveBeenCalled();
		expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
		expect(concreteClass._create).toHaveBeenCalled();
	});
});
