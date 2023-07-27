"use client"

import { useEffect, useRef, useState } from "react"

export default function Search({ onInputChange }) {

    const [menuItems, setMenuItems] = useState(["😊 Friendly", "💎 Luxury", "😌 Relaxed", "💼 Professional", "💪 Bold", "🌍 Adventurous", "💡 Witty", "📣 Persuasive", "🤗 Empathetic"])
    const numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]

    const [selectedItem, setSelectedItem] = useState({
        item: null,
        idx: null
    })

    const [state, setState] = useState(false)
    const [searchFieldVal, setSearchFieldVal] = useState("")

    const listboxRef = useRef()

    const handleSearch = (e) => {
        const menuEls = document.querySelectorAll('.menu-el-js')
        const searchVal = e.target.value.toLocaleLowerCase()
        const alrtEl = document.getElementById("li-alert")
        setSearchFieldVal(e.target.value)
        onInputChange(e.target.value)
        const handleAlert = () => {
            if (listboxRef.current && listboxRef.current.offsetHeight < 5) alrtEl.classList.remove("hidden")
            else alrtEl.classList.add("hidden")
        }
        handleAlert()
        setTimeout(() => handleAlert(), 100)

        menuEls.forEach((el, idx) => {
            el.classList.remove("hidden")
            if (!menuItems[idx].toLocaleLowerCase().includes(searchVal)) {
                el.classList.add("hidden")
            }
        })
    }

    const handleCreate = () => {
        menuItems.length
        setSearchFieldVal(`${numbers[0]} ${searchFieldVal}`)
        setSelectedItem({
            item: `${numbers[0]} ${searchFieldVal}`,
            idx: null
        })
        const updatedMenuItems = menuItems
        if (menuItems.length === 14) menuItems.splice(4, 1)
        updatedMenuItems.unshift(`${numbers[0]} ${searchFieldVal}`)

        if (updatedMenuItems.length > 10) {
            for (let i = 1; i < updatedMenuItems.length - 9; i++) {
                updatedMenuItems[i] = `${numbers[i]} ${updatedMenuItems[i].substring(3)}`
            }
        }

        setMenuItems(updatedMenuItems)
    }

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".label-button")) setState(false)
        };
    }, [])

    return (
        <div className="relative text-base">

            <div className={`label-button flex items-center gap-1 px-2 border rounded-lg shadow-sm ${state ? "ring-blue-500 border-blue-500 border-2" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder='Try "Sassy", "Casual", Or "Fun"'
                    className="w-full px-2 py-2 text-gray-500 bg-transparent border-none rounded-md outline-none focus:ring-0"
                    value={searchFieldVal}
                    onChange={handleSearch}
                    maxLength={100}
                    onFocus={() => setState(true)}
                />
                {
                    searchFieldVal ? (
                        <button
                            onClick={() => {
                                setSearchFieldVal("")
                                setSelectedItem({ item: "", idx: null })
                                setState(false)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>

                        </button>
                    ) : (
                        <button
                            onClick={() => setState(!state)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>

                    )
                }
            </div>

            {
                state ? (
                    <div className="relative w-full">
                        <ul ref={listboxRef} className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64" role="listbox">
                            <li id="li-alert" className="hidden px-3 py-2 text-center text-gray-600"></li>
                            <li onClick={() => handleCreate()} className={`${!searchFieldVal || menuItems.some(item => item.substring(3).toLowerCase() === searchFieldVal.toLowerCase())  ? "hidden" : ""} ${selectedItem.item?.includes("Create") ? 'text-indigo-600 bg-indigo-50' : null} flex items-center justify-between px-3 py-2 cursor-default duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}>Create "{searchFieldVal}"</li>
    
                            {
                                menuItems.map((el, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => {
                                            setSelectedItem({ item: el, idx })
                                            onInputChange(el)
                                            setSearchFieldVal(el)
                                        }}
                                        role="option"
                                        aria-selected={selectedItem.idx == idx ? true : false}
                                        className={`${selectedItem.idx == idx ? 'text-indigo-600 bg-indigo-50' : null} menu-el-js flex items-center justify-between px-3 py-2 cursor-default duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                                    >
                                        {el}
                                        {
                                            selectedItem.idx == idx ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : ''
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : ''
            }
        </div>
    )
}