/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Collapse,
} from '@mui/material';
import { Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { makeStyles, createStyles } from '@mui/styles';
import { listUnits } from '../../constants/common';
import '../../App.css';
import * as api from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { debounce } from 'lodash';
const drawerWidth = 240;

interface Props {
  nameButton?: string;
  open?: boolean;
  handleClick?: Function;
  units?: Array<any>;
  unitId?: string;
  categoryId?: string;
  searchQuery?: string;
}
const useStyles = makeStyles((theme: any) =>
  createStyles({
    buttonTooltip: {
      color: '#fff !important',
      marginLeft: '15px !important',
    },
    boxTooltip: {
      fontFamily: 'Times New Roman !important',
      [theme.breakpoints.down('lg')]: {
        display: 'none',
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: 'auto',
      },
    },
    typographyTooltip: {
      marginTop: '3px',
      cursor: 'pointer !important',
      fontSize: '16px ',
      fontWeight: 'bold !important',
      fontFamily: 'Times New Roman !important',
      '&:hover': {
        color: 'yellow !important',
      },
    },
    boxDrawer: {
      marginRight: 1,
      height: '8vh ',
    },
    boxContainerDrawer: { textAlign: 'center' },
    appbar: { backgroundColor: '#052c43 !important' },
    iconButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none !important',
      },
    },
    toolbarItems: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
      },
    },
    boxHeader: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        // 600px
      },
    },
    toolbarHeader: {
      marginInline: '12vh ',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        marginInline: '1.5vw',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        marginInline: '2vw',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        marginInline: '0px',
      },
    },
    boxImage: {
      marginRight: 1,
      height: '11vh',
      [theme.breakpoints.down('lg')]: {
        // 1280px
        height: '10.4vh',
      },
      [theme.breakpoints.down('md')]: {
        // 960px
        height: '10vh',
      },
      [theme.breakpoints.down('sm')]: {
        // 600px
        height: '8vh',
      },
    },
    drawer: {
      [theme.breakpoints.down('xs')]: {},
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
      '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        width: drawerWidth,
      },
    },
    tooltipList: {
      fontWeight: 'bold !important',
      fontFamily: 'Times New Roman ',
    },
  })
);

