import React from 'react';
import TextField from './TextField';
import { BiSearch } from 'react-icons/bi';

export default function SearchTextField({ value = '', onChange = () => {}, placeholder = 'Search...', className = '' }) {
	return (
		<TextField
			name="search"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			startIcon={<BiSearch className="w-4 h-4" />}
			className={className}
		/>
	);
}
