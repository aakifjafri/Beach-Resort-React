import React, { useContext, useEffect } from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { RoomContext } from '../context';
import Loading from './Loading';

export default function RoomsContainer() {

    const { loading, sortedRooms, rooms } = useContext(RoomContext);

    if(loading){
        return <Loading />
    }

    return (
        <>
            <RoomFilter rooms={rooms} />
            <RoomList rooms={sortedRooms} />
        </>
    )
}

