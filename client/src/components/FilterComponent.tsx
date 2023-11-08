import React, { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import "../Filters.css";
import filters from "../data/filters.json";

export default function FilterComponent() {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [filterInput, setFilterInput] = useState(null);
    const [comparison, setComparison] = useState(null);
    const [sorting, setSorting] = useState(null);
    const sortOptions = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' }
    ];

    const comparisonOptions = [
        { label: 'Greater than', value: 'gt' },
        { label: 'Less than', value: 'lt' }
    ];

    const filterItems = filters.map(filter => ({
        label: filter.keyName,
        value: filter,
    }));

    const onFilterChange = (e) => {
        const filterData = e.value;
        setSelectedFilter(filterData); // Save the entire filter object

        // Reset filter input and value
        setFilterInput(null);
        setFilterValue('');
        setComparison(null);
        setSorting(null);

        switch (filterData.type) {
            case 'string':
                setFilterInput('string');
                break;
            case 'integer':
                setFilterInput('integer');
                break;
            case 'boolean':
                setFilterInput('boolean');
                break;
            default:
                setFilterInput(null);
                break;
        }
    };

    const renderFilterInput = () => {
        switch (filterInput) {
            case 'string':
                return (
                    <div>

                   
                    <>
                    <InputText
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Search"
                    />
                     <Dropdown
                            value={sorting}
                            options={sortOptions}
                            onChange={(e) => setSorting(e.value)}
                            placeholder="Select Sorting"
                        />
                    </>
                    </div>
                    

                    
                );
            case 'integer':
                return (
                    <div>
                        
                    <>
                        <InputText
                            keyfilter="int"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder="Enter number"
                        />
                        <Dropdown
                            value={comparison}
                            options={comparisonOptions}
                            onChange={(e) => setComparison(e.value)}
                            placeholder="Select Comparison"
                        />
                        <Dropdown
                            value={sorting}
                            options={sortOptions}
                            onChange={(e) => setSorting(e.value)}
                            placeholder="Select Sorting"
                        />
                    </>
                    
                    </div>
                );
                case 'boolean':
                    return (
                        <div>
                        <>
                            <InputText
                                keyfilter="int"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                placeholder="Enter number"
                            />
                            <Dropdown
                                value={comparison}
                                options={comparisonOptions}
                                onChange={(e) => setComparison(e.value)}
                                placeholder="Select Comparison"
                            />
                            <Dropdown
                                value={sorting}
                                options={sortOptions}
                                onChange={(e) => setSorting(e.value)}
                                placeholder="Select Sorting"
                            />
                        </>
                        </div>
                    );
            
            default:
                return null;
        }
    };

    return (
        <div className="card flex justify-content-center attributes">
            <SelectButton
                value={selectedFilter}
                onChange={onFilterChange}
                optionLabel="label"
                options={filterItems}
            />
            {renderFilterInput()}
        </div>
    );
}
