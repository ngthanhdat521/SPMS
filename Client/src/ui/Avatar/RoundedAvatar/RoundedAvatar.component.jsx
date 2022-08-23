import * as React from "react";
import Avatar from "@mui/material/Avatar";

function RoundedAvatar({ src, name, style }) {
  // change color by string
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  // change avatar by name
  function stringAvatar(name) {
    if (name !== undefined) {
      if (name.indexOf(" ") >= 0) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
      }
      return {
        sx: {
          bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name[name.length - 1]}`,
      };
    }
    return "";
  }

  return <Avatar {...stringAvatar(name)} variant="rounded" src={src} sx={{...style,bgcolor:stringToColor(name)}} />;
}

export default RoundedAvatar;
