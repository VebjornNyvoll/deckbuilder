import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import "../Filters.css";
import filters from "../data/filters.json"
export default function FilterComponent() {
    const [selectedFilter, setSelectedFilter] = useState(null);

    // Your JSON data for filters
    

    // Map your filter data to items that SelectButton can understand
    const filterItems = filters.map(filter => ({
        name: filter.keyName, // The label shown on the button
        value: filter.internalName, // The value that will be set on selection
        type: filter.type // The data type, not used in SelectButton directly, but useful if needed
    }));

    // Handler for selection
    const onFilterChange = (e) => {
        setSelectedFilter(e.value);
        // Here you would normally filter your data based on the selected filter.
    };

    return (
        <div className="card flex justify-content-center attributes">
            <SelectButton value={selectedFilter} onChange={onFilterChange} optionLabel="name" options={filterItems} />
        </div>
    );
}
