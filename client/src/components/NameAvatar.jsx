import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
    if(name.length < 2){return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: name,
      };
    }
    const splitted = name.split(' ')
    const first = splitted[0][0]
    const last = splitted.length > 1 ? splitted[1][0] : splitted[0][1]
    const initials = `${first}${last}`
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function NameAvatar({name, scale=3, m="40px"}) {
  return (
      <Avatar {...stringAvatar(name)} sx={{ transform: scale=`scale(${scale})`, margin: m }} />
  );
}