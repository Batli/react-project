import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import ListItemButton from '@mui/material/ListItemButton';
import { useGlobalContext } from "./Components/contextWrappers/globalContextwrapper";

function CategorySidebar() {
  const {categories, setCategories, selectedCategoryId, setSelectedCategoryId} = useGlobalContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [storeData, setStoreData] = useState([])
  

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/categories`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json(); 
        setCategories(result);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, [selectedCategoryId]); 

  useEffect(()=>{
    const fetchStoreData = async (catId) => {
      if(catId){

        const res = await fetch(`http://localhost:3002/stores`); 
        const resData = await res.json()
  
        if(resData){
          setStoreData(resData)
        }
      }
      else{

        const res = await fetch(`${process.env.BACKEND_PREFIX}/stores?cats=${catId}`); 
        const resData = await res.json()
  
        if(resData){
          setStoreData(resData)
        }
      }

      }
      fetchStoreData(selectedCategoryId)
    
  },[selectedCategoryId])


 
  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!storeData) {
    return <p>No data available</p>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          <ul>
            {categories.map((Category) => (


                <ListItemButton value={selectedCategoryId} onClick={()=> setSelectedCategoryId(Category.id)} key={Category.id}>
                <h2>{Category.name}</h2>
                </ListItemButton>

            ))}
          </ul>
        </Stack>
      </Box>
      
    </div>
  );
}

export default CategorySidebar;
