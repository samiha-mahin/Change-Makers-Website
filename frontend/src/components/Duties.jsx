import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux';
import Footer from './shared/Footer';
import FilterCard from './FilterCard';
import Duty from './Duty';

//const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Duties = () => {
    const { allDuties = [], searchedQuery = "" } = useSelector(store => store.duty);
    const [filterDuties, setFilterDuties] = useState(allDuties);
    useEffect(() => {
        if (searchedQuery) {
            const filteredDuties = allDuties.filter((duty) => {
                return (duty.title && duty.title.toLowerCase().includes(searchedQuery.toLowerCase())) ||
                       (duty.description && duty.description.toLowerCase().includes(searchedQuery.toLowerCase())) ||
                       (duty.location && duty.location.toLowerCase().includes(searchedQuery.toLowerCase()));
            });
            setFilterDuties(filteredDuties);
        } else {
            setFilterDuties(allDuties);
        }
    }, [allDuties, searchedQuery]);
    
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto mt-5 px-1'>
            <div className='flex gap-5'>
                <div className='w-30%'>
                    <FilterCard/>
                </div>
                <div>
                    {
                       filterDuties.length <= 0 ? <span>Duties not found!</span> : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5 custom-scrollbar'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    filterDuties.map((duty) =>(
                                        <div key={duty?._id}>
                                            <Duty duty={duty}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                       )
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Duties