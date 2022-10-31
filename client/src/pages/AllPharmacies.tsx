import { Box, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PharmacyCard from '../components/PharmacyCard';

const arrData = [
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipOhqp-gcaesYPOkc-mOXbyO-MJzETvoC6LPmgIo=w425-h240-k-no',
    name: 'Oxygen Pharm Pharmacy',
    location: 'Omar el Mukhtar, Gaza',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipPO_BoVt0P5RSfcJc136xqBBqBqTBbMw3mCPpI4=w417-h240-k-no',
    name: 'Marina Pharm',
    location: 'Al-Shuhada Street, Al-Minaa, Gaza City',
  },
  {
    img: 'data:image/jpeg;base64,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',
    name: 'AlRemal.Pharmacy',
    location: 'Gaza, Gaza Strip',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipP3piMg6k22ee1fsxW76ufmuWquDOQkSDhHWuQ=w408-h244-k-no',
    name: 'Panorama Pharmacy',
    location: 'Abd El-Qader Moawwad Street',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipOa2Gf5Z-OMaQ8k3UJLjkHPwt-7TSBj_1XJ4dAQ=w408-h305-k-no',
    name: 'Europe Super Pharm Pharmacy',
    location: 'Gaza - Abu Hasira Street near Shifa Hospital, Gaza, Palestine',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipOhqp-gcaesYPOkc-mOXbyO-MJzETvoC6LPmgIo=w425-h240-k-no',
    name: 'Oxygen Pharm Pharmacy',
    location: 'Omar el Mukhtar, Gaza',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipPO_BoVt0P5RSfcJc136xqBBqBqTBbMw3mCPpI4=w417-h240-k-no',
    name: 'Marina Pharm',
    location: 'Al-Shuhada Street, Al-Minaa, Gaza City',
  },
  {
    img: 'data:image/jpeg;base64,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',
    name: 'AlRemal.Pharmacy',
    location: 'Gaza, Gaza Strip',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipP3piMg6k22ee1fsxW76ufmuWquDOQkSDhHWuQ=w408-h244-k-no',
    name: 'Panorama Pharmacy',
    location: 'Abd El-Qader Moawwad Street',
  },
  {
    img: 'https://lh5.googleusercontent.com/p/AF1QipOa2Gf5Z-OMaQ8k3UJLjkHPwt-7TSBj_1XJ4dAQ=w408-h305-k-no',
    name: 'Europe Super Pharm Pharmacy',
    location: 'Gaza - Abu Hasira Street near Shifa Hospital, Gaza, Palestine',
  },
];

const AllPharmacies = () => {
  // const [searchPharmacy, setSearchPharmacy] = useState('');
  // const [searchLocation, setSearchLocation] = useState('');
  const [allPharmacies] = useState(arrData);
  const gitAllPharmacies = () =>
    allPharmacies.map((pharmacies) => (
      <PharmacyCard
        pharmacy={{
          img: pharmacies.img,
          name: pharmacies.name,
          location: pharmacies.location,
        }}
      />
    ));
  return (
    <Box
      sx={{
        width: '90%',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <h4
        style={{
          color: '#00007F',
          fontSize: '1.5rem',
          margin: '5rem auto',
          marginBottom: '2rem',
          marginLeft: '10px',
        }}
      >
        Filter your Pharmacies
      </h4>
      <Box sx={{ display: 'flex', marginBottom: '2rem' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '48%', height: '100%' },
            width: '95%',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="filled-basic"
            label="Search any pharmacy"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: '#6E6E6E',
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="filled-basic"
            label="Set your Location"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddLocationAltIcon
                    sx={{
                      color: '#6E6E6E',
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: '#83B239',
            width: '56px',
            height: '56px',
            marginTop: '10px',
            borderRadius: '5px',
          }}
        >
          <SearchIcon
            sx={{
              color: '#fff',
              backgroundColor: '#83B239',
              fontSize: '26px',
              height: '100%',
              width: '65%',
              marginLeft: '15%',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        {gitAllPharmacies()}
      </Box>
    </Box>
  );
};

export default AllPharmacies;
