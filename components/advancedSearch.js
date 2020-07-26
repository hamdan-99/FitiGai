import React from "react";

export default function AdvancedSearch() {

  const handleChange = (e)=>{
    e.preventDefault()
    console.log(e.target.value)
  }
  return (
    <div className='container'>
     <select onChange={handleChange}>
       <option selected>Choose Sport</option>
       <option value='tennis'>tennis</option>
       <option value='Volleyball'>Volleyball</option>
       <option value='Football'>Football</option>
       <option value='Badminton'>Badminton</option>
       <option value='Disability'>Disability</option>
       <option value='Diving'>Diving</option>
       <option value='Boxing'>Boxing</option>
       <option value='Judo'>Judo</option>
       <option value='Swimming'>Swimming</option>
       <option value='Table Tennis'>Table Tennis</option>
       <option value='Taekwondo'>Taekwondo</option>
       <option value='Wrestling'>Wrestling</option>
     </select>
    </div>
  );
}
