import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function VoteStatusButtonLoader(){
    return (
        <Skeleton animation="wave" variant="rounded" width={80} height={32} />
    );
};
