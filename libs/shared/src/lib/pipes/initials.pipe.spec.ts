import { InitialsPipe } from './initials.pipe';
import { describe, it, expect } from 'vitest';

describe('InitialsPipe', () => {
	const pipe = new InitialsPipe();

	it('should return ? for empty value', () => {
		expect(pipe.transform('')).toBe('?');
		expect(pipe.transform(null)).toBe('?');
		expect(pipe.transform(undefined)).toBe('?');
	});

	it('should return first letter for email', () => {
		expect(pipe.transform('user@example.com')).toBe('U');
	});

	it('should return up to 2 letters for single name', () => {
		expect(pipe.transform('John')).toBe('JO');
		expect(pipe.transform('J')).toBe('J');
	});

	it('should return first letters of first and last name', () => {
		expect(pipe.transform('John Doe')).toBe('JD');
		expect(pipe.transform('John Quincy Adams')).toBe('JA');
	});
});
