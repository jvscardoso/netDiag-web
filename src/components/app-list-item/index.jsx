import PropTypes from 'prop-types';
import { Image } from 'phosphor-react';
import React, { useCallback } from 'react';

import {
  Box,
  Grid,
  Paper,
  Stack,
  Avatar,
  Checkbox,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Render from 'src/components/conditional/Render';

const AppListItem = ({
  caption,
  icon: Icon,
  image,
  info,
  status,
  title,
  actions,
  value,
  row,
  onDetailsClick,
  formatValues,
  valuesToShow,
  translateLabels,
  isSelectable,
  checkboxSelection,
  isRowSelectable,
  onChecked,
  ...props
}) => {

  const right = (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography component="span" variant="body2" fontWeight="fontWeightBold" align="right">
        {value}

        <Typography
          sx={{ display: 'block' }}
          component="span"
          variant="caption"
          color="text.disabled"
        >
          {info}
        </Typography>
      </Typography>
    </Stack>
  );

  const getRawValue = useCallback(
    (val, key, rowValue) => {
      if (Object.keys(formatValues).includes(key)) {
        return formatValues[key](val, rowValue);
      }

      return val;
    },
    [formatValues]
  );

  const formatRawTranslate = useCallback(
    (key) => {
      if (Object.keys(translateLabels).includes(key)) {
        return translateLabels[key];
      }

      return key;
    },
    [translateLabels]
  );

  return (
    <Box sx={sx.card}>
      <Render if={valuesToShow.length > 0}>
        <Stack direction="row">
          <Render if={checkboxSelection}>
            <Checkbox onChange={() => onChecked(row)} />
          </Render>
          <Box sx={{ p: 2 }} onClick={onDetailsClick}>
            <Stack direction="row">
              <Grid container rowSpacing={0.8} columnSpacing={4.5}>
                {valuesToShow
                  .filter((item) => row[item] !== undefined && row[item] !== null)
                  .map((key, idx) => (
                    <Grid item key={`${row[key]}-${idx}`}>
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          {formatRawTranslate(key)}
                        </Typography>
                        <Typography variant="subtitle2">
                          {getRawValue(row[key], key, row)}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </Render>
      <Render if={valuesToShow.length === 0}>
        <ListItem
          onClick={onDetailsClick}
          alignItems="flex-start"
          component={Paper}
          secondaryAction={right}
          {...props}
        >
          <Render if={Icon || image}>
            <ListItemAvatar>
              {image ? (
                <Avatar variant="rounded" src={image}>
                  <Image weight="fill" />
                </Avatar>
              ) : (
                <Avatar variant="rounded">
                  <Iconify icon={Icon} height={24} width={24} />
                </Avatar>
              )}
            </ListItemAvatar>
          </Render>
          <ListItemText
            sx={{ maxWidth: '65%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            primary={
              <Typography component="h2" variant="body2" fontWeight="fontWeightBold">
                {title}
              </Typography>
            }
            secondary={
              <Typography
                component="span"
                variant="caption"
                color="text.disabled"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {status && (
                  <Label variant="filled" color="secondary">
                    {status}
                  </Label>
                )}

                {status && caption && ' · '}
                {caption}
              </Typography>
            }
          />
        </ListItem>
      </Render>
      <Render if={Boolean(actions)}>
        <Grid container spacing={1} px={1}>
          {actions?.map((action, index) => (
            <Grid item key={index}>
              {action}
            </Grid>
          ))}
        </Grid>
      </Render>
    </Box>
  );
};

const sx = {
  card: {
    py: 1,
  },
  action: {
    position: 'absolute',
    top: -12,
    right: 2,
  },
};

AppListItem.defaultProps = {
  valuesToShow: [],
  formatValues: {},
  translateLabels: {},
};

AppListItem.propTypes = {
  caption: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.any,
  info: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.any,
  value: PropTypes.string,
  actions: PropTypes.any,
  row: PropTypes.any,
  onChecked: PropTypes.func,
  onDetailsClick: PropTypes.any,
  formatValues: PropTypes.object,
  valuesToShow: PropTypes.array,
  translateLabels: PropTypes.object,
  isSelectable: PropTypes.bool,
  checkboxSelection: PropTypes.bool,
  isRowSelectable: PropTypes.func,
};

export default AppListItem;
