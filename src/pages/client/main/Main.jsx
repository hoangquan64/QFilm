import React, { use, useContext } from 'react';
import Slide from '../slides/Slide';
import SectionSlide from './SectionSlide';
import NewMovie from './NewMovie';
import { MovieContext } from '../../../contexts/MovieProvider';
import { CategoryContext } from '../../../contexts/CategoryProvider';
import { CountryContext } from '../../../contexts/CountryProvider';
import { filterByCategory } from '../../../untils/reponsity';

function Main(props) {
  const movies = useContext(MovieContext);
  const categories = useContext(CategoryContext);
  const countris = useContext(CountryContext);
  const trungquoc = countris.find(item => item.name === "Trung Quoc");
  const nhatban = countris.find(item => item.name === "Japan");
  const vietnam = countris.find(item => item.name === "Viet Nam");
  return (
    <div className='bg-gray-900 p-5'>
      <Slide />
      <SectionSlide />
      <div className="space-y-10 p-6 bg-gray-800 from-gray-700 via-gray-700/30 to-gray-900 bg-gradient-to-b text-white w-full mt-5 rounded-2xl">
        <NewMovie title={trungquoc?.name} data={filterByCategory(movies, trungquoc?.id, "countryID")} />
        <NewMovie title={nhatban?.name} data={filterByCategory(movies, nhatban?.id, "countryID")} />
        <NewMovie title={vietnam?.name} data={filterByCategory(movies, vietnam?.id, "countryID")} />
      </div>
    </div>
  );
}

export default Main;