function Unit({
  nameButton = '',
  open = false,
  handleClick,
  units,
  categoryId,
}: Props) {
  const navigate = useNavigate();
  const handleButtonUnitCategory = () => {
    navigate(`/category/${categoryId}`);
  };
  const handleButtonTooltipUnit = (item: any) => {
    navigate(`/unit/${item.unitId}`);
  };
  return (
    <React.Fragment key={1}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary={nameButton}
            onClick={handleButtonUnitCategory}
          />
          {open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {units &&
            units.map((item: { unit: string }, index: number) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={index}
                onClick={() => handleButtonTooltipUnit(item)}
              >
                <ListItemText primary={item.unit} />
              </ListItemButton>
            ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function TooltipHeader({ nameButton, units, categoryId }: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleButtonTooltipCategory = () => {
    navigate(`/category/${categoryId}`);
  };
  const handleButtonTooltipUnit = (item: any) => {
    navigate(`/unit/${item.unitId}`);
  };

  return (
    <Button className={classes.buttonTooltip}>
      <Tooltip
        title={
          <List className={classes.tooltipList}>
            {units?.map((item: { unit: string }, index: number) => (
              <ListItem
                key={index}
                onClick={() => handleButtonTooltipUnit(item)}
              >
                <ListItemText primary={item.unit} sx={{ cursor: 'pointer' }} />
              </ListItem>
            ))}
          </List>
        }
      >
        <Typography
          component="div"
          className={classes.typographyTooltip}
          onClick={handleButtonTooltipCategory}
        >
          {nameButton}
        </Typography>
      </Tooltip>
    </Button>
  );
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 5,
  width: '25%',
  marginBottom: 5,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '70%',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(0em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
export default function Header() {
  const navigate = useNavigate();

  const classes = useStyles();

  const [repoCategories, setRepoCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogsSearch, setblogsSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Hàm cập nhật trạng thái khi input được focus
  const handleFocus = () => setIsFocused(true);

  // Hàm cập nhật trạng thái khi input mất focus
  const handleBlur = () => {
    // Sử dụng setTimeout để cho phép người dùng chọn một mục trong danh sách trước khi đóng nó
    setTimeout(() => {
      setIsFocused(false);
    }, 200); // Đợi 200ms trước khi đóng danh sách
  };
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value); // Update the search query state as user types
  };

  const handleClickHome = () => {
    navigate('/');
  };

  const debouncedFetchBlogs = debounce(async () => {
    try {
      const data = await api.queryBlogs(searchQuery);
      if (data.status === 200) {
        setblogsSearch(data.data.blogs);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      console.error('Error fetching units by category', error);
    } finally {
      setIsLoading(false);
    }
  }, 1000);
  React.useEffect(() => {
    const fetchUnitsByCategory = async () => {
      try {
        const data = await api.getUnitsAndCategory();

        if (data.status === 200) {
          setRepoCategories(data.data.units);
        } else {
          setIsLoading(true);
        }
      } catch (error) {
        console.error('Error fetching units by category', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnitsByCategory();
  }, []);
  if (isLoading) {
    return <div>Loading.......</div>;
  }

  React.useEffect(() => {
    // Gọi hàm debouncedFetchBlogs thay vì fetchBlogsByTitle
    debouncedFetchBlogs();
  }, [searchQuery]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openStates, setOpenStates] = React.useState(
    new Array(listUnits.length).fill(false)
  );
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };
  const handleUnitClick = (index: number) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    setOpenStates(new Array(listUnits.length).fill(false));
  };
  const handleNavigateItemSearch = (slug: string) => {
    navigate(`/blog/${slug}`);
  };
  console.log(111, searchQuery);
  console.log(222, blogsSearch);

  const drawer = (
    <Box className={classes.boxContainerDrawer}>
      <Box
        onClick={handleClickHome}
        component="img"
        src="../../public/snapedit_1708352731187.png"
        alt="Logo"
        className={classes.boxDrawer}
      />
      <Divider />
      <List>
        {repoCategories.map(
          (
            item: { units: Array<any>; category: string; categoryId: string },
            index: number
          ) => (
            <Unit
              key={item.categoryId}
              open={openStates[index]}
              handleClick={() => handleUnitClick(index)}
              nameButton={item.category}
              units={item.units}
              categoryId={item.categoryId}
            />
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box className={classes.boxHeader}>
      <AppBar component="nav" className={classes.appbar}>
        <Toolbar className={classes.toolbarHeader}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.iconButton}
          >
            <MenuIcon />
          </IconButton>
          <Button>
            <Box
              onClick={handleClickHome}
              component="img"
              src="../../public/snapedit_1708352731187.png"
              alt="Logo"
              className={classes.boxImage}
            />
          </Button>

          <Box className={classes.boxTooltip}>
            {repoCategories && repoCategories.length > 0 ? (
              <>
                {repoCategories.map(
                  (
                    item: {
                      category: string;
                      units: Array<any>;
                      categoryId: string;
                    },
                    index
                  ) => (
                    <TooltipHeader
                      key={index}
                      nameButton={item?.category}
                      units={item?.units}
                      categoryId={item.categoryId}
                    />
                  )
                )}

                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Tooltip title="Search">
                    <SearchIcon
                      onClick={handleSearchIconClick}
                      sx={{
                        cursor: 'pointer',
                        marginTop: '3px',
                        marginBottom: '10px',
                        marginLeft: '20px',
                      }} // Add margin to the right of the search icon
                    />
                  </Tooltip>
                  {showSearch && (
                    <Search>
                      <StyledInputBase
                        onChange={handleSearchChange}
                        placeholder="Tìm kiếm..."
                        inputProps={{ 'aria-label': 'search' }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </Search>
                  )}

                  {isFocused && blogsSearch.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 5px)', // Set the position below the search bar and add a small gap
                        left: 45,
                        width: '250px', // Set the fixed width of the search results list
                        color: 'black',
                        zIndex: 1000,
                        backgroundColor: 'rgba(200, 200, 200, 0.9)',
                        maxHeight: '300px',
                        overflow: 'auto',
                      }}
                    >
                      <List component="nav">
                        {blogsSearch.map(
                          (blog: {
                            _id: string;
                            slug: string;
                            title: string;
                          }) => (
                            <ListItem
                              button
                              key={blog._id}
                              onClick={() =>
                                handleNavigateItemSearch(blog.slug)
                              }
                            >
                              <ListItemText
                                primary={blog.title}
                                sx={{ cursor: 'pointer' }}
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>No categories available</div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className={classes.drawer}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
