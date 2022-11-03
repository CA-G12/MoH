import { Outlet, Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Dialpad,
  AttachFile,
  Category,
  RequestQuote,
} from '@mui/icons-material';
import './profile.css';
import pharmacyDataType from '../../utils/PharmacyData';
import Navbar from '../../components/NavBar/Navbar';

const ProfileLayout = () => {
  const [data, setData] = useState<pharmacyDataType | null>();
  const id = useParams();

  const TABS_CONFIG = [
    { component: <Dialpad />, slug: 'Profile Overview', link: 'overview' },
    { component: <AttachFile />, slug: 'Pharmacy Products', link: 'products' },
    { component: <Category />, slug: 'Active Requests', link: 'requests' },
    {
      component: <RequestQuote />,
      slug: 'Sales History',
      link: 'salesHistory',
    },
  ];
  useEffect(() => {
    const controller = new AbortController();
    const getData = async () => {
      try {
        const {
          data: { pharmacyData },
        } = await axios.get(`/pharmacy/${id}`, {
          signal: controller.signal,
        });
        setData(pharmacyData[0]);
      } catch (err) {
        setData(null);
      }
    };
    getData();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <Navbar />
      <Box className="layout">
        <Box className="dashboard">
          <Box className="personInfo">
            <Link to="/pharmacy">
              <img
                alt="profile"
                src={data?.owner_img}
                width="80px"
                height="80px"
                style={{ marginRight: '10px' }}
              />
            </Link>
            <Box className="info">
              <Typography sx={{ fontWeight: '500px', fontSize: '19px' }}>
                {data?.owner_name}
              </Typography>
              <Typography className="job">Pharmacist</Typography>
            </Box>
          </Box>
          <List className="dash">
            {TABS_CONFIG.map(({ component, slug, link }) => (
              <Link to={`/pharmacy/${link}`} className="navLeft" key={slug}>
                <ListItem className="dashLi">
                  <ListItemButton>
                    <ListItemIcon>{component}</ListItemIcon>
                    <ListItemText primary={slug} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Box className="outlet">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProfileLayout;
