// import React, { useContext, useState, useEffect } from 'react';
// import items from './data';

// const RoomContext = React.createContext();

// const RoomProvider = ({ children }) => {
//     const [state, setState] = useState({
//         rooms: [],
//         sortedRooms: [],
//         featuredRooms: [],
//         loading: true,
//         type: 'all',
//         capacity: 1,
//         price: 0,
//         minPrice: 0,
//         maxPrice: 0,
//         minSize: 0,
//         maxSize: 0,
//         breakfast: true,
//         pets: false
//     });
    

//     useEffect(() => {
//         const rooms = FormatData(items);
//         // console.log(rooms);
//         const featuredRooms = rooms.filter(room => room.featured === true);
//         let maxPrice = Math.max(...rooms.map(item => item.price));
//         let maxSize = Math.max(...rooms.map(item => item.size));
//         setState({
//             rooms,
//             featuredRooms,
//             sortedRooms:rooms,
//             loading: false,
//             price: maxPrice,
//             maxPrice,
//             maxSize
//         });
//     }, []);

//     const getRoom = (slug) => {
//         let tempRooms = [...state.rooms]; //must be an array not object, this thing takes my 2 hr.
//         const room = tempRooms.find(room => room.slug === slug);
//         return room;
//     };

//     const handleChange = (e) => {
//         const target = e.target;
//         const name = e.target.name;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
        
//         // setState((prevState => {
//         //     return {
//         //         ...prevState,
//         //         [name]:value,
//         //     }
//         // }),filterRooms);
//         setState({
//             ...state,
//             [name]:value
//         }); //filterRooms is not working.
//     };

//     const filterRooms = () => {
//         let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets} = state;
//         // all the rooms
//         let tempRooms = [...rooms];
//         // transform value
//         capacity = parseInt(capacity);
//         price = parseInt(price);
//         //filter by type
//         if(type !== "all"){
//             tempRooms = tempRooms.filter(room => room.type === type);
//         }
//         // filter by capacity
//         if(capacity !== 1){
//             tempRooms = tempRooms.filter(room => room.capacity >= capacity);
//         }
//         // filter by price
//         tempRooms = tempRooms.filter(room => room.price <= price);
//         //filter by size
//         tempRooms = tempRooms.filter(
//             room => room.size >= minSize && room.size <= maxSize
//         );
//         //filter by breakfast
//         if (breakfast) {
//             tempRooms = tempRooms.filter(room => room.breakfast === true);
//         }
//         //filter by pets
//         if (pets) {
//             tempRooms = tempRooms.filter(room => room.pets === true);
//         }
//         //change state
//         setState({
//                 ...state,
//                 sortedRooms:tempRooms
//         });
//     };
    
//     return (
//     <RoomContext.Provider value={{ ...state, getRoom: getRoom, handleChange: handleChange }}>
//         {children}
//     </RoomContext.Provider>
//     );
// };

// function FormatData(items) {
//     let tempItems = items.map(item => {
//         let id = item.sys.id;
//         let images = item.fields.images.map(image => image.fields.file.url);
//         let room = {...item.fields, images, id};
//         return room;
//     });
//     return tempItems;
// };

// export { RoomContext, RoomProvider };

                                // WE DID IT WITH CLASS BCZ FAILED TO ACCCESS filterRooms.

import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
    state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
    };


    getData = async () => {
        try{
            let response = await Client.getEntries({
            content_type: "beachResort",
            // order: "sys.createdAt"
            });
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            //
            let maxPrice = Math.max(...rooms.map(item => item.price));
            let maxSize = Math.max(...rooms.map(item => item.size));
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
            //
                price: maxPrice,
                maxPrice,
                maxSize
            });

        } catch (error){
            console.log(error);
        }
    }

    componentDidMount() {
    this.getData();
    }

    formatData(items) {
    let tempItems = items.map(item => {
        let id = item.sys.id;
        let images = item.fields.images.map(image => image.fields.file.url);

        let room = { ...item.fields, images, id };
        return room;
    });
    return tempItems;
    }
    getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
    };
    handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
        {
            [name]: value
        },
        this.filterRooms
    );
    };
    filterRooms = () => {
        let {
        rooms,
        type,
        capacity,
        price,
        minSize,
        maxSize,
        breakfast,
        pets
        } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
        tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
        room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
        tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
        tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
        sortedRooms: tempRooms
    });
    };
    render() {
        return (
        <RoomContext.Provider
            value={{
            ...this.state,
            getRoom: this.getRoom,
            handleChange: this.handleChange
            }}
        >
            {this.props.children}
        </RoomContext.Provider>
        );
    }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
        <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
        );
    };
}