import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box} from "@mui/material";
import { useGlobalContext } from "./Components/contextWrappers/globalContextwrapper";

function StoreList() {
  const {storeData, setStoreData, selectedCategoryId, searchStr, storeSort, alpha} = useGlobalContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const fetchData = async () => {
  //     let url = `http://localhost:3002/stores`
  //     if(selectedCategoryId){
  //       url = `http://localhost:3002/stores?cats=${selectedCategoryId}`
  //     }
  //     if(searchStr){
  //       url = `http://localhost:3002/stores?name_like=${searchStr}`
  //     }
  //     if(storeSort){
  //       url = `http://localhost:3002/stores?_sort=${storeSort}`
  //     }

  //     try {
        
  //       const response = await fetch(url); // Example API URL
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
        
  //       const result = await response.json(); // Convert the response to JSON
  //       setStoreData(result); // Set the data to state
  //     } catch (error) {
  //       setError(error.message); // If there's an error, set it to state
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching
  //     }
  //   };

  //   fetchData(); // Call the fetch function
  // }, [selectedCategoryId, searchStr, storeSort]); // Empty dependency array means it will run once when the component is mounted

  useEffect(() => {

    const fetchData = async () => {
      let baseUrl = `http://localhost:3002/stores`;
      const queryParams = new URLSearchParams();
  
      if (selectedCategoryId) {
        queryParams.append("cats", selectedCategoryId);
      }
      if (searchStr || alpha) {
        if(searchStr){
          queryParams.append("name_like", searchStr);
        }
        else{
          queryParams.append("name_like", `^${alpha}`)
        }
      }
      if (storeSort) {
        queryParams.append("_sort", storeSort);
      }
      
  
      const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;
  
      try {
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result = await response.json(); 
        setStoreData(result); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, [selectedCategoryId, searchStr, storeSort, alpha]);
  

  
  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  if (!storeData) {
    return <p>No data available</p>; 
  }

  return (
    <div style={{
      display : 'grid',
      gridTemplateColumns : 'repeat(3,1fr)',
      gap : '16px'
    }}>
      {(
        storeData.map((Store) => (          
          <Card sx={{ maxWidth: 300, borderRadius: 4, boxShadow: 3, padding: 2, textAlign: 'center' }}>

          <CardMedia component="img" image={Store.logo} alt={`${Store.name} Logo`} sx={{ height: 60, margin: "auto", objectFit: "contain" }} />
          <CardContent>

            <Typography variant="h6" gutterBottom>
              {Store.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, marginBottom: 2 }}>
                    <img src={"https://laraback.enactweb.com/img/money-back-guarantee.png"} alt="Secure Icon" style={{ height: 20 }}/>
            <Typography variant="body1" color="error" fontWeight={500}>
              Upto  {Store.cashback_percent}% {Store.cashback_type}
            </Typography>
            </Box>
            <Button variant="contained" sx={{ backgroundColor: "#000", color: "#fff", borderRadius: "20px", padding: "8px 16px", "&:hover": { backgroundColor: "#333" } }}> Shop Now</Button>
          </CardContent>
        </Card>
        ))
        
      )}

    </div>
  );
}

export default StoreList;
