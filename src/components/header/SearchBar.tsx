import React, { useState } from 'react';
// import Select from 'react-select';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
   
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/api/v1/products/search-suggestions?q=${query}`);
            //console.log(data)
            setSuggestions(data.products);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        debouncedFetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion) => {
        //console.log('Selected suggestion:', suggestion);
        setSearchInput(suggestion);
        setSuggestions([]);
        return router.push(`/product-details/${suggestion}`);
        
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
        }),
        option: (base) => ({
            ...base,
            color: 'black',
        }),
    };

    return (
        <form className="bb-btn-group-form flex relative max-[991px]:ml-[20px] max-[767px]:m-[0]" action="#">
            
            <button
                className="submit absolute top-[0] left-[auto]  flex items-center justify-center w-[45px] h-full bg-transparent text-[#555] text-[16px] rounded-[0] outline-[0] border-[0] padding-[0]"
                type="submit"
            >
                <i className="ri-search-line text-[18px] leading-[12px] text-[#555]" />
            </button>
            <input
                className="form-control bb-search-bar bg-[#fff] block w-full min-h-[45px] h-[48px] py-[10px] pr-[10px] pl-[50px] max-[991px]:min-h-[40px] max-[991px]:h-[40px] max-[991px]:p-[10px] max-[991px]:pl-[40px] text-[14px] font-normal leading-[1] text-[#777] rounded-[10px] border-[1px] border-solid border-[#eee] tracking-[0.5px]"
                placeholder="Search products..."
                type="text"
                value={searchInput}
                onChange={handleInputChange}
            />
            {isLoading && <div className="absolute top-[50px] left-[15px]">Loading...</div>}
            {suggestions.length > 0 && (
                <ul className="absolute top-[50px] left-[0] w-full bg-white shadow-lg z-10 max-h-[200px] overflow-y-auto rounded-[5px]">
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            className="px-[15px] py-[10px] cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(item.slug)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}

        </form>
    );
};

export default SearchBar;
