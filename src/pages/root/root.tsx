import * as React from 'react';
import { Box, Stack, Slider } from '@mui/material';
import monogram from '/assets/monogram.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Root.css';

export default function Root() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState<number>(0);
  const [showLockScreen, setShowLockScreen] = React.useState<boolean>(true);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    handleUnlock(event);
  };

  const handleUnlock = (event: Event) => {
    const monogram = document.getElementById('monogram');
    const eventTarget = event.target as HTMLInputElement;
    monogram?.style.setProperty('--transform-angle', `${(parseInt(eventTarget.value) / 100) * 360}deg`);
    if (parseInt(eventTarget.value) === 100) {
      const landing = document.getElementById('landing');
      landing?.setAttribute('class', 'fadeAway');
      setTimeout(() => {
        setShowLockScreen(false);
        navigate('/profile');
      }, 1200);
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      {showLockScreen && (
        <div id='landing'>
          <h1>TOP SECRET DOSSIER</h1>
          <div>
            <img src={monogram} id='monogram' alt='Monogram' />
            <Box sx={{ width: 400, margin: 'auto' }}>
              <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
                <Slider aria-label='Unlock' sx={{ color: '#cc6d00' }} value={value} onChange={handleChange} />
              </Stack>
            </Box>
          </div>
          <h1>UNLOCK TO VIEW</h1>
        </div>
      )}
      <div id='page'>
        <Outlet />
      </div>
    </>
  );
}
